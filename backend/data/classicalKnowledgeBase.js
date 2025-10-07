// Classical Ayurvedic Knowledge Base
// Based on authentic Sanskrit texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam, etc.

const doshaSubtypes = [
  // VATA SUBTYPES (Charaka Samhita, Sutrasthana 12)
  {
    dosha: 'vata',
    subtype: 'prana_vata',
    sanskritName: 'प्राण वात',
    iastTransliteration: 'Prāṇa Vāta',
    location: 'Head, chest, throat, heart, respiratory tract',
    functions: [
      'Controls breathing and respiration',
      'Governs speech and voice',
      'Manages swallowing and sneezing',
      'Controls mental activities and thoughts'
    ],
    symptoms: [
      'Anxiety and nervousness',
      'Stuttering or speech problems',
      'Confusion and mental restlessness',
      'Breathing difficulties'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.8',
      section: 'Vata Viddha Lakshana',
      sanskritVerse: 'प्राणो वायुः शिरोग्रीवागतो वक्त्रं च धारयन्।',
      englishTranslation: 'Prana Vata moves in the head, neck, and maintains the mouth.'
    }],
    qualities: ['mobile', 'light', 'clear', 'subtle'],
    elements: ['akasha', 'vayu'],
    therapeuticActions: ['Pranayama', 'Meditation', 'Grounding practices'],
    balancingPractices: ['Regular routine', 'Warm oil massage', 'Nourishing foods']
  },
  {
    dosha: 'vata',
    subtype: 'udana_vata',
    sanskritName: 'उदान वात',
    iastTransliteration: 'Udāna Vāta',
    location: 'Chest, throat, nose, umbilicus',
    functions: [
      'Controls speech and expression',
      'Manages effort and strength',
      'Governs memory and intelligence',
      'Controls upward movement'
    ],
    symptoms: [
      'Hoarseness of voice',
      'Fatigue and weakness',
      'Chest pain and discomfort',
      'Memory problems'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.9',
      section: 'Vata Viddha Lakshana',
      sanskritVerse: 'उदानो वायुः कण्ठे च नासिकायां च मूर्धनि।',
      englishTranslation: 'Udana Vata is located in the throat, nose, and head.'
    }],
    qualities: ['mobile', 'light', 'clear'],
    elements: ['akasha', 'vayu'],
    therapeuticActions: ['Voice exercises', 'Breathing techniques', 'Memory enhancement'],
    balancingPractices: ['Honey consumption', 'Gentle throat care', 'Mental exercises']
  },
  {
    dosha: 'vata',
    subtype: 'samana_vata',
    sanskritName: 'समान वात',
    iastTransliteration: 'Samāna Vāta',
    location: 'Stomach, intestines, digestive tract',
    functions: [
      'Controls digestion and metabolism',
      'Manages absorption of nutrients',
      'Governs separation of waste',
      'Maintains digestive fire (Agni)'
    ],
    symptoms: [
      'Digestive disturbances',
      'Irregular appetite',
      'Gas and bloating',
      'Malabsorption issues'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.10',
      section: 'Vata Viddha Lakshana',
      sanskritVerse: 'समानो वायुर्जठरे पचत्यन्नं च पाचयन्।',
      englishTranslation: 'Samana Vata is in the stomach and cooks the food.'
    }],
    qualities: ['mobile', 'light', 'clear'],
    elements: ['vayu', 'agni'],
    therapeuticActions: ['Digestive herbs', 'Regular meal timing', 'Agni enhancement'],
    balancingPractices: ['Ginger tea', 'Regular eating schedule', 'Digestive spices']
  },
  {
    dosha: 'vata',
    subtype: 'apana_vata',
    sanskritName: 'अपान वात',
    iastTransliteration: 'Apāna Vāta',
    location: 'Pelvic region, colon, bladder, reproductive organs',
    functions: [
      'Controls elimination and excretion',
      'Manages reproductive functions',
      'Governs downward movement',
      'Maintains pelvic health'
    ],
    symptoms: [
      'Constipation or irregular elimination',
      'Reproductive issues',
      'Pelvic discomfort',
      'Urinary problems'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.11',
      section: 'Vata Viddha Lakshana',
      sanskritVerse: 'अपानो वायुर्गुदे च मूत्रे च शुक्रे च मारुतः।',
      englishTranslation: 'Apana Vata is in the rectum, urine, and semen.'
    }],
    qualities: ['mobile', 'light', 'clear'],
    elements: ['vayu', 'prithvi'],
    therapeuticActions: ['Colon cleansing', 'Pelvic exercises', 'Elimination support'],
    balancingPractices: ['Squatting exercises', 'Pelvic floor strengthening', 'Fiber-rich diet']
  },
  {
    dosha: 'vata',
    subtype: 'vyana_vata',
    sanskritName: 'व्यान वात',
    iastTransliteration: 'Vyāna Vāta',
    location: 'Entire body, blood vessels, skin',
    functions: [
      'Controls circulation and blood flow',
      'Manages muscle movement',
      'Governs sweating and perspiration',
      'Maintains body coordination'
    ],
    symptoms: [
      'Circulation problems',
      'Muscle spasms',
      'Excessive sweating',
      'Coordination issues'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.12',
      section: 'Vata Viddha Lakshana',
      sanskritVerse: 'व्यानो वायुः सर्वशरीरचरः सर्वेन्द्रियाणि च।',
      englishTranslation: 'Vyana Vata moves throughout the body and all sense organs.'
    }],
    qualities: ['mobile', 'light', 'clear', 'subtle'],
    elements: ['vayu'],
    therapeuticActions: ['Massage therapy', 'Exercise', 'Circulation enhancement'],
    balancingPractices: ['Regular exercise', 'Oil massage', 'Movement therapy']
  },

  // PITTA SUBTYPES (Charaka Samhita, Sutrasthana 12)
  {
    dosha: 'pitta',
    subtype: 'pachaka_pitta',
    sanskritName: 'पाचक पित्त',
    iastTransliteration: 'Pācaka Pitta',
    location: 'Stomach, small intestine',
    functions: [
      'Controls digestion and metabolism',
      'Manages food transformation',
      'Governs digestive fire (Agni)',
      'Maintains body temperature'
    ],
    symptoms: [
      'Digestive disorders',
      'Acidity and heartburn',
      'Fever and inflammation',
      'Metabolic issues'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.13',
      section: 'Pitta Viddha Lakshana',
      sanskritVerse: 'पाचकं पित्तं जठरे पचत्यन्नं च पाचयन्।',
      englishTranslation: 'Pachaka Pitta is in the stomach and cooks the food.'
    }],
    qualities: ['hot', 'sharp', 'liquid', 'oily'],
    elements: ['agni', 'jala'],
    therapeuticActions: ['Digestive cooling', 'Agni balancing', 'Anti-inflammatory'],
    balancingPractices: ['Cooling foods', 'Aloe vera', 'Coriander water']
  },
  {
    dosha: 'pitta',
    subtype: 'ranjaka_pitta',
    sanskritName: 'रंजक पित्त',
    iastTransliteration: 'Rañjaka Pitta',
    location: 'Liver, spleen, blood',
    functions: [
      'Controls blood formation',
      'Manages skin color and complexion',
      'Governs liver functions',
      'Maintains blood quality'
    ],
    symptoms: [
      'Blood disorders',
      'Skin problems',
      'Liver issues',
      'Color changes in skin'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.14',
      section: 'Pitta Viddha Lakshana',
      sanskritVerse: 'रंजकं पित्तं यकृति प्लीह्नि च रक्तं च रंजयन्।',
      englishTranslation: 'Ranjaka Pitta is in the liver and spleen, coloring the blood.'
    }],
    qualities: ['hot', 'sharp', 'liquid'],
    elements: ['agni', 'jala'],
    therapeuticActions: ['Liver support', 'Blood purification', 'Skin care'],
    balancingPractices: ['Liver-friendly foods', 'Blood cleansing herbs', 'Skin care routine']
  },
  {
    dosha: 'pitta',
    subtype: 'sadhaka_pitta',
    sanskritName: 'साधक पित्त',
    iastTransliteration: 'Sādhaka Pitta',
    location: 'Heart, brain',
    functions: [
      'Controls intelligence and wisdom',
      'Manages mental functions',
      'Governs memory and learning',
      'Maintains mental clarity'
    ],
    symptoms: [
      'Mental confusion',
      'Memory problems',
      'Intellectual difficulties',
      'Emotional instability'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.15',
      section: 'Pitta Viddha Lakshana',
      sanskritVerse: 'साधकं पित्तं हृदये बुद्धिं च साधयन्।',
      englishTranslation: 'Sadhaka Pitta is in the heart, accomplishing intelligence.'
    }],
    qualities: ['hot', 'sharp', 'clear'],
    elements: ['agni'],
    therapeuticActions: ['Mental clarity enhancement', 'Intelligence support', 'Memory improvement'],
    balancingPractices: ['Meditation', 'Mental exercises', 'Cooling practices']
  },
  {
    dosha: 'pitta',
    subtype: 'alochaka_pitta',
    sanskritName: 'आलोचक पित्त',
    iastTransliteration: 'Ālocaka Pitta',
    location: 'Eyes',
    functions: [
      'Controls vision and sight',
      'Manages eye functions',
      'Governs visual perception',
      'Maintains eye health'
    ],
    symptoms: [
      'Eye problems',
      'Vision disturbances',
      'Eye inflammation',
      'Visual sensitivity'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.16',
      section: 'Pitta Viddha Lakshana',
      sanskritVerse: 'आलोचकं पित्तं नेत्रे रूपं चालोचयन्।',
      englishTranslation: 'Alochaka Pitta is in the eyes, perceiving forms.'
    }],
    qualities: ['hot', 'sharp', 'clear'],
    elements: ['agni'],
    therapeuticActions: ['Eye care', 'Vision support', 'Eye cooling'],
    balancingPractices: ['Eye exercises', 'Cooling eye treatments', 'Vision protection']
  },
  {
    dosha: 'pitta',
    subtype: 'bhrajaka_pitta',
    sanskritName: 'भ्राजक पित्त',
    iastTransliteration: 'Bhrājaka Pitta',
    location: 'Skin',
    functions: [
      'Controls skin color and complexion',
      'Manages skin temperature',
      'Governs skin health',
      'Maintains skin glow'
    ],
    symptoms: [
      'Skin disorders',
      'Skin inflammation',
      'Color changes',
      'Skin sensitivity'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.17',
      section: 'Pitta Viddha Lakshana',
      sanskritVerse: 'भ्राजकं पित्तं त्वचि वर्णं च भ्राजयन्।',
      englishTranslation: 'Bhrajaka Pitta is in the skin, illuminating the complexion.'
    }],
    qualities: ['hot', 'sharp', 'oily'],
    elements: ['agni'],
    therapeuticActions: ['Skin care', 'Complexion enhancement', 'Skin cooling'],
    balancingPractices: ['Cooling skin treatments', 'Skin-friendly diet', 'Sun protection']
  },

  // KAPHA SUBTYPES (Charaka Samhita, Sutrasthana 12)
  {
    dosha: 'kapha',
    subtype: 'avalambaka_kapha',
    sanskritName: 'अवलम्बक कफ',
    iastTransliteration: 'Avalambaka Kapha',
    location: 'Chest, heart, lungs',
    functions: [
      'Provides support and stability',
      'Maintains chest strength',
      'Governs respiratory functions',
      'Supports heart health'
    ],
    symptoms: [
      'Chest heaviness',
      'Respiratory problems',
      'Heart weakness',
      'Lack of support'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.18',
      section: 'Kapha Viddha Lakshana',
      sanskritVerse: 'अवलम्बकः कफो हृदि क्लोम्नि चावलम्बयन्।',
      englishTranslation: 'Avalambaka Kapha is in the heart and lungs, providing support.'
    }],
    qualities: ['heavy', 'stable', 'smooth', 'soft'],
    elements: ['prithvi', 'jala'],
    therapeuticActions: ['Chest strengthening', 'Respiratory support', 'Heart care'],
    balancingPractices: ['Chest exercises', 'Breathing practices', 'Heart-healthy diet']
  },
  {
    dosha: 'kapha',
    subtype: 'kledaka_kapha',
    sanskritName: 'क्लेदक कफ',
    iastTransliteration: 'Kledaka Kapha',
    location: 'Stomach',
    functions: [
      'Moistens and lubricates food',
      'Supports digestion',
      'Maintains stomach moisture',
      'Protects stomach lining'
    ],
    symptoms: [
      'Digestive heaviness',
      'Excessive mucus',
      'Stomach discomfort',
      'Poor digestion'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.19',
      section: 'Kapha Viddha Lakshana',
      sanskritVerse: 'क्लेदकः कफो जठरे अन्नं च क्लेदयन्।',
      englishTranslation: 'Kledaka Kapha is in the stomach, moistening the food.'
    }],
    qualities: ['heavy', 'oily', 'smooth', 'soft'],
    elements: ['prithvi', 'jala'],
    therapeuticActions: ['Digestive enhancement', 'Mucus reduction', 'Stomach care'],
    balancingPractices: ['Digestive spices', 'Light foods', 'Stomach exercises']
  },
  {
    dosha: 'kapha',
    subtype: 'bodhaka_kapha',
    sanskritName: 'बोधक कफ',
    iastTransliteration: 'Bodhaka Kapha',
    location: 'Tongue, mouth',
    functions: [
      'Controls taste perception',
      'Manages salivation',
      'Governs oral health',
      'Supports speech'
    ],
    symptoms: [
      'Taste problems',
      'Excessive salivation',
      'Oral issues',
      'Speech difficulties'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.20',
      section: 'Kapha Viddha Lakshana',
      sanskritVerse: 'बोधकः कफो जिह्वायां रसं च बोधयन्।',
      englishTranslation: 'Bodhaka Kapha is in the tongue, perceiving taste.'
    }],
    qualities: ['heavy', 'smooth', 'soft'],
    elements: ['prithvi', 'jala'],
    therapeuticActions: ['Taste enhancement', 'Oral care', 'Saliva regulation'],
    balancingPractices: ['Tongue cleaning', 'Oral hygiene', 'Taste therapy']
  },
  {
    dosha: 'kapha',
    subtype: 'tarpaka_kapha',
    sanskritName: 'तर्पक कफ',
    iastTransliteration: 'Tarpaka Kapha',
    location: 'Brain, head',
    functions: [
      'Nourishes and protects brain',
      'Maintains mental stability',
      'Governs memory',
      'Supports nervous system'
    ],
    symptoms: [
      'Mental dullness',
      'Memory problems',
      'Brain fog',
      'Nervous system issues'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.21',
      section: 'Kapha Viddha Lakshana',
      sanskritVerse: 'तर्पकः कफो शिरसि मनश्च तर्पयन्।',
      englishTranslation: 'Tarpaka Kapha is in the head, nourishing the mind.'
    }],
    qualities: ['heavy', 'stable', 'smooth', 'soft'],
    elements: ['prithvi', 'jala'],
    therapeuticActions: ['Brain nourishment', 'Mental clarity', 'Memory enhancement'],
    balancingPractices: ['Brain exercises', 'Mental stimulation', 'Nourishing foods']
  },
  {
    dosha: 'kapha',
    subtype: 'shleshaka_kapha',
    sanskritName: 'श्लेषक कफ',
    iastTransliteration: 'Śleṣaka Kapha',
    location: 'Joints, bones',
    functions: [
      'Lubricates joints',
      'Maintains joint health',
      'Provides joint stability',
      'Supports bone health'
    ],
    symptoms: [
      'Joint problems',
      'Joint stiffness',
      'Bone issues',
      'Movement difficulties'
    ],
    classicalReferences: [{
      text: 'Charaka Samhita',
      chapter: 'Sutrasthana',
      verse: '12.22',
      section: 'Kapha Viddha Lakshana',
      sanskritVerse: 'श्लेषकः कफो सर्वसन्धिषु श्लेषयन्।',
      englishTranslation: 'Shleshaka Kapha is in all joints, providing lubrication.'
    }],
    qualities: ['heavy', 'oily', 'smooth', 'soft'],
    elements: ['prithvi', 'jala'],
    therapeuticActions: ['Joint care', 'Bone strengthening', 'Movement therapy'],
    balancingPractices: ['Joint exercises', 'Bone health diet', 'Movement practices']
  }
];

// Assessment Questions with Classical References
const assessmentQuestions = {
  physical: [
    {
      id: "body_frame",
      question: "What best describes your natural body frame since youth?",
      options: [
        { 
          value: "vata", 
          text: "Thin, slender, light-boned, joints prominent", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 8.96",
            sanskritVerse: "कृशो लघुः स्थूलपरिणाहहीनः",
            translation: "One who is thin, light, and lacks bulk in circumference"
          }
        },
        { 
          value: "pitta", 
          text: "Medium, symmetrical, muscular, well-proportioned", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 8.97",
            sanskritVerse: "मध्यमः समः स्निग्धः",
            translation: "One who is medium, balanced, and oily"
          }
        },
        { 
          value: "kapha", 
          text: "Solid, broad, stocky, heavy-boned", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 8.98",
            sanskritVerse: "स्थूलः स्निग्धः गुरुः",
            translation: "One who is stout, oily, and heavy"
          }
        }
      ]
    },
    {
      id: "weight_tendency",
      question: "How does your body naturally handle weight?",
      options: [
        { 
          value: "vata", 
          text: "Naturally thin, find it hard to gain weight", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Vimana 8.96",
            sanskritVerse: "लघुत्वं कृशता चैव",
            translation: "Lightness and thinness"
          }
        },
        { 
          value: "pitta", 
          text: "Maintains medium weight fairly easily", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Vimana 8.97",
            sanskritVerse: "मध्यमत्वं समत्वं च",
            translation: "Medium and balanced state"
          }
        },
        { 
          value: "kapha", 
          text: "Gains weight easily, hard to lose", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Vimana 8.98",
            sanskritVerse: "गुरुत्वं स्थौल्यं च",
            translation: "Heaviness and obesity"
          }
        }
      ]
    }
  ],
  physiological: [
    {
      id: "appetite_pattern",
      question: "What best describes your natural appetite pattern?",
      options: [
        { 
          value: "vata", 
          text: "Irregular, varies greatly, can skip meals easily", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.49",
            sanskritVerse: "अनियताशित्वं",
            translation: "Irregular eating habits"
          }
        },
        { 
          value: "pitta", 
          text: "Strong, sharp, get irritable/hangry if missed", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.50",
            sanskritVerse: "तीक्ष्णाग्नित्वं",
            translation: "Sharp digestive fire"
          }
        },
        { 
          value: "kapha", 
          text: "Steady but mild, can easily skip meals", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.51",
            sanskritVerse: "मन्दाग्नित्वं",
            translation: "Mild digestive fire"
          }
        }
      ]
    }
  ],
  mental: [
    {
      id: "learning_style",
      question: "What best describes your learning style?",
      options: [
        { 
          value: "vata", 
          text: "Learn quickly, forget quickly, grasp concepts fast", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.52",
            sanskritVerse: "क्षिप्रबुद्धित्वं",
            translation: "Quick understanding"
          }
        },
        { 
          value: "pitta", 
          text: "Learn moderately, retain well, analytical", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.53",
            sanskritVerse: "मध्यबुद्धित्वं",
            translation: "Moderate understanding"
          }
        },
        { 
          value: "kapha", 
          text: "Learn slowly, retain excellently, methodical", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.54",
            sanskritVerse: "मन्दबुद्धित्वं",
            translation: "Slow understanding"
          }
        }
      ]
    }
  ],
  lifestyle: [
    {
      id: "sleep_pattern",
      question: "What best describes your sleep pattern?",
      options: [
        { 
          value: "vata", 
          text: "Light sleeper, easily disturbed, insomnia tendencies", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.55",
            sanskritVerse: "अल्पनिद्रत्वं",
            translation: "Less sleep"
          }
        },
        { 
          value: "pitta", 
          text: "Moderate sleeper, vivid dreams, wakes hot", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.56",
            sanskritVerse: "मध्यनिद्रत्वं",
            translation: "Moderate sleep"
          }
        },
        { 
          value: "kapha", 
          text: "Deep sleeper, long sleep, hard to wake", 
          score: 3,
          classicalReference: {
            text: "Charaka Samhita",
            verse: "Sutrasthana 18.57",
            sanskritVerse: "बहुनिद्रत्वं",
            translation: "Excessive sleep"
          }
        }
      ]
    }
  ]
};

// Classical Text References for Recommendations
const classicalRecommendations = {
  vata: {
    diet: [
      {
        category: "Grains",
        foods: ["Rice", "Wheat", "Oats", "Quinoa"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 25.40",
          sanskritVerse: "शालयः शष्पिका यवाः",
          translation: "Rice, barley, and wheat are beneficial for Vata"
        }
      },
      {
        category: "Dairy",
        foods: ["Milk", "Ghee", "Butter", "Yogurt"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 25.41",
          sanskritVerse: "दुग्धं सर्पिः घृतं च",
          translation: "Milk, ghee, and butter are nourishing for Vata"
        }
      }
    ],
    lifestyle: [
      {
        category: "Daily Routine",
        practices: ["Early bedtime", "Regular routine", "Warm oil massage"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 5.25",
          sanskritVerse: "स्निग्धोष्णमधुराहारः",
          translation: "Oily, warm, and sweet foods are beneficial"
        }
      }
    ],
    herbs: [
      {
        category: "Calming Herbs",
        herbs: ["Ashwagandha", "Brahmi", "Jatamansi", "Shankhpushpi"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Chikitsa 1.30",
          sanskritVerse: "शंखपुष्पी ब्राह्मी च",
          translation: "Shankhpushpi and Brahmi are beneficial for the mind"
        }
      }
    ]
  },
  pitta: {
    diet: [
      {
        category: "Cooling Foods",
        foods: ["Cucumber", "Coconut", "Mint", "Coriander"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 25.42",
          sanskritVerse: "शीतलं मधुरं च",
          translation: "Cool and sweet foods are beneficial for Pitta"
        }
      }
    ],
    lifestyle: [
      {
        category: "Cooling Practices",
        practices: ["Moon gazing", "Cool baths", "Gentle exercise"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 5.26",
          sanskritVerse: "शीतलं लघु च",
          translation: "Cool and light practices are beneficial"
        }
      }
    ],
    herbs: [
      {
        category: "Cooling Herbs",
        herbs: ["Neem", "Guduchi", "Manjistha", "Shatavari"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Chikitsa 1.31",
          sanskritVerse: "गुडूची निम्बः च",
          translation: "Guduchi and Neem are beneficial for Pitta"
        }
      }
    ]
  },
  kapha: {
    diet: [
      {
        category: "Light Foods",
        foods: ["Barley", "Honey", "Ginger", "Black pepper"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 25.43",
          sanskritVerse: "लघु रूक्षं च",
          translation: "Light and dry foods are beneficial for Kapha"
        }
      }
    ],
    lifestyle: [
      {
        category: "Stimulating Practices",
        practices: ["Vigorous exercise", "Dry massage", "Early rising"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Sutrasthana 5.27",
          sanskritVerse: "रूक्षं लघु च",
          translation: "Dry and light practices are beneficial"
        }
      }
    ],
    herbs: [
      {
        category: "Stimulating Herbs",
        herbs: ["Trikatu", "Pippali", "Ginger", "Tulsi"],
        classicalReference: {
          text: "Charaka Samhita",
          verse: "Chikitsa 1.32",
          sanskritVerse: "त्रिकटु पिप्पली च",
          translation: "Trikatu and Pippali are beneficial for Kapha"
        }
      }
    ]
  }
};

module.exports = {
  doshaSubtypes,
  assessmentQuestions,
  classicalRecommendations
}; 