const mongoose = require('mongoose');

const doshaSubtypeSchema = new mongoose.Schema({
  dosha: {
    type: String,
    enum: ['vata', 'pitta', 'kapha'],
    required: true
  },
  subtype: {
    type: String,
    required: true
  },
  sanskritName: {
    type: String,
    required: true
  },
  iastTransliteration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  functions: [{
    type: String,
    required: true
  }],
  symptoms: [{
    type: String,
    required: true
  }],
  classicalReferences: [{
    text: {
      type: String,
      enum: ['Charaka Samhita', 'Sushruta Samhita', 'Ashtanga Hridayam', 'Bhava Prakasha', 'Madhava Nidanam'],
      required: true
    },
    chapter: String,
    verse: String,
    section: String,
    sanskritVerse: String,
    englishTranslation: String
  }],
  qualities: [{
    type: String,
    enum: ['dry', 'light', 'cold', 'rough', 'subtle', 'mobile', 'clear', 'oily', 'sharp', 'hot', 'liquid', 'sour', 'heavy', 'slow', 'smooth', 'soft', 'stable', 'dense', 'sticky', 'cloudy']
  }],
  elements: [{
    type: String,
    enum: ['akasha', 'vayu', 'agni', 'jala', 'prithvi']
  }],
  therapeuticActions: [{
    type: String
  }],
  balancingPractices: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for efficient queries
doshaSubtypeSchema.index({ dosha: 1, subtype: 1 });
doshaSubtypeSchema.index({ 'classicalReferences.text': 1 });

module.exports = mongoose.model('DoshaSubtype', doshaSubtypeSchema); 