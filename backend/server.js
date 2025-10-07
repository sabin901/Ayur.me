const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
require('dotenv').config();

const doshaRoutes = require('./routes/doshaAnalysis');
const userRoutes = require('./routes/users');
const classicalTextsRoutes = require('./routes/classicalTexts');
const diseaseRoutes = require('./routes/diseases');
const statusRoutes = require('./routes/status');

const app = express();
const PORT = process.env.PORT || 5002;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-frontend-domain.com'
    : [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://localhost:8081',
        'http://127.0.0.1:8080',
        'http://192.168.1.122:8080'
      ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Performance middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurmind', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/dosha', doshaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classical-texts', classicalTextsRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api', statusRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`AyurMind Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 