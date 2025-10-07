const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('./models/Disease');

mongoose.connect('mongodb://localhost/prakriti', { useNewUrlParser: true, useUnifiedTopology: true });

async function mergeDiseases() {
  try {
    console.log('🔄 Starting disease merge process...');
    
    // Load existing diseases from database
    const existingDiseases = await Disease.find({});
    console.log(`📊 Found ${existingDiseases.length} existing diseases in database`);
    
    // Load extracted diseases
    const extractedPath = path.join(__dirname, 'data', 'extracted_diseases.json');
    let extractedDiseases = [];
    
    if (fs.existsSync(extractedPath)) {
      extractedDiseases = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
      console.log(`📄 Loaded ${extractedDiseases.length} extracted diseases`);
    } else {
      console.log('⚠️  No extracted diseases file found');
    }
    
    // Merge all diseases
    const allDiseases = [...existingDiseases.map(d => d.toObject()), ...extractedDiseases];
    console.log(`🔗 Total diseases to process: ${allDiseases.length}`);
    
    // Remove duplicates based on name
    const uniqueDiseases = [];
    const seenNames = new Set();
    
    allDiseases.forEach(disease => {
      const normalizedName = disease.name.toLowerCase().trim();
      if (!seenNames.has(normalizedName)) {
        seenNames.add(normalizedName);
        uniqueDiseases.push(disease);
      }
    });
    
    console.log(`✨ Unique diseases after deduplication: ${uniqueDiseases.length}`);
    
    // Clear database and insert merged diseases
    await Disease.deleteMany({});
    await Disease.insertMany(uniqueDiseases);
    
    console.log(`✅ Successfully merged and seeded ${uniqueDiseases.length} diseases`);
    
    // Save merged data to file
    const mergedPath = path.join(__dirname, 'data', 'merged_disease_database.json');
    fs.writeFileSync(mergedPath, JSON.stringify(uniqueDiseases, null, 2));
    console.log(`💾 Merged data saved to: ${mergedPath}`);
    
    // Print summary
    const sources = {};
    uniqueDiseases.forEach(disease => {
      const source = disease.source || 'Unknown';
      sources[source] = (sources[source] || 0) + 1;
    });
    
    console.log('\n📈 Disease Sources Summary:');
    Object.entries(sources).forEach(([source, count]) => {
      console.log(`  ${source}: ${count} diseases`);
    });
    
  } catch (error) {
    console.error('❌ Error merging diseases:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

mergeDiseases(); 