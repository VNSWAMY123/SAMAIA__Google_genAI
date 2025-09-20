const express = require("express");
const router = express.Router();
const RiskAssessmentService = require("../services/riskAssessment");
const riskService = new RiskAssessmentService();

// Rate limiting for risk assessment endpoints
const rateLimit = require("express-rate-limit");
const assessmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware to validate request body
const validateAssessmentRequest = (req, res, next) => {
  const { text, userHistory } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({
      error: "Invalid request",
      message: "Text content is required",
    });
  }

  if (userHistory && !Array.isArray(userHistory)) {
    return res.status(400).json({
      error: "Invalid request",
      message: "User history must be an array",
    });
  }

  next();
};

// Assess risk from text content
router.post(
  "/assess",
  assessmentLimiter,
  validateAssessmentRequest,
  async (req, res) => {
    try {
      const { text, userHistory = [] } = req.body;
      const assessment = await riskService.assessRisk(text, userHistory);

      res.json(assessment);
    } catch (error) {
      console.error("Risk assessment error:", error);
      res.status(500).json({
        error: "Assessment failed",
        message: "Unable to complete risk assessment",
      });
    }
  }
);

// Monitor conversation for risk patterns
router.post("/monitor", assessmentLimiter, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Messages must be an array",
      });
    }

    const analysis = await riskService.monitorConversation(messages);
    res.json(analysis);
  } catch (error) {
    console.error("Conversation monitoring error:", error);
    res.status(500).json({
      error: "Monitoring failed",
      message: "Unable to analyze conversation",
    });
  }
});

// Get resources by risk level
router.get("/resources/:level", assessmentLimiter, (req, res) => {
  try {
    const { level } = req.params;
    const resources = riskService.getResourcesByRisk(level);
    res.json(resources);
  } catch (error) {
    console.error("Resource fetch error:", error);
    res.status(500).json({
      error: "Resource fetch failed",
      message: "Unable to retrieve resources",
    });
  }
});

module.exports = router;
