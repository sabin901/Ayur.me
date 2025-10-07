const express = require('express');
const Joi = require('joi');
const doshaAnalysisService = require('../services/doshaAnalysisService');
const { assessmentQuestions } = require('../data/classicalKnowledgeBase');

const router = express.Router();

// Validation schemas
const assessmentSchema = Joi.object({
  answers: Joi.object().required(),
  photos: Joi.array().items(Joi.string()).optional(),
  userId: Joi.string().optional()
});

const doshaSubtypeSchema = Joi.object({
  dosha: Joi.string().valid('vata', 'pitta', 'kapha').required()
});

/**
 * @route POST /api/dosha/assess
 * @desc Perform comprehensive dosha assessment
 * @access Public
 */
router.post('/assess', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = assessmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message)
      });
    }

    const { answers, photos = [], userId } = value;

    // Validate that all required questions are answered
    const requiredQuestions = [];
    Object.values(assessmentQuestions).forEach(category => {
      category.forEach(question => {
        requiredQuestions.push(question.id);
      });
    });

    const answeredQuestions = Object.keys(answers);
    const missingQuestions = requiredQuestions.filter(q => !answeredQuestions.includes(q));

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        error: 'Incomplete assessment',
        message: 'Please answer all required questions',
        missingQuestions
      });
    }

    // Perform assessment
    const result = await doshaAnalysisService.performComprehensiveAssessment({
      answers,
      photos,
      userId: userId || 'anonymous'
    });

    res.json({
      success: true,
      message: 'Assessment completed successfully',
      data: result
    });

  } catch (error) {
    console.error('Assessment error:', error);
    res.status(500).json({
      error: 'Assessment failed',
      message: 'An error occurred during the assessment process'
    });
  }
});

/**
 * @route GET /api/dosha/questions
 * @desc Get assessment questions with classical references
 * @access Public
 */
router.get('/questions', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        questions: assessmentQuestions,
        totalQuestions: Object.values(assessmentQuestions).reduce((acc, category) => acc + category.length, 0),
        categories: Object.keys(assessmentQuestions)
      }
    });
  } catch (error) {
    console.error('Questions error:', error);
    res.status(500).json({
      error: 'Failed to fetch questions',
      message: 'An error occurred while retrieving assessment questions'
    });
  }
});

/**
 * @route GET /api/dosha/subtypes/:dosha
 * @desc Get dosha subtypes with classical references
 * @access Public
 */
router.get('/subtypes/:dosha', async (req, res) => {
  try {
    // Validate dosha parameter
    const { error, value } = doshaSubtypeSchema.validate({ dosha: req.params.dosha });
    if (error) {
      return res.status(400).json({
        error: 'Invalid dosha type',
        message: 'Dosha must be vata, pitta, or kapha'
      });
    }

    const subtypes = await doshaAnalysisService.getDoshaSubtypes(value.dosha);

    res.json({
      success: true,
      data: {
        dosha: value.dosha,
        subtypes,
        count: subtypes.length
      }
    });

  } catch (error) {
    console.error('Subtypes error:', error);
    res.status(500).json({
      error: 'Failed to fetch subtypes',
      message: 'An error occurred while retrieving dosha subtypes'
    });
  }
});

/**
 * @route GET /api/dosha/history/:userId
 * @desc Get assessment history for a user
 * @access Public
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID required',
        message: 'Please provide a valid user ID'
      });
    }

    const history = await doshaAnalysisService.getAssessmentHistory(userId);

    res.json({
      success: true,
      data: {
        userId,
        assessments: history,
        count: history.length
      }
    });

  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      error: 'Failed to fetch history',
      message: 'An error occurred while retrieving assessment history'
    });
  }
});

/**
 * @route GET /api/dosha/assessment/:assessmentId
 * @desc Get detailed assessment results
 * @access Public
 */
router.get('/assessment/:assessmentId', async (req, res) => {
  try {
    const { assessmentId } = req.params;

    if (!assessmentId) {
      return res.status(400).json({
        error: 'Assessment ID required',
        message: 'Please provide a valid assessment ID'
      });
    }

    const assessment = await PrakritiAssessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: 'Assessment not found',
        message: 'No assessment found with the provided ID'
      });
    }

    res.json({
      success: true,
      data: assessment
    });

  } catch (error) {
    console.error('Assessment fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch assessment',
      message: 'An error occurred while retrieving the assessment'
    });
  }
});

/**
 * @route POST /api/dosha/quick-assess
 * @desc Perform quick dosha assessment (subset of questions)
 * @access Public
 */
router.post('/quick-assess', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({
        error: 'Answers required',
        message: 'Please provide assessment answers'
      });
    }

    // Perform quick assessment with available answers
    const result = doshaAnalysisService.calculateDoshaScores(answers);

    res.json({
      success: true,
      message: 'Quick assessment completed',
      data: {
        ...result,
        assessmentType: 'quick',
        note: 'This is a preliminary assessment. For comprehensive analysis, complete the full assessment.'
      }
    });

  } catch (error) {
    console.error('Quick assessment error:', error);
    res.status(500).json({
      error: 'Quick assessment failed',
      message: 'An error occurred during the quick assessment'
    });
  }
});

/**
 * @route GET /api/dosha/classical-texts
 * @desc Get information about classical texts used
 * @access Public
 */
router.get('/classical-texts', (req, res) => {
  try {
    const classicalTexts = [
      {
        name: 'Charaka Samhita',
        sanskrit: 'चरक संहिता',
        author: 'Acharya Charaka',
        period: '2nd century BCE - 2nd century CE',
        chapters: ['Sutrasthana', 'Nidanasthana', 'Vimanasthana', 'Sharirasthana', 'Indriyasthana', 'Chikitsasthana', 'Kalpasthana', 'Siddhisthana'],
        relevance: 'Primary text for internal medicine and dosha theory'
      },
      {
        name: 'Sushruta Samhita',
        sanskrit: 'सुश्रुत संहिता',
        author: 'Acharya Sushruta',
        period: '6th century BCE - 2nd century CE',
        chapters: ['Sutrasthana', 'Nidanasthana', 'Sharirasthana', 'Chikitsasthana', 'Kalpasthana', 'Uttaratantra'],
        relevance: 'Primary text for surgery and anatomical knowledge'
      },
      {
        name: 'Ashtanga Hridayam',
        sanskrit: 'अष्टांग हृदयम्',
        author: 'Acharya Vagbhata',
        period: '6th century CE',
        chapters: ['Sutrasthana', 'Sharirasthana', 'Nidanasthana', 'Chikitsasthana', 'Kalpasthana', 'Uttarasthana'],
        relevance: 'Comprehensive compilation of Charaka and Sushruta'
      },
      {
        name: 'Bhava Prakasha',
        sanskrit: 'भाव प्रकाश',
        author: 'Bhava Mishra',
        period: '16th century CE',
        chapters: ['Purva Khanda', 'Madhya Khanda', 'Uttara Khanda'],
        relevance: 'Comprehensive text on materia medica and therapeutics'
      },
      {
        name: 'Madhava Nidanam',
        sanskrit: 'माधव निदानम्',
        author: 'Madhavakara',
        period: '7th century CE',
        chapters: ['Roga Vinishchaya'],
        relevance: 'Specialized text on disease diagnosis and classification'
      }
    ];

    res.json({
      success: true,
      data: {
        texts: classicalTexts,
        count: classicalTexts.length,
        note: 'These texts form the foundation of classical Ayurvedic knowledge and are referenced throughout the assessment system.'
      }
    });

  } catch (error) {
    console.error('Classical texts error:', error);
    res.status(500).json({
      error: 'Failed to fetch classical texts',
      message: 'An error occurred while retrieving classical text information'
    });
  }
});

/**
 * @route GET /api/dosha/methodology
 * @desc Get assessment methodology information
 * @access Public
 */
router.get('/methodology', (req, res) => {
  try {
    const methodology = {
      name: 'Trividha Pariksha (Three-fold Examination)',
      sanskrit: 'त्रिविध परीक्षा',
      description: 'Classical Ayurvedic diagnostic methodology based on Charaka Samhita',
      components: [
        {
          name: 'Darshana (Observation)',
          sanskrit: 'दर्शन',
          description: 'Visual examination of physical characteristics',
          includes: ['Body structure', 'Skin texture', 'Eye characteristics', 'Hair quality', 'Nail quality']
        },
        {
          name: 'Sparshana (Palpation)',
          sanskrit: 'स्पर्शन',
          description: 'Physical examination through touch',
          includes: ['Skin temperature', 'Pulse examination', 'Body texture', 'Joint mobility']
        },
        {
          name: 'Prashna (Questioning)',
          sanskrit: 'प्रश्न',
          description: 'Systematic questioning about symptoms and patterns',
          includes: ['Digestive patterns', 'Sleep patterns', 'Mental characteristics', 'Lifestyle preferences']
        }
      ],
      classicalReference: {
        text: 'Charaka Samhita',
        verse: 'Vimana 4.7',
        sanskritVerse: 'दर्शनं स्पर्शनं प्रश्न इति त्रिविधं परीक्षणम्',
        translation: 'Examination is three-fold: observation, palpation, and questioning'
      },
      assessmentTypes: [
        {
          type: 'comprehensive',
          name: 'Comprehensive Assessment',
          description: 'Full Trividha Pariksha with all classical parameters',
          duration: '15-20 minutes',
          questions: '22 questions across 4 categories'
        },
        {
          type: 'quick',
          name: 'Quick Assessment',
          description: 'Abbreviated assessment for preliminary analysis',
          duration: '5-10 minutes',
          questions: '10-15 key questions'
        }
      ]
    };

    res.json({
      success: true,
      data: methodology
    });

  } catch (error) {
    console.error('Methodology error:', error);
    res.status(500).json({
      error: 'Failed to fetch methodology',
      message: 'An error occurred while retrieving assessment methodology'
    });
  }
});

module.exports = router; 