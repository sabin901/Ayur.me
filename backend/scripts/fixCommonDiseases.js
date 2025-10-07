const fs = require('fs');

// Read the current common diseases file
const commonDiseasesData = JSON.parse(fs.readFileSync('./data/common_global_diseases.json', 'utf-8'));

// Update each disease to match the Disease model schema
const updatedDiseases = commonDiseasesData.diseases.map((disease, index) => {
  return {
    diseaseId: `common_${disease.name.toLowerCase().replace(/\s+/g, '_')}_${String(index + 1).padStart(3, '0')}`,
    name: disease.name,
    sanskrit: disease.ayurvedicName || disease.sanskrit || '',
    source: disease.references || 'Charaka Samhita, Sushruta Samhita',
    dosha: Array.isArray(disease.dosha) ? disease.dosha : [disease.dosha],
    symptoms: disease.symptoms || [],
    pathogenesis: `${disease.dosha} aggravation leading to ${disease.name.toLowerCase()}`,
    treatments: [
      {
        type: 'Herbal',
        description: disease.remedies ? disease.remedies.join(', ') : '',
        ingredients: disease.remedies || [],
        source: disease.references || 'Traditional Ayurvedic texts'
      }
    ],
    herbs: disease.remedies ? disease.remedies.filter(remedy => 
      !remedy.includes('tea') && !remedy.includes('water') && !remedy.includes('juice')
    ) : [],
    precautions: disease.prevention || [],
    diet: {
      include: [],
      avoid: []
    },
    lifestyle: disease.prevention || [],
    modernEquivalent: disease.englishName || disease.name,
    evidenceLevel: 'Class B',
    isActive: true
  };
});

// Create the updated data structure
const updatedData = {
  diseases: updatedDiseases
};

// Write the updated file
fs.writeFileSync('./data/common_global_diseases_fixed.json', JSON.stringify(updatedData, null, 2));

console.log(`Updated ${updatedDiseases.length} diseases with proper schema structure`);
console.log('Sample updated disease:');
console.log(JSON.stringify(updatedDiseases[0], null, 2)); 