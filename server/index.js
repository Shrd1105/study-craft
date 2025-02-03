const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const curateResourcesRouter = require('./routes/curateResources');
const generatePlanRouter = require('./routes/generatePlan');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mind-mentor-2ahnqx6hh-kartik-labhshetwars-projects.vercel.app',
    // Add any other allowed domains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Mind Mentor API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/curate-resources', curateResourcesRouter);
app.use('/api/generate-plan', generatePlanRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Something went wrong!' 
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});