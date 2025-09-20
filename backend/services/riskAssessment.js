const { VertexAI } = require("@google-cloud/vertexai");
const { CRISIS_DISCLAIMER } = require("../utils/aiPrompts");

class RiskAssessmentService {
  constructor() {
    this.vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
    });
  }

  async assessRisk(text, userHistory = []) {
    const model = this.vertexAI.preview.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash-preview-0514",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more focused analysis
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `
      Analyze this message for mental health risk factors:
      "${text}"

      Previous interactions context:
      ${JSON.stringify(userHistory)}

      Assess the following risk factors and rate each from 0-10:
      1. Suicidal ideation
      2. Self-harm risk
      3. Crisis state
      4. Emotional distress
      5. Social support needs

      Consider:
      - Direct statements of harm
      - Indirect warning signs
      - Emotional intensity
      - Support system mentions
      - Pattern changes from history

      Return a JSON object with:
      - Individual risk scores
      - Overall risk level
      - Recommended response level
      - Specific concerns
      - Suggested professional resources
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const assessment = JSON.parse(response.text());

      return this.processRiskAssessment(assessment);
    } catch (error) {
      console.error("Risk assessment error:", error);
      // Default to high caution if analysis fails
      return this.getDefaultRiskResponse();
    }
  }

  processRiskAssessment(assessment) {
    const {
      suicidalIdeation,
      selfHarmRisk,
      crisisState,
      emotionalDistress,
      socialSupportNeeds,
      overallRisk,
      concerns,
    } = assessment;

    // Calculate immediate action threshold
    const requiresImmediateAction =
      suicidalIdeation > 7 || selfHarmRisk > 7 || crisisState > 8;

    // Determine response level
    const responseLevel = this.determineResponseLevel(assessment);

    return {
      riskLevel: overallRisk,
      requiresImmediateAction,
      responseLevel,
      concerns,
      resources: this.getResourcesByRisk(responseLevel),
      disclaimer: CRISIS_DISCLAIMER,
      timestamp: new Date().toISOString(),
    };
  }

  determineResponseLevel(assessment) {
    const {
      suicidalIdeation,
      selfHarmRisk,
      crisisState,
      emotionalDistress,
      socialSupportNeeds,
    } = assessment;

    // Weighted risk calculation
    const weightedRisk =
      suicidalIdeation * 0.35 +
      selfHarmRisk * 0.25 +
      crisisState * 0.2 +
      emotionalDistress * 0.15 +
      socialSupportNeeds * 0.05;

    // Determine response level
    if (weightedRisk >= 7) return "emergency";
    if (weightedRisk >= 5) return "urgent";
    if (weightedRisk >= 3) return "elevated";
    return "standard";
  }

  getResourcesByRisk(level) {
    const resources = {
      emergency: {
        immediate: [
          {
            name: "Emergency Services",
            contact: "911",
            description: "For immediate life-threatening situations",
          },
          {
            name: "Suicide Prevention Lifeline",
            contact: "1-800-273-8255",
            description: "24/7 suicide prevention support",
          },
          {
            name: "Crisis Text Line",
            contact: "Text HOME to 741741",
            description: "24/7 crisis support via text",
          },
        ],
        followUp: [
          {
            name: "Emergency Mental Health Services",
            description: "Local emergency psychiatric services",
          },
          {
            name: "Crisis Support Team",
            description: "Professional mental health crisis team",
          },
        ],
      },
      urgent: {
        immediate: [
          {
            name: "Crisis Text Line",
            contact: "Text HOME to 741741",
            description: "24/7 crisis support via text",
          },
          {
            name: "Warmline Directory",
            description: "Peer support for urgent but non-emergency situations",
          },
        ],
        followUp: [
          {
            name: "Urgent Care Mental Health",
            description: "Same-day mental health appointments",
          },
          {
            name: "Online Counseling",
            description: "24/7 access to licensed therapists",
          },
        ],
      },
      elevated: {
        immediate: [
          {
            name: "Peer Support Hotline",
            description: "Talk to someone who understands",
          },
          {
            name: "Online Support Groups",
            description: "Connect with others in similar situations",
          },
        ],
        followUp: [
          {
            name: "Counseling Services",
            description: "Professional therapy and counseling",
          },
          {
            name: "Mental Health Resources",
            description: "Educational materials and self-help tools",
          },
        ],
      },
      standard: {
        immediate: [
          {
            name: "Wellness Resources",
            description: "Self-help tools and information",
          },
          {
            name: "Community Support",
            description: "Connect with supportive community members",
          },
        ],
        followUp: [
          {
            name: "Mental Health Check-ups",
            description: "Regular mental health maintenance",
          },
          {
            name: "Wellness Programs",
            description: "Preventive mental health programs",
          },
        ],
      },
    };

    return resources[level] || resources.standard;
  }

  getDefaultRiskResponse() {
    return {
      riskLevel: "unknown",
      requiresImmediateAction: true, // Err on the side of caution
      responseLevel: "urgent",
      concerns: ["Unable to assess risk accurately"],
      resources: this.getResourcesByRisk("urgent"),
      disclaimer: CRISIS_DISCLAIMER,
      timestamp: new Date().toISOString(),
    };
  }

  async monitorConversation(messages) {
    // Analyze conversation pattern
    const riskProgression = await Promise.all(
      messages.map((msg) => this.assessRisk(msg.content))
    );

    // Check for escalating risk
    const riskTrend = this.analyzeRiskTrend(riskProgression);

    return {
      riskTrend,
      requiresIntervention: riskTrend.isEscalating,
      recommendedAction: this.getRecommendedAction(riskTrend),
    };
  }

  analyzeRiskTrend(riskProgression) {
    const riskLevels = riskProgression.map(
      (assessment) => assessment.riskLevel
    );

    return {
      isEscalating: this.isRiskEscalating(riskLevels),
      currentLevel: riskLevels[riskLevels.length - 1],
      peak: Math.max(...riskLevels),
      average: riskLevels.reduce((a, b) => a + b, 0) / riskLevels.length,
      trend: this.calculateTrend(riskLevels),
    };
  }

  isRiskEscalating(riskLevels) {
    // Check last 3 assessments for upward trend
    if (riskLevels.length < 3) return false;

    const recent = riskLevels.slice(-3);
    return recent[2] > recent[1] && recent[1] > recent[0];
  }

  calculateTrend(riskLevels) {
    if (riskLevels.length < 2) return "insufficient_data";

    const changes = riskLevels
      .slice(1)
      .map((level, i) => level - riskLevels[i]);

    const averageChange = changes.reduce((a, b) => a + b, 0) / changes.length;

    if (averageChange > 0.5) return "increasing";
    if (averageChange < -0.5) return "decreasing";
    return "stable";
  }

  getRecommendedAction(riskTrend) {
    if (riskTrend.isEscalating) {
      return {
        action: "escalate",
        description:
          "Risk level is increasing. Consider immediate professional intervention.",
        resources: this.getResourcesByRisk("urgent"),
      };
    }

    if (riskTrend.trend === "stable" && riskTrend.average > 5) {
      return {
        action: "monitor",
        description:
          "Risk level is stable but elevated. Maintain close monitoring.",
        resources: this.getResourcesByRisk("elevated"),
      };
    }

    return {
      action: "continue",
      description: "Risk level is manageable. Continue regular support.",
      resources: this.getResourcesByRisk("standard"),
    };
  }
}

module.exports = RiskAssessmentService;
