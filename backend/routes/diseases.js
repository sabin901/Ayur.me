const express = require('express');
const mongoose = require('mongoose');
const Disease = require('../models/Disease');
const escapeRegex = require('../utils/escapeRegex');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

// Fallback when MongoDB is disconnected
let fallbackDiseases = null;
function getFallbackDiseases() {
  if (fallbackDiseases) return fallbackDiseases;
  try {
    fallbackDiseases = require('../data/final_complete_diseases.json').map((d, index) => ({
      ...d,
      diseaseId: d.diseaseId || d.id || `FALLBACK_${index + 1}`,
      category: d.category || 'Classical Ayurveda',
      sourceName: d.sourceName || 'Local reviewed seed dataset',
      sourceUrl: d.sourceUrl || null,
      license: d.license || 'Internal educational seed record; verify before external redistribution.',
      reviewStatus: d.reviewStatus || 'seed_reviewed',
      confidence: d.confidence || 0.72,
    }));
    return fallbackDiseases;
  } catch (e) {
    console.error('Could not load fallback diseases:', e.message);
    return [];
  }
}

/**
 * @route GET /api/diseases
 * @desc Get all diseases with pagination and filtering
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
    // Clamp inputs to safe bounds so no caller can request a million docs.
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const skip = (page - 1) * limit;

    // Use fallback when MongoDB is disconnected
    if (mongoose.connection.readyState !== 1) {
      let diseases = getFallbackDiseases();
      const category = req.query.category;
      const dosha = req.query.dosha;
      const search = req.query.search;

      if (category) {
        diseases = diseases.filter((d) => (d.category || 'General').toLowerCase() === category.toLowerCase());
      }
      if (dosha) {
        diseases = diseases.filter((d) => Array.isArray(d.dosha) && d.dosha.some((x) => x.toLowerCase() === dosha.toLowerCase()));
      }
      if (search) {
        const s = search.toLowerCase();
        diseases = diseases.filter(
          (d) =>
            (d.name && d.name.toLowerCase().includes(s)) ||
            (d.sanskrit && d.sanskrit.includes(search)) ||
            (d.source && d.source.toLowerCase().includes(s))
        );
      }

      const totalDiseases = diseases.length;
      diseases = diseases.sort((a, b) => (a.name || '').localeCompare(b.name || '')).slice(skip, skip + limit);

      return res.json({
        success: true,
        diseases,
        fromFallback: true,
        pagination: {
          page,
          limit,
          totalDiseases,
          totalPages: Math.ceil(totalDiseases / limit) || 1,
          hasNext: page < Math.ceil(totalDiseases / limit),
          hasPrev: page > 1
        }
      });
    }
    
    // Build filter object
    const filter = {};
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.dosha) {
      filter.dosha = { $in: [req.query.dosha] };
    }
    
    if (req.query.search) {
      // Escape any regex metacharacters from user input — otherwise an
      // unbalanced `(` from a search box can crash the whole query.
      const safe = escapeRegex(String(req.query.search));
      filter.$or = [
        { name: { $regex: safe, $options: 'i' } },
        { englishName: { $regex: safe, $options: 'i' } },
        { sanskritName: { $regex: safe, $options: 'i' } }
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
  })
);

/**
 * @route GET /api/diseases/stats/overview
 * @desc Get disease statistics
 * @access Public
 */
router.get('/stats/overview', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const all = getFallbackDiseases();
    const tally = (key) => {
      const counts = new Map();
      all.forEach(d => {
        const v = d[key];
        if (Array.isArray(v)) v.forEach(x => counts.set(x, (counts.get(x) || 0) + 1));
        else if (v != null) counts.set(v, (counts.get(v) || 0) + 1);
      });
      return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([_id, count]) => ({ _id, count }));
    };
    return res.json({
      success: true,
      fromFallback: true,
      stats: {
        totalDiseases: all.length,
        categories: tally('category'),
        doshas: tally('dosha'),
        sources: tally('source'),
      },
    });
  }

  const [totalDiseases, categoryStats, doshaStats, sourceStats] = await Promise.all([
    Disease.countDocuments(),
    Disease.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Disease.aggregate([{ $unwind: '$dosha' }, { $group: { _id: '$dosha', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Disease.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
  ]);

  res.json({
    success: true,
    stats: { totalDiseases, categories: categoryStats, doshas: doshaStats, sources: sourceStats },
  });
}));

/**
 * @route GET /api/diseases/:id
 * @desc Get a specific disease by ID
 * @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    // Try to satisfy from fallback by id-as-name match.
    const all = getFallbackDiseases();
    const match = all.find(d => String(d._id || d.id || d.diseaseId) === String(req.params.id));
    if (!match) return res.status(404).json({ error: 'Disease not found' });
    return res.json({ success: true, disease: match, fromFallback: true });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid disease id' });
  }

  const disease = await Disease.findById(req.params.id);
  if (!disease) {
    return res.status(404).json({
      error: 'Disease not found',
      message: 'No disease found with the provided ID'
    });
  }
  res.json({ success: true, disease });
}));

module.exports = router; 
