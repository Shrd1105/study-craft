const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { aiRateLimiter } = require('./services/aiService');
require('dotenv').config();

const curateResourcesRouter = require('./routes/curateResources');
const generatePlanRouter = require('./routes/generatePlan');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://study-craft.vercel.app', 'https://study-craft-frontend.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Apply rate limiter to AI-related routes
app.use('/api/resources', aiRateLimiter);
app.use('/api/study-plan', aiRateLimiter);

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Study Craft API is running' });
});

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(connectWithRetry, 5000);
  }
};

// Initial connection
connectWithRetry();

// Routes
app.use('/auth', authRouter);
app.use('/generate-plan', generatePlanRouter);
app.use('/curate-resources', curateResourcesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Something went wrong!' 
  });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}