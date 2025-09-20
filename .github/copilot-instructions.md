# AI Agent Instructions for Global Youth Wellness

This document provides essential guidance for AI agents working with the Global Youth Wellness codebase. Follow these conventions and patterns to maintain consistency and productivity.

## Project Architecture

### Frontend (React + TypeScript + Tailwind)

- Entry point: `src/App.tsx` - Main application component using Tailwind for styling
- Component organization: Components focus on specific wellness domains (mental, physical, community)
- Design system: Uses Tailwind's utility classes with custom gradients and shadows
- Example pattern:
  ```tsx
  // Component structure in App.tsx
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="text-{color}-500 text-3xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
  ```

### Backend (Node.js + Express + Gemini AI)

- Entry point: `backend/index.js` - Express server configuration
- API Routes: Modular routing in `backend/routes/`
- Key integration: Gemini AI via Vertex AI (`backend/routes/gemini.js`)
- Environment config: Uses `.env` for configuration (copy from `.env.example`)

### Critical Integration Points

1. **Gemini AI Integration**

   - Configuration in `backend/routes/gemini.js`
   - Required env vars: `GOOGLE_CLOUD_PROJECT_ID`, `GOOGLE_APPLICATION_CREDENTIALS`
   - API endpoints:
     - POST `/api/gemini/chat`: Interactive chat
     - POST `/api/gemini/wellness-advice`: Specialized wellness guidance
     - POST `/api/gemini/generate`: Custom content generation
     - GET `/api/gemini/health`: Service health check

2. **Frontend-Backend Communication**
   - Base URL: `http://localhost:3000` (development)
   - Example API call pattern:
   ```typescript
   await fetch("/api/gemini/wellness-advice", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       question: string,
       category: string,
       userAge: string,
     }),
   });
   ```

## Development Workflow

### Environment Setup

1. Clone repo and install dependencies:
   ```bash
   npm install  # Root and backend
   cd src && npm install  # Frontend
   ```
2. Copy `.env.example` to `.env` in backend directory
3. Configure Google Cloud credentials before starting development

### Local Development

- Frontend: `cd src && npm run dev`
- Backend: `cd backend && npm run dev`
- Both servers must be running for full functionality

### Testing

- Use Jest for testing components and API endpoints
- Follow existing patterns in test files (when added)

## Project-Specific Conventions

### Error Handling

```javascript
// Standard error response format in API routes
res.status(500).json({
  error: "Error description",
  code: "ERROR_CODE",
  details: process.env.NODE_ENV === "development" ? error.message : undefined,
});
```

### AI Response Generation

- Use provided system instructions for consistent AI voice
- Always include disclaimers for health/wellness advice
- Example from `gemini.js`:
  ```javascript
  const systemInstruction = {
    parts: [
      {
        text: `You are a helpful wellness assistant...
      Guidelines:
      - Be supportive, empathetic, and age-appropriate
      - Provide practical, actionable advice
      - Encourage professional help for serious issues
      ...`,
      },
    ],
  };
  ```

### Component Structure

- Use functional components with TypeScript
- Implement Tailwind CSS for styling
- Follow existing responsive design patterns

## Health & Safety Guidelines

1. **Content Safety**

   - All AI responses must be filtered for age-appropriate content
   - Include health disclaimers where relevant
   - Direct users to professional help for serious issues

2. **Data Privacy**
   - Don't store sensitive user information
   - Use environment variables for secrets
   - Monitor API usage and implement rate limiting

## Common Tasks

### Adding New AI Features

1. Add route in `backend/routes/gemini.js`
2. Create corresponding frontend component
3. Implement error handling and loading states
4. Add appropriate system instructions for AI context

### Modifying UI Components

1. Follow Tailwind CSS patterns in `App.tsx`
2. Maintain responsive design (mobile-first)
3. Use existing color scheme and typography

## Getting Help

- Check `README.md` for detailed setup instructions
- Review example components in `src/App.tsx`
- Examine API implementation in `backend/routes/gemini.js`
- Key files to understand:
  - `backend/routes/gemini.js`: AI integration
  - `src/App.tsx`: Main UI components
  - `.env.example`: Required configuration
