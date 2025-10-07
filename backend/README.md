# AyurMind Backend - Authentic Ayurvedic Dosha Analysis

## 🕉️ Overview

AyurMind Backend is a comprehensive Node.js API system that provides authentic Ayurvedic dosha analysis based on classical Sanskrit texts. The system implements the ancient diagnostic methodology of **Trividha Pariksha** (Three-fold Examination) as described in Charaka Samhita, Sushruta Samhita, and Ashtanga Hridayam.

## 📚 Classical Foundation

This system is built upon authentic Ayurvedic knowledge from:

- **Charaka Samhita** - Primary text for internal medicine and dosha theory
- **Sushruta Samhita** - Surgical knowledge and anatomical understanding  
- **Ashtanga Hridayam** - Comprehensive compilation by Vagbhata
- **Bhava Prakasha** - Materia medica and therapeutics
- **Madhava Nidanam** - Disease diagnosis and classification

## 🏗️ Architecture

```
backend/
├── models/                 # MongoDB schemas
│   ├── DoshaSubtype.js    # 15 dosha subtypes with classical references
│   └── PrakritiAssessment.js # Comprehensive assessment data
├── services/              # Business logic
│   └── doshaAnalysisService.js # Core analysis engine
├── routes/                # API endpoints
│   ├── doshaAnalysis.js   # Main assessment routes
│   ├── users.js          # User management
│   └── classicalTexts.js # Classical knowledge endpoints
├── data/                  # Knowledge base
│   └── classicalKnowledgeBase.js # Authentic data from Sanskrit texts
└── server.js             # Express server setup
```

## 🚀 Features

### ✅ Authentic Classical Knowledge
- **15 Dosha Subtypes** with Sanskrit names and IAST transliteration
- **Classical References** with verse numbers from original texts
- **Trividha Pariksha** methodology implementation
- **Sanskrit Verses** with English translations

### ✅ Comprehensive Assessment System
- **22 Questions** across 4 categories (Physical, Physiological, Mental, Lifestyle)
- **Weighted Scoring** based on classical principles
- **Visual Analysis** support for photo-based assessment
- **Confidence Scoring** for assessment reliability

### ✅ Personalized Recommendations
- **Diet Recommendations** from Bhava Prakasha
- **Lifestyle Practices** from Charaka Samhita
- **Herbal Remedies** with classical references
- **Yoga Practices** from Hatha Yoga Pradipika

### ✅ Advanced Features
- **Assessment History** tracking
- **Vikriti Analysis** (current imbalances)
- **Classical Text Citations** throughout
- **Multi-language Support** (Sanskrit/English)

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 5+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd ayurmind-backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Configure environment variables
# Edit .env with your settings

# Start MongoDB (if local)
mongod

# Run the server
npm run dev
```

### Environment Configuration
```bash
# Required environment variables
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayurmind
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

## 📖 API Documentation

### Core Endpoints

#### 1. Comprehensive Assessment
```http
POST /api/dosha/assess
Content-Type: application/json

{
  "answers": {
    "body_frame": "vata",
    "weight_tendency": "pitta",
    // ... all 22 questions
  },
  "photos": ["base64_image_data"],
  "userId": "optional_user_id"
}
```

#### 2. Get Assessment Questions
```http
GET /api/dosha/questions
```

#### 3. Get Dosha Subtypes
```http
GET /api/dosha/subtypes/vata
GET /api/dosha/subtypes/pitta  
GET /api/dosha/subtypes/kapha
```

#### 4. Classical Texts Information
```http
GET /api/dosha/classical-texts
```

#### 5. Assessment Methodology
```http
GET /api/dosha/methodology
```

### Response Format
```json
{
  "success": true,
  "data": {
    "assessmentId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "results": {
      "prakriti": {
        "primaryDosha": "vata",
        "secondaryDosha": "pitta", 
        "constitution": "Vata-Pitta",
        "scores": { "vata": 45, "pitta": 35, "kapha": 20 },
        "percentages": { "vata": 45, "pitta": 35, "kapha": 20 }
      },
      "classicalReferences": [
        {
          "question": "What best describes your body frame?",
          "answer": "Thin, slender, light-boned",
          "reference": {
            "text": "Charaka Samhita",
            "verse": "Sutrasthana 8.96",
            "sanskritVerse": "कृशो लघुः स्थूलपरिणाहहीनः",
            "translation": "One who is thin, light, and lacks bulk"
          }
        }
      ],
      "recommendations": {
        "diet": [...],
        "lifestyle": [...],
        "herbs": [...],
        "yoga": [...]
      }
    },
    "confidenceScore": 85
  }
}
```

## 🧠 Dosha Analysis Logic

### Scoring System
The system uses a weighted scoring approach based on classical principles:

1. **Physical Questions** (6 questions) - Weight: 3 points each
2. **Physiological Questions** (6 questions) - Weight: 3 points each  
3. **Mental Questions** (6 questions) - Weight: 2-3 points each
4. **Lifestyle Questions** (4 questions) - Weight: 1-2 points each

### Dosha Determination
```javascript
// Example scoring logic
if (skin == 'dry' && body_frame == 'slim' && sleep == 'light') {
   doshaScore.vata += 3;
}

// Primary dosha = highest score
// Secondary dosha = second highest score
// Constitution = Primary-Secondary format
```

### Classical References
Each assessment question and recommendation includes:
- **Sanskrit Verse** from original texts
- **IAST Transliteration** for pronunciation
- **English Translation** for understanding
- **Chapter and Verse** numbers for verification

## 📊 Database Schema

### DoshaSubtype Collection
```javascript
{
  dosha: "vata",
  subtype: "prana_vata", 
  sanskritName: "प्राण वात",
  iastTransliteration: "Prāṇa Vāta",
  location: "Head, chest, throat, heart, respiratory tract",
  functions: ["Controls breathing", "Governs speech"],
  symptoms: ["Anxiety", "Stuttering"],
  classicalReferences: [{
    text: "Charaka Samhita",
    chapter: "Sutrasthana", 
    verse: "12.8",
    sanskritVerse: "प्राणो वायुः शिरोग्रीवागतो वक्त्रं च धारयन्।",
    englishTranslation: "Prana Vata moves in the head, neck, and maintains the mouth."
  }]
}
```

### PrakritiAssessment Collection
```javascript
{
  userId: ObjectId,
  assessmentDate: Date,
  assessmentType: "comprehensive",
  physicalAssessment: { /* detailed answers with scores */ },
  physiologicalAssessment: { /* detailed answers with scores */ },
  mentalAssessment: { /* detailed answers with scores */ },
  lifestyleAssessment: { /* detailed answers with scores */ },
  visualAnalysis: { /* photo analysis results */ },
  results: { /* comprehensive results */ },
  classicalTextsUsed: [/* referenced texts */],
  confidenceScore: 85
}
```

## 🔧 Development

### Running Tests
```bash
npm test
```

### Code Quality
```bash
npm run lint
npm run format
```

### Database Seeding
```bash
npm run seed
```

## 🌟 Classical Knowledge Integration

### Dosha Subtypes (15 Total)

#### Vata Subtypes (5)
1. **Prana Vata** - Controls breathing, speech, thoughts
2. **Udana Vata** - Controls expression, effort, memory  
3. **Samana Vata** - Controls digestion, absorption
4. **Apana Vata** - Controls elimination, reproduction
5. **Vyana Vata** - Controls circulation, movement

#### Pitta Subtypes (5)
1. **Pachaka Pitta** - Controls digestion, metabolism
2. **Ranjaka Pitta** - Controls blood formation, liver
3. **Sadhaka Pitta** - Controls intelligence, wisdom
4. **Alochaka Pitta** - Controls vision, eyes
5. **Bhrajaka Pitta** - Controls skin, complexion

#### Kapha Subtypes (5)
1. **Avalambaka Kapha** - Provides support, stability
2. **Kledaka Kapha** - Moistens, lubricates
3. **Bodhaka Kapha** - Controls taste, salivation
4. **Tarpaka Kapha** - Nourishes brain, mind
5. **Shleshaka Kapha** - Lubricates joints

### Assessment Categories

#### 1. Physical Constitution (Sharirika Prakriti)
- Body frame and structure
- Weight tendencies
- Skin texture and characteristics
- Hair quality
- Nail characteristics
- Eye features

#### 2. Physiological Patterns (Sharirika Kriya)
- Appetite patterns
- Digestion characteristics
- Elimination patterns
- Climate preferences
- Energy patterns
- Sweating patterns

#### 3. Mental & Emotional (Manasika Prakriti)
- Learning style
- Memory type
- Speech patterns
- Stress response
- Decision-making style
- Dominant emotions

#### 4. Lifestyle Patterns (Vihara Prakriti)
- Sleep patterns
- Activity preferences
- Work style
- Social style

## 🔒 Security Features

- **Input Validation** using Joi schemas
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for frontend integration
- **Helmet.js** for security headers
- **Request Compression** for performance

## 📈 Performance Optimization

- **Database Indexing** on frequently queried fields
- **Response Compression** using gzip
- **Efficient Queries** with proper MongoDB aggregation
- **Caching Strategy** for static data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Ensure all tests pass
4. Add classical references for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Acharya Charaka** - Charaka Samhita
- **Acharya Sushruta** - Sushruta Samhita  
- **Acharya Vagbhata** - Ashtanga Hridayam
- **Bhava Mishra** - Bhava Prakasha
- **Madhavakara** - Madhava Nidanam

## 📞 Support

For questions about classical references or Ayurvedic principles, please consult with qualified Ayurvedic practitioners or scholars.

---

*"स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च"*  
*"Preservation of health of the healthy and alleviation of disorders of the diseased"*  
- Charaka Samhita, Sutrasthana 30.26 