const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Additional diseases from classical Ayurvedic texts
const additionalDiseases = [
  {
    "diseaseId": "CHARAKA_011",
    "name": "Atisara",
    "sanskrit": "अतिसार",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 19",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Loose stools", "Abdominal pain", "Dehydration", "Weakness", "Loss of appetite"],
    "pathogenesis": "Dosha imbalance affecting digestive system, leading to frequent loose bowel movements.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Kutaja and Bilva for diarrhea control and digestive health.",
        "ingredients": ["Kutaja", "Bilva", "Pomegranate", "Rice water"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Kutaja", "Bilva", "Pomegranate", "Rice water", "Ginger"],
    "precautions": ["Maintain hydration", "Avoid heavy foods", "Rest adequately"],
    "diet": {
      "include": ["Rice water", "Banana", "Pomegranate", "Ginger tea"],
      "avoid": ["Heavy foods", "Spicy foods", "Dairy", "Raw vegetables"]
    },
    "lifestyle": ["Rest", "Hydration", "Gentle diet", "Stress management"],
    "modernEquivalent": "Diarrhea (ICD-10: A09, K59.1)",
    "category": "Digestive",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_012",
    "name": "Vibandha",
    "sanskrit": "विबन्ध",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 20",
    "dosha": ["Vata"],
    "symptoms": ["Constipation", "Abdominal pain", "Bloating", "Loss of appetite", "Fatigue"],
    "pathogenesis": "Vata imbalance causing obstruction in bowel movements and digestive tract.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Triphala and Haritaki for bowel regulation and Vata balance.",
        "ingredients": ["Triphala", "Haritaki", "Sesame oil", "Warm water"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Triphala", "Haritaki", "Sesame oil", "Ghee", "Warm water"],
    "precautions": ["Regular bowel habits", "High fiber diet", "Adequate hydration"],
    "diet": {
      "include": ["High fiber foods", "Prunes", "Sesame seeds", "Ghee", "Warm water"],
      "avoid": ["Heavy foods", "Cold foods", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Adequate hydration", "Stress management", "Regular meal timing"],
    "modernEquivalent": "Constipation (ICD-10: K59.0)",
    "category": "Digestive",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_004",
    "name": "Bhagandara",
    "sanskrit": "भगन्दर",
    "source": "Sushruta Samhita, Chikitsa Sthana, Chapter 8",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Anal fistula", "Pain", "Discharge", "Swelling", "Itching"],
    "pathogenesis": "Vata and Kapha imbalance causing fistula formation in anal region.",
    "treatments": [
      {
        "type": "Surgical",
        "description": "Kshara Sutra therapy for fistula treatment.",
        "ingredients": ["Kshara Sutra", "Medicated thread"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Triphala", "Neem", "Haridra", "Guggulu"],
    "precautions": ["Maintain hygiene", "Avoid straining", "Regular cleaning"],
    "diet": {
      "include": ["Light foods", "High fiber", "Green vegetables", "Turmeric"],
      "avoid": ["Spicy foods", "Heavy foods", "Alcohol"]
    },
    "lifestyle": ["Maintain hygiene", "Regular cleaning", "Avoid straining", "Gentle exercise"],
    "modernEquivalent": "Anal Fistula (ICD-10: K60.3)",
    "category": "Anorectal",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_005",
    "name": "Granthi",
    "sanskrit": "ग्रन्थि",
    "source": "Sushruta Samhita, Nidana Sthana, Chapter 11",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Lumps", "Swelling", "Pain", "Discoloration", "Hardness"],
    "pathogenesis": "Dosha imbalance causing abnormal tissue growth and lump formation.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Kanchanara Guggulu for lump reduction and tissue health.",
        "ingredients": ["Kanchanara Guggulu", "Guggulu", "Kanchanara"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Kanchanara Guggulu", "Guggulu", "Kanchanara", "Haridra"],
    "precautions": ["Avoid trauma", "Regular monitoring", "Healthy lifestyle"],
    "diet": {
      "include": ["Light foods", "Turmeric", "Ginger", "Green vegetables"],
      "avoid": ["Heavy foods", "Spicy foods", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Healthy diet", "Avoid trauma"],
    "modernEquivalent": "Lumps/Tumors (ICD-10: D48)",
    "category": "General",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_004",
    "name": "Pandu",
    "sanskrit": "पाण्डु",
    "source": "Madhava Nidanam, Chapter 34",
    "dosha": ["Pitta"],
    "symptoms": ["Pale skin", "Weakness", "Fatigue", "Loss of appetite", "Yellowish discoloration"],
    "pathogenesis": "Pitta imbalance affecting blood and liver, leading to anemia and jaundice.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Navayasa Loha and Punarnava for blood health and liver function.",
        "ingredients": ["Navayasa Loha", "Punarnava", "Guduchi", "Haridra"],
        "source": "Madhava Nidanam"
      }
    ],
    "herbs": ["Navayasa Loha", "Punarnava", "Guduchi", "Haridra", "Amla"],
    "precautions": ["Avoid alcohol", "Healthy diet", "Regular exercise"],
    "diet": {
      "include": ["Iron-rich foods", "Green vegetables", "Fruits", "Nuts", "Ghee"],
      "avoid": ["Alcohol", "Spicy foods", "Processed foods"]
    },
    "lifestyle": ["Regular exercise", "Adequate rest", "Stress management", "Healthy diet"],
    "modernEquivalent": "Anemia/Jaundice (ICD-10: D50-D64, K70-K77)",
    "category": "Hematological",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_005",
    "name": "Kamala",
    "sanskrit": "कमला",
    "source": "Madhava Nidanam, Chapter 35",
    "dosha": ["Pitta"],
    "symptoms": ["Yellow skin", "Yellow eyes", "Dark urine", "Loss of appetite", "Weakness"],
    "pathogenesis": "Pitta imbalance affecting liver and bile, causing jaundice.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Punarnava and Guduchi for liver health and bile regulation.",
        "ingredients": ["Punarnava", "Guduchi", "Haridra", "Amla"],
        "source": "Madhava Nidanam"
      }
    ],
    "herbs": ["Punarnava", "Guduchi", "Haridra", "Amla", "Bhumyamalaki"],
    "precautions": ["Avoid alcohol", "Rest adequately", "Healthy diet"],
    "diet": {
      "include": ["Light foods", "Green vegetables", "Fruits", "Honey"],
      "avoid": ["Alcohol", "Heavy foods", "Spicy foods", "Oily foods"]
    },
    "lifestyle": ["Rest", "Avoid alcohol", "Healthy diet", "Stress management"],
    "modernEquivalent": "Jaundice (ICD-10: K70-K77)",
    "category": "Hepatological",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_013",
    "name": "Mutrakrichra",
    "sanskrit": "मूत्रकृच्छ्र",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 26",
    "dosha": ["Vata", "Pitta"],
    "symptoms": ["Painful urination", "Frequent urination", "Burning sensation", "Difficulty urinating"],
    "pathogenesis": "Vata and Pitta imbalance affecting urinary system, causing dysuria.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gokshura and Punarnava for urinary health and kidney function.",
        "ingredients": ["Gokshura", "Punarnava", "Varuna", "Pashanabheda"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Gokshura", "Punarnava", "Varuna", "Pashanabheda", "Chandana"],
    "precautions": ["Adequate hydration", "Avoid holding urine", "Maintain hygiene"],
    "diet": {
      "include": ["Coconut water", "Barley water", "Cucumber", "Watermelon"],
      "avoid": ["Spicy foods", "Alcohol", "Caffeine", "Heavy foods"]
    },
    "lifestyle": ["Adequate hydration", "Regular urination", "Stress management", "Gentle exercise"],
    "modernEquivalent": "Dysuria (ICD-10: R30.0)",
    "category": "Urological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_014",
    "name": "Mutraghata",
    "sanskrit": "मूत्रघात",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 27",
    "dosha": ["Vata"],
    "symptoms": ["Retention of urine", "Difficulty urinating", "Abdominal pain", "Bloating"],
    "pathogenesis": "Vata imbalance causing obstruction in urinary flow and retention.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gokshura and Varuna for urinary flow and prostate health.",
        "ingredients": ["Gokshura", "Varuna", "Pashanabheda", "Guggulu"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Gokshura", "Varuna", "Pashanabheda", "Guggulu", "Shilajit"],
    "precautions": ["Adequate hydration", "Avoid holding urine", "Regular exercise"],
    "diet": {
      "include": ["Warm water", "Ginger tea", "Sesame seeds", "Ghee"],
      "avoid": ["Cold foods", "Heavy foods", "Alcohol"]
    },
    "lifestyle": ["Adequate hydration", "Regular exercise", "Stress management", "Warm baths"],
    "modernEquivalent": "Urinary Retention (ICD-10: R33)",
    "category": "Urological",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_006",
    "name": "Vriddhi",
    "sanskrit": "वृद्धि",
    "source": "Sushruta Samhita, Nidana Sthana, Chapter 12",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Scrotal swelling", "Pain", "Heaviness", "Difficulty walking"],
    "pathogenesis": "Vata and Kapha imbalance causing scrotal enlargement and hydrocele.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gokshura and Punarnava for scrotal health and fluid regulation.",
        "ingredients": ["Gokshura", "Punarnava", "Varuna", "Guggulu"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Gokshura", "Punarnava", "Varuna", "Guggulu", "Shilajit"],
    "precautions": ["Avoid heavy lifting", "Support scrotum", "Regular exercise"],
    "diet": {
      "include": ["Light foods", "Barley", "Ginger", "Turmeric"],
      "avoid": ["Heavy foods", "Cold foods", "Alcohol"]
    },
    "lifestyle": ["Gentle exercise", "Support scrotum", "Avoid heavy lifting", "Warm baths"],
    "modernEquivalent": "Hydrocele (ICD-10: N43.3)",
    "category": "Urological",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_007",
    "name": "Phiranga",
    "sanskrit": "फिरङ्ग",
    "source": "Sushruta Samhita, Nidana Sthana, Chapter 13",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Skin lesions", "Ulcers", "Discharge", "Pain", "Itching"],
    "pathogenesis": "Tridosha imbalance causing chronic skin ulcers and syphilitic conditions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Khadirarishta and Neem for skin purification and ulcer healing.",
        "ingredients": ["Khadirarishta", "Neem", "Haridra", "Manjistha"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Khadirarishta", "Neem", "Haridra", "Manjistha", "Triphala"],
    "precautions": ["Maintain hygiene", "Avoid scratching", "Healthy lifestyle"],
    "diet": {
      "include": ["Bitter vegetables", "Turmeric", "Neem", "Green vegetables"],
      "avoid": ["Spicy foods", "Alcohol", "Processed foods"]
    },
    "lifestyle": ["Maintain hygiene", "Stress management", "Healthy diet", "Regular exercise"],
    "modernEquivalent": "Syphilis (ICD-10: A51-A53)",
    "category": "Dermatological",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_015",
    "name": "Rajayakshma",
    "sanskrit": "राजयक्ष्म",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 8",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Chronic cough", "Weight loss", "Night sweats", "Fever", "Fatigue"],
    "pathogenesis": "Tridosha imbalance affecting respiratory system and immunity.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Sitopaladi Churna and Tulsi for respiratory support and immunity.",
        "ingredients": ["Sitopaladi Churna", "Tulsi", "Vasa", "Pushkarmool"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Sitopaladi Churna", "Tulsi", "Vasa", "Pushkarmool", "Guduchi"],
    "precautions": ["Rest adequately", "Fresh air", "Healthy diet", "Avoid stress"],
    "diet": {
      "include": ["Warm foods", "Honey", "Ghee", "Milk", "Nuts"],
      "avoid": ["Cold foods", "Spicy foods", "Alcohol", "Smoking"]
    },
    "lifestyle": ["Rest", "Fresh air", "Gentle exercise", "Stress management"],
    "modernEquivalent": "Tuberculosis (ICD-10: A15-A19)",
    "category": "Respiratory",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_016",
    "name": "Kshaya",
    "sanskrit": "क्षय",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 11",
    "dosha": ["Vata"],
    "symptoms": ["Emaciation", "Weakness", "Loss of appetite", "Fatigue", "Dry skin"],
    "pathogenesis": "Vata imbalance causing tissue wasting and emaciation.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Ashwagandha and Bala for strength and tissue building.",
        "ingredients": ["Ashwagandha", "Bala", "Shatavari", "Guduchi"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Ashwagandha", "Bala", "Shatavari", "Guduchi", "Shilajit"],
    "precautions": ["Adequate nutrition", "Rest", "Stress management"],
    "diet": {
      "include": ["Nourishing foods", "Ghee", "Milk", "Nuts", "Sesame seeds"],
      "avoid": ["Light foods", "Cold foods", "Dry foods"]
    },
    "lifestyle": ["Adequate rest", "Stress management", "Gentle exercise", "Nourishing diet"],
    "modernEquivalent": "Emaciation (ICD-10: R64)",
    "category": "General",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_017",
    "name": "Unmada",
    "sanskrit": "उन्माद",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 9",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Mental confusion", "Hallucinations", "Irritability", "Insomnia", "Anxiety"],
    "pathogenesis": "Dosha imbalance affecting mind and nervous system, causing mental disorders.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Brahmi and Jatamansi for mental clarity and nervous system health.",
        "ingredients": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha", "Guduchi"],
    "precautions": ["Stress management", "Regular sleep", "Healthy lifestyle"],
    "diet": {
      "include": ["Light foods", "Ghee", "Milk", "Nuts", "Fruits"],
      "avoid": ["Heavy foods", "Spicy foods", "Alcohol", "Caffeine"]
    },
    "lifestyle": ["Meditation", "Yoga", "Stress management", "Regular sleep"],
    "modernEquivalent": "Psychosis (ICD-10: F20-F29)",
    "category": "Psychiatric",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_018",
    "name": "Apasmara",
    "sanskrit": "अपस्मार",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 10",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Seizures", "Loss of consciousness", "Convulsions", "Memory loss"],
    "pathogenesis": "Dosha imbalance affecting nervous system, causing epileptic seizures.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Brahmi and Jatamansi for nervous system health and seizure control.",
        "ingredients": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha", "Guduchi"],
    "precautions": ["Avoid triggers", "Regular medication", "Safe environment"],
    "diet": {
      "include": ["Light foods", "Ghee", "Milk", "Nuts", "Fruits"],
      "avoid": ["Heavy foods", "Spicy foods", "Alcohol", "Caffeine"]
    },
    "lifestyle": ["Regular sleep", "Stress management", "Safe environment", "Avoid triggers"],
    "modernEquivalent": "Epilepsy (ICD-10: G40)",
    "category": "Neurological",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_008",
    "name": "Vatarakta",
    "sanskrit": "वातरक्त",
    "source": "Sushruta Samhita, Chikitsa Sthana, Chapter 5",
    "dosha": ["Vata", "Rakta"],
    "symptoms": ["Joint pain", "Swelling", "Redness", "Burning sensation", "Stiffness"],
    "pathogenesis": "Vata and Rakta (blood) imbalance causing inflammatory joint conditions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Guggulu and Manjistha for blood purification and joint health.",
        "ingredients": ["Guggulu", "Manjistha", "Neem", "Haridra"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Guggulu", "Manjistha", "Neem", "Haridra", "Giloy"],
    "precautions": ["Avoid cold exposure", "No heavy foods", "Regular exercise"],
    "diet": {
      "include": ["Light foods", "Bitter vegetables", "Turmeric", "Ginger"],
      "avoid": ["Heavy foods", "Spicy foods", "Alcohol", "Red meat"]
    },
    "lifestyle": ["Gentle exercise", "Warm oil massage", "Stress management"],
    "modernEquivalent": "Gout (ICD-10: M10)",
    "category": "Rheumatological",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_009",
    "name": "Visarpa",
    "sanskrit": "विसर्प",
    "source": "Sushruta Samhita, Chikitsa Sthana, Chapter 12",
    "dosha": ["Pitta"],
    "symptoms": ["Skin eruptions", "Burning sensation", "Redness", "Swelling", "Pain"],
    "pathogenesis": "Pitta imbalance causing spreading skin inflammation and eruptions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Neem and Haridra for skin inflammation and Pitta balance.",
        "ingredients": ["Neem", "Haridra", "Manjistha", "Triphala"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Neem", "Haridra", "Manjistha", "Triphala", "Guduchi"],
    "precautions": ["Avoid spicy foods", "Maintain hygiene", "Cool environment"],
    "diet": {
      "include": ["Cooling foods", "Coconut water", "Cucumber", "Bitter vegetables"],
      "avoid": ["Spicy foods", "Hot foods", "Alcohol", "Processed foods"]
    },
    "lifestyle": ["Cool environment", "Stress management", "Gentle exercise", "Adequate rest"],
    "modernEquivalent": "Erysipelas (ICD-10: A46)",
    "category": "Dermatological",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_010",
    "name": "Dadhru",
    "sanskrit": "दध्रु",
    "source": "Sushruta Samhita, Chikitsa Sthana, Chapter 13",
    "dosha": ["Kapha", "Vata"],
    "symptoms": ["Ringworm", "Itching", "Circular patches", "Scaling", "Discoloration"],
    "pathogenesis": "Kapha and Vata imbalance causing fungal skin infections.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Neem and Haridra for fungal infection and skin health.",
        "ingredients": ["Neem", "Haridra", "Manjistha", "Triphala"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Neem", "Haridra", "Manjistha", "Triphala", "Karanja"],
    "precautions": ["Maintain hygiene", "Avoid scratching", "Clean environment"],
    "diet": {
      "include": ["Bitter vegetables", "Turmeric", "Neem", "Green vegetables"],
      "avoid": ["Sweet foods", "Dairy", "Processed foods"]
    },
    "lifestyle": ["Maintain hygiene", "Clean environment", "Stress management", "Regular exercise"],
    "modernEquivalent": "Ringworm (ICD-10: B35)",
    "category": "Dermatological",
    "severity": "Mild",
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

// Main function to add more diseases
async function addMoreDiseases() {
  try {
    console.log('🚀 Adding More Diseases to Database...');
    
    // Get existing diseases
    const existingDiseases = await Disease.find({});
    console.log(`📊 Found ${existingDiseases.length} existing diseases`);
    
    // Normalize additional diseases
    const normalized = additionalDiseases.map(d => normalizeDisease(d));
    console.log(`🔄 Normalized ${normalized.length} additional diseases`);
    
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
    const outputPath = path.join(__dirname, '../data/complete_disease_database.json');
    fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2));
    console.log(`💾 Complete disease data saved to: ${outputPath}`);
    
    // Display summary
    console.log('\n📈 COMPLETE DISEASE DATABASE SUMMARY:');
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
    
    console.log('\n🎉 Vyadhi section now has a comprehensive disease database!');
    
  } catch (error) {
    console.error('❌ Error adding diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addMoreDiseases(); 