# AyurMind Backend Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. Environment Configuration
```bash
cd backend
cp env.example .env
```

Then edit `.env` file with these settings:
```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ayurmind

# Frontend URL (for CORS) - Updated for your current setup
FRONTEND_URL=http://localhost:8081

# Security Configuration
JWT_SECRET=ayurmind-super-secret-jwt-key-2024-classical-ayurveda
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB (if not running)
```bash
# Using Homebrew (macOS)
brew services start mongodb-community

# Or start manually
mongod --dbpath /usr/local/var/mongodb
```

### 4. Seed Database (Optional)
```bash
# Seed with comprehensive disease data
node scripts/seedComprehensiveDiseases.js
```

### 5. Start Backend
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

## 🔧 Using the Management Script

I've created a helpful script for you:

```bash
# Make it executable (already done)
chmod +x start-backend.sh

# First time setup
./start-backend.sh setup

# Start development server
./start-backend.sh dev

# Start production server
./start-backend.sh prod

# Check system status
./start-backend.sh status

# Get help
./start-backend.sh help
```

## 📊 Current Status

✅ **Backend Server**: Running on port 5002
✅ **Frontend**: Running on port 8081  
✅ **Database**: MongoDB connected
✅ **API**: Disease endpoints working
✅ **CORS**: Configured for frontend

## 🛠️ Daily Backend Management

### Starting the Backend
```bash
cd backend
./start-backend.sh dev
```

### Stopping the Backend
```bash
# Find the process
ps aux | grep "node.*server.js"

# Kill the process
kill -9 <PID>

# Or use Ctrl+C if running in terminal
```

### Checking Status
```bash
# Check if backend is running
curl http://localhost:5002/health

# Check disease API
curl http://localhost:5002/api/diseases?limit=5
```

### Viewing Logs
```bash
# If using PM2
pm2 logs ayurmind-backend

# If running directly
# Logs will appear in your terminal
```

## 🔄 Database Management

### Backup Database
```bash
# Create backup
mongodump --db ayurmind --out ./backups/$(date +%Y%m%d)

# Restore backup
mongorestore --db ayurmind ./backups/20240101/ayurmind
```

### Seed More Data
```bash
# Add more diseases
node scripts/seedComprehensiveDiseases.js

# Import from JSON files
node scripts/importAllDiseases.js
```

## 🚨 Troubleshooting

### Backend Won't Start
1. Check if port 5002 is free: `lsof -i :5002`
2. Check MongoDB is running: `brew services list | grep mongodb`
3. Check .env file exists and has correct values

### Database Connection Issues
1. Start MongoDB: `brew services start mongodb-community`
2. Check connection string in .env
3. Verify database exists: `mongo mongodb://localhost:27017/ayurmind`

### CORS Errors
1. Check FRONTEND_URL in .env matches your frontend port
2. Restart backend after changing .env
3. Clear browser cache

### API Not Responding
1. Check backend logs for errors
2. Verify all dependencies installed: `npm install`
3. Check if database is seeded: `curl http://localhost:5002/api/diseases?limit=1`

## 📈 Production Deployment

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "ayurmind-backend"

# Save PM2 configuration
pm2 save

# Set up auto-start
pm2 startup
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ayurmind
FRONTEND_URL=https://yourdomain.com
JWT_SECRET=your-super-secure-production-secret
```

## 🎯 Next Steps

1. **Set up your .env file** with the correct configuration
2. **Test the API** using the health check endpoint
3. **Seed the database** with disease data
4. **Monitor logs** for any issues
5. **Set up backups** for production

Your backend is already working well! The main thing you need to do is ensure your `.env` file has the correct configuration, especially the `FRONTEND_URL` pointing to `http://localhost:8081`.
