const jwt = require('jsonwebtoken');

const TOKEN_HEADER = 'authorization';

function getTokenFromRequest(req) {
  const header = req.headers[TOKEN_HEADER] || req.headers[TOKEN_HEADER.toUpperCase()];
  if (!header || typeof header !== 'string') return null;
  const [scheme, token] = header.split(' ');
  if (!token || scheme.toLowerCase() !== 'bearer') return null;
  return token;
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error('Server is missing JWT_SECRET');
    err.status = 500;
    throw err;
  }
  return jwt.verify(token, secret);
}

/**
 * Hard auth: reject the request with 401 if no valid bearer token.
 * Sets req.user = { id, email } on success.
 */
function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    if (err.status === 500) return next(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Soft auth: if a valid token is supplied, populate req.user; otherwise
 * just continue. Useful for routes that personalize when logged in but
 * still work anonymously.
 */
function optionalAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) return next();
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
  } catch {
    // Ignore bad tokens here — the user is treated as anonymous.
  }
  next();
}

function signToken(user, options = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');
  const expiresIn = options.expiresIn || process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ email: user.email }, secret, {
    subject: String(user._id || user.id),
    expiresIn,
  });
}

module.exports = { requireAuth, optionalAuth, signToken };
