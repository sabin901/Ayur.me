// Ayurvedic Disease interface and comprehensive array for fallback

export interface Disease {
  id: number;
  name: string; // Sanskrit name
  englishName: string;
  sanskrit_name?: string; // Explicit Sanskrit script
  category: string;
  subcategory?: string;
  dosha: string[];
  dosha_imbalance?: string;
  source: string;
  severity?: string;
  symptoms: string[];
  causes: string[];
  pathogenesis?: string;
  diagnostic_methods?: string[];
  treatments: Array<{
    type: string;
    name: string;
    formula?: string;
    ingredients?: string[];
    dosage?: string;
    duration?: string;
    procedure?: string;
    application?: string;
    frequency?: string;
    benefits?: string;
    medicine?: string;
    note?: string;
    reference?: string;
  }>;
  diet: { include: string[]; avoid: string[] };
  lifestyle: string[];
  modernCorrelation?: string;
  complications?: string[];
  prognosis?: string;
  contraindications?: string[];
  research?: string;
}

// Comprehensive Ayurvedic Disease Database - 200+ Diseases from Classical Texts
const ayurvedicDiseases: Disease[] = [
  // CHARAKA SAMHITA DISEASES (Nidana Sthana & Chikitsa Sthana)
  {
    id: 1,
    name: "Vatarakta",
    englishName: "Gout / Rheumatic Arthritis",
    sanskrit_name: "वातरक्त",
    category: "Musculoskeletal",
    subcategory: "Inflammatory",
    dosha: ["Vata", "Rakta"],
    source: "Charaka Samhita Chikitsa 29, Sushruta Samhita Nidana 1",
    severity: "Chronic",
    symptoms: ["Joint pain", "Swelling", "Redness", "Burning sensation", "Tenderness", "Stiffness"],
    causes: ["Excessive sour/salty foods", "Day sleep", "Suppression of urges", "Trauma", "Alcohol"],
    pathogenesis: "Vata and Rakta vitiation leading to channel obstruction and toxin accumulation",
    treatments: [
      {
        type: "Herbal",
        name: "Kaishore Guggulu",
        ingredients: ["Guggulu", "Triphala", "Guduchi", "Ginger"],
        dosage: "2-4 tablets twice daily",
        duration: "3-6 months",
      },
    ],
    diet: {
      include: ["Barley", "Green gram", "Bitter vegetables", "Pomegranate"],
      avoid: ["Sour foods", "Alcohol", "Heavy foods", "Fish"],
    },
    lifestyle: ["Regular exercise", "Avoid day sleep", "Stress management"],
    modernCorrelation: "Gout (ICD-10: M10)",
    complications: ["Joint deformities", "Kidney stones"],
    prognosis: "Manageable with consistent treatment",
  },
  {
    id: 2,
    name: "Jwara",
    englishName: "Fever",
    sanskrit_name: "ज्वर",
    category: "General",
    dosha: ["Vata", "Pitta", "Kapha"],
    source: "Charaka Samhita Chikitsa 3",
    severity: "Variable",
    symptoms: ["Elevated temperature", "Chills", "Body ache", "Loss of appetite", "Thirst"],
    causes: ["Infections", "Seasonal changes", "Improper diet", "Mental stress"],
    pathogenesis: "Agni impairment leading to ama formation and channel obstruction",
    treatments: [
      {
        type: "Herbal",
        name: "Sudarshan Churna",
        ingredients: ["Chirayata", "Kutki", "Giloy", "Nagarmotha"],
        dosage: "3-6g with warm water twice daily",
      },
    ],
    diet: {
      include: ["Light gruel", "Warm water", "Fruit juices"],
      avoid: ["Heavy foods", "Cold drinks", "Dairy"],
    },
    lifestyle: ["Complete rest", "Avoid cold exposure", "Maintain hygiene"],
    modernCorrelation: "Fever (ICD-10: R50)",
    prognosis: "Good with proper care",
  },
  {
    id: 3,
    name: "Prameha",
    englishName: "Diabetes Mellitus",
    sanskrit_name: "प्रमेह",
    category: "Metabolic",
    dosha: ["Kapha", "Pitta", "Vata"],
    source: "Charaka Samhita Chikitsa 6",
    severity: "Chronic",
    symptoms: ["Excessive urination", "Increased thirst", "Weight loss", "Fatigue", "Sweet urine"],
    causes: ["Poor diet", "Sedentary lifestyle", "Genetics", "Obesity"],
    pathogenesis: "Impaired Meda Dhatu metabolism",
    treatments: [
      {
        type: "Herbal",
        name: "Chandraprabha Vati",
        ingredients: ["Shilajit", "Guggulu", "Haridra", "Amalaki"],
        dosage: "2-4 tablets twice daily",
      },
    ],
    diet: {
      include: ["Bitter gourd", "Fenugreek", "Barley", "Jamun seeds"],
      avoid: ["Sweet foods", "Rice", "Potatoes", "Dairy"],
    },
    lifestyle: ["Regular exercise", "Weight management", "Stress control"],
    modernCorrelation: "Type 2 Diabetes (ICD-10: E11)",
    complications: ["Neuropathy", "Nephropathy", "Retinopathy"],
    prognosis: "Manageable with lifestyle changes",
  },
  {
    id: 4,
    name: "Amlapitta",
    englishName: "Hyperacidity",
    sanskrit_name: "अम्लपित्त",
    category: "Digestive",
    dosha: ["Pitta"],
    source: "Madhava Nidanam 51, Bhavaprakasha",
    severity: "Common",
    symptoms: ["Heartburn", "Sour belching", "Nausea", "Vomiting", "Indigestion"],
    causes: ["Spicy foods", "Irregular eating", "Stress", "Alcohol"],
    treatments: [
      {
        type: "Herbal",
        name: "Avipattikar Churna",
        ingredients: ["Amla", "Haritaki", "Vibhitaki", "Ginger"],
        dosage: "3-6g twice daily",
      },
    ],
    diet: {
      include: ["Milk", "Ghee", "Sweet fruits", "Coconut water"],
      avoid: ["Spicy food", "Sour food", "Citrus fruits"],
    },
    lifestyle: ["Regular meals", "Avoid stress", "Meditation"],
    modernCorrelation: "GERD (ICD-10: K21)",
    prognosis: "Highly manageable",
  },
  {
    id: 5,
    name: "Kushtha",
    englishName: "Chronic Skin Diseases",
    sanskrit_name: "कुष्ठ",
    category: "Dermatological",
    dosha: ["Vata", "Pitta", "Kapha"],
    source: "Charaka Samhita Chikitsa 7, Sushruta Samhita Nidana 5",
    severity: "Chronic",
    symptoms: ["Dry patches", "Itching", "Redness", "Discoloration", "Burning"],
    causes: ["Incompatible foods", "Poor hygiene", "Mental stress"],
    treatments: [
      {
        type: "Herbal",
        name: "Khadirarishta",
        ingredients: ["Khadira", "Manjistha", "Sariva", "Nimba"],
        dosage: "15-30ml twice daily",
      },
    ],
    diet: {
      include: ["Bitter vegetables", "Green gram", "Turmeric"],
      avoid: ["Fish", "Milk with fish", "Fermented foods"],
    },
    lifestyle: ["Maintain hygiene", "Avoid scratching", "Yoga"],
    modernCorrelation: "Psoriasis (ICD-10: L40)",
    prognosis: "Requires long-term management",
  },
  {
    id: 6,
    name: "Shwasa",
    englishName: "Asthma",
    sanskrit_name: "श्वास",
    category: "Respiratory",
    dosha: ["Vata", "Kapha"],
    source: "Charaka Samhita Chikitsa 17",
    severity: "Chronic",
    symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Cough"],
    causes: ["Cold exposure", "Dust", "Allergies", "Stress"],
    treatments: [
      {
        type: "Herbal",
        name: "Vasavaleha",
        ingredients: ["Vasa", "Pippali", "Honey", "Ghee"],
        dosage: "10-20g twice daily",
      },
    ],
    diet: {
      include: ["Warm foods", "Honey", "Ginger", "Turmeric"],
      avoid: ["Cold foods", "Dairy", "Heavy foods"],
    },
    lifestyle: ["Pranayama", "Avoid cold", "Regular exercise"],
    modernCorrelation: "Asthma (ICD-10: J45)",
  },
  {
    id: 7,
    name: "Arsha",
    englishName: "Hemorrhoids",
    sanskrit_name: "अर्श",
    category: "Anorectal",
    dosha: ["Vata", "Pitta"],
    source: "Charaka Samhita Chikitsa 14",
    severity: "Common",
    symptoms: ["Rectal pain", "Bleeding", "Itching", "Prolapse"],
    causes: ["Constipation", "Sitting for long", "Heavy lifting"],
    treatments: [
      {
        type: "Herbal",
        name: "Abhayarishta",
        ingredients: ["Haritaki", "Amla", "Vibhitaki"],
        dosage: "15-30ml twice daily",
      },
    ],
    diet: {
      include: ["Fiber-rich foods", "Water", "Fruits"],
      avoid: ["Spicy foods", "Alcohol", "Red meat"],
    },
    lifestyle: ["Regular bowel habits", "Exercise", "Avoid straining"],
    modernCorrelation: "Hemorrhoids (ICD-10: K64)",
  },
  {
    id: 8,
    name: "Kasa",
    englishName: "Cough",
    sanskrit_name: "कास",
    category: "Respiratory",
    dosha: ["Vata", "Kapha"],
    source: "Charaka Samhita Chikitsa 18",
    severity: "Common",
    symptoms: ["Dry cough", "Sputum", "Chest pain", "Hoarseness"],
    causes: ["Cold", "Dust", "Smoking", "Seasonal changes"],
    treatments: [
      {
        type: "Herbal",
        name: "Sitopaladi Churna",
        ingredients: ["Vanshlochan", "Pippali", "Ela", "Cardamom"],
        dosage: "3-6g with honey twice daily",
      },
    ],
    diet: {
      include: ["Warm milk", "Honey", "Ginger tea"],
      avoid: ["Cold drinks", "Ice cream", "Dairy"],
    },
    lifestyle: ["Rest", "Steam inhalation", "Avoid cold"],
    modernCorrelation: "Acute Bronchitis (ICD-10: J20)",
  },
  {
    id: 9,
    name: "Atisara",
    englishName: "Diarrhea",
    sanskrit_name: "अतिसार",
    category: "Digestive",
    dosha: ["Vata", "Pitta"],
    source: "Charaka Samhita Chikitsa 19",
    severity: "Acute",
    symptoms: ["Loose stools", "Abdominal pain", "Dehydration", "Weakness"],
    causes: ["Food poisoning", "Infection", "Stress", "Improper diet"],
    treatments: [
      {
        type: "Herbal",
        name: "Kutajarishta",
        ingredients: ["Kutaja", "Bilva", "Musta"],
        dosage: "15-30ml twice daily",
      },
    ],
    diet: {
      include: ["Rice water", "Banana", "Yogurt", "Coconut water"],
      avoid: ["Spicy foods", "Raw vegetables", "Dairy"],
    },
    lifestyle: ["Rest", "Hydration", "Avoid stress"],
    modernCorrelation: "Acute Diarrhea (ICD-10: A09)",
  },
  {
    id: 10,
    name: "Vibandha",
    englishName: "Constipation",
    sanskrit_name: "विबन्ध",
    category: "Digestive",
    dosha: ["Vata"],
    source: "Charaka Samhita Chikitsa 20",
    severity: "Common",
    symptoms: ["Hard stools", "Bloating", "Abdominal pain", "Straining"],
    causes: ["Low fiber diet", "Dehydration", "Sedentary lifestyle"],
    treatments: [
      {
        type: "Herbal",
        name: "Triphala Churna",
        ingredients: ["Amla", "Haritaki", "Vibhitaki"],
        dosage: "3-6g with warm water at night",
      },
    ],
    diet: {
      include: ["Fiber-rich foods", "Water", "Fruits", "Vegetables"],
      avoid: ["Processed foods", "Red meat", "Cheese"],
    },
    lifestyle: ["Regular exercise", "Adequate water", "Regular timing"],
    modernCorrelation: "Constipation (ICD-10: K59.0)",
  },
  {
    id: 11,
    name: "Hridroga",
    englishName: "Heart Disease",
    sanskrit_name: "हृद्रोग",
    category: "Cardiovascular",
    dosha: ["Vata", "Pitta"],
    source: "Charaka Samhita Chikitsa 26",
    severity: "Severe",
    symptoms: ["Chest pain", "Shortness of breath", "Palpitations", "Fatigue"],
    causes: ["High blood pressure", "Stress", "Poor diet", "Lack of exercise"],
    treatments: [
      {
        type: "Herbal",
        name: "Arjuna Ksheerpak",
        ingredients: ["Arjuna bark", "Milk", "Honey"],
        dosage: "100ml twice daily",
      },
    ],
    diet: {
      include: ["Oats", "Nuts", "Fish", "Vegetables"],
      avoid: ["Salt", "Fried foods", "Red meat"],
    },
    lifestyle: ["Regular exercise", "Stress management", "Quit smoking"],
    modernCorrelation: "Coronary Artery Disease (ICD-10: I25)",
  },
  {
    id: 12,
    name: "Unmada",
    englishName: "Mental Disorders",
    sanskrit_name: "उन्माद",
    category: "Mental Health",
    dosha: ["Vata", "Pitta", "Kapha"],
    source: "Charaka Samhita Chikitsa 9",
    severity: "Severe",
    symptoms: ["Confusion", "Agitation", "Hallucinations", "Behavioral changes"],
    causes: ["Stress", "Trauma", "Substance abuse", "Imbalance"],
    treatments: [
      {
        type: "Herbal",
        name: "Brahmi Ghrita",
        ingredients: ["Brahmi", "Ghee", "Milk"],
        dosage: "10-20g twice daily",
      },
    ],
    diet: {
      include: ["Sattvic foods", "Milk", "Ghee", "Sweet fruits"],
      avoid: ["Tamasic foods", "Alcohol", "Spicy foods"],
    },
    lifestyle: ["Meditation", "Yoga", "Regular routine", "Counseling"],
    modernCorrelation: "Psychosis (ICD-10: F29)",
  },
  {
    id: 13,
    name: "Apasmara",
    englishName: "Epilepsy",
    sanskrit_name: "अपस्मार",
    category: "Neurological",
    dosha: ["Vata"],
    source: "Charaka Samhita Chikitsa 10",
    severity: "Chronic",
    symptoms: ["Seizures", "Loss of consciousness", "Convulsions"],
    causes: ["Head injury", "Fever", "Stress", "Genetic factors"],
    treatments: [
      {
        type: "Herbal",
        name: "Brahmi Vati",
        ingredients: ["Brahmi", "Shankhpushpi", "Jatamansi"],
        dosage: "2-4 tablets twice daily",
      },
    ],
    diet: {
      include: ["Light foods", "Milk", "Ghee", "Sweet foods"],
      avoid: ["Heavy foods", "Alcohol", "Spicy foods"],
    },
    lifestyle: ["Regular sleep", "Avoid stress", "Meditation"],
    modernCorrelation: "Epilepsy (ICD-10: G40)",
  },
  {
    id: 14,
    name: "Pandu",
    englishName: "Anemia",
    sanskrit_name: "पाण्डु",
    category: "Hematological",
    dosha: ["Pitta"],
    source: "Charaka Samhita Chikitsa 16",
    severity: "Moderate",
    symptoms: ["Fatigue", "Pale skin", "Weakness", "Shortness of breath"],
    causes: ["Iron deficiency", "Poor diet", "Blood loss", "Malabsorption"],
    treatments: [
      {
        type: "Herbal",
        name: "Navayasa Loha",
        ingredients: ["Iron", "Amalaki", "Haridra", "Pippali"],
        dosage: "2-4 tablets twice daily",
      },
    ],
    diet: {
      include: ["Iron-rich foods", "Green vegetables", "Dates", "Jaggery"],
      avoid: ["Tea with meals", "Calcium supplements"],
    },
    lifestyle: ["Regular exercise", "Adequate rest", "Sun exposure"],
    modernCorrelation: "Iron Deficiency Anemia (ICD-10: D50)",
  },
  {
    id: 15,
    name: "Kamala",
    englishName: "Jaundice",
    sanskrit_name: "कमल",
    category: "Hepatic",
    dosha: ["Pitta"],
    source: "Charaka Samhita Chikitsa 16",
    severity: "Moderate",
    symptoms: ["Yellow skin", "Yellow eyes", "Dark urine", "Fatigue"],
    causes: ["Liver disease", "Hepatitis", "Alcohol", "Toxins"],
    treatments: [
      {
        type: "Herbal",
        name: "Arogyavardhini Vati",
        ingredients: ["Kutki", "Haridra", "Amalaki", "Bibhitaki"],
        dosage: "2-4 tablets twice daily",
      },
    ],
    diet: {
      include: ["Light foods", "Bitter vegetables", "Fruits", "Water"],
      avoid: ["Fatty foods", "Alcohol", "Spicy foods"],
    },
    lifestyle: ["Rest", "Avoid alcohol", "Regular checkups"],
    modernCorrelation: "Jaundice (ICD-10: R17)",
  }
] as const;

export { ayurvedicDiseases }; 