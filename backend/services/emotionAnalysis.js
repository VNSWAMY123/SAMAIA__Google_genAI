const { VertexAI } = require("@google-cloud/vertexai");
const {
  promptCategories,
  performSafetyCheck,
  validateResponse,
} = require("./aiPrompts");

class EmotionAnalysisService {
  constructor() {
    this.vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
    });
  }

  async analyzeEmotion(text) {
    const model = this.vertexAI.preview.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash-preview-0514",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more focused analysis
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `
      Analyze the emotional content of this text:
      "${text}"
      
      Provide a structured analysis including:
      1. Primary emotions detected (from: joy, sadness, anger, fear, surprise, disgust)
      2. Emotional intensity (1-10 scale)
      3. Key emotional triggers or themes
      4. Potential coping strategies based on the emotional state
      
      Return the analysis in JSON format.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = JSON.parse(response.text());

      return {
        success: true,
        analysis,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Emotion analysis error:", error);
      throw new Error("Failed to analyze emotions");
    }
  }

  async getSentimentTrend(entries) {
    const model = this.vertexAI.preview.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash-preview-0514",
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `
      Analyze these emotional entries over time:
      ${JSON.stringify(entries)}
      
      Provide:
      1. Overall sentiment trend
      2. Pattern identification
      3. Potential triggers
      4. Suggested coping strategies
      5. Professional support recommendations if needed
      
      Return the analysis in JSON format.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = JSON.parse(response.text());

      return {
        success: true,
        analysis,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Sentiment trend analysis error:", error);
      throw new Error("Failed to analyze sentiment trend");
    }
  }

  async getPersonalizedResponse(userInput, userHistory = []) {
    // Perform safety check first
    const safetyCheck = performSafetyCheck(userInput);
    if (safetyCheck.requiresIntervention) {
      return {
        success: true,
        response: safetyCheck.response,
        requiresIntervention: true,
        severity: safetyCheck.severity,
      };
    }

    // Analyze current emotion
    const emotionAnalysis = await this.analyzeEmotion(userInput);

    // Determine most relevant prompt category
    const category = this.determineCategory(emotionAnalysis.analysis);
    const context = promptCategories[category].context;

    const model = this.vertexAI.preview.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash-preview-0514",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `
      ${context}

      User's emotional state: ${JSON.stringify(emotionAnalysis.analysis)}
      User's message: "${userInput}"
      
      Previous interactions: ${JSON.stringify(userHistory)}
      
      Provide a personalized, empathetic response that:
      1. Acknowledges their current emotions
      2. Offers relevant coping strategies
      3. Suggests appropriate resources
      4. Encourages professional help if needed
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      // Validate response
      if (!validateResponse(responseText, category)) {
        throw new Error("Response validation failed");
      }

      return {
        success: true,
        response: responseText,
        emotion: emotionAnalysis.analysis,
        category,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Personalized response error:", error);
      throw new Error("Failed to generate personalized response");
    }
  }

  determineCategory(emotionAnalysis) {
    const { primaryEmotions, intensity } = emotionAnalysis;

    if (primaryEmotions.includes("fear")) {
      return "anxiety";
    } else if (primaryEmotions.includes("sadness") && intensity > 7) {
      return "depression";
    } else if (primaryEmotions.includes("anger")) {
      return "stress";
    } else if (
      primaryEmotions.includes("disgust") ||
      primaryEmotions.includes("shame")
    ) {
      return "selfEsteem";
    } else {
      return "relationships";
    }
  }
}

module.exports = EmotionAnalysisService;
