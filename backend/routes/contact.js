const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  email: Joi.string().email().required(),
  message: Joi.string().trim().min(5).max(5000).required(),
  // Honeypot — real users leave it empty; bots tend to fill every field.
  website: Joi.string().allow('').max(0).optional(),
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages — please try again in an hour.' },
});

router.post(
  '/',
  contactLimiter,
  asyncHandler(async (req, res) => {
    const { error, value } = contactSchema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }

    if (mongoose.connection.readyState !== 1) {
      // Even without DB, a 200 here is honest — we'd surface the email link in the UI.
      return res.status(503).json({
        error: 'Messaging unavailable right now',
        message: 'Please email support@ayur.me directly.',
      });
    }

    await ContactMessage.create({
      name: value.name,
      email: value.email,
      message: value.message,
      userAgent: (req.headers['user-agent'] || '').toString().slice(0, 500),
      ip: req.ip,
    });

    res.status(201).json({ ok: true });
  })
);

module.exports = router;
