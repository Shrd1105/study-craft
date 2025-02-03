const express = require('express');
const { searchTavily, curateResourcesWithGemini } = require('../services/aiService');
const { saveResources } = require('../services/dbService');
const CuratedResource = require('../models/curatedResource');

const router = express.Router();

// Get resources for a user
router.get('/:userId', async (req, res) => { 
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const resources = await CuratedResource.find({ userId })
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      resources 
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch resources' 
    });
  }
});

// Create new resources
router.post('/', async (req, res) => {
  try {
    const { subject, userId } = req.body;

    if (!subject?.trim() || !userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Subject and userId are required' 
      });
    }

    // Search for resources
    const searchData = await searchTavily(subject);
    
    // Generate curated resources
    const curatedResources = await curateResourcesWithGemini(searchData, subject);
    
    // Save resources
    const savedResources = await saveResources(userId, subject, curatedResources);
    
    res.json({ 
      success: true, 
      resources: savedResources 
    });
  } catch (error) {
    console.error('Error in resource curation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Resource curation failed' 
    });
  }
});

// Delete a resource
router.delete('/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const resource = await CuratedResource.findOneAndDelete({
      _id: resourceId,
      userId: userId,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete resource'
    });
  }
});

module.exports = router;