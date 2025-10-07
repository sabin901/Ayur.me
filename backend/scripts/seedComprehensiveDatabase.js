const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Load disease data from multiple sources
function loadDiseaseData() {
  const diseases = [];
  
  // Load classical diseases
  try {
    const classicalPath = path.join(__dirname, '../data/comprehensive_classical_diseases.json');
    if (fs.existsSync(classicalPath)) {
      const classicalData = JSON.parse(fs.readFileSync(classicalPath, 'utf8'));
      diseases.push(...classicalData);
      console.log(`Loaded ${classicalData.length} classical diseases`);
    }
  } catch (error) {
    console.log('Error loading classical diseases:', error.message);
  }
  
  // Load Dr. Lad's diseases (if available)
  try {
    const ladPath = path.join(__dirname, '../data/lad_actual_diseases.json');
    if (fs.existsSync(ladPath)) {
      const ladData = JSON.parse(fs.readFileSync(ladPath, 'utf8'));
      // Filter to only include actual diseases (not treatments/remedies)
      const actualDiseases = ladData.filter(disease => 
        disease.name && 
        !disease.name.includes('PASTE') &&
        !disease.name.includes('MILK') &&
        !disease.name.includes('OIL') &&
        !disease.name.includes('POWDER') &&
        !disease.name.includes('DECOCTION') &&
        disease.name.length > 3
      );
      diseases.push(...actualDiseases);
      console.log(`Loaded ${actualDiseases.length} Dr. Lad diseases`);
    }
  } catch (error) {
    console.log('Error loading Dr. Lad diseases:', error.message);
  }
  
  // Load comprehensive diseases (if available)
  try {
    const comprehensivePath = path.join(__dirname, '../data/comprehensive_ayurvedic_diseases.json');
    if (fs.existsSync(comprehensivePath)) {
      const comprehensiveData = JSON.parse(fs.readFileSync(comprehensivePath, 'utf8'));
      diseases.push(...comprehensiveData);
      console.log(`Loaded ${comprehensiveData.length} comprehensive diseases`);
    }
  } catch (error) {
    console.log('Error loading comprehensive diseases:', error.message);
  }
  
  return diseases;
}

// Remove duplicates based on name and sanskrit
function removeDuplicates(diseases) {
  const uniqueDiseases = [];
  const seen = new Set();
  
  for (const disease of diseases) {
    const key = `${disease.name.toLowerCase()}-${disease.sanskrit || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueDiseases.push(disease);
    }
  }
  
  return uniqueDiseases;
}

// Validate disease data
function validateDisease(disease) {
  const required = ['diseaseId', 'name', 'source', 'dosha', 'symptoms', 'pathogenesis'];
  const missing = required.filter(field => !disease[field]);
  
  if (missing.length > 0) {
    console.log(`Disease ${disease.name} missing required fields: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}

// Seed the database
async function seedDatabase() {
  try {
    console.log('Starting comprehensive disease database seeding...');
    
    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('Cleared existing diseases from database');
    
    // Load disease data
    const allDiseases = loadDiseaseData();
    console.log(`Total diseases loaded: ${allDiseases.length}`);
    
    // Remove duplicates
    const uniqueDiseases = removeDuplicates(allDiseases);
    console.log(`Unique diseases after deduplication: ${uniqueDiseases.length}`);
    
    // Validate and filter diseases
    const validDiseases = uniqueDiseases.filter(validateDisease);
    console.log(`Valid diseases for seeding: ${validDiseases.length}`);
    
    // Insert diseases into database
    if (validDiseases.length > 0) {
      const result = await Disease.insertMany(validDiseases);
      console.log(`Successfully seeded ${result.length} diseases into database`);
      
      // Display sample diseases
      console.log('\nSample diseases seeded:');
      result.slice(0, 5).forEach(disease => {
        console.log(`- ${disease.name} (${disease.sanskrit}) - ${disease.source}`);
      });
      
      // Save to JSON file for reference
      const outputPath = path.join(__dirname, '../data/final_disease_database.json');
      fs.writeFileSync(outputPath, JSON.stringify(validDiseases, null, 2));
      console.log(`\nDisease data saved to: ${outputPath}`);
      
    } else {
      console.log('No valid diseases to seed');
    }
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding
seedDatabase(); 