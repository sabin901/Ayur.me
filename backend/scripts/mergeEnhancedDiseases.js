const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind');

async function mergeEnhancedDiseases() {
  try {
    console.log('Starting to merge enhanced disease data...');
    
    // Read the enhanced diseases
    const enhancedData = JSON.parse(fs.readFileSync('./data/enhanced_diseases.json', 'utf-8'));
    
    // Read existing diseases to check for duplicates
    const existingDiseases = await Disease.find({});
    const existingNames = existingDiseases.map(d => d.name.toLowerCase());
    
    console.log(`Found ${existingDiseases.length} existing diseases`);
    console.log(`Found ${enhancedData.diseases.length} enhanced diseases`);
    
    let updatedCount = 0;
    let addedCount = 0;
    
    for (const diseaseData of enhancedData.diseases) {
      const diseaseName = diseaseData.name.toLowerCase();
      
      // Check if disease already exists
      const existingDisease = await Disease.findOne({ 
        name: { $regex: new RegExp(diseaseName, 'i') } 
      });
      
      if (existingDisease) {
        // Update existing disease with enhanced information
        const updateData = {
          ...diseaseData,
          // Preserve existing fields that might be missing in enhanced data
          diseaseId: existingDisease.diseaseId,
          createdAt: existingDisease.createdAt,
          updatedAt: new Date()
        };
        
        await Disease.findByIdAndUpdate(existingDisease._id, updateData, { new: true });
        console.log(`Updated: ${diseaseData.name}`);
        updatedCount++;
      } else {
        // Add new disease
        const newDisease = new Disease({
          ...diseaseData,
          diseaseId: `enhanced_${diseaseData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        await newDisease.save();
        console.log(`Added: ${diseaseData.name}`);
        addedCount++;
      }
    }
    
    console.log('\n=== MERGE SUMMARY ===');
    console.log(`Updated: ${updatedCount} existing diseases`);
    console.log(`Added: ${addedCount} new diseases`);
    console.log(`Total diseases in database: ${await Disease.countDocuments()}`);
    
    // Verify the merge
    const allDiseases = await Disease.find({});
    console.log('\n=== VERIFICATION ===');
    console.log('Sample of enhanced diseases in database:');
    allDiseases.slice(0, 5).forEach(disease => {
      console.log(`- ${disease.name} (${disease.sanskrit}) - ${disease.dosha?.join(', ')} - Treatments: ${disease.treatments?.length || 0}`);
    });
    
    console.log('\nEnhanced disease data merge completed successfully!');
    
  } catch (error) {
    console.error('Error merging enhanced diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the merge
mergeEnhancedDiseases(); 