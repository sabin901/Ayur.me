const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Final set of diseases from classical texts
const finalDiseases = [
  {
    "diseaseId": "ASHTANGA_001",
    "name": "Vishama Jwara",
    "sanskrit": "विषम ज्वर",
    "source": "Ashtanga Hridaya, Chikitsa Sthana, Chapter 1",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Irregular fever", "Chills", "Body ache", "Loss of appetite", "Fatigue"],
    "pathogenesis": "Irregular dosha imbalance causing intermittent fever patterns.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Sudarshana Churna for irregular fever and detoxification.",
        "ingredients": ["Sudarshana Churna", "Guduchi", "Chirayata"],
        "source": "Ashtanga Hridaya"
      }
    ],
    "herbs": ["Sudarshana Churna", "Guduchi", "Chirayata", "Nagarmotha"],
    "precautions": ["Regular routine", "Adequate rest", "Maintain hydration"],
    "diet": {
      "include": ["Light soups", "Rice gruel", "Barley water", "Herbal teas"],
      "avoid": ["Heavy foods", "Cold drinks", "Dairy products"]
    },
    "lifestyle": ["Regular routine", "Adequate rest", "Stress management", "Warm environment"],
    "modernEquivalent": "Malaria (ICD-10: B50-B54)",
    "category": "General",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "ASHTANGA_002",
    "name": "Sannipata Jwara",
    "sanskrit": "सन्निपात ज्वर",
    "source": "Ashtanga Hridaya, Chikitsa Sthana, Chapter 2",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["High fever", "Delirium", "Severe body ache", "Loss of consciousness"],
    "pathogenesis": "Severe tridosha imbalance causing critical fever condition.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Mahasudarshana Churna for severe fever and tridosha balance.",
        "ingredients": ["Mahasudarshana Churna", "Guduchi", "Chirayata", "Nagarmotha"],
        "source": "Ashtanga Hridaya"
      }
    ],
    "herbs": ["Mahasudarshana Churna", "Guduchi", "Chirayata", "Nagarmotha", "Tulsi"],
    "precautions": ["Immediate medical attention", "Complete rest", "Adequate hydration"],
    "diet": {
      "include": ["Light liquids", "Rice water", "Herbal teas", "Honey water"],
      "avoid": ["Solid foods", "Heavy foods", "Cold drinks"]
    },
    "lifestyle": ["Complete rest", "Medical supervision", "Stress management"],
    "modernEquivalent": "Severe Fever (ICD-10: R50.9)",
    "category": "General",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_019",
    "name": "Chardi",
    "sanskrit": "छर्दि",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 20",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Vomiting", "Nausea", "Loss of appetite", "Weakness", "Dehydration"],
    "pathogenesis": "Dosha imbalance affecting stomach and digestive system, causing vomiting.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Eladi Churna and Ginger for vomiting control and digestive health.",
        "ingredients": ["Eladi Churna", "Ginger", "Cardamom", "Cumin"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Eladi Churna", "Ginger", "Cardamom", "Cumin", "Fennel"],
    "precautions": ["Maintain hydration", "Avoid heavy foods", "Rest adequately"],
    "diet": {
      "include": ["Ginger tea", "Cardamom water", "Rice water", "Light foods"],
      "avoid": ["Heavy foods", "Spicy foods", "Cold foods", "Dairy"]
    },
    "lifestyle": ["Rest", "Hydration", "Gentle diet", "Stress management"],
    "modernEquivalent": "Vomiting (ICD-10: R11)",
    "category": "Digestive",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_020",
    "name": "Trishna",
    "sanskrit": "तृष्णा",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 22",
    "dosha": ["Pitta", "Vata"],
    "symptoms": ["Excessive thirst", "Dry mouth", "Dehydration", "Weakness", "Restlessness"],
    "pathogenesis": "Pitta and Vata imbalance causing excessive thirst and dehydration.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Chandana and Ushira for thirst control and cooling effect.",
        "ingredients": ["Chandana", "Ushira", "Coconut water", "Sugarcane juice"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Chandana", "Ushira", "Coconut water", "Sugarcane juice", "Guduchi"],
    "precautions": ["Maintain hydration", "Avoid spicy foods", "Cool environment"],
    "diet": {
      "include": ["Coconut water", "Sugarcane juice", "Cucumber", "Watermelon"],
      "avoid": ["Spicy foods", "Hot foods", "Alcohol", "Caffeine"]
    },
    "lifestyle": ["Cool environment", "Adequate hydration", "Stress management"],
    "modernEquivalent": "Excessive Thirst (ICD-10: R63.1)",
    "category": "General",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_021",
    "name": "Hikka",
    "sanskrit": "हिक्का",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 17",
    "dosha": ["Vata"],
    "symptoms": ["Hiccups", "Chest pain", "Difficulty breathing", "Anxiety"],
    "pathogenesis": "Vata imbalance affecting diaphragm and respiratory system.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Pippali and Ginger for hiccup control and Vata balance.",
        "ingredients": ["Pippali", "Ginger", "Honey", "Ghee"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Pippali", "Ginger", "Honey", "Ghee", "Cardamom"],
    "precautions": ["Avoid cold exposure", "Stress management", "Regular breathing"],
    "diet": {
      "include": ["Warm foods", "Ginger tea", "Honey", "Ghee"],
      "avoid": ["Cold foods", "Carbonated drinks", "Spicy foods"]
    },
    "lifestyle": ["Breathing exercises", "Stress management", "Warm environment"],
    "modernEquivalent": "Hiccups (ICD-10: R06.6)",
    "category": "Respiratory",
    "severity": "Mild",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_022",
    "name": "Swasa",
    "sanskrit": "श्वास",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 17",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Difficulty breathing", "Wheezing", "Chest tightness", "Cough", "Fatigue"],
    "pathogenesis": "Vata and Kapha imbalance affecting respiratory system and breathing.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Vasa and Pushkarmool for respiratory support and breathing improvement.",
        "ingredients": ["Vasa", "Pushkarmool", "Tulsi", "Ginger"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Vasa", "Pushkarmool", "Tulsi", "Ginger", "Haridra"],
    "precautions": ["Avoid triggers", "Regular exercise", "Stress management"],
    "diet": {
      "include": ["Warm foods", "Honey", "Ginger", "Tulsi tea"],
      "avoid": ["Cold foods", "Spicy foods", "Smoking", "Alcohol"]
    },
    "lifestyle": ["Breathing exercises", "Regular exercise", "Stress management", "Avoid triggers"],
    "modernEquivalent": "Dyspnea (ICD-10: R06.0)",
    "category": "Respiratory",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_011",
    "name": "Karnashula",
    "sanskrit": "कर्णशूल",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 20",
    "dosha": ["Vata", "Pitta"],
    "symptoms": ["Ear pain", "Tinnitus", "Hearing loss", "Itching", "Discharge"],
    "pathogenesis": "Vata and Pitta imbalance affecting ears, causing pain and hearing issues.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Garlic oil and sesame oil for ear pain relief and health.",
        "ingredients": ["Garlic oil", "Sesame oil", "Neem oil"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Garlic oil", "Sesame oil", "Neem oil", "Tulsi"],
    "precautions": ["Avoid loud noises", "Keep ears dry", "Regular cleaning"],
    "diet": {
      "include": ["Warm foods", "Ginger", "Turmeric", "Honey"],
      "avoid": ["Cold foods", "Spicy foods", "Alcohol"]
    },
    "lifestyle": ["Protect from loud noises", "Regular ear care", "Avoid water entry"],
    "modernEquivalent": "Otalgia (ICD-10: H92.0)",
    "category": "Otological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_012",
    "name": "Nasaroga",
    "sanskrit": "नासरोग",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 22",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Nasal congestion", "Runny nose", "Sneezing", "Loss of smell", "Headache"],
    "pathogenesis": "Dosha imbalance affecting nasal passages and respiratory system.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Anu taila and Tulsi for nasal health and congestion relief.",
        "ingredients": ["Anu taila", "Tulsi", "Ginger", "Honey"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Anu taila", "Tulsi", "Ginger", "Honey", "Haridra"],
    "precautions": ["Avoid cold exposure", "Maintain hygiene", "Regular cleaning"],
    "diet": {
      "include": ["Warm foods", "Ginger", "Tulsi tea", "Honey"],
      "avoid": ["Cold foods", "Dairy", "Spicy foods"]
    },
    "lifestyle": ["Steam inhalation", "Nasal cleaning", "Warm environment", "Stress management"],
    "modernEquivalent": "Rhinitis (ICD-10: J30)",
    "category": "Respiratory",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_006",
    "name": "Gulma",
    "sanskrit": "गुल्म",
    "source": "Madhava Nidanam, Chapter 36",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Abdominal mass", "Pain", "Bloating", "Loss of appetite", "Weight loss"],
    "pathogenesis": "Dosha imbalance causing abnormal growth and mass formation in abdomen.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Kanchanara Guggulu and Guggulu for mass reduction and tissue health.",
        "ingredients": ["Kanchanara Guggulu", "Guggulu", "Haridra", "Ginger"],
        "source": "Madhava Nidanam"
      }
    ],
    "herbs": ["Kanchanara Guggulu", "Guggulu", "Haridra", "Ginger", "Shilajit"],
    "precautions": ["Regular monitoring", "Healthy lifestyle", "Avoid trauma"],
    "diet": {
      "include": ["Light foods", "Turmeric", "Ginger", "Green vegetables"],
      "avoid": ["Heavy foods", "Spicy foods", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Healthy diet", "Avoid trauma"],
    "modernEquivalent": "Abdominal Mass (ICD-10: R19.0)",
    "category": "General",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_007",
    "name": "Udara",
    "sanskrit": "उदर",
    "source": "Madhava Nidanam, Chapter 37",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Abdominal distension", "Pain", "Bloating", "Loss of appetite", "Weakness"],
    "pathogenesis": "Dosha imbalance causing abdominal distension and fluid accumulation.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Punarnava and Gokshura for fluid regulation and abdominal health.",
        "ingredients": ["Punarnava", "Gokshura", "Varuna", "Guggulu"],
        "source": "Madhava Nidanam"
      }
    ],
    "herbs": ["Punarnava", "Gokshura", "Varuna", "Guggulu", "Shilajit"],
    "precautions": ["Salt restriction", "Regular exercise", "Healthy diet"],
    "diet": {
      "include": ["Light foods", "Barley", "Ginger", "Turmeric"],
      "avoid": ["Salt", "Heavy foods", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Healthy diet", "Avoid alcohol"],
    "modernEquivalent": "Ascites (ICD-10: R18)",
    "category": "General",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_023",
    "name": "Prameha",
    "sanskrit": "प्रमेह",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 6",
    "dosha": ["Kapha", "Vata", "Pitta"],
    "symptoms": ["Excessive urination", "Sweet urine", "Fatigue", "Weight changes", "Thirst"],
    "pathogenesis": "Dosha imbalance affecting urinary system and metabolism.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gudmar and Jamun for blood sugar regulation and urinary health.",
        "ingredients": ["Gudmar", "Jamun", "Bitter gourd", "Neem"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Gudmar", "Jamun", "Bitter gourd", "Neem", "Shilajit"],
    "precautions": ["Regular exercise", "Monitor blood sugar", "Healthy diet"],
    "diet": {
      "include": ["Bitter foods", "Barley", "Millets", "Green vegetables"],
      "avoid": ["Sweet foods", "Rice", "Potatoes", "Processed foods"]
    },
    "lifestyle": ["Daily walking", "Yoga", "Stress management", "Regular meals"],
    "modernEquivalent": "Diabetes (ICD-10: E10-E14)",
    "category": "Metabolic",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_024",
    "name": "Mutradosha",
    "sanskrit": "मूत्रदोष",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 26",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Urinary problems", "Pain", "Burning", "Frequency", "Discoloration"],
    "pathogenesis": "Dosha imbalance affecting urinary system and kidney function.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gokshura and Punarnava for urinary health and kidney function.",
        "ingredients": ["Gokshura", "Punarnava", "Varuna", "Pashanabheda"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Gokshura", "Punarnava", "Varuna", "Pashanabheda", "Chandana"],
    "precautions": ["Adequate hydration", "Maintain hygiene", "Regular urination"],
    "diet": {
      "include": ["Coconut water", "Barley water", "Cucumber", "Watermelon"],
      "avoid": ["Spicy foods", "Alcohol", "Caffeine", "Heavy foods"]
    },
    "lifestyle": ["Adequate hydration", "Regular urination", "Stress management", "Gentle exercise"],
    "modernEquivalent": "Urinary Disorders (ICD-10: N30-N39)",
    "category": "Urological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_013",
    "name": "Yoniroga",
    "sanskrit": "योनिरोग",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 38",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Vaginal discharge", "Itching", "Pain", "Irregular menstruation", "Infertility"],
    "pathogenesis": "Dosha imbalance affecting female reproductive system and gynecological health.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Lodhra and Ashoka for gynecological health and reproductive support.",
        "ingredients": ["Lodhra", "Ashoka", "Shatavari", "Guduchi"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Lodhra", "Ashoka", "Shatavari", "Guduchi", "Haridra"],
    "precautions": ["Maintain hygiene", "Regular check-ups", "Healthy lifestyle"],
    "diet": {
      "include": ["Light foods", "Green vegetables", "Fruits", "Nuts"],
      "avoid": ["Spicy foods", "Alcohol", "Processed foods"]
    },
    "lifestyle": ["Maintain hygiene", "Regular exercise", "Stress management", "Healthy diet"],
    "modernEquivalent": "Gynecological Disorders (ICD-10: N70-N99)",
    "category": "Gynecological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_014",
    "name": "Artava Dosha",
    "sanskrit": "आर्तव दोष",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 39",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Irregular menstruation", "Pain", "Heavy bleeding", "Amenorrhea", "Dysmenorrhea"],
    "pathogenesis": "Dosha imbalance affecting menstrual cycle and reproductive health.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Shatavari and Ashoka for menstrual health and hormonal balance.",
        "ingredients": ["Shatavari", "Ashoka", "Lodhra", "Guduchi"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Shatavari", "Ashoka", "Lodhra", "Guduchi", "Haridra"],
    "precautions": ["Regular check-ups", "Healthy lifestyle", "Stress management"],
    "diet": {
      "include": ["Iron-rich foods", "Green vegetables", "Fruits", "Nuts"],
      "avoid": ["Cold foods", "Spicy foods", "Alcohol"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Healthy diet", "Adequate rest"],
    "modernEquivalent": "Menstrual Disorders (ICD-10: N91-N95)",
    "category": "Gynecological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_025",
    "name": "Vandhyatva",
    "sanskrit": "वन्ध्यत्व",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 30",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Infertility", "Irregular menstruation", "Hormonal imbalance", "Stress"],
    "pathogenesis": "Dosha imbalance affecting reproductive system and fertility.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Shatavari and Ashwagandha for fertility enhancement and reproductive health.",
        "ingredients": ["Shatavari", "Ashwagandha", "Guduchi", "Shilajit"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Shatavari", "Ashwagandha", "Guduchi", "Shilajit", "Bala"],
    "precautions": ["Regular check-ups", "Healthy lifestyle", "Stress management"],
    "diet": {
      "include": ["Nourishing foods", "Ghee", "Milk", "Nuts", "Sesame seeds"],
      "avoid": ["Cold foods", "Spicy foods", "Alcohol", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Healthy diet", "Adequate rest"],
    "modernEquivalent": "Infertility (ICD-10: N97)",
    "category": "Gynecological",
    "severity": "Chronic",
    "isActive": true
  }
];

// Function to normalize disease data
function normalizeDisease(disease, source = "Unknown") {
  return {
    diseaseId: disease.diseaseId || `DISEASE_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: disease.name || disease.englishName || 'Unknown Disease',
    sanskrit: disease.sanskrit || disease.sanskritName || '',
    source: disease.source || source,
    dosha: disease.dosha || [],
    symptoms: disease.symptoms || [],
    pathogenesis: disease.pathogenesis || disease.causes?.join(', ') || '',
    treatments: disease.treatments || [],
    herbs: disease.herbs || [],
    precautions: disease.precautions || [],
    diet: disease.diet || { include: [], avoid: [] },
    lifestyle: disease.lifestyle || [],
    modernEquivalent: disease.modernEquivalent || disease.modernCorrelation || '',
    category: disease.category || 'General',
    severity: disease.severity || 'Variable',
    isActive: true
  };
}

// Function to remove duplicates
function removeDuplicates(diseases) {
  const uniqueDiseases = [];
  const seen = new Set();
  
  for (const disease of diseases) {
    const key = `${disease.name.toLowerCase()}-${disease.sanskrit}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueDiseases.push(disease);
    }
  }
  
  return uniqueDiseases;
}

// Main function to add final diseases
async function addFinalDiseases() {
  try {
    console.log('🚀 Adding Final Set of Diseases to Database...');
    
    // Get existing diseases
    const existingDiseases = await Disease.find({});
    console.log(`📊 Found ${existingDiseases.length} existing diseases`);
    
    // Normalize final diseases
    const normalized = finalDiseases.map(d => normalizeDisease(d));
    console.log(`🔄 Normalized ${normalized.length} final diseases`);
    
    // Combine with existing diseases
    const allDiseases = [...existingDiseases.map(d => d.toObject()), ...normalized];
    console.log(`📈 Total diseases to process: ${allDiseases.length}`);
    
    // Remove duplicates
    const unique = removeDuplicates(allDiseases);
    console.log(`✨ Unique diseases after deduplication: ${unique.length}`);
    
    // Clear database and insert all diseases
    await Disease.deleteMany({});
    await Disease.insertMany(unique);
    
    console.log(`✅ Successfully updated database with ${unique.length} diseases`);
    
    // Save to file for backup
    const outputPath = path.join(__dirname, '../data/final_complete_diseases.json');
    fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2));
    console.log(`💾 Final complete disease data saved to: ${outputPath}`);
    
    // Display summary
    console.log('\n📈 FINAL COMPLETE DISEASE DATABASE SUMMARY:');
    console.log(`Total Diseases: ${unique.length}`);
    
    const categories = {};
    const doshas = {};
    const sources = {};
    
    unique.forEach(disease => {
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
    
    console.log('\n📂 Categories:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} diseases`);
    });
    
    console.log('\n🌿 Doshas:');
    Object.entries(doshas).forEach(([dosha, count]) => {
      console.log(`  ${dosha}: ${count} diseases`);
    });
    
    console.log('\n📚 Sources:');
    Object.entries(sources).forEach(([source, count]) => {
      console.log(`  ${source}: ${count} diseases`);
    });
    
    console.log('\n🎉 Vyadhi section now has a comprehensive disease database with 50+ diseases!');
    
  } catch (error) {
    console.error('❌ Error adding final diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addFinalDiseases(); 