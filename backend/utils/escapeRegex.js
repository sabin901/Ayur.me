/**
 * Escape a string so it is safe to use inside a RegExp literal.
 * Without this, user-controlled query input can crash queries
 * (e.g. an unbalanced `(`) or be exploited for catastrophic
 * backtracking ReDoS attacks.
 */
module.exports = function escapeRegex(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
