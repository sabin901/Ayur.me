const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Disease = require('../models/Disease');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind');

async function seedDatabase() {
  try {
    const data = JSON.parse(fs.readFileSync('./data/disease_database.json', 'utf-8'));
    await Disease.deleteMany({});
    await Disease.insertMany(data);
    console.log(`Imported ${data.length} diseases into MongoDB`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase(); 