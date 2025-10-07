# AyurMind Backend Management Guide

## 🏗️ Backend Architecture Overview

Your backend is a Node.js/Express API server that provides:
- **Disease Database API** - Comprehensive Ayurvedic disease information
- **Dosha Analysis API** - Prakriti assessment and analysis
- **Classical Texts API** - Access to traditional Ayurvedic references
- **User Management** - User accounts and assessments

## 🚀 Quick Start Commands

### Development
```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Seed database with sample data
npm run seed
```

### Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit your environment variables
nano .env
```

## 📊 Database Management

### MongoDB Connection
- **Local Development**: `mongodb://localhost:27017/ayurmind`
- **Production**: Set `MONGODB_URI` in your `.env` file

### Database Operations
```bash
# Seed comprehensive disease database
node scripts/seedComprehensiveDiseases.js

# Import all diseases from JSON files
node scripts/importAllDiseases.js

# Clean and validate disease data
node scripts/seedCleanDiseases.js
```

### Database Models
- **Disease** - Ayurvedic disease information
- **DoshaSubtype** - Dosha classification data
- **PrakritiAssessment** - User assessment results

## 🔧 Configuration Management

### Environment Variables (.env)
```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ayurmind

# Security
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:8081

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Key Configuration Files
- `server.js` - Main server configuration
- `package.json` - Dependencies and scripts
- `models/` - Database models
- `routes/` - API endpoints
- `services/` - Business logic

## 🛠️ API Endpoints

### Disease Database
- `GET /api/diseases` - List all diseases
- `GET /api/diseases/:id` - Get specific disease
- `GET /api/diseases/search?q=term` - Search diseases

### Dosha Analysis
- `POST /api/dosha/analyze` - Analyze user's Prakriti
- `GET /api/dosha/subtypes` - Get dosha subtypes

### Classical Texts
- `GET /api/classical-texts` - Get classical references
- `GET /api/classical-texts/verses` - Get Sanskrit verses

### Health Check
- `GET /health` - Server health status
- `GET /api/status` - API status

## 📈 Monitoring & Maintenance

### Logging
```bash
# View server logs
tail -f logs/server.log

# Check error logs
tail -f logs/error.log
```

### Performance Monitoring
- **Rate Limiting**: 100 requests per 15 minutes
- **File Upload**: Max 10MB
- **Compression**: Enabled for responses
- **CORS**: Configured for frontend domains

### Database Health
```bash
# Check MongoDB connection
mongo mongodb://localhost:27017/ayurmind --eval "db.stats()"

# Check disease count
mongo mongodb://localhost:27017/ayurmind --eval "db.diseases.count()"
```

## 🔒 Security Features

### Implemented Security
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Joi validation
- **JWT Authentication** - Secure tokens

### Security Checklist
- [ ] Change default JWT secret
- [ ] Set strong MongoDB password
- [ ] Enable HTTPS in production
- [ ] Regular security updates
- [ ] Monitor failed login attempts

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ayurmind
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name "ayurmind-backend"
   pm2 save
   pm2 startup
   ```

3. **Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port 5002
   lsof -i :5002
   # Kill the process
   kill -9 <PID>
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   # Start MongoDB
   brew services start mongodb-community
   ```

3. **CORS Errors**
   - Check `FRONTEND_URL` in `.env`
   - Verify frontend is running on correct port
   - Check CORS configuration in `server.js`

4. **Database Empty**
   ```bash
   # Re-seed the database
   node scripts/seedComprehensiveDiseases.js
   ```

### Debug Mode
```bash
# Enable debug logging
DEBUG=ayurmind:* npm run dev

# Check specific module
DEBUG=ayurmind:database npm run dev
```

## 📚 Data Management

### Disease Database
- **Source**: Classical Ayurvedic texts
- **Format**: JSON with structured data
- **Validation**: Joi schema validation
- **Backup**: Regular MongoDB backups

### Data Import Scripts
```bash
# Import from PDF sources
node scripts/extractDiseasesFromPDF.js

# Merge multiple disease sources
node scripts/mergeDiseaseDatasets.js

# Validate and clean data
node scripts/validateDiseaseData.js
```

## 🔄 Backup & Recovery

### Database Backup
```bash
# Create backup
mongodump --db ayurmind --out ./backups/$(date +%Y%m%d)

# Restore backup
mongorestore --db ayurmind ./backups/20240101/ayurmind
```

### Code Backup
```bash
# Git backup
git add .
git commit -m "Backend backup $(date)"
git push origin main
```

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Weekly database backups
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Monitor API performance
- [ ] Check error logs daily

### Emergency Procedures
1. **Server Down**: Check PM2 status, restart if needed
2. **Database Issues**: Restore from latest backup
3. **API Errors**: Check logs, restart server
4. **High Load**: Scale horizontally or optimize queries

---

## 🎯 Next Steps

1. **Set up proper environment variables**
2. **Configure production database**
3. **Set up monitoring and logging**
4. **Implement automated backups**
5. **Deploy to production server**

For questions or issues, check the logs first, then refer to this guide or the API documentation.
