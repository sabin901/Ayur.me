const express = require('express');
const router = express.Router();

// Basic user routes - can be expanded later
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

module.exports = router; 