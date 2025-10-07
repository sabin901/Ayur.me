const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind');

async function mergeCommonDiseases() {
  try {
    console.log('Starting to merge common global diseases...');
    
    // Read the new common diseases
    const commonDiseasesData = JSON.parse(fs.readFileSync('./data/common_global_diseases_fixed.json', 'utf-8'));
    
    // Read existing diseases to check for duplicates
    const existingDiseases = await Disease.find({});
    const existingNames = existingDiseases.map(d => d.name.toLowerCase());
    
    console.log(`Found ${existingDiseases.length} existing diseases`);
    console.log(`Found ${commonDiseasesData.diseases.length} new common diseases`);
    
    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const diseaseData of commonDiseasesData.diseases) {
      const diseaseName = diseaseData.name.toLowerCase();
      
      // Check if disease already exists
      const existingDisease = await Disease.findOne({ 
        name: { $regex: new RegExp(diseaseName, 'i') } 
      });
      
      if (existingDisease) {
        // Update existing disease with new information
        const updateData = {
          ...diseaseData,
          updatedAt: new Date()
        };
        
        await Disease.findByIdAndUpdate(existingDisease._id, updateData, { new: true });
        console.log(`Updated: ${diseaseData.name}`);
        updatedCount++;
      } else {
        // Add new disease
        const newDisease = new Disease({
          ...diseaseData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        await newDisease.save();
        console.log(`Added: ${diseaseData.name}`);
        addedCount++;
      }
    }
    
    console.log('\n=== MERGE SUMMARY ===');
    console.log(`Added: ${addedCount} new diseases`);
    console.log(`Updated: ${updatedCount} existing diseases`);
    console.log(`Skipped: ${skippedCount} diseases`);
    console.log(`Total diseases in database: ${await Disease.countDocuments()}`);
    
    // Verify the merge
    const allDiseases = await Disease.find({});
    console.log('\n=== VERIFICATION ===');
    console.log('Sample of diseases in database:');
    allDiseases.slice(0, 10).forEach(disease => {
      console.log(`- ${disease.name} (${disease.ayurvedicName}) - ${disease.category}`);
    });
    
    console.log('\nMerge completed successfully!');
    
  } catch (error) {
    console.error('Error merging diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the merge
mergeCommonDiseases(); 