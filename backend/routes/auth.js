const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { signToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(200).required(),
  name: Joi.string().trim().max(80).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(200).required(),
});

// Stricter rate limit on credential endpoints to slow down brute-force.
const credentialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts, please try again later.' },
});

function ensureDbReady(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      error: 'Database unavailable',
      message: 'Account features require the database. Try again later.',
    });
    return false;
  }
  return true;
}

router.post(
  '/register',
  credentialLimiter,
  asyncHandler(async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }
    if (!ensureDbReady(res)) return;

    const existing = await User.findOne({ email: value.email });
    if (existing) {
      // Don't leak existence — return a generic conflict.
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    const user = new User({ email: value.email, name: value.name });
    await user.setPassword(value.password);
    await user.save();

    const token = signToken(user);
    res.status(201).json({ token, user: user.toSafeJSON() });
  })
);

router.post(
  '/login',
  credentialLimiter,
  asyncHandler(async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }
    if (!ensureDbReady(res)) return;

    const user = await User.findOne({ email: value.email }).select('+passwordHash');
    if (!user) {
      // Generic message, no enumeration.
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const ok = await user.verifyPassword(value.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = signToken(user);
    res.json({ token, user: user.toSafeJSON() });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!ensureDbReady(res)) return;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: user.toSafeJSON() });
  })
);

module.exports = router;
