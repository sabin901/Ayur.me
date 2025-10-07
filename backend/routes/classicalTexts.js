const express = require('express');
const router = express.Router();

// Basic classical texts routes - can be expanded later
router.get('/', (req, res) => {
  res.json({ message: 'Classical texts endpoint' });
});

module.exports = router; 