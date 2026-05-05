const mongoose = require('mongoose');

/**
 * Lightweight model for saving the result of the in-app dosha quiz.
 * The bigger PrakritiAssessment model is tied to the backend's
 * comprehensive assessment service and is overkill for storing a
 * simple quiz result for a logged-in user.
 */
const savedAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    primaryDosha: { type: String, enum: ['vata', 'pitta', 'kapha'], required: true },
    secondaryDosha: { type: String, enum: ['vata', 'pitta', 'kapha', null], default: null },
    constitution: { type: String, required: true },
    percentages: {
      vata: { type: Number, required: true, min: 0, max: 100 },
      pitta: { type: Number, required: true, min: 0, max: 100 },
      kapha: { type: Number, required: true, min: 0, max: 100 },
    },
    rawScores: {
      vata: { type: Number, default: 0 },
      pitta: { type: Number, default: 0 },
      kapha: { type: Number, default: 0 },
    },
    answers: { type: [Number], default: [] },
    notes: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

savedAssessmentSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('SavedAssessment', savedAssessmentSchema);
