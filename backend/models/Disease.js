const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  type: String, // Herbal, Therapy, Surgical
  description: String,
  ingredients: [String],
  source: String
}, { _id: false });

const diseaseSchema = new mongoose.Schema({
  diseaseId: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // English name
  sanskrit: String, // Sanskrit name
  source: String, // e.g., Madhava Nidana Ch.22
  dosha: [String], // e.g., ["Vata", "Kapha"]
  symptoms: [String], // e.g., ["Joint pain", "Swelling"]
  pathogenesis: String, // e.g., "Impaired Agni → Ama formation"
  treatments: [treatmentSchema],
  herbs: [String], // e.g., ["Guduchi", "Ashwagandha"]
  precautions: [String], // e.g., ["Avoid cold foods"]
  diet: {
    include: [String],
    avoid: [String]
  },
  lifestyle: [String], // e.g., ["Daily yoga", "Avoid stress"]
  modernEquivalent: String, // e.g., "Sciatica (ICD-10: M54.3)"
  evidenceLevel: String, // Optional: Class A, B, C
  isActive: { type: Boolean, default: true } // Added for API filtering
});

// Indexes for query performance.
// `name`/`englishName`/`sanskritName` get text indexes for search;
// `category` and `dosha` get plain indexes since the API filters on them.
diseaseSchema.index({ name: 1 });
diseaseSchema.index({ category: 1 });
diseaseSchema.index({ dosha: 1 });
diseaseSchema.index(
  { name: 'text', sanskrit: 'text', source: 'text' },
  { weights: { name: 5, sanskrit: 3, source: 1 }, name: 'DiseaseTextIndex' }
);

module.exports = mongoose.model('Disease', diseaseSchema); 