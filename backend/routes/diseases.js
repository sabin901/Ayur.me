const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();

/**
 * @route GET /api/diseases
 * @desc Get all diseases with pagination and filtering
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.dosha) {
      filter.dosha = { $in: [req.query.dosha] };
    }
    
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { englishName: { $regex: req.query.search, $options: 'i' } },
        { sanskritName: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Get total count
    const totalDiseases = await Disease.countDocuments(filter);
    
    // Get diseases with pagination
    const diseases = await Disease.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });
    
    res.json({
      success: true,
      diseases,
      pagination: {
        page,
        limit,
        totalDiseases,
        totalPages: Math.ceil(totalDiseases / limit),
        hasNext: page < Math.ceil(totalDiseases / limit),
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({
      error: 'Failed to fetch diseases',
      message: 'An error occurred while retrieving diseases'
    });
  }
});

/**
 * @route GET /api/diseases/:id
 * @desc Get a specific disease by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    
    if (!disease) {
      return res.status(404).json({
        error: 'Disease not found',
        message: 'No disease found with the provided ID'
      });
    }
    
    res.json({
      success: true,
      disease
    });
    
  } catch (error) {
    console.error('Error fetching disease:', error);
    res.status(500).json({
      error: 'Failed to fetch disease',
      message: 'An error occurred while retrieving the disease'
    });
  }
});

/**
 * @route GET /api/diseases/stats/overview
 * @desc Get disease statistics
 * @access Public
 */
router.get('/stats/overview', async (req, res) => {
  try {
    const totalDiseases = await Disease.countDocuments();
    
    // Get category stats
    const categoryStats = await Disease.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get dosha stats
    const doshaStats = await Disease.aggregate([
      { $unwind: '$dosha' },
      { $group: { _id: '$dosha', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get source stats
    const sourceStats = await Disease.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalDiseases,
        categories: categoryStats,
        doshas: doshaStats,
        sources: sourceStats
      }
    });
    
  } catch (error) {
    console.error('Error fetching disease stats:', error);
    res.status(500).json({
      error: 'Failed to fetch disease statistics',
      message: 'An error occurred while retrieving disease statistics'
    });
  }
});

module.exports = router; 