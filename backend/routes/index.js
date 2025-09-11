const express = require('express');
const router = express.Router();

// Example route - can be expanded with more specific routes
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Example API route
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route working!',
    data: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

module.exports = router;
