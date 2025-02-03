const express = require('express');
const { searchTavily, generatePlanWithGemini } = require('../services/aiService');
const { savePlan } = require('../services/dbService');
const StudyPlan = require('../models/studyPlan');

const router = express.Router();

// Get plans for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const plans = await StudyPlan.find({ 
      userId, 
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      plans 
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch plans' 
    });
  }
});

// Create new plan
router.post('/', async (req, res) => {
  try {
    const { subject, examDate, userId } = req.body;

    if (!subject?.trim() || !examDate || !userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Subject, examDate and userId are required' 
      });
    }

    // Check if a plan already exists for this subject and date
    const existingPlan = await StudyPlan.findOne({
      userId,
      'overview.subject': subject,
      'overview.examDate': examDate
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        error: 'A plan for this subject and date already exists'
      });
    }

    // Generate and save the new plan
    const plan = await generatePlanWithGemini(subject, userId, examDate);
    
    // Save plan
    const savedPlan = await plan.save();

    res.json({ 
      success: true, 
      plan: savedPlan 
    });

  } catch (error) {
    console.error('Error in plan generation:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Plan generation failed' 
    });
  }
});

// Delete a plan
router.delete('/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    
    const deletedPlan = await StudyPlan.findByIdAndDelete(planId);
    
    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete plan'
    });
  }
});

module.exports = router;