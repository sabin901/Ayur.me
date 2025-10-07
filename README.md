# 🕉️ ayur.me: AI-Powered Ayurvedic Diagnostic System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-green.svg)](https://www.mongodb.com/)

## 📋 **Project Overview**

ayur.me is a comprehensive AI-powered Ayurvedic diagnostic system grounded in classical Sanskrit texts. The system provides personalized dosha analysis, seasonal guidance, and holistic wellness recommendations based on authentic Ayurvedic principles from Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam, Bhava Prakasha, and Madhava Nidanam.

### 🌟 **Key Features**

- **Comprehensive Dosha Assessment**: 22 questions across 4 categories with weighted scoring
- **Classical Knowledge Integration**: 15 dosha subtypes with Sanskrit names and detailed functions
- **Personalized Recommendations**: Diet, lifestyle, and herbal remedies from classical texts
- **Advanced Analysis**: Vikriti analysis, subtype analysis, and seasonal adaptations
- **Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **Disease Database**: Comprehensive Ayurvedic disease database with treatments
- **3D Models**: Interactive 3D anatomy models for educational purposes
- **Yoga Library**: Curated yoga poses with Ayurvedic benefits
- **Mental Wellness**: Specialized content for mental health and wellness

## 🏗️ **Architecture & Implementation Status**

### ✅ **Phase 1: Knowledge Extraction & Structuring** - COMPLETE
- **Dosha Knowledge Graph**: 15 dosha subtypes with detailed characteristics
- **Classical References**: Sanskrit verses with IAST transliteration and English translations
- **Cross-referenced Commentary**: Integration from multiple classical texts
- **Diagnostic Markers**: Comprehensive symptom and trait mapping
- **Empirical Knowledge**: Clinical validation and modern applications

### ✅ **Phase 2: Diagnostic System Architecture** - COMPLETE
- **Backend Engine**: Node.js/Express API with MongoDB integration
- **Database Schema**: MongoDB for assessment storage and disease database
- **Frontend Components**: React + TypeScript + Tailwind + Framer Motion UI
- **Quiz System**: Interactive assessment with classical references
- **Result Visualization**: Radar charts, detailed reports, and recommendations

### ✅ **Phase 3: Classical Text Integration** - COMPLETE
- **Diagnostic Logic**: Clinical markers mapped to classical bases
- **Sanskrit Integration**: Devanagari rendering and transliteration toggles
- **Verse Attribution**: Complete source tracking throughout the system
- **PDF Generation**: Comprehensive report generation capabilities

### ✅ **Phase 4: Authenticity Enhancements** - COMPLETE
- **Textual Accuracy**: Cross-verification with critical editions
- **Clinical Validation**: Test cases from Madhava Nidanam
- **Expert Review**: Annotation interface for vaidyas
- **Quality Assurance**: Comprehensive validation protocols

### ✅ **Phase 5: Validation Protocol** - COMPLETE
- **Technical Stack**: Full implementation with modern technologies
- **Performance Optimization**: Efficient algorithms and caching
- **Security**: Input validation and rate limiting
- **Deployment**: Production-ready configuration

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 8.0+
- Python 3.8+ (for disease database scraping)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd "ayur.me"
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Set up Environment Variables**
```bash
# Copy backend environment template
cp backend/env.example backend/.env

# Edit backend/.env with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/ayur.me
PORT=5002
NODE_ENV=development
```

5. **Start the Backend Server**
```bash
cd backend
npm run dev
```

6. **Start the Frontend Development Server**
```bash
# In a new terminal, from the root directory
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002

## 📁 **Project Structure**

```
ayur.me/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── quiz/                # Quiz-related components
│   │   ├── layout/              # Header, Footer, etc.
│   │   └── ui/                  # Shadcn/UI components
│   ├── pages/                   # Application pages
│   ├── services/                # API services and utilities
│   ├── hooks/                   # Custom React hooks
│   └── assets/                  # Static assets
├── backend/                     # Node.js/Express API
│   ├── routes/                  # API route handlers
│   ├── models/                  # MongoDB models
│   ├── services/                # Business logic
│   ├── scripts/                 # Database seeding scripts
│   └── data/                    # Disease database JSON files
├── public/                      # Static files
│   ├── yoga-poses/             # SVG yoga pose illustrations
│   └── 3d-models/              # 3D anatomy models
├── scripts/                     # Python scraping scripts
└── components/                  # Additional components
```

## 🔧 **Technical Stack**

### **Frontend**
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Shadcn/UI** for component library
- **React Router** for navigation
- **React Query** for data fetching
- **Three.js** for 3D models

### **Backend**
- **Node.js/Express** API
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate limiting** and compression

### **Development Tools**
- **TypeScript** for type safety
- **ESLint** for code linting
- **PostCSS** for CSS processing
- **Autoprefixer** for CSS compatibility

## 📊 **Core Features**

### **1. Comprehensive Dosha Assessment**
- **22 Questions** across 4 categories (Physical, Physiological, Mental, Lifestyle)
- **Weighted Scoring** based on classical principles
- **Visual Analysis** support for photo-based assessment
- **Confidence Scoring** for assessment reliability

### **2. Classical Knowledge Integration**
- **15 Dosha Subtypes** with Sanskrit names and detailed functions
- **Classical References** with verse numbers from original texts
- **Sanskrit Verses** with IAST transliteration and English translations
- **Authentic Sources** from pre-1880 classical texts

### **3. Personalized Recommendations**
- **Diet Recommendations** from Bhava Prakasha
- **Lifestyle Practices** from Charaka Samhita
- **Herbal Remedies** with classical references
- **Seasonal Guidance** based on Ritucharya principles

### **4. Disease Database**
- **Comprehensive Disease Coverage** from classical texts
- **Treatment Protocols** with herbal formulations
- **Search and Filter** functionality
- **Toxic Formulation Warnings** for safety

### **5. Interactive Features**
- **3D Anatomy Models** for educational purposes
- **Yoga Pose Library** with Ayurvedic benefits
- **Mental Wellness Resources** for holistic health
- **Progress Tracking** for wellness journey

## 🗄️ **Disease Database Integration**

### **Scraping Diseases from Public Domain Texts**

1. **Install Python Dependencies**
```bash
pip install scrapy requests beautifulsoup4 PyPDF2 pytesseract pdf2image spacy
python -m spacy download en_core_web_sm
```

2. **Install Tesseract OCR**
- macOS: `brew install tesseract`
- Ubuntu: `sudo apt-get install tesseract-ocr`
- Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki

3. **Run the Scraping Script**
```bash
python -m scrapy crawl ayurveda_scraper
```

4. **Seed the Database**
```bash
cd backend
node scripts/seedDatabase.js
```

### **API Endpoints**

- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/search?q=query` - Search diseases
- `GET /api/diseases/:id` - Get specific disease
- `GET /api/dosha/analyze` - Dosha analysis endpoint
- `GET /api/classical-texts` - Classical text references

## 🎨 **User Experience**

### **Assessment Flow**
1. **Introduction**: Classical Ayurvedic principles overview
2. **Visual Analysis**: Optional photo-based assessment
3. **Comprehensive Quiz**: 22 questions with classical references
4. **Analysis**: AI-powered scoring and interpretation
5. **Results**: Detailed report with recommendations

### **Key Features**
- **Modern UI/UX** with smooth animations
- **Classical References** throughout the experience
- **Sanskrit Integration** with toggle options
- **Responsive Design** for all devices
- **Accessibility** features included

## 📈 **Performance & Optimization**

### **Build Performance**
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Efficient component loading
- **Animations**: Hardware-accelerated with Framer Motion
- **Images**: Optimized and lazy-loaded

### **Analysis Performance**
- **Scoring Algorithm**: O(n) complexity
- **Memory Usage**: Efficient data structures
- **Response Time**: < 2 seconds for analysis
- **Caching**: Static data caching for classical references

## 🔒 **Security & Privacy**

### **Data Protection**
- **Input Validation**: Comprehensive validation schemas
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **No Sensitive Data**: Assessment data only

### **Compliance**
- **Public Domain**: All classical texts pre-1880
- **No Medical Claims**: Educational purposes only
- **User Consent**: Clear data usage policies
- **Accessibility**: WCAG 2.1 compliance

## 🚀 **Deployment**

### **Development**
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

### **Production Build**
```bash
# Frontend
npm run build
npm run preview

# Backend
cd backend
npm start
```

### **Environment Variables**
```bash
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/ayur.me
PORT=5002
NODE_ENV=production
JWT_SECRET=your-secret-key
```

## 🧪 **Testing**

### **Frontend Testing**
```bash
npm run lint
```

### **Backend Testing**
```bash
cd backend
npm test
```

## 📚 **API Documentation**

### **Dosha Analysis**
```typescript
POST /api/dosha/analyze
Content-Type: application/json

{
  "answers": {
    "physical": [...],
    "physiological": [...],
    "mental": [...],
    "lifestyle": [...]
  }
}
```

### **Disease Search**
```typescript
GET /api/diseases/search?q=fever&category=respiratory
```

## 🎯 **Future Enhancements**

### **Planned Features**
1. **Multi-language Support** (Hindi, Sanskrit)
2. **Advanced Visual Analysis** with AI
3. **Community Features** for sharing experiences
4. **Mobile App** development
5. **Expert Consultation** integration

### **Technical Improvements**
1. **Real-time Collaboration** features
2. **Advanced Analytics** dashboard
3. **Machine Learning** model improvements
4. **API Rate Limiting** enhancements
5. **Performance Monitoring** integration

## 🙏 **Acknowledgments**

### **Classical Sources**
- **Acharya Charaka** - Charaka Samhita
- **Acharya Sushruta** - Sushruta Samhita
- **Acharya Vagbhata** - Ashtanga Hridayam
- **Bhava Mishra** - Bhava Prakasha
- **Madhavakara** - Madhava Nidanam

### **Modern References**
- **Dr. Vasant Lad** - Ayurveda: The Science of Self-Healing
- **Dr. David Frawley** - Ayurvedic Healing
- **Dr. Robert Svoboda** - Prakruti: Your Ayurvedic Constitution

## 📞 **Support & Documentation**

### **Technical Support**
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Comprehensive inline documentation
- **Code Comments**: Detailed explanations throughout
- **TypeScript**: Full type safety and IntelliSense support

### **User Support**
- **Help Documentation**: Built into the application
- **Tooltips**: Contextual help throughout the interface
- **Classical References**: Educational content integrated
- **Accessibility**: Screen reader and keyboard navigation support

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ **Disclaimer**

**Educational Purposes Only**: This application is designed for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making any health-related decisions.

**Classical Ayurvedic Knowledge**: All recommendations are based on classical Ayurvedic texts and principles. Modern medical validation may vary, and individual results may differ.

**Toxic Formulations**: Some classical formulations may contain substances that are considered toxic by modern standards. Always consult with qualified practitioners before using any herbal or mineral preparations.

---

**ayur.me represents a perfect fusion of ancient wisdom and modern technology, providing users with authentic Ayurvedic insights grounded in classical Sanskrit texts while delivering a beautiful, user-friendly experience.**
