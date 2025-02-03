const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const curateResourcesRouter = require('./routes/curateResources');
const generatePlanRouter = require('./routes/generatePlan');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/curate-resources', curateResourcesRouter);
app.use('/api/generate-plan', generatePlanRouter);

// Error handling middleware
app.use((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Something went wrong!' 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});