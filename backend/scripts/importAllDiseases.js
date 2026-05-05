const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Function to load diseases from JSON files
function loadDiseasesFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`✅ Loaded ${data.length} diseases from ${path.basename(filePath)}`);
      return data;
    }
  } catch (error) {
    console.log(`⚠️  Could not load ${path.basename(filePath)}: ${error.message}`);
  }
  return [];
}

// Function to load diseases from JS module files
function loadDiseasesFromJSModule(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      // Read the file content
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract disease arrays from the content
      const diseaseMatches = content.match(/const\s+\w+Diseases\s*=\s*\[([\s\S]*?)\];/g);
      
      if (diseaseMatches) {
        let allDiseases = [];
        diseaseMatches.forEach(match => {
          try {
            // Extract the array content
            const arrayContent = match.match(/\[([\s\S]*?)\]/)[1];
            // Create a valid JSON by wrapping in brackets
            const jsonStr = '[' + arrayContent + ']';
            // Parse the diseases
            const diseases = JSON.parse(jsonStr);
            allDiseases = allDiseases.concat(diseases);
          } catch (parseError) {
            console.log(`⚠️  Could not parse disease array in ${path.basename(filePath)}`);
          }
        });
        
        if (allDiseases.length > 0) {
          console.log(`✅ Loaded ${allDiseases.length} diseases from ${path.basename(filePath)}`);
          return allDiseases;
        }
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not load ${path.basename(filePath)}: ${error.message}`);
  }
  return [];
}

// Comprehensive disease database from the script
const comprehensiveDiseases = [
  {
    "diseaseId": "CHARAKA_001",
    "name": "Jwara",
    "sanskrit": "ज्वर",
    "source": "Charaka Samhita, Nidana Sthana, Chapter 1",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Fever", "Chills", "Body ache", "Loss of appetite", "Fatigue", "Thirst"],
    "pathogenesis": "Imbalance of all three doshas causing elevated body temperature and systemic inflammation.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Sudarshana Churna with warm water to reduce fever and detoxify.",
        "ingredients": ["Sudarshana Churna", "Guduchi", "Chirayata"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Sudarshana Churna", "Guduchi", "Chirayata", "Nagarmotha"],
    "precautions": ["Avoid cold foods", "Rest adequately", "Maintain hydration"],
    "diet": {
      "include": ["Light soups", "Rice gruel", "Barley water", "Herbal teas"],
      "avoid": ["Heavy foods", "Cold drinks", "Dairy products"]
    },
    "lifestyle": ["Complete rest", "Hydration", "Avoid exertion", "Warm environment"],
    "modernEquivalent": "Fever/Malaria (ICD-10: R50, B50-B54)",
    "category": "General",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_002",
    "name": "Madhumeha",
    "sanskrit": "मधुमेह",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 6",
    "dosha": ["Kapha", "Vata"],
    "symptoms": ["Excessive urination", "Sweet urine", "Fatigue", "Weight loss", "Thirst", "Blurred vision"],
    "pathogenesis": "Kapha and Vata imbalance affecting metabolism and urinary system, leading to impaired glucose regulation.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gudmar and Shilajit to regulate blood sugar and improve metabolism.",
        "ingredients": ["Gudmar", "Shilajit", "Bitter gourd", "Jamun seeds"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Gudmar", "Shilajit", "Bitter gourd", "Jamun seeds", "Neem"],
    "precautions": ["Avoid sweets", "Regular exercise", "Monitor blood sugar"],
    "diet": {
      "include": ["Bitter foods", "Barley", "Millets", "Green vegetables", "Fenugreek"],
      "avoid": ["Sweet foods", "Rice", "Potatoes", "Dairy", "Processed foods"]
    },
    "lifestyle": ["Daily walking", "Yoga", "Stress management", "Regular meals"],
    "modernEquivalent": "Type 2 Diabetes (ICD-10: E11)",
    "category": "Metabolic",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_003",
    "name": "Kushtha",
    "sanskrit": "कुष्ठ",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 7",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Skin lesions", "Discoloration", "Itching", "Scaling", "Pain", "Burning sensation"],
    "pathogenesis": "Tridosha imbalance affecting skin layers, leading to various dermatological manifestations.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Khadirarishta and Neem for skin purification and detoxification.",
        "ingredients": ["Khadirarishta", "Neem", "Triphala", "Manjistha"],
        "source": "Kushthant"
      }
    ],
    "herbs": ["Khadirarishta", "Neem", "Triphala", "Manjistha", "Haridra"],
    "precautions": ["Avoid spicy foods", "Maintain hygiene", "Avoid scratching"],
    "diet": {
      "include": ["Bitter vegetables", "Green leafy vegetables", "Turmeric", "Barley"],
      "avoid": ["Fish", "Milk with fish", "Fermented foods", "Spicy foods"]
    },
    "lifestyle": ["Sun exposure", "Regular bathing", "Gentle yoga", "Stress management"],
    "modernEquivalent": "Psoriasis (ICD-10: L40)",
    "category": "Dermatological",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_001",
    "name": "Arsha",
    "sanskrit": "अर्श",
    "source": "Sushruta Samhita, Chikitsa Sthana, Chapter 6",
    "dosha": ["Vata", "Pitta"],
    "symptoms": ["Rectal pain", "Bleeding", "Constipation", "Itching", "Swelling"],
    "pathogenesis": "Vata and Pitta causing hemorrhoidal swelling and inflammation in anal region.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Triphala and Kankayana Vati for bowel regulation and healing.",
        "ingredients": ["Triphala", "Kankayana Vati", "Haritaki"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Triphala", "Kankayana Vati", "Haritaki", "Guggulu"],
    "precautions": ["Avoid straining", "High fiber diet", "Maintain hygiene"],
    "diet": {
      "include": ["High fiber foods", "Prunes", "Barley", "Green vegetables"],
      "avoid": ["Spicy foods", "Alcohol", "Heavy foods"]
    },
    "lifestyle": ["Regular bowel habits", "Sitz baths", "Gentle exercise", "Adequate hydration"],
    "modernEquivalent": "Hemorrhoids (ICD-10: K64)",
    "category": "Anorectal",
    "severity": "Moderate",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_001",
    "name": "Gridhrasi",
    "sanskrit": "गृध्रसी",
    "source": "Madhava Nidanam, Chapter 22",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Radiating leg pain", "Stiffness", "Difficulty walking", "Numbness", "Tingling"],
    "pathogenesis": "Vata and Kapha affecting sciatic nerve, causing pain and mobility issues.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Nirgundi oil massage to relieve pain and inflammation.",
        "ingredients": ["Nirgundi oil", "Sesame oil"],
        "source": "Madhava Nidanam"
      }
    ],
    "herbs": ["Nirgundi oil", "Guggulu", "Shallaki", "Ashwagandha"],
    "precautions": ["Avoid cold exposure", "No heavy lifting", "Maintain good posture"],
    "diet": {
      "include": ["Warm foods", "Barley", "Ginger", "Sesame seeds"],
      "avoid": ["Cold foods", "Heavy foods", "Processed foods"]
    },
    "lifestyle": ["Gentle yoga", "Physiotherapy", "Warm baths", "Stress management"],
    "modernEquivalent": "Sciatica (ICD-10: M54.3)",
    "category": "Neurological",
    "severity": "Moderate to Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_004",
    "name": "Yakṣma",
    "sanskrit": "यक्ष्मा",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 8",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Chronic cough", "Weight loss", "Fever", "Night sweats", "Fatigue", "Chest pain"],
    "pathogenesis": "Tridosha imbalance affecting respiratory system and immunity, leading to chronic infection.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Sitopaladi Churna and Tulsi for respiratory support and immunity.",
        "ingredients": ["Sitopaladi Churna", "Tulsi", "Vasa", "Pushkarmool"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Sitopaladi Churna", "Tulsi", "Vasa", "Pushkarmool", "Guduchi"],
    "precautions": ["Avoid cold exposure", "Rest adequately", "Maintain nutrition"],
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
    "diseaseId": "CHARAKA_005",
    "name": "Amavata",
    "sanskrit": "आमवात",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 29",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Joint pain", "Stiffness", "Swelling", "Fever", "Loss of appetite"],
    "pathogenesis": "Ama (toxins) combined with Vata causing inflammation and pain in joints.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Guggulu Tikta Ghrita for detoxification and joint health.",
        "ingredients": ["Guggulu", "Giloy", "Neem", "Ghee"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Guggulu", "Giloy", "Neem", "Shallaki", "Ashwagandha"],
    "precautions": ["Avoid cold/damp environments", "No day sleep after meals"],
    "diet": {
      "include": ["Warm foods", "Ginger", "Turmeric", "Barley", "Green gram"],
      "avoid": ["Cold foods", "Heavy foods", "Curd at night", "Wheat"]
    },
    "lifestyle": ["Gentle exercise", "Warm oil massage", "Stress management", "Adequate rest"],
    "modernEquivalent": "Rheumatoid Arthritis (ICD-10: M06.9)",
    "category": "Rheumatological",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_006",
    "name": "Shiroroga",
    "sanskrit": "शिरोरोग",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 26",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Headache", "Dizziness", "Nausea", "Sensitivity to light", "Pain in different head regions"],
    "pathogenesis": "Dosha imbalance affecting the head region, causing various types of headaches.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Brahmi and Jatamansi for mental clarity and headache relief.",
        "ingredients": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Brahmi", "Jatamansi", "Shankhpushpi", "Vacha", "Guduchi"],
    "precautions": ["Avoid stress", "Regular sleep", "Avoid excessive screen time"],
    "diet": {
      "include": ["Light foods", "Ghee", "Milk", "Nuts", "Fruits"],
      "avoid": ["Heavy foods", "Spicy foods", "Alcohol", "Caffeine"]
    },
    "lifestyle": ["Regular sleep", "Stress management", "Gentle yoga", "Meditation"],
    "modernEquivalent": "Migraine/Headache (ICD-10: G43, R51)",
    "category": "Neurological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_007",
    "name": "Hridroga",
    "sanskrit": "हृद्रोग",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 24",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Chest pain", "Palpitations", "Shortness of breath", "Fatigue", "Anxiety"],
    "pathogenesis": "Dosha imbalance affecting the heart, leading to various cardiac manifestations.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Arjuna and Guggulu for heart health and circulation.",
        "ingredients": ["Arjuna", "Guggulu", "Brahmi", "Jatamansi"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Arjuna", "Guggulu", "Brahmi", "Jatamansi", "Shankhpushpi"],
    "precautions": ["Avoid stress", "Regular exercise", "Healthy diet", "No smoking"],
    "diet": {
      "include": ["Light foods", "Ghee", "Milk", "Nuts", "Fruits"],
      "avoid": ["Heavy foods", "Spicy foods", "Alcohol", "Smoking"]
    },
    "lifestyle": ["Regular exercise", "Stress management", "Adequate sleep", "Meditation"],
    "modernEquivalent": "Heart Disease (ICD-10: I20-I25)",
    "category": "Cardiovascular",
    "severity": "Chronic",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_008",
    "name": "Grahani",
    "sanskrit": "ग्रहणी",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 15",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Irregular bowel movements", "Abdominal pain", "Bloating", "Loss of appetite", "Fatigue"],
    "pathogenesis": "Impaired digestive fire (Agni) leading to malabsorption and digestive disorders.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Triphala and Ginger to improve digestion and regulate bowel movements.",
        "ingredients": ["Triphala", "Ginger", "Haritaki", "Bibhitaki"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Triphala", "Ginger", "Haritaki", "Bibhitaki", "Amla"],
    "precautions": ["Regular meal timing", "Avoid incompatible foods", "Maintain Agni"],
    "diet": {
      "include": ["Light foods", "Ginger", "Cumin", "Fennel", "Rice"],
      "avoid": ["Heavy foods", "Incompatible combinations", "Cold foods"]
    },
    "lifestyle": ["Regular meal timing", "Gentle exercise", "Stress management", "Adequate rest"],
    "modernEquivalent": "Irritable Bowel Syndrome (ICD-10: K58)",
    "category": "Digestive",
    "severity": "Chronic",
    "isActive": true
  }
];

// Additional diseases from classical texts
const additionalClassicalDiseases = [
  {
    "diseaseId": "SUSHRUTA_002",
    "name": "Netraroga",
    "sanskrit": "नेत्ररोग",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 1",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Eye pain", "Redness", "Itching", "Blurred vision", "Sensitivity to light"],
    "pathogenesis": "Dosha imbalance affecting the eyes, leading to various ocular disorders.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Triphala eye wash and rose water for eye health.",
        "ingredients": ["Triphala", "Rose water", "Honey", "Ghee"],
        "source": "Sushruta Samhita"
      }
    ],
    "herbs": ["Triphala", "Rose water", "Honey", "Ghee", "Brahmi"],
    "precautions": ["Avoid eye strain", "Regular eye care", "Protect from dust"],
    "diet": {
      "include": ["Carrots", "Spinach", "Fruits", "Nuts", "Ghee"],
      "avoid": ["Spicy foods", "Alcohol", "Smoking"]
    },
    "lifestyle": ["Eye exercises", "Regular breaks from screens", "Adequate lighting"],
    "modernEquivalent": "Eye Disorders (ICD-10: H00-H59)",
    "category": "Ophthalmological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "SUSHRUTA_003",
    "name": "Karnaroga",
    "sanskrit": "कर्णरोग",
    "source": "Sushruta Samhita, Uttara Tantra, Chapter 20",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Ear pain", "Discharge", "Hearing loss", "Tinnitus", "Itching"],
    "pathogenesis": "Dosha imbalance affecting the ears, leading to various auditory disorders.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Garlic oil and sesame oil for ear health.",
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
    "modernEquivalent": "Ear Disorders (ICD-10: H60-H95)",
    "category": "Otological",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "MADHAVA_002",
    "name": "Vatarakta",
    "sanskrit": "वातरक्त",
    "source": "Madhava Nidanam, Chapter 25",
    "dosha": ["Vata", "Rakta"],
    "symptoms": ["Joint pain", "Swelling", "Redness", "Burning sensation", "Stiffness"],
    "pathogenesis": "Vata and Rakta (blood) imbalance causing inflammatory joint conditions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Guggulu and Manjistha for blood purification and joint health.",
        "ingredients": ["Guggulu", "Manjistha", "Neem", "Haridra"],
        "source": "Madhava Nidanam"
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
    "diseaseId": "MADHAVA_003",
    "name": "Prameha",
    "sanskrit": "प्रमेह",
    "source": "Madhava Nidanam, Chapter 33",
    "dosha": ["Kapha", "Vata", "Pitta"],
    "symptoms": ["Excessive urination", "Sweet urine", "Fatigue", "Weight changes", "Thirst"],
    "pathogenesis": "Dosha imbalance affecting urinary system and metabolism.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Gudmar and Jamun for blood sugar regulation.",
        "ingredients": ["Gudmar", "Jamun", "Bitter gourd", "Neem"],
        "source": "Madhava Nidanam"
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
    "diseaseId": "CHARAKA_009",
    "name": "Kasa",
    "sanskrit": "कास",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 18",
    "dosha": ["Vata", "Pitta", "Kapha"],
    "symptoms": ["Cough", "Chest pain", "Difficulty breathing", "Sputum", "Fatigue"],
    "pathogenesis": "Dosha imbalance affecting respiratory system, leading to various cough conditions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Sitopaladi Churna and Talisadi Churna for respiratory health.",
        "ingredients": ["Sitopaladi Churna", "Talisadi Churna", "Vasa", "Pushkarmool"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Sitopaladi Churna", "Talisadi Churna", "Vasa", "Pushkarmool", "Tulsi"],
    "precautions": ["Avoid cold exposure", "Rest adequately", "Maintain hydration"],
    "diet": {
      "include": ["Warm foods", "Honey", "Ginger", "Tulsi tea"],
      "avoid": ["Cold foods", "Spicy foods", "Smoking", "Alcohol"]
    },
    "lifestyle": ["Rest", "Steam inhalation", "Gentle exercise", "Stress management"],
    "modernEquivalent": "Cough (ICD-10: R05)",
    "category": "Respiratory",
    "severity": "Variable",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_010",
    "name": "Shwasa",
    "sanskrit": "श्वास",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 17",
    "dosha": ["Vata", "Kapha"],
    "symptoms": ["Shortness of breath", "Wheezing", "Chest tightness", "Cough", "Fatigue"],
    "pathogenesis": "Vata and Kapha imbalance affecting respiratory system, causing breathing difficulties.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Vasa and Pushkarmool for respiratory support.",
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
    "modernEquivalent": "Asthma (ICD-10: J45)",
    "category": "Respiratory",
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

// Function to filter real diseases
function filterRealDiseases(diseases) {
  const nonDiseaseKeywords = ['PASTE', 'MILK', 'OIL', 'POWDER', 'DECOCTION', 'TEA', 'JUICE'];
  
  return diseases.filter(disease => {
    const name = disease.name.toUpperCase();
    return !nonDiseaseKeywords.some(keyword => name.includes(keyword)) && 
           name.length > 3 && 
           name.length < 100;
  });
}

// Main function to import all diseases
async function importAllDiseases() {
  try {
    console.log('🚀 Starting Comprehensive Disease Database Import...');
    
    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('🗑️  Cleared existing diseases from database');
    
    let allDiseases = [];
    
    // 1. Load from JSON files
    const jsonFiles = [
      '../data/disease_database.json',
      '../data/extracted_diseases.json',
      '../data/merged_disease_database.json'
    ];
    
    jsonFiles.forEach(filePath => {
      const diseases = loadDiseasesFromFile(path.join(__dirname, filePath));
      allDiseases = allDiseases.concat(diseases);
    });
    
    // 2. Load from JS module files
    const jsFiles = [
      '../data/classicalKnowledgeBase.js'
    ];
    
    jsFiles.forEach(filePath => {
      const diseases = loadDiseasesFromJSModule(path.join(__dirname, filePath));
      allDiseases = allDiseases.concat(diseases);
    });
    
    // 3. Add comprehensive diseases from script
    allDiseases = allDiseases.concat(comprehensiveDiseases);
    console.log(`✅ Added ${comprehensiveDiseases.length} comprehensive diseases`);
    
    // 4. Add additional classical diseases
    allDiseases = allDiseases.concat(additionalClassicalDiseases);
    console.log(`✅ Added ${additionalClassicalDiseases.length} additional classical diseases`);
    
    console.log(`📊 Total diseases loaded: ${allDiseases.length}`);
    
    // 5. Normalize all diseases
    const normalized = allDiseases.map(d => normalizeDisease(d));
    console.log(`🔄 Normalized ${normalized.length} diseases`);
    
    // 6. Remove duplicates
    const unique = removeDuplicates(normalized);
    console.log(`✨ Unique diseases after deduplication: ${unique.length}`);
    
    // 7. Filter real diseases
    const real = filterRealDiseases(unique);
    console.log(`🔍 Real diseases after filtering: ${real.length}`);
    
    // 8. Insert into database
    if (real.length > 0) {
      await Disease.insertMany(real);
      console.log(`✅ Successfully imported ${real.length} diseases into database`);
      
      // Save to file for backup
      const outputPath = path.join(__dirname, '../data/final_comprehensive_diseases.json');
      fs.writeFileSync(outputPath, JSON.stringify(real, null, 2));
      console.log(`💾 Disease data saved to: ${outputPath}`);
      
      // Display summary
      console.log('\n📈 DISEASE DATABASE SUMMARY:');
      console.log(`Total Diseases: ${real.length}`);
      
      const categories = {};
      const doshas = {};
      const sources = {};
      
      real.forEach(disease => {
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
      
      console.log('\n🎉 Vyadhi section is now ready with comprehensive disease database!');
    } else {
      console.log('❌ No valid diseases to import.');
    }
    
  } catch (error) {
    console.error('❌ Error importing diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the import
importAllDiseases(); 