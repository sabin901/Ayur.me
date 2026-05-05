const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const SavedAssessment = require('../models/SavedAssessment');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const doshaEnum = Joi.string().valid('vata', 'pitta', 'kapha');

const saveSchema = Joi.object({
  primaryDosha: doshaEnum.required(),
  secondaryDosha: doshaEnum.allow(null).optional(),
  constitution: Joi.string().min(1).max(60).required(),
  percentages: Joi.object({
    vata: Joi.number().min(0).max(100).required(),
    pitta: Joi.number().min(0).max(100).required(),
    kapha: Joi.number().min(0).max(100).required(),
  }).required(),
  rawScores: Joi.object({
    vata: Joi.number().min(0).required(),
    pitta: Joi.number().min(0).required(),
    kapha: Joi.number().min(0).required(),
  }).optional(),
  answers: Joi.array().items(Joi.number().integer().min(0)).max(200).optional(),
  notes: Joi.string().max(2000).allow('').optional(),
});

function ensureDb(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      error: 'Database unavailable',
      message: 'Saved assessments require the database. Try again later.',
    });
    return false;
  }
  return true;
}

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    const items = await SavedAssessment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    res.json({ items });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    const { error, value } = saveSchema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }

    const created = await SavedAssessment.create({ ...value, userId: req.user.id });

    // Keep the user's profile in sync with their latest primary dosha.
    await User.findByIdAndUpdate(req.user.id, { primaryDosha: value.primaryDosha });

    res.status(201).json({ assessment: created });
  })
);

router.get(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid assessment id' });
    }
    const assessment = await SavedAssessment.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!assessment) return res.status(404).json({ error: 'Not found' });
    res.json({ assessment });
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid assessment id' });
    }
    const deleted = await SavedAssessment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  })
);

module.exports = router;
