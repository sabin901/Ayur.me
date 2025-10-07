const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ayurmind';

async function seedDiseases() {
  try {
    await mongoose.connect(MONGO_URI);
    const dataPath = path.join(__dirname, '../data/diseases_lad.json');
    const diseases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    let counter = 1;
    for (const disease of diseases) {
      // Generate unique diseaseId if not present
      const diseaseId = disease.diseaseId || `LAD_${String(counter).padStart(4, '0')}`;
      counter++;
      // Map dietInclude/dietAvoid to diet object
      const diet = {
        include: disease.dietInclude || [],
        avoid: disease.dietAvoid || []
      };
      const diseaseDoc = {
        ...disease,
        diseaseId,
        diet,
      };
      delete diseaseDoc.dietInclude;
      delete diseaseDoc.dietAvoid;
      await Disease.findOneAndUpdate(
        { diseaseId },
        diseaseDoc,
        { upsert: true, new: true }
      );
    }
    console.log(`Seeded ${diseases.length} diseases successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding diseases:', err);
    process.exit(1);
  }
}

seedDiseases(); 