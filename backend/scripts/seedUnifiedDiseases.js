const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

mongoose.connect('mongodb://localhost/prakriti', { useNewUrlParser: true, useUnifiedTopology: true });

function loadAllDiseaseData() {
  const files = [
    '../data/disease_database.json',
    '../data/lad_actual_diseases.json',
    '../data/comprehensive_ayurvedic_diseases.json',
    '../data/comprehensive_classical_diseases.json'
  ];
  const allDiseases = [];
  for (const relPath of files) {
    try {
      const filePath = path.join(__dirname, relPath);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        allDiseases.push(...data);
        console.log(`✓ Loaded ${data.length} from ${relPath}`);
      }
    } catch (e) {
      console.log(`✗ Error loading ${relPath}:`, e.message);
    }
  }
  return allDiseases;
}

function normalizeDisease(d) {
  return {
    diseaseId: d.diseaseId || `DISEASE_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: d.name || d.englishName || 'Unknown Disease',
    sanskrit: d.sanskrit || d.sanskritName || '',
    source: d.source || 'Classical Ayurvedic Texts',
    dosha: Array.isArray(d.dosha) ? d.dosha : (d.primaryDosha ? [d.primaryDosha] : []),
    symptoms: Array.isArray(d.symptoms) ? d.symptoms : [],
    pathogenesis: d.pathogenesis || (d.causes ? d.causes.join(', ') : ''),
    treatments: Array.isArray(d.treatments) ? d.treatments : [],
    herbs: Array.isArray(d.herbs) ? d.herbs : [],
    precautions: Array.isArray(d.precautions) ? d.precautions : [],
    diet: d.diet || { include: [], avoid: [] },
    lifestyle: Array.isArray(d.lifestyle) ? d.lifestyle : [],
    modernEquivalent: d.modernEquivalent || d.modernCorrelation || '',
    category: d.category || 'General',
    severity: d.severity || 'Moderate',
    isActive: true
  };
}

function removeDuplicates(diseases) {
  const seen = new Set();
  const unique = [];
  for (const d of diseases) {
    const key = (d.name || '').toLowerCase() + '|' + (d.sanskrit || '').toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(d);
    }
  }
  return unique;
}

function filterRealDiseases(diseases) {
  const nonDiseaseKeywords = [
    'paste', 'oil', 'powder', 'decoction', 'tea', 'milkbath', 'exercise', 'remedy', 'treatment', 'therapy', 'massage', 'yoga', 'pranayama',
    'herbal', 'supplement', 'vitamin', 'mineral', 'food', 'drink', 'cooling', 'healing', 'soothing', 'additional', 'recommendation'
  ];
  return diseases.filter(d => {
    const name = (d.name || '').toLowerCase();
    return !nonDiseaseKeywords.some(k => name.includes(k)) && name.length > 3 && name.length < 100;
  });
}

function validateDisease(d) {
  const required = ['name', 'source', 'dosha', 'symptoms'];
  const missing = required.filter(f => !d[f] || (Array.isArray(d[f]) && d[f].length === 0));
  if (missing.length > 0) {
    console.log(`⚠️  Disease "${d.name}" missing: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

async function seedUnifiedDiseases() {
  try {
    console.log('🚀 Starting Unified Disease Database Seeding...');
    await Disease.deleteMany({});
    const allDiseases = loadAllDiseaseData();
    const normalized = allDiseases.map(normalizeDisease);
    const unique = removeDuplicates(normalized);
    const real = filterRealDiseases(unique);
    const valid = real.filter(validateDisease);
    if (valid.length > 0) {
      await Disease.insertMany(valid);
      fs.writeFileSync(path.join(__dirname, '../data/final_unified_diseases.json'), JSON.stringify(valid, null, 2));
      console.log(`✅ Seeded ${valid.length} diseases. Vyadhi section is ready!`);
    } else {
      console.log('❌ No valid diseases to seed.');
    }
  } catch (e) {
    console.error('❌ Error seeding unified diseases:', e);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedUnifiedDiseases(); 