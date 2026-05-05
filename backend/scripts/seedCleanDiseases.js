const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

async function seedCleanDiseases() {
  try {
    console.log('Starting clean disease database seeding...');
    
    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('Cleared existing diseases from database');
    
    const allDiseases = [];
    let diseaseIdCounter = 1;
    
    // 1. Load classical diseases from existing database
    try {
      const classicalDiseases = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/disease_database.json'), 'utf-8'));
      console.log(`Loaded ${classicalDiseases.length} classical diseases`);
      
      classicalDiseases.forEach(disease => {
        allDiseases.push({
          ...disease,
          diseaseId: `CLASSICAL_${diseaseIdCounter.toString().padStart(4, '0')}`,
          source: disease.source || 'Classical Ayurvedic Texts'
        });
        diseaseIdCounter++;
      });
    } catch (error) {
      console.log('No classical diseases file found, skipping...');
    }
    
    // 2. Load clean Dr. Lad's diseases
    try {
      const ladDiseases = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lad_actual_diseases.json'), 'utf-8'));
      console.log(`Loaded ${ladDiseases.length} clean diseases from Dr. Lad's book`);
      
      ladDiseases.forEach(disease => {
        allDiseases.push({
          ...disease,
          diseaseId: disease.diseaseId || `LAD_${diseaseIdCounter.toString().padStart(4, '0')}`,
          source: disease.source || 'The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad'
        });
        diseaseIdCounter++;
      });
    } catch (error) {
      console.log('No Dr. Lad diseases file found, skipping...');
    }
    
    // 3. Remove duplicates based on disease name
    const uniqueDiseases = [];
    const seenNames = new Set();
    
    allDiseases.forEach(disease => {
      const normalizedName = disease.name.toLowerCase().trim();
      if (!seenNames.has(normalizedName)) {
        seenNames.add(normalizedName);
        uniqueDiseases.push(disease);
      }
    });
    
    console.log(`Total unique diseases after deduplication: ${uniqueDiseases.length}`);
    
    // 4. Insert all diseases into database
    await Disease.insertMany(uniqueDiseases);
    console.log(`Successfully seeded ${uniqueDiseases.length} diseases into MongoDB`);
    
    // 5. Print summary
    const categories = {};
    const doshas = {};
    const sources = {};
    
    uniqueDiseases.forEach(disease => {
      // Count categories
      const category = disease.category || 'General';
      categories[category] = (categories[category] || 0) + 1;
      
      // Count doshas
      if (disease.dosha) {
        disease.dosha.forEach(dosha => {
          doshas[dosha] = (doshas[dosha] || 0) + 1;
        });
      }
      
      // Count sources
      const source = disease.source || 'Unknown';
      sources[source] = (sources[source] || 0) + 1;
    });
    
    console.log('\n=== CLEAN DISEASE DATABASE SUMMARY ===');
    console.log(`Total Diseases: ${uniqueDiseases.length}`);
    console.log('\nCategories:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
    console.log('\nDoshas:');
    Object.entries(doshas).forEach(([dosha, count]) => {
      console.log(`  ${dosha}: ${count}`);
    });
    
    console.log('\nSources:');
    Object.entries(sources).forEach(([source, count]) => {
      console.log(`  ${source}: ${count}`);
    });
    
    console.log('\n=== SEEDING COMPLETE ===');
    console.log('All clean diseases are now available in the Vyadhi section!');
    
  } catch (error) {
    console.error('Error seeding clean diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding
seedCleanDiseases(); 