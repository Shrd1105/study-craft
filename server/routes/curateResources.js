const express = require('express');
const { searchTavily, curateResources } = require('../services/aiService');
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

    // Check if resources already exist for this subject and user
    const existingResources = await CuratedResource.find({ 
      userId,
      subject: subject.trim().toLowerCase()
    });

    if (existingResources.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Resources already exist for this subject'
      });
    }

    // If no existing resources, generate new ones
    const searchData = await searchTavily(subject);
    const curatedResources = await curateResources(searchData, subject);
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
    
    if (!resourceId) {
      return res.status(400).json({
        success: false,
        error: 'resourceId is required'
      });
    }

    // Find and delete the resource
    const deletedResource = await CuratedResource.findByIdAndDelete(resourceId);
    
    if (!deletedResource) {
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