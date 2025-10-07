// Test script to verify yoga data
const fs = require('fs');
const path = require('path');

// Read the TypeScript file and extract the data
const filePath = path.join(__dirname, 'src/assets/comprehensiveYogaPoses.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract the poses data using regex
const posesMatch = content.match(/const yogaPosesData = \[([\s\S]*?)\];/);
if (posesMatch) {
  console.log('Found yogaPosesData array');
  // Count the poses by looking for name: "..." patterns
  const nameMatches = content.match(/name: "[^"]+"/g);
  console.log('Number of poses found:', nameMatches ? nameMatches.length : 0);
} else {
  console.log('Could not find yogaPosesData array');
}

// Check for export statements
const exportMatches = content.match(/export const comprehensiveYogaPoses/g);
console.log('Export statements found:', exportMatches ? exportMatches.length : 0);

// Check for sequences
const sequencesMatch = content.match(/export const yogaSequences/g);
console.log('Sequences export found:', sequencesMatch ? sequencesMatch.length : 0);

// Check for pranayama
const pranayamaMatch = content.match(/export const pranayamaTechniques/g);
console.log('Pranayama export found:', pranayamaMatch ? pranayamaMatch.length : 0);
