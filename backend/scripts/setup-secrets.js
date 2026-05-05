#!/usr/bin/env node
/**
 * Setup secrets: creates backend/.env from env.example with generated JWT_SECRET.
 * Run: node scripts/setup-secrets.js (from backend/) or npm run setup:secrets
 * The .env file is gitignored and never committed.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BACKEND_DIR = path.resolve(__dirname, '..');
const ENV_EXAMPLE = path.join(BACKEND_DIR, 'env.example');
const ENV_FILE = path.join(BACKEND_DIR, '.env');

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

function main() {
  if (fs.existsSync(ENV_FILE)) {
    console.log('✓ backend/.env already exists. Skipping (secrets are safe).');
    return;
  }

  if (!fs.existsSync(ENV_EXAMPLE)) {
    console.error('✗ env.example not found.');
    process.exit(1);
  }

  let content = fs.readFileSync(ENV_EXAMPLE, 'utf8');
  const jwtSecret = generateSecret(64);
  content = content.replace(
    /JWT_SECRET=.*/,
    `JWT_SECRET=${jwtSecret}`
  );

  fs.writeFileSync(ENV_FILE, content, { mode: 0o600 });
  console.log('✓ Created backend/.env with generated JWT_SECRET');
  console.log('  → Add your MongoDB Atlas URI to MONGODB_URI in backend/.env');
  console.log('  → .env is gitignored and will never be committed');
}

main();
