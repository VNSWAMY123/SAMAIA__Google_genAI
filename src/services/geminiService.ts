import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API key not found in environment variables");
      console.error("Make sure VITE_GEMINI_API_KEY is set in your .env file");
      return;
    }
    
    if (!apiKey.startsWith('AIza')) {
      console.error("Invalid API key format. Should start with 'AIza'");
      return;
    }
    
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Using the latest Gemini 2.0 Flash model for better performance
      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        }
      });
      console.log("✅ Gemini AI 2.0 Flash initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Gemini:", error);
      // Fallback to gemini-pro if 2.0 flash is not available
      try {
        if (this.genAI) {
          this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
          console.log("✅ Gemini AI Pro initialized as fallback");
        }
      } catch (fallbackError) {
        console.error("❌ Fallback initialization failed:", fallbackError);
      }
    }
  }

  async generateWellnessResponse(userMessage: string, context: string[] = []): Promise<string> {
    if (!this.model) {
      throw new Error("Gemini AI not properly configured. Please check your API key.");
    }

    const contextHistory = context.slice(-3).join('\n');
    const prompt = `You are a compassionate AI wellness assistant specializing in mental health support. Your role is to provide:

    🎯 CORE PRINCIPLES:
    - Empathetic, non-judgmental responses
    - Evidence-based coping strategies
    - Crisis awareness and professional referrals when needed
    - Culturally sensitive and inclusive support

    📝 CONVERSATION CONTEXT: ${contextHistory}

    💬 USER MESSAGE: "${userMessage}"

    🤝 RESPONSE GUIDELINES:
    1. Acknowledge their feelings with empathy
    2. Provide 1-2 practical, actionable suggestions
    3. Include gentle encouragement
    4. If detecting distress, mention professional support options
    5. End with 2-3 follow-up suggestions as bullet points (• format)

    ⚠️ SAFETY: If you detect signs of crisis, self-harm, or severe mental health issues, prioritize safety resources.

    Keep responses warm, professional, and under 200 words.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async analyzeMood(text: string): Promise<any> {
    if (!this.model) {
      throw new Error("Gemini AI not properly configured. Please check your API key.");
    }

    const prompt = `Analyze the emotional tone and mood of the following text. Provide a JSON response with the following structure:
    {
      "mood": "primary mood (e.g., happy, sad, anxious, stressed, calm, etc.)",
      "confidence": confidence_score_0_to_100,
      "insights": ["insight1", "insight2", "insight3"],
      "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
      "riskLevel": "low|medium|high"
    }

    Consider mental health indicators and provide supportive recommendations. Risk level should be:
    - low: generally positive or neutral mood
    - medium: some stress or negative emotions but manageable
    - high: signs of severe distress, depression, or crisis (mention professional help)

    Text to analyze: "${text}"

    Respond ONLY with valid JSON, no additional text.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();

    // Clean up the response to extract JSON
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    return JSON.parse(jsonMatch[0]);
  }

  async generateJournalPrompts(mood?: string, previousEntries?: string[]): Promise<string[]> {
    if (!this.model) {
      throw new Error("Gemini AI not properly configured. Please check your API key.");
    }

    const context = previousEntries ? previousEntries.slice(-2).join('\n') : '';
    const moodContext = mood ? `Current mood: ${mood}` : '';

    const prompt = `Generate 5 thoughtful, therapeutic journal prompts for mental wellness. 
    ${moodContext}
    Previous journal context: ${context}
    
    The prompts should:
    - Encourage self-reflection and emotional processing
    - Be appropriate for mental health journaling
    - Help users explore their feelings and thoughts
    - Promote positive coping and growth mindset
    - Be varied in approach (gratitude, reflection, goal-setting, etc.)
    
    Return as a JSON array of strings: ["prompt1", "prompt2", "prompt3", "prompt4", "prompt5"]
    
    Respond ONLY with valid JSON array, no additional text.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();

    // Clean up the response to extract JSON
    const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    return JSON.parse(jsonMatch[0]);
  }

  async generateMeditationScript(duration: number, focus: string): Promise<string> {
    if (!this.model) {
      throw new Error("Gemini AI not properly configured. Please check your API key.");
    }

    const prompt = `Create a ${duration}-minute guided meditation script focused on ${focus}. 
    The script should:
    - Be calming and supportive
    - Include breathing instructions
    - Have appropriate pacing for the duration
    - Include mindfulness techniques
    - End with a gentle conclusion
    
    Format the script with timing cues like [0:00], [1:00], etc.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  isConfigured(): boolean {
    return this.model !== null;
  }
}

export const geminiService = new GeminiService();
export default geminiService;
