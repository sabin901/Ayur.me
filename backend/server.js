const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const logger = require('./utils/logger');
const doshaRoutes = require('./routes/doshaAnalysis');
const userRoutes = require('./routes/users');
const classicalTextsRoutes = require('./routes/classicalTexts');
const diseaseRoutes = require('./routes/diseases');
const statusRoutes = require('./routes/status');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const assessmentsRoutes = require('./routes/assessments');
const researchRoutes = require('./routes/research');

const app = express();
const PORT = process.env.PORT || 5002;
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

// Trust the first proxy (Render/Heroku/Vercel/Fly all front the app).
// Required for express-rate-limit's IP detection and for req.ip honesty.
app.set('trust proxy', 1);

// ---------- Security headers ----------
app.use(
  helmet({
    contentSecurityPolicy: false, // SPA + Vercel will set its own headers
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// ---------- CORS ----------
const devOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://127.0.0.1:8080',
  'http://192.168.1.122:8080',
];
const prodOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow curl/server-to-server (no Origin header) and same-origin requests.
      if (!origin) return cb(null, true);
      const allowed = isProd ? prodOrigins : [...devOrigins, ...prodOrigins];
      if (allowed.length === 0) return cb(null, true); // Permissive default if nothing configured.
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  })
);

// ---------- Performance ----------
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ---------- Lightweight request logging ----------
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info('request', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      ms: Number(ms.toFixed(2)),
    });
  });
  next();
});

// ---------- Global rate limit ----------
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// ---------- Database ----------
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => logger.info('mongo:connected'))
    .catch(err => logger.error('mongo:connect-error', { message: err.message }));
} else {
  logger.warn('mongo:no-uri', {
    message: 'MONGODB_URI not set — DB-backed routes will return 503.',
  });
}

mongoose.connection.on('disconnected', () => logger.warn('mongo:disconnected'));
mongoose.connection.on('reconnected', () => logger.info('mongo:reconnected'));
mongoose.connection.on('error', err => logger.error('mongo:error', { message: err.message }));

// ---------- API Routes ----------
app.use('/api/dosha', doshaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classical-texts', classicalTextsRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/research', researchRoutes);
app.use('/api', statusRoutes);

// Health check (kept outside /api so monitors can hit it without rate-limit headers).
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ---------- 404 (must come before error handler, after routes) ----------
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// ---------- Central error handler ----------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  // Log everything; only leak details for client errors or in dev.
  logger.error('request:error', {
    status,
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: isProd ? undefined : err.stack,
  });
  const safeMessage = status < 500 || !isProd ? err.message : 'Internal server error';
  res.status(status).json({ error: safeMessage });
});

// ---------- Process-level safety nets ----------
process.on('unhandledRejection', reason => {
  logger.error('unhandledRejection', { reason: reason && reason.message ? reason.message : String(reason) });
});
process.on('uncaughtException', err => {
  logger.error('uncaughtException', { message: err.message, stack: err.stack });
  // Crash hard — process manager will restart us.
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info('server:listening', { port: PORT, env: NODE_ENV });
});

function shutdown(signal) {
  logger.info('server:shutdown', { signal });
  server.close(() => {
    mongoose.connection.close(false).finally(() => process.exit(0));
  });
  // Force-quit if it takes too long.
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = app;
