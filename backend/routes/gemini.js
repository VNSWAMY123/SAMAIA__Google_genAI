const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');
const router = express.Router();

// Initialize Vertex AI
let vertexAI;
try {
  vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT_ID,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
    // Authentication will be handled by GOOGLE_APPLICATION_CREDENTIALS env var
    // or by the service account key file
  });
} catch (error) {
  console.error('Failed to initialize Vertex AI:', error);
}

// Get Generative Model
const getGenerativeModel = () => {
  if (!vertexAI) {
    throw new Error('Vertex AI not initialized');
  }
  
  return vertexAI.preview.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
    generationConfig: {
      maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 8192,
      temperature: parseFloat(process.env.GEMINI_TEMPERATURE) || 0.4,
      topP: parseFloat(process.env.GEMINI_TOP_P) || 0.95,
    },
  });
};

// POST /api/gemini/chat - Chat with Gemini
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
        code: 'MISSING_MESSAGE'
      });
    }

    const model = getGenerativeModel();
    
    // Build conversation context if history is provided
    let chatSession;
    if (conversationHistory.length > 0) {
      chatSession = model.startChat({
        history: conversationHistory.map(msg => ({
          role: msg.role, // 'user' or 'model'
          parts: [{ text: msg.content }]
        }))
      });
    } else {
      chatSession = model.startChat();
    }

    // Send message and get response
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini chat error:', error);
    
    // Handle specific error types
    if (error.message.includes('quota')) {
      return res.status(429).json({
        error: 'API quota exceeded. Please try again later.',
        code: 'QUOTA_EXCEEDED'
      });
    }
    
    if (error.message.includes('authentication')) {
      return res.status(401).json({
        error: 'Authentication failed. Please check your credentials.',
        code: 'AUTH_FAILED'
      });
    }

    res.status(500).json({
      error: 'Failed to get response from Gemini',
      code: 'GEMINI_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/gemini/generate - Generate content with custom prompt
router.post('/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, generationConfig } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required',
        code: 'MISSING_PROMPT'
      });
    }

    // Create model with custom configuration if provided
    const modelConfig = {
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
      generationConfig: {
        maxOutputTokens: generationConfig?.maxOutputTokens || parseInt(process.env.GEMINI_MAX_TOKENS) || 8192,
        temperature: generationConfig?.temperature || parseFloat(process.env.GEMINI_TEMPERATURE) || 0.4,
        topP: generationConfig?.topP || parseFloat(process.env.GEMINI_TOP_P) || 0.95,
      }
    };

    if (systemInstruction) {
      modelConfig.systemInstruction = systemInstruction;
    }

    const model = vertexAI.preview.getGenerativeModel(modelConfig);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini generation error:', error);
    
    res.status(500).json({
      error: 'Failed to generate content',
      code: 'GENERATION_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/gemini/wellness-advice - Specialized wellness advice endpoint
router.post('/wellness-advice', async (req, res) => {
  try {
    const { question, category, userAge } = req.body;

    if (!question) {
      return res.status(400).json({
        error: 'Question is required',
        code: 'MISSING_QUESTION'
      });
    }

    const systemInstruction = {
      parts: [{
        text: `You are a helpful wellness assistant for the Global Youth Wellness platform. 
        You provide evidence-based, supportive advice for young people on mental health, physical wellness, and emotional well-being.
        
        Guidelines:
        - Always be supportive, empathetic, and age-appropriate
        - Provide practical, actionable advice
        - Encourage professional help for serious issues
        - Focus on positive coping strategies and healthy habits
        - Respect cultural differences and individual circumstances
        - Never provide medical diagnosis or replace professional healthcare
        
        ${category ? `Focus area: ${category}` : ''}
        ${userAge ? `User age range: ${userAge}` : ''}
        
        Respond with helpful, encouraging advice while maintaining appropriate boundaries.`
      }]
    };

    const model = vertexAI.preview.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
      systemInstruction,
      generationConfig: {
        maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 8192,
        temperature: 0.7, // Slightly higher for more empathetic responses
        topP: 0.95,
      },
    });
    
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      advice: text,
      category,
      timestamp: new Date().toISOString(),
      disclaimer: 'This advice is for informational purposes only and does not replace professional healthcare.'
    });

  } catch (error) {
    console.error('Wellness advice error:', error);
    
    res.status(500).json({
      error: 'Failed to get wellness advice',
      code: 'WELLNESS_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/gemini/health - Health check endpoint
router.get('/health', (req, res) => {
  const isConfigured = !!(process.env.GOOGLE_CLOUD_PROJECT_ID && 
    (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_KEY));
  
  res.json({
    status: 'ok',
    service: 'Gemini Vertex AI',
    configured: isConfigured,
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-preview-0514',
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
