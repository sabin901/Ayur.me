const mongoose = require('mongoose');
const Disease = require('../models/Disease');
const ayurvedicDiseases = require('../data/ayurvedicDiseases');
const comprehensiveDiseases = require('../data/comprehensiveDiseases');
const comprehensiveAyurvedicDiseases = require('../data/comprehensiveAyurvedicDiseases');
const diseases_part1 = require('../data/diseases_part1');
const diseases_part2 = require('../data/diseases_part2');
const diseases_part3 = require('../data/diseases_part3');
const diseases_part4 = require('../data/diseases_part4');
require('dotenv').config();

// Helper: Normalize and deduplicate diseases by name/sanskritName/englishName
function normalizeDisease(d) {
  return {
    name: d.name?.trim() || d.englishName?.trim() || 'N/A',
    sanskritName: d.sanskritName?.trim() || d.sanskrit?.trim() || 'N/A',
    englishName: d.englishName?.trim() || d.name?.trim() || 'N/A',
    category: d.category || 'General',
    primaryDosha: d.primaryDosha || d.dosha?.[0] || 'N/A',
    secondaryDosha: d.secondaryDosha || d.dosha?.[1] || '',
    sources: d.sources || (d.source ? [{ text: d.source }] : []),
    symptoms: d.symptoms && d.symptoms.length ? d.symptoms : ['N/A'],
    causes: d.causes && d.causes.length ? d.causes : ['N/A'],
    pathogenesis: d.pathogenesis || 'N/A',
    diagnosticMethods: d.diagnosticMethods || [],
    treatments: d.treatments && d.treatments.length ? d.treatments : [{ type: 'N/A', description: 'N/A', ingredients: [] }],
    herbalMedicines: d.herbalMedicines || [],
    dietaryGuidelines: d.dietaryGuidelines || d.diet || { foodsToInclude: ['N/A'], foodsToAvoid: ['N/A'] },
    lifestyleRecommendations: d.lifestyleRecommendations || { dailyRoutine: d.lifestyle && d.lifestyle.length ? d.lifestyle : ['N/A'] },
    prevention: d.prevention && d.prevention.length ? d.prevention : ['N/A'],
    modernCorrelation: d.modernCorrelation || d.modernEquivalent || 'N/A',
    contraindications: d.contraindications || [],
    severity: d.severity || 'Moderate',
    ageGroups: d.ageGroups || [],
    genderSpecific: d.genderSpecific || '',
    seasonalFactors: d.seasonalFactors || [],
    tags: d.tags || [],
    isActive: true
  };
}

function deduplicate(diseases) {
  const seen = new Map();
  for (const d of diseases) {
    const key = (d.name || '').toLowerCase() + '|' + (d.sanskritName || '').toLowerCase() + '|' + (d.englishName || '').toLowerCase();
    if (!seen.has(key)) seen.set(key, d);
  }
  return Array.from(seen.values());
}

const mergedDiseases = deduplicate([
  ...ayurvedicDiseases.map(normalizeDisease),
  ...comprehensiveDiseases.map(normalizeDisease),
  ...comprehensiveAyurvedicDiseases.map(normalizeDisease),
  ...diseases_part1.map(normalizeDisease),
  ...diseases_part2.map(normalizeDisease),
  ...diseases_part3.map(normalizeDisease),
  ...diseases_part4.map(normalizeDisease)
]);

const seedDiseases = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind');
    console.log('Connected to MongoDB');

    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('Cleared existing diseases');

    // Add diseaseId and isActive to each disease before inserting
    const diseasesWithIds = mergedDiseases.map((disease, index) => {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5);
      return {
        ...disease,
        diseaseId: `DISEASE_${timestamp}_${random}_${index}`.toUpperCase(),
        isActive: true
      };
    });

    // Insert all diseases
    const diseases = await Disease.insertMany(diseasesWithIds);
    console.log(`Successfully seeded ${diseases.length} diseases`);

    // Create text index for search functionality
    await Disease.collection.createIndex({
      name: 'text',
      sanskritName: 'text',
      englishName: 'text',
      tags: 'text'
    });
    console.log('Created text indexes for search');

    // Log some statistics
    const stats = await Disease.aggregate([
      {
        $group: {
          _id: null,
          totalDiseases: { $sum: 1 },
          categories: { $addToSet: '$category' },
          doshas: { $addToSet: '$primaryDosha' }
        }
      }
    ]);

    if (stats.length > 0) {
      console.log('\nDatabase Statistics:');
      console.log(`Total Diseases: ${stats[0].totalDiseases}`);
      console.log(`Categories: ${stats[0].categories.length}`);
      console.log(`Doshas: ${stats[0].doshas.length}`);
      console.log('\nCategories:', stats[0].categories);
      console.log('\nDoshas:', stats[0].doshas);
    }

    console.log('\nComprehensive Disease Database seeding completed successfully!');
    console.log('The Vyadhi section is now ready with authentic diseases from classical texts!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding diseases:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDiseases(); 