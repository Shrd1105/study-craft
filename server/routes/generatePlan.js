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

    const daysUntilExam = Math.ceil(
      (new Date(examDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );

    if (daysUntilExam < 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Exam date must be in the future' 
      });
    }

    // Get curriculum information
    const searchData = await searchTavily(subject);
    
    // Generate plan
    const plan = await generatePlanWithGemini(
      searchData,
      subject,
      daysUntilExam,
      examDate
    );
    
    // Save plan
    const savedPlan = await savePlan(userId, plan);
    
    res.json({ 
      success: true, 
      plan: savedPlan 
    });
  } catch (error) {
    console.error('Error in plan generation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Plan generation failed' 
    });
  }
});

// Delete a plan
router.delete('/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const plan = await StudyPlan.findOneAndDelete({
      _id: planId,
      userId: userId,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Study plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Study plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting study plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete study plan'
    });
  }
});

module.exports = router;