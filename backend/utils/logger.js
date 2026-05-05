/**
 * Tiny structured logger. We avoid pulling in winston/pino for now to
 * keep the dependency surface small, but this gives us a single place
 * to swap in a real logger later. Levels are filtered by LOG_LEVEL.
 */

const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const configuredLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
const minLevel = LEVELS[configuredLevel] != null ? LEVELS[configuredLevel] : LEVELS.info;

function emit(level, msg, meta) {
  if (LEVELS[level] > minLevel) return;
  const record = {
    ts: new Date().toISOString(),
    level,
    msg,
    ...(meta && typeof meta === 'object' ? meta : {}),
  };
  const stream = level === 'error' ? process.stderr : process.stdout;
  try {
    stream.write(JSON.stringify(record) + '\n');
  } catch {
    // If serialization fails (e.g. a circular ref in meta), fall back to plain text.
    stream.write(`[${level}] ${msg}\n`);
  }
}

module.exports = {
  error: (msg, meta) => emit('error', msg, meta),
  warn: (msg, meta) => emit('warn', msg, meta),
  info: (msg, meta) => emit('info', msg, meta),
  debug: (msg, meta) => emit('debug', msg, meta),
};
