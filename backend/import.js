const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('./models/Disease');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind';

async function importDiseases() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
  const dataPath = path.join(__dirname, 'data', 'disease_database.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  await Disease.deleteMany({});
  await Disease.insertMany(data);
  console.log(`Inserted ${data.length} diseases`);
  await mongoose.disconnect();
}

importDiseases().catch(err => {
  console.error(err);
  process.exit(1);
}); 