const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Global Youth Wellness Backend API!',
    version: '1.0.0',
    status: 'running',
    features: ['Gemini AI Integration', 'Wellness Advice', 'Mental Health Support']
  });
});

// Import and use API routes
const apiRoutes = require('./routes');
const geminiRoutes = require('./routes/gemini');

app.use('/api', apiRoutes);
app.use('/api/gemini', geminiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API available at: http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI endpoints available at: http://localhost:${PORT}/api/gemini`);
});
