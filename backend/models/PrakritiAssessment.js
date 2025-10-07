const mongoose = require('mongoose');

const prakritiAssessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessmentDate: {
    type: Date,
    default: Date.now
  },
  assessmentType: {
    type: String,
    enum: ['trividha_pariksha', 'ashtavidha_pariksha', 'comprehensive'],
    default: 'comprehensive'
  },
  
  // Physical Constitution (Sharirika Prakriti)
  physicalAssessment: {
    bodyFrame: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    weightTendency: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    skinTexture: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    hairQuality: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    nailQuality: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    eyeCharacteristics: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    }
  },

  // Physiological Patterns (Sharirika Kriya)
  physiologicalAssessment: {
    appetitePattern: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    digestion: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    elimination: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    climatePreference: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    energyPattern: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    sweatPattern: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    }
  },

  // Mental & Emotional (Manasika Prakriti)
  mentalAssessment: {
    learningStyle: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    memoryType: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    speechPattern: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    stressResponse: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    decisionMaking: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    dominantEmotions: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    }
  },

  // Lifestyle Patterns (Vihara Prakriti)
  lifestyleAssessment: {
    sleepPattern: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    activityPreference: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    workStyle: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    },
    socialStyle: {
      answer: String,
      score: { vata: Number, pitta: Number, kapha: Number },
      classicalReference: {
        text: String,
        verse: String,
        translation: String
      }
    }
  },

  // Visual Analysis (Optional)
  visualAnalysis: {
    photos: [{
      type: String, // Base64 encoded images
      analysisType: {
        type: String,
        enum: ['tongue', 'face', 'eyes', 'skin', 'general']
      },
      doshaIndicators: [{
        dosha: String,
        confidence: Number,
        classicalReference: {
          text: String,
          verse: String,
          translation: String
        }
      }]
    }]
  },

  // Results
  results: {
    prakriti: {
      primaryDosha: String,
      secondaryDosha: String,
      constitution: String,
      scores: {
        vata: Number,
        pitta: Number,
        kapha: Number
      },
      percentages: {
        vata: Number,
        pitta: Number,
        kapha: Number
      }
    },
    vikriti: {
      currentImbalance: String,
      symptoms: [String],
      recommendations: [String]
    },
    classicalReferences: [{
      text: String,
      chapter: String,
      verse: String,
      relevance: String,
      sanskritVerse: String,
      englishTranslation: String
    }],
    recommendations: {
      diet: [{
        category: String,
        foods: [String],
        classicalReference: {
          text: String,
          verse: String
        }
      }],
      lifestyle: [{
        category: String,
        practices: [String],
        classicalReference: {
          text: String,
          verse: String
        }
      }],
      herbs: [{
        category: String,
        herbs: [String],
        classicalReference: {
          text: String,
          verse: String
        }
      }],
      yoga: [{
        category: String,
        asanas: [String],
        classicalReference: {
          text: String,
          verse: String
        }
      }]
    }
  },

  // Assessment metadata
  assessmentVersion: {
    type: String,
    default: '1.0.0'
  },
  classicalTextsUsed: [{
    text: String,
    chapters: [String],
    verses: [String]
  }],
  confidenceScore: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
prakritiAssessmentSchema.index({ userId: 1, assessmentDate: -1 });
prakritiAssessmentSchema.index({ 'results.prakriti.primaryDosha': 1 });
prakritiAssessmentSchema.index({ assessmentType: 1 });

module.exports = mongoose.model('PrakritiAssessment', prakritiAssessmentSchema); 