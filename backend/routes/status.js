const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const router = express.Router();

function timingSafeEqualString(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

/**
 * @route GET /api/status
 * @desc Secure health check endpoint for production monitoring
 * @access Private (requires health check secret)
 */
router.get('/status', (req, res) => {
  // Verify health check secret in production
  if (process.env.NODE_ENV === 'production') {
    const expected = process.env.HEALTH_CHECK_SECRET;
    if (!expected) {
      return res.status(503).json({ error: 'Health check disabled (no secret configured)' });
    }
    const provided = req.headers['health-secret'] || req.query.secret;
    if (!timingSafeEqualString(String(provided || ''), expected)) {
      return res.status(403).json({
        error: 'Unauthorized',
        message: 'Invalid health check secret'
      });
    }
  }

  // Check database connection
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  // Check memory usage
  const memUsage = process.memoryUsage();
  
  // Check uptime
  const uptime = process.uptime();
  
  const healthStatus = {
    status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      connection: mongoose.connection.host || 'localhost'
    },
    system: {
      uptime: Math.floor(uptime),
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
      }
    }
  };

  const statusCode = dbStatus === 'connected' ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

/**
 * @route GET /api/status/ready
 * @desc Readiness probe for Kubernetes/container orchestration
 * @access Public
 */
router.get('/status/ready', (req, res) => {
  const isReady = mongoose.connection.readyState === 1;
  res.status(isReady ? 200 : 503).json({
    ready: isReady,
    timestamp: new Date().toISOString()
  });
});

/**
 * @route GET /api/status/live
 * @desc Liveness probe for Kubernetes/container orchestration
 * @access Public
 */
router.get('/status/live', (req, res) => {
  res.status(200).json({
    alive: true,
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 