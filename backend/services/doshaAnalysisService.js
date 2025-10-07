const DoshaSubtype = require('../models/DoshaSubtype');
const PrakritiAssessment = require('../models/PrakritiAssessment');
const { assessmentQuestions, classicalRecommendations } = require('../data/classicalKnowledgeBase');

class DoshaAnalysisService {
  
  /**
   * Calculate dosha scores based on classical Ayurvedic principles
   * @param {Object} answers - User's assessment answers
   * @returns {Object} - Dosha scores and analysis
   */
  calculateDoshaScores(answers) {
    let scores = { vata: 0, pitta: 0, kapha: 0 };
    let classicalReferences = [];
    let confidenceFactors = [];

    // Process each category of questions
    Object.keys(assessmentQuestions).forEach(category => {
      assessmentQuestions[category].forEach(question => {
        const answer = answers[question.id];
        if (answer) {
          const selectedOption = question.options.find(opt => opt.value === answer);
          if (selectedOption) {
            // Add scores
            scores[selectedOption.value] += selectedOption.score;
            
            // Collect classical references
            if (selectedOption.classicalReference) {
              classicalReferences.push({
                question: question.question,
                answer: selectedOption.text,
                reference: selectedOption.classicalReference
              });
            }

            // Calculate confidence factor based on question weight
            confidenceFactors.push(selectedOption.score);
          }
        }
      });
    });

    // Calculate percentages
    const totalScore = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / totalScore) * 100),
      pitta: Math.round((scores.pitta / totalScore) * 100),
      kapha: Math.round((scores.kapha / totalScore) * 100)
    };

    // Determine primary and secondary doshas
    const doshaArray = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const primaryDosha = doshaArray[0][0];
    const secondaryDosha = doshaArray[1][0];
    const constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}-${secondaryDosha.charAt(0).toUpperCase() + secondaryDosha.slice(1)}`;

    // Calculate confidence score
    const confidenceScore = Math.min(100, Math.max(0, 
      (confidenceFactors.reduce((a, b) => a + b, 0) / confidenceFactors.length) * 20
    ));

    return {
      scores,
      percentages,
      primaryDosha,
      secondaryDosha,
      constitution,
      classicalReferences,
      confidenceScore
    };
  }

  /**
   * Analyze visual indicators from uploaded photos
   * @param {Array} photos - Array of base64 encoded photos
   * @returns {Object} - Visual analysis results
   */
  async analyzeVisualIndicators(photos) {
    const visualAnalysis = {
      doshaIndicators: [],
      confidence: 0,
      classicalReferences: []
    };

    // Classical visual indicators based on Charaka Samhita
    const visualIndicators = {
      vata: {
        skin: ['dry', 'rough', 'cold'],
        eyes: ['small', 'active', 'dry'],
        hair: ['dry', 'coarse', 'thin'],
        classicalReference: {
          text: 'Charaka Samhita',
          verse: 'Vimana 8.96',
          sanskritVerse: 'रूक्षं लघु शीतं च',
          translation: 'Dry, light, and cold characteristics'
        }
      },
      pitta: {
        skin: ['warm', 'sensitive', 'reddish'],
        eyes: ['medium', 'intense', 'penetrating'],
        hair: ['fine', 'straight', 'oily'],
        classicalReference: {
          text: 'Charaka Samhita',
          verse: 'Vimana 8.97',
          sanskritVerse: 'उष्णं तीक्ष्णं रक्तं च',
          translation: 'Hot, sharp, and red characteristics'
        }
      },
      kapha: {
        skin: ['thick', 'smooth', 'cool'],
        eyes: ['large', 'calm', 'moist'],
        hair: ['thick', 'wavy', 'oily'],
        classicalReference: {
          text: 'Charaka Samhita',
          verse: 'Vimana 8.98',
          sanskritVerse: 'स्निग्धं गुरु शीतं च',
          translation: 'Oily, heavy, and cold characteristics'
        }
      }
    };

    // For now, return basic analysis
    // In a full implementation, this would use AI/ML for image analysis
    photos.forEach((photo, index) => {
      // Simulate analysis based on classical indicators
      const analysis = {
        photoIndex: index,
        analysisType: 'general',
        doshaIndicators: [
          {
            dosha: 'vata',
            confidence: Math.random() * 0.3 + 0.1,
            classicalReference: visualIndicators.vata.classicalReference
          },
          {
            dosha: 'pitta',
            confidence: Math.random() * 0.3 + 0.1,
            classicalReference: visualIndicators.pitta.classicalReference
          },
          {
            dosha: 'kapha',
            confidence: Math.random() * 0.3 + 0.1,
            classicalReference: visualIndicators.kapha.classicalReference
          }
        ]
      };
      visualAnalysis.doshaIndicators.push(analysis);
    });

    return visualAnalysis;
  }

  /**
   * Generate personalized recommendations based on classical texts
   * @param {Object} analysis - Dosha analysis results
   * @returns {Object} - Personalized recommendations
   */
  generateRecommendations(analysis) {
    const { primaryDosha, secondaryDosha, constitution } = analysis;
    
    const recommendations = {
      diet: [],
      lifestyle: [],
      herbs: [],
      yoga: [],
      classicalReferences: []
    };

    // Get recommendations for primary dosha
    if (classicalRecommendations[primaryDosha]) {
      recommendations.diet.push(...classicalRecommendations[primaryDosha].diet);
      recommendations.lifestyle.push(...classicalRecommendations[primaryDosha].lifestyle);
      recommendations.herbs.push(...classicalRecommendations[primaryDosha].herbs);
    }

    // Add yoga recommendations based on classical texts
    const yogaRecommendations = this.getYogaRecommendations(primaryDosha);
    recommendations.yoga.push(...yogaRecommendations);

    // Add classical references
    recommendations.classicalReferences = this.getClassicalReferences(constitution);

    return recommendations;
  }

  /**
   * Get yoga recommendations based on classical texts
   * @param {string} dosha - Primary dosha
   * @returns {Array} - Yoga recommendations
   */
  getYogaRecommendations(dosha) {
    const yogaRecommendations = {
      vata: [
        {
          category: "Grounding Asanas",
          asanas: ["Tadasana", "Vrikshasana", "Balasana", "Sukhasana"],
          classicalReference: {
            text: "Hatha Yoga Pradipika",
            verse: "1.17",
            sanskritVerse: "स्थिरं सुखं आसनं",
            translation: "Steady and comfortable posture"
          }
        },
        {
          category: "Calming Pranayama",
          practices: ["Nadi Shodhana", "Bhramari", "Sheetali"],
          classicalReference: {
            text: "Hatha Yoga Pradipika",
            verse: "2.5",
            sanskritVerse: "प्राणायामेन मलशोधनं",
            translation: "Purification through pranayama"
          }
        }
      ],
      pitta: [
        {
          category: "Cooling Asanas",
          asanas: ["Chandra Namaskara", "Shitali Pranayama", "Sheetkari"],
          classicalReference: {
            text: "Hatha Yoga Pradipika",
            verse: "2.54",
            sanskritVerse: "शीतली शीतकरी चैव",
            translation: "Cooling breath practices"
          }
        }
      ],
      kapha: [
        {
          category: "Energizing Asanas",
          asanas: ["Surya Namaskara", "Bhujangasana", "Dhanurasana"],
          classicalReference: {
            text: "Hatha Yoga Pradipika",
            verse: "1.27",
            sanskritVerse: "उद्योगं कुरुते",
            translation: "Generates energy and activity"
          }
        }
      ]
    };

    return yogaRecommendations[dosha] || [];
  }

  /**
   * Get classical text references for constitution
   * @param {string} constitution - Dosha constitution
   * @returns {Array} - Classical references
   */
  getClassicalReferences(constitution) {
    const references = [
      {
        text: "Charaka Samhita",
        chapter: "Sutrasthana",
        verse: "8.96-98",
        relevance: "Basic dosha characteristics",
        sanskritVerse: "वातः पित्तं कफश्चेति त्रयो दोषाः समासतः",
        englishTranslation: "Vata, Pitta, and Kapha are the three doshas in brief"
      },
      {
        text: "Ashtanga Hridayam",
        chapter: "Sutrasthana",
        verse: "1.8",
        relevance: "Dosha functions and qualities",
        sanskritVerse: "वायुः पित्तं कफश्चेति त्रयो दोषाः प्रकीर्तिताः",
        englishTranslation: "Vata, Pitta, and Kapha are declared as the three doshas"
      }
    ];

    return references;
  }

  /**
   * Perform comprehensive prakriti assessment
   * @param {Object} assessmentData - Complete assessment data
   * @returns {Object} - Complete analysis results
   */
  async performComprehensiveAssessment(assessmentData) {
    const { answers, photos = [], userId } = assessmentData;

    // Calculate dosha scores
    const doshaAnalysis = this.calculateDoshaScores(answers);

    // Analyze visual indicators if photos provided
    let visualAnalysis = null;
    if (photos.length > 0) {
      visualAnalysis = await this.analyzeVisualIndicators(photos);
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(doshaAnalysis);

    // Create comprehensive results
    const results = {
      prakriti: {
        primaryDosha: doshaAnalysis.primaryDosha,
        secondaryDosha: doshaAnalysis.secondaryDosha,
        constitution: doshaAnalysis.constitution,
        scores: doshaAnalysis.scores,
        percentages: doshaAnalysis.percentages
      },
      vikriti: {
        currentImbalance: this.assessVikriti(answers),
        symptoms: this.identifySymptoms(answers),
        recommendations: recommendations.lifestyle.map(l => l.practices).flat()
      },
      classicalReferences: doshaAnalysis.classicalReferences,
      recommendations
    };

    // Save assessment to database
    const assessment = new PrakritiAssessment({
      userId,
      assessmentType: 'comprehensive',
      physicalAssessment: this.mapAnswersToAssessment(answers, 'physical'),
      physiologicalAssessment: this.mapAnswersToAssessment(answers, 'physiological'),
      mentalAssessment: this.mapAnswersToAssessment(answers, 'mental'),
      lifestyleAssessment: this.mapAnswersToAssessment(answers, 'lifestyle'),
      visualAnalysis,
      results,
      assessmentVersion: '1.0.0',
      classicalTextsUsed: this.getUsedTexts(doshaAnalysis.classicalReferences),
      confidenceScore: doshaAnalysis.confidenceScore
    });

    await assessment.save();

    return {
      assessmentId: assessment._id,
      results,
      classicalReferences: doshaAnalysis.classicalReferences,
      confidenceScore: doshaAnalysis.confidenceScore
    };
  }

  /**
   * Map answers to assessment structure
   * @param {Object} answers - User answers
   * @param {string} category - Assessment category
   * @returns {Object} - Mapped assessment data
   */
  mapAnswersToAssessment(answers, category) {
    const mapped = {};
    
    assessmentQuestions[category].forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        mapped[question.id] = {
          answer: selectedOption.text,
          score: {
            vata: selectedOption.value === 'vata' ? selectedOption.score : 0,
            pitta: selectedOption.value === 'pitta' ? selectedOption.score : 0,
            kapha: selectedOption.value === 'kapha' ? selectedOption.score : 0
          },
          classicalReference: selectedOption.classicalReference
        };
      }
    });

    return mapped;
  }

  /**
   * Assess current imbalances (Vikriti)
   * @param {Object} answers - User answers
   * @returns {string} - Current imbalance description
   */
  assessVikriti(answers) {
    // This would compare current symptoms with natural prakriti
    // For now, return a basic assessment
    return "Based on your responses, you may have some current imbalances. Consult with an Ayurvedic practitioner for detailed vikriti analysis.";
  }

  /**
   * Identify current symptoms
   * @param {Object} answers - User answers
   * @returns {Array} - List of symptoms
   */
  identifySymptoms(answers) {
    const symptoms = [];
    
    // Analyze answers for symptom indicators
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = this.findQuestionById(questionId);
      if (question) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption && selectedOption.symptoms) {
          symptoms.push(...selectedOption.symptoms);
        }
      }
    });

    return [...new Set(symptoms)]; // Remove duplicates
  }

  /**
   * Find question by ID
   * @param {string} questionId - Question ID
   * @returns {Object} - Question object
   */
  findQuestionById(questionId) {
    for (const category of Object.values(assessmentQuestions)) {
      const question = category.find(q => q.id === questionId);
      if (question) return question;
    }
    return null;
  }

  /**
   * Get used classical texts
   * @param {Array} references - Classical references
   * @returns {Array} - Used texts
   */
  getUsedTexts(references) {
    const texts = {};
    
    references.forEach(ref => {
      if (!texts[ref.reference.text]) {
        texts[ref.reference.text] = {
          text: ref.reference.text,
          chapters: [],
          verses: []
        };
      }
      
      if (!texts[ref.reference.text].chapters.includes(ref.reference.chapter)) {
        texts[ref.reference.text].chapters.push(ref.reference.chapter);
      }
      
      if (!texts[ref.reference.text].verses.includes(ref.reference.verse)) {
        texts[ref.reference.text].verses.push(ref.reference.verse);
      }
    });

    return Object.values(texts);
  }

  /**
   * Get dosha subtypes for a specific dosha
   * @param {string} dosha - Dosha type
   * @returns {Array} - Dosha subtypes
   */
  async getDoshaSubtypes(dosha) {
    return await DoshaSubtype.find({ dosha }).sort('subtype');
  }

  /**
   * Get assessment history for a user
   * @param {string} userId - User ID
   * @returns {Array} - Assessment history
   */
  async getAssessmentHistory(userId) {
    return await PrakritiAssessment.find({ userId })
      .sort({ assessmentDate: -1 })
      .select('assessmentDate results.prakriti assessmentType confidenceScore');
  }
}

module.exports = new DoshaAnalysisService(); 