const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Disease = require('../models/Disease');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/prakriti', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Comprehensive Ayurvedic Disease Database
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
      },
      {
        "type": "Panchakarma",
        "description": "Langhana (fasting) to balance doshas and reduce ama.",
        "ingredients": [],
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
      },
      {
        "type": "Yoga",
        "description": "Surya Namaskar to improve metabolism and circulation.",
        "ingredients": ["Surya Namaskar"],
        "source": "Light on Yoga"
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
      },
      {
        "type": "Panchakarma",
        "description": "Virechana to detoxify and purify blood.",
        "ingredients": [],
        "source": "Charaka Samhita"
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
      },
      {
        "type": "Surgical",
        "description": "Kshara Sutra for severe cases requiring surgical intervention.",
        "ingredients": [],
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
      },
      {
        "type": "Yoga",
        "description": "Tadasana to improve posture and strengthen back muscles.",
        "ingredients": ["Tadasana"],
        "source": "Light on Yoga"
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
    "precautions": ["Avoid cold air", "Maintain hygiene", "Complete treatment course"],
    "diet": {
      "include": ["Warm soups", "Nutritious foods", "Milk with turmeric", "Honey"],
      "avoid": ["Cold foods", "Smoking", "Alcohol", "Processed foods"]
    },
    "lifestyle": ["Rest", "Breathing exercises", "Fresh air", "Stress management"],
    "modernEquivalent": "Tuberculosis (ICD-10: A15-A19)",
    "category": "Respiratory",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_005",
    "name": "Unmada",
    "sanskrit": "उन्माद",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 9",
    "dosha": ["Pitta", "Vata"],
    "symptoms": ["Delirium", "Hallucinations", "Agitation", "Insomnia", "Irritability", "Confusion"],
    "pathogenesis": "Pitta and Vata affecting mental stability and cognitive functions.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Brahmi and Shankhpushpi for mental clarity and calming effects.",
        "ingredients": ["Brahmi", "Shankhpushpi", "Jatamansi", "Ashwagandha"],
        "source": "Charaka Samhita"
      },
      {
        "type": "Yoga",
        "description": "Meditation to calm the mind and improve mental stability.",
        "ingredients": ["Meditation"],
        "source": "Yoga Sutras of Patanjali"
      }
    ],
    "herbs": ["Brahmi", "Shankhpushpi", "Jatamansi", "Ashwagandha", "Vacha"],
    "precautions": ["Avoid stress", "Regular sleep", "Professional supervision"],
    "diet": {
      "include": ["Sattvic foods", "Milk", "Ghee", "Sweet fruits", "Nuts"],
      "avoid": ["Stimulants", "Alcohol", "Spicy foods", "Processed foods"]
    },
    "lifestyle": ["Meditation", "Yoga", "Calm environment", "Regular routine"],
    "modernEquivalent": "Psychosis (ICD-10: F20-F29)",
    "category": "Mental Health",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_006",
    "name": "Apasmara",
    "sanskrit": "अपस्मार",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 10",
    "dosha": ["Vata", "Pitta"],
    "symptoms": ["Seizures", "Loss of consciousness", "Convulsions", "Memory loss", "Confusion"],
    "pathogenesis": "Vata and Pitta affecting brain function and neurological stability.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Vacha and Brahmi to stabilize neurological function and improve memory.",
        "ingredients": ["Vacha", "Brahmi", "Shankhpushpi", "Jatamansi"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Vacha", "Brahmi", "Shankhpushpi", "Jatamansi", "Ashwagandha"],
    "precautions": ["Avoid triggers", "Regular medication", "Safety measures"],
    "diet": {
      "include": ["Light diet", "Fruits", "Milk", "Ghee", "Nuts"],
      "avoid": ["Heavy foods", "Alcohol", "Stimulants"]
    },
    "lifestyle": ["Regular sleep", "Stress management", "Avoid flashing lights", "Regular checkups"],
    "modernEquivalent": "Epilepsy (ICD-10: G40)",
    "category": "Neurological",
    "severity": "Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_007",
    "name": "Kamala",
    "sanskrit": "कमला",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 16",
    "dosha": ["Pitta"],
    "symptoms": ["Jaundice", "Yellow eyes", "Fatigue", "Dark urine", "Abdominal pain", "Nausea"],
    "pathogenesis": "Pitta dosha affecting liver function and bile metabolism.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Bhumyamalaki and Kutki for liver detoxification and bile regulation.",
        "ingredients": ["Bhumyamalaki", "Kutki", "Punarnava", "Guduchi"],
        "source": "Charaka Samhita"
      }
    ],
    "herbs": ["Bhumyamalaki", "Kutki", "Punarnava", "Guduchi", "Haridra"],
    "precautions": ["Avoid alcohol", "Low fat diet", "Rest"],
    "diet": {
      "include": ["Bitter vegetables", "Green leafy vegetables", "Barley", "Light foods"],
      "avoid": ["Alcohol", "Fatty foods", "Spicy foods", "Heavy foods"]
    },
    "lifestyle": ["Rest", "Hydration", "Avoid stress", "Regular checkups"],
    "modernEquivalent": "Jaundice (ICD-10: K71)",
    "category": "Hepatic",
    "severity": "Moderate to Severe",
    "isActive": true
  },
  {
    "diseaseId": "CHARAKA_008",
    "name": "Hridroga",
    "sanskrit": "हृद्रोग",
    "source": "Charaka Samhita, Chikitsa Sthana, Chapter 26",
    "dosha": ["Vata", "Pitta"],
    "symptoms": ["Chest pain", "Palpitations", "Shortness of breath", "Fatigue", "Anxiety"],
    "pathogenesis": "Vata and Pitta affecting heart function and cardiovascular system.",
    "treatments": [
      {
        "type": "Herbal",
        "description": "Arjuna and Pushkarmool for heart health and circulation.",
        "ingredients": ["Arjuna", "Pushkarmool", "Guggulu", "Shankhpushpi"],
        "source": "Charaka Samhita"
      },
      {
        "type": "Yoga",
        "description": "Pranayama to improve circulation and heart function.",
        "ingredients": ["Pranayama"],
        "source": "Light on Pranayama"
      }
    ],
    "herbs": ["Arjuna", "Pushkarmool", "Guggulu", "Shankhpushpi", "Brahmi"],
    "precautions": ["Avoid stress", "Regular checkups", "Moderate exercise"],
    "diet": {
      "include": ["Low salt diet", "Fruits", "Barley", "Green vegetables", "Nuts"],
      "avoid": ["High salt foods", "Fatty foods", "Processed foods", "Alcohol"]
    },
    "lifestyle": ["Stress management", "Regular exercise", "Adequate sleep", "Meditation"],
    "modernEquivalent": "Heart Disease (ICD-10: I20-I25)",
    "category": "Cardiovascular",
    "severity": "Severe",
    "isActive": true
  }
];

async function seedComprehensiveDiseases() {
  try {
    console.log('Starting comprehensive disease database seeding...');
    
    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('Cleared existing diseases from database');
    
    // Insert comprehensive diseases
    await Disease.insertMany(comprehensiveDiseases);
    console.log(`Successfully seeded ${comprehensiveDiseases.length} comprehensive diseases into MongoDB`);
    
    // Print summary
    const categories = {};
    const doshas = {};
    const sources = {};
    
    comprehensiveDiseases.forEach(disease => {
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
    
    console.log('\n=== COMPREHENSIVE DISEASE DATABASE SUMMARY ===');
    console.log(`Total Diseases: ${comprehensiveDiseases.length}`);
    console.log('\nCategories:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
    console.log('\nDoshas:');
    Object.entries(doshas).forEach(([dosha, count]) => {
      console.log(`  ${dosha}: ${count}`);
    });
    
    console.log('\nSources:');
    Object.entries(sources).forEach(([source, count]) => {
      console.log(`  ${source}: ${count}`);
    });
    
    console.log('\n=== SEEDING COMPLETE ===');
    console.log('All comprehensive diseases are now available in the Vyadhi section!');
    
  } catch (error) {
    console.error('Error seeding comprehensive diseases:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding
seedComprehensiveDiseases(); 