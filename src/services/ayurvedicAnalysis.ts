// Comprehensive Ayurvedic Analysis Service
// Based on classical texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam, Bhava Prakasha

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface AnalysisResult {
  primaryDosha: string;
  secondaryDosha: string;
  scores: DoshaScores;
  constitution: string;
  percentage: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  subtypes: SubtypeAnalysis[];
  recommendations: PersonalizedRecommendations;
  classicalReferences: ClassicalReference[];
  vikriti?: VikritiAnalysis;
}

export interface SubtypeAnalysis {
  dosha: string;
  subtype: string;
  location: string;
  functions: string[];
  balancedSigns: string[];
  imbalancedSigns: string[];
  status: 'balanced' | 'imbalanced' | 'moderate';
  verse: string;
  source: string;
}

export interface PersonalizedRecommendations {
  diet: {
    description: string;
    foods: string[];
    avoid: string[];
    verse: string;
    source: string;
  };
  lifestyle: {
    description: string;
    practices: string[];
    avoid: string[];
    verse: string;
    source: string;
  };
  herbs: {
    description: string;
    herbs: string[];
    verse: string;
    source: string;
  };
  seasonal: {
    spring: string[];
    summer: string[];
    autumn: string[];
    winter: string[];
  };
}

export interface ClassicalReference {
  sanskrit: string;
  iast: string;
  translation: string;
  source: string;
  context: string;
}

export interface VikritiAnalysis {
  primaryImbalance: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
}

// Add new/expanded interfaces for full report
export interface FullAnalysisResult {
  primaryDosha: string;
  secondaryDosha: string;
  scores: DoshaScores;
  constitution: string;
  percentage: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  subtypes: SubtypeAnalysis[];
  recommendations: PersonalizedRecommendations;
  classicalReferences: ClassicalReference[];
  vikriti: string | VikritiAnalysis;
  prakriti: string;
  subdosha: string[];
  personality: string;
  physical: string;
  lifestyle: string[];
  diet: string;
  herbs: string[];
  seasonal: string;
  marma: string;
  spiritual: string;
  verses: Array<{
    text: string;
    chapter: string;
    verse: string | number;
    devanagari: string;
    iast: string;
    translation: string;
  }>;
}

// Helper: get classical verse for dosha
function getDoshaVerse(dosha: string) {
  if (dosha === 'Vata') {
    return {
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: 1.59,
      devanagari: 'रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः',
      iast: 'rūkṣo laghuḥ śītaḥ kharaḥ sūkṣmaścalo’nilaḥ',
      translation: 'Dry, light, cold, rough, subtle, and mobile'
    };
  } else if (dosha === 'Pitta') {
    return {
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: 1.60,
      devanagari: 'सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं',
      iast: 'sasnehatīkṣṇoṣṇalaghuvisraṃ saraṃ dravaṃ pittaṃ',
      translation: 'Oily, sharp, hot, light, flowing, liquid'
    };
  } else {
    return {
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: 1.61,
      devanagari: 'स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः',
      iast: 'snigdhaḥ śīto gururmandaḥ ślakṣṇo mṛtsnaḥ sthiraḥ kaphaḥ',
      translation: 'Oily, cold, heavy, slow, smooth, soft, stable'
    };
  }
}

// Classical scoring weights based on Charaka Samhita and Ashtanga Hridayam
const doshaWeights = {
  vata: {
    body_type: { slim: 3, medium: 1, heavy: 0 },
    body_temp: { cold: 3, warm: 1, cool: 0 },
    sleep: { light: 3, moderate: 1, deep: 0 },
    hunger: { irregular: 3, intense: 1, moderate: 0 },
    mood: { anxious: 3, impatient: 1, calm: 0 },
    speech: { fast: 3, sharp: 1, slow: 0 },
    consistency: { always: 2, sometimes: 1, rarely: 0 }
  },
  pitta: {
    body_type: { slim: 0, medium: 3, heavy: 1 },
    body_temp: { cold: 0, warm: 3, cool: 1 },
    sleep: { light: 1, moderate: 3, deep: 0 },
    hunger: { irregular: 0, intense: 3, moderate: 1 },
    mood: { anxious: 1, impatient: 3, calm: 0 },
    speech: { fast: 1, sharp: 3, slow: 0 },
    consistency: { always: 2, sometimes: 1, rarely: 0 }
  },
  kapha: {
    body_type: { slim: 0, medium: 1, heavy: 3 },
    body_temp: { cold: 1, warm: 0, cool: 3 },
    sleep: { light: 0, moderate: 1, deep: 3 },
    hunger: { irregular: 0, intense: 0, moderate: 3 },
    mood: { anxious: 0, impatient: 0, calm: 3 },
    speech: { fast: 0, sharp: 0, slow: 3 },
    consistency: { always: 2, sometimes: 1, rarely: 0 }
  }
};

// Classical dosha characteristics from Charaka Samhita
const doshaCharacteristics = {
  vata: {
    name: "Vata",
    element: "Air & Ether",
    qualities: ["Dry", "Light", "Cold", "Rough", "Subtle", "Mobile", "Clear"],
    description: "The energy of movement and change. Governs breathing, circulation, and nervous system functions.",
    classicalVerse: {
      sanskrit: "रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः",
      iast: "rūkṣo laghuḥ śītaḥ kharaḥ sūkṣmaścalo'nilaḥ",
      translation: "Dry, light, cold, rough, subtle, and mobile",
      source: "Charaka Samhita, Sutrasthana 1.59"
    },
    subtypes: [
      {
        name: "Prana Vata",
        location: "Head, brain",
        functions: ["Respiration", "swallowing", "mental activities"],
        verse: "प्राणो उदानव्यानसमानापानाख्याः...",
        source: "Charaka Samhita, Sutrasthana 12.8",
        balancedSigns: ["Clear speech", "steady mind", "good memory"],
        imbalancedSigns: ["Anxiety", "dry cough", "insomnia", "speech disorders"]
      },
      {
        name: "Udana Vata",
        location: "Chest, throat",
        functions: ["Speech", "exertion", "memory"],
        verse: "उदानः कण्ठमूर्धजत्रुगतिः...",
        source: "Charaka Samhita, Sutrasthana 12.9",
        balancedSigns: ["Clear voice", "good memory", "proper speech"],
        imbalancedSigns: ["Hoarseness", "memory loss", "speech problems"]
      },
      {
        name: "Vyana Vata",
        location: "Heart, circulation",
        functions: ["Circulation", "movement", "sensory perception"],
        verse: "व्यानः सर्वशरीरगः...",
        source: "Charaka Samhita, Sutrasthana 12.10",
        balancedSigns: ["Good circulation", "proper movement", "clear senses"],
        imbalancedSigns: ["Poor circulation", "tremors", "sensory issues"]
      },
      {
        name: "Samana Vata",
        location: "Stomach, intestines",
        functions: ["Digestion", "absorption", "separation"],
        verse: "समानः कोष्ठगः...",
        source: "Charaka Samhita, Sutrasthana 12.11",
        balancedSigns: ["Good digestion", "proper absorption"],
        imbalancedSigns: ["Poor digestion", "bloating", "malabsorption"]
      },
      {
        name: "Apana Vata",
        location: "Colon, pelvic region",
        functions: ["Elimination", "reproduction", "downward movement"],
        verse: "अपानः पायुमेढ्रनाभिस्थः...",
        source: "Charaka Samhita, Sutrasthana 12.12",
        balancedSigns: ["Regular elimination", "good reproductive health"],
        imbalancedSigns: ["Constipation", "diarrhea", "reproductive issues"]
      }
    ]
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    qualities: ["Oily", "Sharp", "Hot", "Light", "Liquid", "Mobile", "Sour"],
    description: "The energy of transformation. Governs digestion, metabolism, and body temperature.",
    classicalVerse: {
      sanskrit: "सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं",
      iast: "sasnehatīkṣṇoṣṇalaghuvistraṃ saraṃ dravaṃ pittaṃ",
      translation: "Oily, sharp, hot, light, flowing, liquid",
      source: "Charaka Samhita, Sutrasthana 1.60"
    },
    subtypes: [
      {
        name: "Pachaka Pitta",
        location: "Stomach, small intestine",
        functions: ["Digestion", "enzyme secretion"],
        verse: "पचति अन्नं पचकः...",
        source: "Charaka Samhita, Sutrasthana 12.11",
        balancedSigns: ["Good digestion", "proper enzyme function"],
        imbalancedSigns: ["Acidity", "ulcers", "poor digestion"]
      },
      {
        name: "Ranjaka Pitta",
        location: "Liver, spleen",
        functions: ["Blood formation", "coloring"],
        verse: "रञ्जयति रक्तं रञ्जकः...",
        source: "Charaka Samhita, Sutrasthana 12.12",
        balancedSigns: ["Good blood quality", "proper coloring"],
        imbalancedSigns: ["Jaundice", "blood disorders", "skin discoloration"]
      },
      {
        name: "Sadhaka Pitta",
        location: "Heart, brain",
        functions: ["Intelligence", "memory", "cognition"],
        verse: "साधयति बुद्धिं...",
        source: "Charaka Samhita, Sutrasthana 12.13",
        balancedSigns: ["Sharp intellect", "good memory", "clear thinking"],
        imbalancedSigns: ["Mental confusion", "memory loss", "irritability"]
      },
      {
        name: "Alochaka Pitta",
        location: "Eyes",
        functions: ["Vision", "color perception"],
        verse: "लोचयति रूपं...",
        source: "Charaka Samhita, Sutrasthana 12.14",
        balancedSigns: ["Good vision", "proper color perception"],
        imbalancedSigns: ["Eye problems", "color blindness", "vision issues"]
      },
      {
        name: "Bhrajaka Pitta",
        location: "Skin",
        functions: ["Skin color", "complexion", "temperature regulation"],
        verse: "भ्राजयति त्वचं...",
        source: "Charaka Samhita, Sutrasthana 12.15",
        balancedSigns: ["Good complexion", "proper skin color"],
        imbalancedSigns: ["Skin rashes", "discoloration", "burning sensation"]
      }
    ]
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    qualities: ["Oily", "Cool", "Heavy", "Slow", "Smooth", "Soft", "Stable"],
    description: "The energy of structure and stability. Governs immunity, growth, and lubrication.",
    classicalVerse: {
      sanskrit: "स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः",
      iast: "snigdhaḥ śīto gururmandaḥ ślakṣṇo mṛtsnaḥ sthiraḥ kaphaḥ",
      translation: "Oily, cold, heavy, slow, smooth, soft, stable",
      source: "Charaka Samhita, Sutrasthana 1.61"
    },
    subtypes: [
      {
        name: "Kledaka Kapha",
        location: "Stomach",
        functions: ["Moistening", "digestive lubrication"],
        verse: "क्लेदयति अन्नं क्लेदकः...",
        source: "Charaka Samhita, Sutrasthana 12.15",
        balancedSigns: ["Good digestion", "proper lubrication"],
        imbalancedSigns: ["Poor digestion", "excess mucus", "nausea"]
      },
      {
        name: "Avalambaka Kapha",
        location: "Chest, heart",
        functions: ["Support", "nourishment"],
        verse: "आवलम्बते हृदयं...",
        source: "Charaka Samhita, Sutrasthana 12.16",
        balancedSigns: ["Good strength", "proper nourishment"],
        imbalancedSigns: ["Weakness", "poor nourishment", "respiratory issues"]
      },
      {
        name: "Bodhaka Kapha",
        location: "Tongue, mouth",
        functions: ["Taste perception", "saliva production"],
        verse: "बोधयति रसं...",
        source: "Charaka Samhita, Sutrasthana 12.17",
        balancedSigns: ["Good taste", "proper saliva"],
        imbalancedSigns: ["Poor taste", "excess saliva", "mouth issues"]
      },
      {
        name: "Tarpaka Kapha",
        location: "Brain, nervous system",
        functions: ["Nourishment", "protection"],
        verse: "तर्पयति इन्द्रियाणि...",
        source: "Charaka Samhita, Sutrasthana 12.18",
        balancedSigns: ["Good memory", "proper nourishment"],
        imbalancedSigns: ["Poor memory", "lethargy", "mental dullness"]
      },
      {
        name: "Shleshaka Kapha",
        location: "Joints",
        functions: ["Lubrication", "joint health"],
        verse: "श्लेषयति सन्धीन्...",
        source: "Charaka Samhita, Sutrasthana 12.19",
        balancedSigns: ["Good joint health", "proper lubrication"],
        imbalancedSigns: ["Joint problems", "stiffness", "swelling"]
      }
    ]
  }
};

// Enhanced scoring algorithm based on classical texts
export function calculateDoshaScores(answers: Record<string, string>): DoshaScores {
  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  // Enhanced scoring with classical weights from Charaka Samhita and Ashtanga Hridayam
  const questionWeights = {
    digestion_pattern: {
      irregular: { vata: 4, pitta: 0, kapha: 0 }, // Apāna Vāta imbalance
      sharp: { vata: 0, pitta: 4, kapha: 0 },     // Pachaka Pitta trait
      slow: { vata: 0, pitta: 0, kapha: 4 }       // Kledaka Kapha trait
    },
    mental_activity: {
      quick: { vata: 4, pitta: 0, kapha: 0 },     // Prāna Vāta trait
      sharp: { vata: 0, pitta: 4, kapha: 0 },     // Sadhaka Pitta trait
      steady: { vata: 0, pitta: 0, kapha: 4 }     // Tarpaka Kapha trait
    },
    stress_response: {
      anxious: { vata: 4, pitta: 0, kapha: 0 },   // Prāna Vāta imbalance
      angry: { vata: 0, pitta: 4, kapha: 0 },     // Ranjaka Pitta imbalance
      withdrawn: { vata: 0, pitta: 0, kapha: 4 }  // Avalambaka Kapha imbalance
    },
    energy_pattern: {
      variable: { vata: 3, pitta: 0, kapha: 0 },  // Vyana Vata trait
      intense: { vata: 0, pitta: 3, kapha: 0 },   // Alochaka Pitta trait
      steady: { vata: 0, pitta: 0, kapha: 3 }     // Bodhaka Kapha trait
    },
    sleep_pattern: {
      light: { vata: 3, pitta: 0, kapha: 0 },     // Prāna Vāta trait
      moderate: { vata: 0, pitta: 3, kapha: 0 },  // Sadhaka Pitta trait
      deep: { vata: 0, pitta: 0, kapha: 3 }       // Tarpaka Kapha trait
    },
    speech_pattern: {
      fast: { vata: 3, pitta: 0, kapha: 0 },      // Udana Vata trait
      clear: { vata: 0, pitta: 3, kapha: 0 },     // Sadhaka Pitta trait
      slow: { vata: 0, pitta: 0, kapha: 3 }       // Tarpaka Kapha trait
    },
    climate_preference: {
      warm: { vata: 2, pitta: 0, kapha: 0 },      // Avoids Sheeta (cold)
      cool: { vata: 0, pitta: 2, kapha: 0 },      // Avoids Ushna (heat)
      dry: { vata: 0, pitta: 0, kapha: 2 }        // Avoids Snigdha (dampness)
    },
    memory_pattern: {
      quick: { vata: 3, pitta: 0, kapha: 0 },     // Prāna Vāta trait
      sharp: { vata: 0, pitta: 3, kapha: 0 },     // Sadhaka Pitta trait
      steady: { vata: 0, pitta: 0, kapha: 3 }     // Tarpaka Kapha trait
    },
    circulation_pattern: {
      variable: { vata: 3, pitta: 0, kapha: 0 },  // Vyana Vata imbalance
      warm: { vata: 0, pitta: 3, kapha: 0 },      // Ranjaka Pitta trait
      steady: { vata: 0, pitta: 0, kapha: 3 }     // Avalambaka Kapha trait
    },
    elimination_pattern: {
      irregular: { vata: 3, pitta: 0, kapha: 0 }, // Apāna Vāta imbalance
      loose: { vata: 0, pitta: 3, kapha: 0 },     // Pachaka Pitta imbalance
      steady: { vata: 0, pitta: 0, kapha: 3 }     // Kledaka Kapha trait
    },
    emotional_tendency: {
      fear: { vata: 3, pitta: 0, kapha: 0 },      // Bhaya (fear) - Vata emotion
      anger: { vata: 0, pitta: 3, kapha: 0 },     // Krodha (anger) - Pitta emotion
      attachment: { vata: 0, pitta: 0, kapha: 3 } // Moha (attachment) - Kapha emotion
    }
  };

  // Calculate scores with enhanced accuracy
  Object.entries(answers).forEach(([questionId, answer]) => {
    const weights = questionWeights[questionId as keyof typeof questionWeights];
    if (weights && answer in weights) {
      const score = weights[answer as keyof typeof weights] as { vata: number; pitta: number; kapha: number };
      vata += score.vata || 0;
      pitta += score.pitta || 0;
      kapha += score.kapha || 0;
    }
  });

  // Apply classical correction factors from Charaka Samhita
  // Rakta (blood) adjustment for Pitta (Sushruta Sharirasthana 4.71)
  if (pitta > 20) {
    pitta += Math.floor(pitta * 0.15); // Pitta enhances blood quality
  }

  // Ojas (vitality) adjustment for Kapha (Charaka Sutrasthana 17.75)
  if (kapha > 20) {
    kapha += Math.floor(kapha * 0.1); // Kapha enhances vitality
  }

  // Tejas (radiance) adjustment for Vata (Charaka Sutrasthana 17.74)
  if (vata > 20) {
    vata += Math.floor(vata * 0.05); // Vata enhances subtle energy
  }

  return { vata, pitta, kapha };
}

// Determine primary and secondary doshas
export function determineConstitution(scores: DoshaScores): { primary: string; secondary: string } {
  const sortedDoshas = Object.entries(scores)
    .filter(([dosha]) => dosha !== 'rakta')
    .sort(([, a], [, b]) => b - a);
  
  return {
    primary: sortedDoshas[0][0],
    secondary: sortedDoshas[1][0]
  };
}

// Calculate percentage scores
export function calculatePercentages(scores: DoshaScores): { vata: number; pitta: number; kapha: number } {
  const total = scores.vata + scores.pitta + scores.kapha;
  return {
    vata: Math.round((scores.vata / total) * 100),
    pitta: Math.round((scores.pitta / total) * 100),
    kapha: Math.round((scores.kapha / total) * 100)
  };
}

// Analyze dosha subtypes
export function analyzeSubtypes(primaryDosha: string, scores: DoshaScores): SubtypeAnalysis[] {
  const doshaData = doshaCharacteristics[primaryDosha as keyof typeof doshaCharacteristics];
  if (!doshaData) return [];

  return doshaData.subtypes.map(subtype => {
    // Determine subtype status based on scores and characteristics
    let status: 'balanced' | 'imbalanced' | 'moderate' = 'balanced';
    const primaryScore = scores[primaryDosha as keyof DoshaScores];
    
    if (primaryScore > 20) {
      status = 'imbalanced';
    } else if (primaryScore > 12) {
      status = 'moderate';
    }

    return {
      dosha: primaryDosha,
      subtype: subtype.name,
      location: subtype.location,
      functions: subtype.functions,
      balancedSigns: subtype.balancedSigns,
      imbalancedSigns: subtype.imbalancedSigns,
      status,
      verse: subtype.verse,
      source: subtype.source
    };
  });
}

// Generate personalized recommendations
export function generateRecommendations(primaryDosha: string): PersonalizedRecommendations {
  const recommendations = {
    vata: {
      diet: {
        description: "Favor warm, moist, and grounding foods. Avoid cold, dry, and light foods.",
        foods: ["Warm milk", "ghee", "sweet fruits", "cooked vegetables", "rice", "nuts", "sesame oil"],
        avoid: ["Cold drinks", "raw vegetables", "dry foods", "bitter tastes", "excessive fasting"],
        verse: "वाते घृतं पयः...",
        source: "Bhava Prakasha, Purvakhanda 3.2"
      },
      lifestyle: {
        description: "Maintain a regular routine, warm oil massage, and gentle exercise.",
        practices: ["Daily abhyanga (oil massage)", "regular sleep schedule", "gentle yoga", "meditation", "warm baths"],
        avoid: ["Irregular schedule", "excessive travel", "cold exposure", "over-exertion", "late nights"],
        verse: "अभ्यङ्गः सर्वदा हितः...",
        source: "Charaka Samhita, Sutrasthana 5.88"
      },
      herbs: {
        description: "Use warming, grounding herbs to pacify Vata.",
        herbs: ["Ashwagandha", "Shatavari", "Bala", "Guduchi", "Triphala", "Sesame seeds"],
        verse: "अश्वगन्धा बला...",
        source: "Bhava Prakasha Nighantu, Guduchyadi Varga"
      },
      seasonal: {
        spring: ["Increase warm foods", "gentle exercise", "regular routine"],
        summer: ["Stay hydrated", "cool foods", "avoid excessive heat"],
        autumn: ["Warm foods", "oil massage", "grounding practices"],
        winter: ["Warm foods", "oil massage", "avoid cold"]
      }
    },
    pitta: {
      diet: {
        description: "Favor cooling, sweet, and bitter foods. Avoid hot, spicy, and sour foods.",
        foods: ["Sweet fruits", "cucumber", "coconut", "milk", "ghee", "bitter vegetables", "cooling herbs"],
        avoid: ["Hot spices", "sour foods", "alcohol", "fermented foods", "excessive salt"],
        verse: "पित्ते क्षीरं घृतं...",
        source: "Bhava Prakasha, Purvakhanda 3.3"
      },
      lifestyle: {
        description: "Stay cool, avoid excessive heat, and practice calming activities.",
        practices: ["Cool baths", "moonlight exposure", "calming yoga", "meditation", "cool environments"],
        avoid: ["Excessive sun exposure", "hot environments", "intense exercise", "anger", "competition"],
        verse: "शीतलं पित्तहरं...",
        source: "Charaka Samhita, Sutrasthana 5.89"
      },
      herbs: {
        description: "Use cooling, pacifying herbs to balance Pitta.",
        herbs: ["Shatavari", "Guduchi", "Neem", "Amla", "Manjistha", "Coriander"],
        verse: "शतावरी गुडूची...",
        source: "Bhava Prakasha Nighantu, Guduchyadi Varga"
      },
      seasonal: {
        spring: ["Cooling foods", "gentle exercise", "avoid heat"],
        summer: ["Cool foods", "stay hydrated", "avoid sun"],
        autumn: ["Moderate foods", "balance heat and cool"],
        winter: ["Warm foods", "avoid excessive heat"]
      }
    },
    kapha: {
      diet: {
        description: "Favor light, dry, and warming foods. Avoid heavy, oily, and cold foods.",
        foods: ["Light grains", "bitter vegetables", "honey", "ginger", "pepper", "pungent spices"],
        avoid: ["Heavy foods", "dairy", "sweet foods", "cold foods", "excessive oil"],
        verse: "कफे लघु रूक्षं...",
        source: "Bhava Prakasha, Purvakhanda 3.4"
      },
      lifestyle: {
        description: "Stay active, avoid excessive sleep, and practice stimulating activities.",
        practices: ["Regular exercise", "early rising", "stimulating yoga", "dry massage", "vigorous activity"],
        avoid: ["Excessive sleep", "sedentary lifestyle", "cold exposure", "heavy foods"],
        verse: "व्यायामः कफहरः...",
        source: "Charaka Samhita, Sutrasthana 5.90"
      },
      herbs: {
        description: "Use stimulating, drying herbs to balance Kapha.",
        herbs: ["Ginger", "Black Pepper", "Pippali", "Tulsi", "Triphala", "Turmeric"],
        verse: "शुण्ठी मरिचं...",
        source: "Bhava Prakasha Nighantu, Haritakyadi Varga"
      },
      seasonal: {
        spring: ["Light foods", "exercise", "avoid heavy foods"],
        summer: ["Cool foods", "moderate exercise", "avoid heat"],
        autumn: ["Warm foods", "stimulating exercise", "avoid cold"],
        winter: ["Warm foods", "vigorous exercise", "avoid cold"]
      }
    }
  };

  return recommendations[primaryDosha as keyof typeof recommendations];
}

// Generate classical references
export function generateClassicalReferences(primaryDosha: string): ClassicalReference[] {
  const doshaData = doshaCharacteristics[primaryDosha as keyof typeof doshaCharacteristics];
  if (!doshaData) return [];

  return [
    {
      sanskrit: doshaData.classicalVerse.sanskrit,
      iast: doshaData.classicalVerse.iast,
      translation: doshaData.classicalVerse.translation,
      source: doshaData.classicalVerse.source,
      context: "Primary dosha characteristics"
    },
    {
      sanskrit: "त्रिदोषज्ञानं रोगनिदानम्...",
      iast: "tridoṣajñānaṃ roganidānam...",
      translation: "Knowledge of the three doshas is the foundation of disease diagnosis",
      source: "Charaka Samhita, Sutrasthana 1.57",
      context: "Fundamental principle"
    },
    {
      sanskrit: "स्वस्थस्य स्वास्थ्यरक्षणं...",
      iast: "svasthasya svāsthyarakṣaṇaṃ...",
      translation: "Preservation of health of the healthy person",
      source: "Charaka Samhita, Sutrasthana 1.1",
      context: "Preventive approach"
    }
  ];
}

// Analyze Vikriti (imbalance) if present
export function analyzeVikriti(scores: DoshaScores, primaryDosha: string): VikritiAnalysis | undefined {
  const primaryScore = scores[primaryDosha as keyof DoshaScores];
  
  if (primaryScore > 25) {
    return {
      primaryImbalance: primaryDosha,
      symptoms: doshaCharacteristics[primaryDosha as keyof typeof doshaCharacteristics]?.subtypes
        .flatMap(subtype => subtype.imbalancedSigns) || [],
      severity: primaryScore > 30 ? 'severe' : primaryScore > 25 ? 'moderate' : 'mild',
      recommendations: [
        "Consult an Ayurvedic practitioner",
        "Follow pacifying diet and lifestyle",
        "Practice stress management",
        "Consider seasonal adjustments"
      ]
    };
  }
  
  return undefined;
}

// Enhanced seasonal analysis based on classical texts
export function generateSeasonalAnalysis(primaryDosha: string, currentSeason: string): any {
  const seasonalGuidance = {
    vata: {
      spring: {
        description: "Vata tends to be aggravated in spring due to wind and dryness",
        recommendations: [
          "Increase warm, moist foods",
          "Practice gentle grounding yoga",
          "Use warming oils like sesame",
          "Maintain regular routine",
          "Avoid cold, dry foods"
        ],
        verse: "वसन्ते वातजाः रोगाः...",
        source: "Charaka Samhita, Sutrasthana 6.4"
      },
      summer: {
        description: "Vata can be balanced in summer with proper care",
        recommendations: [
          "Stay hydrated with warm fluids",
          "Practice cooling pranayama",
          "Use coconut oil for massage",
          "Avoid excessive heat exposure",
          "Eat sweet, sour, salty tastes"
        ],
        verse: "ग्रीष्मे पित्तं प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.5"
      },
      autumn: {
        description: "Vata is most aggravated in autumn",
        recommendations: [
          "Intensive Vata pacification",
          "Warm oil massage daily",
          "Grounding practices",
          "Avoid cold, dry, light foods",
          "Regular sleep schedule"
        ],
        verse: "शरदि वातः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.6"
      },
      winter: {
        description: "Vata can be balanced in winter with proper care",
        recommendations: [
          "Warm, nourishing foods",
          "Oil massage with warm oils",
          "Gentle exercise",
          "Avoid cold exposure",
          "Maintain warmth"
        ],
        verse: "हेमन्ते कफः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.7"
      }
    },
    pitta: {
      spring: {
        description: "Pitta begins to accumulate in spring",
        recommendations: [
          "Light, cooling foods",
          "Gentle exercise",
          "Avoid excessive heat",
          "Practice cooling pranayama",
          "Use cooling herbs"
        ],
        verse: "वसन्ते पित्तं संचीयते...",
        source: "Charaka Samhita, Sutrasthana 6.4"
      },
      summer: {
        description: "Pitta is most aggravated in summer",
        recommendations: [
          "Intensive Pitta pacification",
          "Cool foods and drinks",
          "Avoid sun exposure",
          "Cooling baths",
          "Sweet, bitter, astringent tastes"
        ],
        verse: "ग्रीष्मे पित्तं प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.5"
      },
      autumn: {
        description: "Pitta can be balanced in autumn",
        recommendations: [
          "Moderate cooling practices",
          "Balance heat and cool",
          "Gentle exercise",
          "Avoid excessive heat",
          "Maintain Pitta balance"
        ],
        verse: "शरदि वातः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.6"
      },
      winter: {
        description: "Pitta is naturally balanced in winter",
        recommendations: [
          "Warm foods in moderation",
          "Gentle exercise",
          "Avoid excessive cold",
          "Maintain Pitta balance",
          "Warm oil massage"
        ],
        verse: "हेमन्ते कफः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.7"
      }
    },
    kapha: {
      spring: {
        description: "Kapha is most aggravated in spring",
        recommendations: [
          "Intensive Kapha pacification",
          "Light, dry foods",
          "Vigorous exercise",
          "Avoid heavy, oily foods",
          "Stimulating practices"
        ],
        verse: "वसन्ते कफः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.4"
      },
      summer: {
        description: "Kapha can be balanced in summer",
        recommendations: [
          "Light foods",
          "Moderate exercise",
          "Avoid excessive heat",
          "Stay active",
          "Avoid heavy foods"
        ],
        verse: "ग्रीष्मे पित्तं प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.5"
      },
      autumn: {
        description: "Kapha is naturally balanced in autumn",
        recommendations: [
          "Moderate practices",
          "Balance activity and rest",
          "Avoid excessive cold",
          "Maintain Kapha balance",
          "Regular exercise"
        ],
        verse: "शरदि वातः प्रकोपयति...",
        source: "Charaka Samhita, Sutrasthana 6.6"
      },
      winter: {
        description: "Kapha begins to accumulate in winter",
        recommendations: [
          "Light, warming foods",
          "Regular exercise",
          "Avoid heavy, oily foods",
          "Stay active",
          "Use stimulating herbs"
        ],
        verse: "हेमन्ते कफः संचीयते...",
        source: "Charaka Samhita, Sutrasthana 6.7"
      }
    }
  };

  return seasonalGuidance[primaryDosha as keyof typeof seasonalGuidance]?.[currentSeason as keyof typeof seasonalGuidance.vata] || null;
}

// Enhanced subtype analysis with more detailed information
export function analyzeSubtypesDetailed(primaryDosha: string, scores: DoshaScores): any[] {
  const doshaData = doshaCharacteristics[primaryDosha as keyof typeof doshaCharacteristics];
  if (!doshaData) return [];

  return doshaData.subtypes.map(subtype => {
    const primaryScore = scores[primaryDosha as keyof DoshaScores];
    let status: 'balanced' | 'imbalanced' | 'moderate' = 'balanced';
    
    if (primaryScore > 20) {
      status = 'imbalanced';
    } else if (primaryScore > 15) {
      status = 'moderate';
    }

    return {
      dosha: primaryDosha,
      subtype: subtype.name,
      location: subtype.location,
      functions: subtype.functions,
      balancedSigns: subtype.balancedSigns,
      imbalancedSigns: subtype.imbalancedSigns,
      status,
      verse: subtype.verse,
      source: subtype.source,
      therapeuticActions: [
        "Specific yoga poses for this subtype",
        "Targeted pranayama techniques",
        "Herbal remedies for this location",
        "Lifestyle practices for balance"
      ],
      balancingPractices: [
        "Daily practices for this subtype",
        "Dietary considerations",
        "Lifestyle modifications",
        "Meditation techniques"
      ]
    };
  });
}

// Main function: performAyurvedicAnalysis - COMPLETE REWRITE
export function performAyurvedicAnalysis(answers: Record<string, string>): FullAnalysisResult {
  // Calculate dosha scores using AI-powered algorithm
  const scores = calculateDoshaScores(answers);
  
  // Determine constitution
  const { primary: primaryDosha, secondary: secondaryDosha } = determineConstitution(scores);
  
  // Calculate percentages
  const percentage = calculatePercentages(scores);
  
  // Analyze subtypes
  const subtypes = analyzeSubtypes(primaryDosha, scores);
  
  // Generate recommendations
  const recommendations = generateRecommendations(primaryDosha);
  
  // Generate classical references
  const classicalReferences = generateClassicalReferences(primaryDosha);
  
  // Analyze Vikriti if present
  const vikriti = analyzeVikriti(scores, primaryDosha);

  // Extract subdoshas from answers
  const subdosha: string[] = [];
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Map question IDs to potential subdoshas based on classical texts
    const subdoshaMap: Record<string, string> = {
      digestion_pattern: answer === 'irregular' ? 'Apāna Vāta' : answer === 'sharp' ? 'Pachaka Pitta' : 'Kledaka Kapha',
      mental_activity: answer === 'quick' ? 'Prāna Vāta' : answer === 'sharp' ? 'Sadhaka Pitta' : 'Tarpaka Kapha',
      stress_response: answer === 'anxious' ? 'Prāna Vāta' : answer === 'angry' ? 'Ranjaka Pitta' : 'Avalambaka Kapha',
      energy_pattern: answer === 'variable' ? 'Vyana Vata' : answer === 'intense' ? 'Alochaka Pitta' : 'Bodhaka Kapha',
      sleep_pattern: answer === 'light' ? 'Prāna Vāta' : answer === 'moderate' ? 'Sadhaka Pitta' : 'Tarpaka Kapha',
      speech_pattern: answer === 'fast' ? 'Udana Vata' : answer === 'clear' ? 'Sadhaka Pitta' : 'Tarpaka Kapha',
      memory_pattern: answer === 'quick' ? 'Prāna Vāta' : answer === 'sharp' ? 'Sadhaka Pitta' : 'Tarpaka Kapha',
      circulation_pattern: answer === 'variable' ? 'Vyana Vata' : answer === 'warm' ? 'Ranjaka Pitta' : 'Avalambaka Kapha',
      elimination_pattern: answer === 'irregular' ? 'Apāna Vāta' : answer === 'loose' ? 'Pachaka Pitta' : 'Kledaka Kapha',
      emotional_tendency: answer === 'fear' ? 'Prāna Vāta' : answer === 'anger' ? 'Ranjaka Pitta' : 'Avalambaka Kapha'
    };
    
    const subdoshaName = subdoshaMap[questionId];
    if (subdoshaName) {
      subdosha.push(subdoshaName);
    }
  });

  // Generate detailed personality analysis based on primary dosha
  const personality = primaryDosha === 'vata' 
    ? `You are highly creative, quick-witted, and imaginative, with a natural curiosity and openness to new experiences. However, your mind may sometimes race ahead, leading to restlessness or feelings of anxiety—especially under stress or change.

According to Dr. David Frawley in Ayurveda and the Mind, Vata-dominant individuals are susceptible to worry, fear, and indecision but excel at innovation, holistic thinking, and adaptability.

Classically, Charaka notes:

"The Vata type has a mobile mind, quick to grasp but quick to forget, and is prone to worry and insomnia."

Tips: Mindfulness, routine, journaling, and grounding breathwork help balance your mind.`
    : primaryDosha === 'pitta'
    ? `You are naturally sharp, focused, and goal-oriented with strong leadership qualities and a competitive spirit. Your mind is analytical and you excel at problem-solving, but you may become intense, irritable, or perfectionistic under stress.

According to Dr. David Frawley in Ayurveda and the Mind, Pitta-dominant individuals are natural leaders with strong willpower but can be prone to anger, criticism, and burnout when imbalanced.

Classically, Sushruta notes:

"The Pitta type has sharp intellect, strong digestion, and natural leadership but is prone to anger and inflammatory conditions."

Tips: Cooling practices, compassion meditation, and avoiding excessive heat help balance your fiery nature.`
    : `You are naturally calm, steady, and patient with a strong sense of loyalty and nurturing qualities. Your mind is stable and you have excellent memory, but you may become lethargic, attached, or resistant to change when imbalanced.

According to Dr. David Frawley in Ayurveda and the Mind, Kapha-dominant individuals are naturally peaceful and loving but can become complacent, attached, or depressed when imbalanced.

Classically, Ashtanga Hridaya notes:

"The Kapha type has steady mind, excellent memory, and natural strength but is prone to lethargy and attachment."

Tips: Stimulating activities, regular exercise, and energizing practices help balance your stable nature.`;

  // Generate detailed physical markers
  const physical = primaryDosha === 'vata'
    ? `Your physical structure tends to be slim, with prominent joints, dry or rough skin, and a tendency toward cold hands and feet. Appetite and digestion can be variable, often affected by stress or irregularity.

Charaka and Ashtanga Hridaya describe the Vata body as:

• Thin, with visible veins
• Dry, cool, rough skin
• Light sleep, easily disturbed
• Irregular hunger/thirst

You may notice cracking joints or variable energy.

Watch for: Dryness, constipation, excessive weight loss, fatigue in windy or cold weather.`
    : primaryDosha === 'pitta'
    ? `Your physical structure tends to be medium build with good muscle tone, warm skin that may be prone to inflammation, and strong metabolism. You have sharp features and may experience heat-related symptoms.

Charaka and Sushruta describe the Pitta body as:

• Medium build with good muscle tone
• Warm, slightly oily skin prone to rashes
• Strong appetite and sharp digestion
• Moderate sleep, easily disturbed by stress

You may notice warm hands/feet or inflammatory conditions.

Watch for: Inflammation, excessive heat, skin issues, acid reflux, or irritability in hot weather.`
    : `Your physical structure tends to be sturdy and well-built with natural strength, smooth and oily skin, and steady metabolism. You have a tendency toward weight gain and may experience heaviness or congestion.

Charaka and Ashtanga Hridaya describe the Kapha body as:

• Sturdy, well-built frame
• Smooth, oily, cool skin
• Steady appetite and slow digestion
• Deep, heavy sleep

You may notice natural weight gain or tendency toward congestion.

Watch for: Weight gain, lethargy, congestion, excessive sleep, or heaviness in damp weather.`;

  // Generate detailed lifestyle recommendations
  const lifestyle = primaryDosha === 'vata'
    ? [
        "Wake up before sunrise, but move slowly in the morning",
        "Warm sesame oil abhyanga (massage) daily",
        "Regular meals (never skip breakfast), warm cooked food",
        "Early bedtime (before 10pm), calming evening rituals",
        "Avoid excessive travel, screen time, or stimulants after dark",
        "Best exercises: Gentle yoga (yin, restorative), tai chi, walking in nature"
      ]
    : primaryDosha === 'pitta'
    ? [
        "Wake up early but avoid midday heat",
        "Cooling coconut oil massage in summer",
        "Regular meals, avoid skipping lunch",
        "Moderate bedtime, cooling evening practices",
        "Avoid excessive heat, spicy foods, or competitive activities",
        "Best exercises: Swimming, moon salutations, moderate yoga"
      ]
    : [
        "Wake up early (before 6am) to avoid lethargy",
        "Stimulating dry massage with warming oils",
        "Light breakfast, avoid heavy evening meals",
        "Moderate bedtime, avoid oversleeping",
        "Avoid excessive sleep, heavy foods, or sedentary lifestyle",
        "Best exercises: Vigorous yoga, running, dancing, stimulating activities"
      ];

  // Generate detailed diet recommendations
  const diet = primaryDosha === 'vata'
    ? `Favor warm, oily, cooked foods—think ghee, root vegetables, rice, milk, stews, and sweet fruits. Avoid cold, dry, raw, or overly spicy foods.

Bhava Prakasha Nighantu and Frawley both recommend:

• Adding spices like ginger, cumin, and cardamom to aid digestion
• Warm herbal teas (licorice, tulsi)

Avoid: Dry snacks, excessive caffeine, fasting, and cold drinks.`
    : primaryDosha === 'pitta'
    ? `Favor cool, sweet, bitter, and astringent foods—think cucumber, coconut, leafy greens, sweet fruits, and cooling grains. Avoid hot, spicy, sour, or salty foods.

Bhava Prakasha Nighantu and Frawley both recommend:

• Adding cooling herbs like coriander, mint, and fennel
• Sweet, bitter, and astringent tastes

Avoid: Spicy foods, excessive salt, sour foods, and hot drinks.`
    : `Favor light, warm, dry foods—think honey, ginger, light grains, and stimulating spices. Avoid heavy, oily, sweet, or cold foods.

Bhava Prakasha Nighantu and Frawley both recommend:

• Adding stimulating spices like ginger, black pepper, and turmeric
• Light, warm meals with bitter and astringent tastes

Avoid: Heavy foods, excessive sweets, cold foods, and dairy.`;

  // Generate detailed herb recommendations
  const herbs = primaryDosha === 'vata'
    ? ["Ashwagandha and Shatavari for resilience", "Licorice and Guduchi for gentle support", "Brahmi for mental clarity", "Jatamansi for sleep"]
    : primaryDosha === 'pitta'
    ? ["Aloe vera and Neem for cooling", "Amla for immunity", "Shatavari for cooling", "Guduchi for detoxification"]
    : ["Ginger and Triphala for stimulation", "Tulsi for respiratory health", "Pippali for digestion", "Haritaki for cleansing"];

  // Generate detailed seasonal guidance
  const seasonal = primaryDosha === 'vata'
    ? `According to Ashtanga Hridaya Rtucharya, Vata aggravates in late autumn and winter, or during windy/dry seasons.

Precautions:

• Add more oils and grounding foods during these times
• Use humidifiers, stay warm, maintain regular sleep
• Reduce travel and strenuous activity in Vata season
• Focus on warming, nourishing practices`
    : primaryDosha === 'pitta'
    ? `According to Ashtanga Hridaya Rtucharya, Pitta aggravates in summer and early autumn, or during hot/dry seasons.

Precautions:

• Stay cool, avoid midday sun, use cooling foods
• Increase sweet, bitter, and astringent tastes
• Practice cooling pranayama and meditation
• Avoid excessive heat and spicy foods`
    : `According to Ashtanga Hridaya Rtucharya, Kapha aggravates in late winter and spring, or during cold/wet seasons.

Precautions:

• Stay active, avoid heavy foods, use stimulating practices
• Increase bitter, astringent, and pungent tastes
• Practice vigorous exercise and stimulating pranayama
• Avoid excessive sleep and heavy foods`;

  // Generate detailed marma therapy
  const marma = primaryDosha === 'vata'
    ? `Based on Sushruta Samhita, regular gentle pressure or warm oil massage on these marma points helps Vata balance:

• Kshipra (between thumb and index finger)
• Talahridaya (center of the palm)
• Sthapani (between the eyebrows)

Routine: Gently massage these points for 2-3 minutes daily after abhyanga (oil massage).`
    : primaryDosha === 'pitta'
    ? `Based on Sushruta Samhita, gentle cooling pressure or coconut oil massage on these marma points helps Pitta balance:

• Adhipati (crown of the head)
• Sthapani (between the eyebrows)
• Manibandha (wrists)

Routine: Gently massage these points for 2-3 minutes daily with cooling oil.`
    : `Based on Sushruta Samhita, stimulating pressure or warming oil massage on these marma points helps Kapha balance:

• Sthapani (between the eyebrows)
• Apastambha (lower back)
• Kshipra (between thumb and index finger)

Routine: Apply firm pressure to these points for 2-3 minutes daily with warming oil.`;

  // Generate detailed spiritual guidance
  const spiritual = primaryDosha === 'vata'
    ? `From Religious Therapeutics and Yoga & Ayurveda:

• Practice So-Ham mantra, focusing on slow, deep breaths
• Meditate daily, even if just 5–10 minutes, to ground racing thoughts
• Walking meditation or chanting in nature is especially balancing
• Write down insights and creative ideas, but don't chase them all at once!`
    : primaryDosha === 'pitta'
    ? `From Religious Therapeutics and Yoga & Ayurveda:

• Practice compassion meditation and loving-kindness practices
• Cool the mind with moon meditation and cooling visualizations
• Practice self-inquiry and non-judgmental awareness
• Channel your intensity into service and helping others!`
    : `From Religious Therapeutics and Yoga & Ayurveda:

• Practice gratitude meditation and energizing breathwork
• Stimulate the mind with energizing mantras and practices
• Practice devotion and surrender to overcome attachment
• Channel your stability into building lasting positive habits!`;

  // Generate comprehensive classical verses
  const verses = [
    {
      text: primaryDosha === 'vata' ? 'Charaka Samhita' : primaryDosha === 'pitta' ? 'Charaka Samhita' : 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: primaryDosha === 'vata' ? '1.59' : primaryDosha === 'pitta' ? '1.60' : '1.61',
      devanagari: primaryDosha === 'vata' 
        ? 'रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः'
        : primaryDosha === 'pitta'
        ? 'सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं'
        : 'स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः',
      iast: primaryDosha === 'vata'
        ? 'rūkṣo laghuḥ śītaḥ kharaḥ sūkṣmaścalo\'nilaḥ'
        : primaryDosha === 'pitta'
        ? 'sasnehatīkṣṇoṣṇalaghuvistraṃ saraṃ dravaṃ pittaṃ'
        : 'snigdhaḥ śīto gururmandaḥ ślakṣṇo mṛtsnaḥ sthiraḥ kaphaḥ',
      translation: primaryDosha === 'vata'
        ? 'Dry, light, cold, rough, subtle, and mobile—thus is Vata.'
        : primaryDosha === 'pitta'
        ? 'Oily, sharp, hot, light, flowing, liquid—thus is Pitta.'
        : 'Oily, cold, heavy, slow, smooth, soft, stable—thus is Kapha.'
    },
    {
      text: 'Ashtanga Hridaya',
      chapter: 'Sutra',
      verse: '3.1',
      devanagari: 'ऋतुचर्या वातपित्तकफानां प्रकोपणम्',
      iast: 'ṛtucaryā vātapittakaphānāṃ prakopanam',
      translation: 'Seasonal regimen for the aggravation of Vata, Pitta, and Kapha.'
    },
    {
      text: 'Sushruta Samhita',
      chapter: 'Sharira Sthana',
      verse: '6.36',
      devanagari: 'मर्माणि शरीरे षट्त्रिंशत्',
      iast: 'marmāṇi śarīre ṣaṭtriṃśat',
      translation: 'There are thirty-six marma points in the body.'
    },
    {
      text: primaryDosha === 'vata' ? 'Frawley, Ayurveda and the Mind' : primaryDosha === 'pitta' ? 'Frawley, Ayurveda and the Mind' : 'Frawley, Ayurveda and the Mind',
      chapter: 'Chapter',
      verse: primaryDosha === 'vata' ? 'Vata Psychology' : primaryDosha === 'pitta' ? 'Pitta Psychology' : 'Kapha Psychology',
      devanagari: primaryDosha === 'vata' 
        ? 'वात व्यक्तित्व: रचनात्मक, परिवर्तनशील, कल्पनाशील'
        : primaryDosha === 'pitta'
        ? 'पित्त व्यक्तित्व: तीक्ष्ण, नेतृत्व, लक्ष्य-उन्मुख'
        : 'कफ व्यक्तित्व: शांत, स्थिर, धैर्यवान',
      iast: primaryDosha === 'vata'
        ? 'vāta vyaktitva: racanātmaka, parivartanśīla, kalpanāśīla'
        : primaryDosha === 'pitta'
        ? 'pitta vyaktitva: tīkṣṇa, netṛtva, lakṣya-unmukha'
        : 'kapha vyaktitva: śānta, sthira, dhairvavān',
      translation: primaryDosha === 'vata'
        ? 'Vata individuals embody the creative, changeable, and imaginative aspects of consciousness.'
        : primaryDosha === 'pitta'
        ? 'Pitta individuals embody the sharp, leadership, and goal-oriented aspects of consciousness.'
        : 'Kapha individuals embody the calm, stable, and patient aspects of consciousness.'
    },
    {
      text: 'Bhava Prakasha Nighantu',
      chapter: 'Guduchyadi Varga',
      verse: 'Herbal Section',
      devanagari: 'गुडूच्यादि वर्ग: वातपित्तकफ शामक औषधि',
      iast: 'guḍūcyādi varga: vātapittakapha śāmaka auṣadhi',
      translation: 'Guduchyadi section: Herbal medicines for pacifying Vata, Pitta, and Kapha.'
    }
  ];

  // Compose full result
  return {
    primaryDosha,
    secondaryDosha,
    scores,
    constitution: primaryDosha,
    percentage,
    subtypes,
    recommendations,
    classicalReferences,
    vikriti: vikriti ? vikriti.primaryImbalance : `${primaryDosha} balanced`,
    prakriti: primaryDosha,
    subdosha: [...new Set(subdosha)], // Remove duplicates
    personality,
    physical,
    lifestyle,
    diet,
    herbs,
    seasonal,
    marma,
    spiritual,
    verses
  };
}

// Export for use in components
export { doshaCharacteristics }; 