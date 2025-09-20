const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3007;

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3006",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    code: "RATE_LIMIT_EXCEEDED",
  },
});
app.use("/api/", limiter);

// Stricter rate limit for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    error: "AI request limit reached. Please try again later.",
    code: "AI_RATE_LIMIT_EXCEEDED",
  },
});
app.use("/api/gemini/", aiLimiter);
app.use("/api/mental-health/", aiLimiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Global Youth Wellness Backend API!",
    version: "1.0.0",
    status: "running",
    features: [
      "Gemini AI Integration",
      "Mental Health Support",
      "Guided Meditation",
      "Mood Tracking",
      "Journaling",
    ],
  });
});

// Import and use API routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// Error Types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
      code: "VALIDATION_ERROR",
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      error: "Authentication Error",
      message: err.message,
      code: "AUTH_ERROR",
    });
  }

  // Handle Gemini AI specific errors
  if (err.message.includes("Vertex AI")) {
    return res.status(503).json({
      error: "AI Service Unavailable",
      message: "The AI service is temporarily unavailable",
      code: "AI_SERVICE_ERROR",
    });
  }

  // Generic error response
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    code: "INTERNAL_ERROR",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    code: "NOT_FOUND",
  });
});

// Graceful shutdown handler
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Performing graceful shutdown...");
  server.close(() => {
    console.log("Server closed. Exiting process.");
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Global Youth Wellness API Server
----------------------------------
🌐 Server running on port: ${PORT}
📍 Environment: ${process.env.NODE_ENV || "development"}
🔐 Security: Enabled (Helmet + CORS)
⚡ Rate Limiting: Enabled
🤖 AI Integration: Vertex AI (Gemini)

Available endpoints:
- Frontend: http://localhost:3006
- API Base: http://localhost:${PORT}/api
- Mental Health: http://localhost:${PORT}/api/mental-health
- Gemini AI: http://localhost:${PORT}/api/gemini

For documentation and support:
https://github.com/VNSWAMY123/google-gen
  `);
});
