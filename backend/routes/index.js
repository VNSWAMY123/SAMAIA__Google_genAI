const express = require("express");
const router = express.Router();
const geminiRoutes = require("./gemini");
const mentalHealthRoutes = require("./mental-health");
const riskRoutes = require("./risk");

// Health check route
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount route modules
router.use("/gemini", geminiRoutes);
router.use("/mental-health", mentalHealthRoutes);
router.use("/risk", riskRoutes);

module.exports = router;
