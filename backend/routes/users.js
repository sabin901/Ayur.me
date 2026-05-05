const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const profileUpdateSchema = Joi.object({
  name: Joi.string().trim().max(80).allow('').optional(),
  primaryDosha: Joi.string().valid('vata', 'pitta', 'kapha', null).optional(),
});

function ensureDb(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'Database unavailable' });
    return false;
  }
  return true;
}

router.get(
  '/profile',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: user.toSafeJSON() });
  })
);

router.patch(
  '/profile',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDb(res)) return;
    const { error, value } = profileUpdateSchema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }
    const user = await User.findByIdAndUpdate(req.user.id, value, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: user.toSafeJSON() });
  })
);

module.exports = router;
