const express = require("express");
const { VertexAI } = require("@google-cloud/vertexai");
const EmotionAnalysisService = require("../services/emotionAnalysis");
const { promptCategories, CRISIS_DISCLAIMER } = require("../utils/aiPrompts");
const router = express.Router();

// Initialize services
const emotionAnalysis = new EmotionAnalysisService();

// Rate limiting for AI endpoints
const rateLimit = require("express-rate-limit");
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(aiLimiter);

const mentalHealthPrompts = {
  meditation: `You are a meditation guide focused on mental wellness. Provide a gentle, 
    calming guided meditation script suitable for beginners. Include clear instructions 
    for breathing and mindfulness. Keep the tone peaceful and supportive.`,

  anxiety: `You are a supportive mental wellness assistant. Provide practical, 
    evidence-based coping strategies for managing anxiety. Focus on grounding 
    techniques, breathing exercises, and immediate relief strategies. Keep responses 
    empathetic and actionable.`,

  mood: `You are an empathetic wellness assistant analyzing mood patterns. Provide 
    insight into the user's mood entries, suggesting healthy coping strategies and 
    lifestyle adjustments. Keep responses supportive and encouraging.`,

  journaling: `You are a therapeutic writing guide. Provide thoughtful journaling 
    prompts that encourage self-reflection and emotional processing. Focus on 
    mental wellness, personal growth, and emotional awareness.`,
};

// Initialize Vertex AI with the same configuration
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
});

// Helper function to get model with mental health specific configuration
const getMentalHealthModel = (type) => {
  return vertexAI.preview.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash-preview-0514",
    generationConfig: {
      maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 8192,
      temperature: 0.7, // Slightly higher for more empathetic responses
      topP: 0.95,
    },
    systemInstruction: mentalHealthPrompts[type] || mentalHealthPrompts.anxiety,
  });
};

// GET /api/mental-health/meditation-script
router.get("/meditation-script", async (req, res) => {
  try {
    const { duration = "10", focus = "general" } = req.query;
    const model = getMentalHealthModel("meditation");

    const prompt = `Create a ${duration}-minute guided meditation script focusing on ${focus}. 
      Include clear breathing instructions and gentle guidance.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      success: true,
      script: response.text(),
      duration,
      focus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Meditation script error:", error);
    res.status(500).json({
      error: "Failed to generate meditation script",
      code: "MEDITATION_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/mental-health/analyze-mood
router.post("/analyze-mood", async (req, res) => {
  try {
    const { entries } = req.body;

    if (!entries || !Array.isArray(entries)) {
      return res.status(400).json({
        error: "Valid entries array is required",
        code: "INVALID_ENTRIES",
      });
    }

    const analysis = await emotionAnalysis.getSentimentTrend(entries);
    res.json(analysis);
  } catch (error) {
    console.error("Mood analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze mood entries",
      code: "ANALYSIS_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/mental-health/journal-prompts
router.post("/journal-prompts", async (req, res) => {
  try {
    const { mood, theme, previousEntries = [] } = req.body;
    const model = getMentalHealthModel("journaling");

    const prompt = `Generate 5 therapeutic journaling prompts ${
      mood ? `that address the current mood: ${mood}` : ""
    } ${theme ? `focusing on the theme: ${theme}` : ""}.
    Previous entries themes: ${JSON.stringify(previousEntries)}
    
    Make the prompts:
    1. Engaging and thought-provoking
    2. Focused on emotional awareness
    3. Supportive of mental well-being
    4. Suitable for self-reflection`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      success: true,
      prompts: response
        .text()
        .split("\n")
        .filter((p) => p.trim()),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Journal prompts error:", error);
    res.status(500).json({
      error: "Failed to generate journal prompts",
      code: "PROMPTS_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/mental-health/chat
router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
        code: "MISSING_MESSAGE",
      });
    }

    const response = await emotionAnalysis.getPersonalizedResponse(
      message,
      history
    );

    if (response.requiresIntervention) {
      // Log high-risk interactions for monitoring
      console.warn("High-risk interaction detected:", {
        message,
        severity: response.severity,
        timestamp: new Date().toISOString(),
      });
    }

    res.json(response);
  } catch (error) {
    console.error("Chat response error:", error);
    res.status(500).json({
      error: "Failed to generate response",
      code: "RESPONSE_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/mental-health/analyze-emotion
router.post("/analyze-emotion", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text content is required",
        code: "MISSING_CONTENT",
      });
    }

    const analysis = await emotionAnalysis.analyzeEmotion(text);
    res.json(analysis);
  } catch (error) {
    console.error("Emotion analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze emotions",
      code: "ANALYSIS_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
