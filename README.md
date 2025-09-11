# Global Youth Wellness

## Vision Statement

Empowering young people worldwide to achieve holistic wellness through accessible digital resources, community support, and evidence-based practices for mental, physical, and emotional well-being.

## Features

- **Mental Health Resources**: Access to guided meditation, stress management tools, and mental wellness tracking
- **Physical Wellness**: Fitness routines, nutrition guidance, and health monitoring tools designed for youth
- **Community Support**: Safe spaces for peer connection, discussion forums, and mentorship programs
- **Educational Content**: Evidence-based articles, videos, and interactive content on wellness topics
- **Personalized Dashboard**: Track progress, set goals, and receive personalized recommendations
- **Crisis Support**: Direct access to professional help and crisis intervention resources
- **Multilingual Support**: Available in multiple languages to serve global youth communities
- **🤖 AI-Powered Wellness Advice**: Integrated Google Gemini AI for personalized, evidence-based wellness guidance

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **AI Integration**: Google Vertex AI (Gemini)
- **Authentication**: Auth0
- **Deployment**: Vercel (Frontend), Railway (Backend)
- **Testing**: Jest, React Testing Library
- **Design**: Figma, Adobe Creative Suite

## Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **PostgreSQL** (for database)
- **Google Cloud Platform account** (for Gemini AI integration)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VNSWAMY123/google-gen.git
cd google-gen
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../src  # or your frontend directory

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 4. Google Cloud Platform / Vertex AI Setup

#### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "youth-wellness-ai")
4. Note your **Project ID** (you'll need this)

#### Step 2: Enable Vertex AI API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Vertex AI API"
3. Click on it and press **Enable**

#### Step 3: Create a Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Enter details:
   - **Name**: `gemini-ai-service`
   - **Description**: `Service account for Gemini AI integration`
4. Click **Create and Continue**

#### Step 4: Assign Permissions

1. Add the following roles:
   - `Vertex AI User`
   - `AI Platform Developer` (optional, for advanced features)
2. Click **Continue** → **Done**

#### Step 5: Generate Service Account Key

1. Find your service account in the list
2. Click the **Actions** menu (⋮) → **Manage keys**
3. Click **Add Key** → **Create new key**
4. Select **JSON** and click **Create**
5. **Save the downloaded file securely** - you'll need it!

### 5. Configure Environment Variables

Edit your `backend/.env` file with your GCP details:

```env
# Google Cloud Platform Configuration
GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json

# Gemini Model Configuration
GEMINI_MODEL=gemini-1.5-flash-preview-0514
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.4
GEMINI_TOP_P=0.95

# Other required variables
PORT=3000
NODE_ENV=development
```

### 6. Install Required Dependencies

The backend requires the Google Cloud Vertex AI package:

```bash
cd backend
npm install @google-cloud/vertexai
```

## Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3000`

**Frontend:**
```bash
cd src  # or your frontend directory
npm run dev
```
The frontend will run on `http://localhost:3000` (if using Vite/Create React App)

### Production Build

**Backend:**
```bash
npm run build
npm start
```

**Frontend:**
```bash
npm run build
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Gemini AI Endpoints

The application provides several AI-powered endpoints:

- `GET /api/gemini/health` - Check Gemini service health
- `POST /api/gemini/chat` - Chat with Gemini AI
- `POST /api/gemini/generate` - Generate content with custom prompts
- `POST /api/gemini/wellness-advice` - Get specialized wellness advice for youth

### Example Usage

**Get Wellness Advice:**
```bash
curl -X POST http://localhost:3000/api/gemini/wellness-advice \
  -H "Content-Type: application/json" \
  -d '{
    "question": "I\'ve been feeling stressed about school. Any advice?",
    "category": "mental-health",
    "userAge": "16-18"
  }'
```

**Chat with AI:**
```bash
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are some healthy coping strategies for anxiety?"
  }'
```

## Frontend Integration

### React Components for AI Features

Create these components to integrate with the AI endpoints:

```typescript
// src/components/WellnessChat.tsx
import React, { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export const WellnessChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await fetch('/api/gemini/wellness-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          category: 'general',
          userAge: '16-25' // You can make this dynamic
        })
      });
      
      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: data.advice,
        timestamp: data.timestamp
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    setInput('');
    setLoading(false);
  };

  return (
    <div className="wellness-chat">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI Wellness Assistant'}:</strong>
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about wellness, mental health, or coping strategies..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
};
```

### Environment Variables for Frontend

Create `src/.env.local`:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_GEMINI_ENABLED=true
```

## Deployment

### Production Environment Variables

For production deployment, you can use the service account key as a JSON string:

```env
# Instead of file path, use the entire JSON content
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"..."}'
```

### Security Best Practices

1. **Never commit service account keys** to version control
2. Use **environment variables** or **secret management** services
3. Implement **rate limiting** for AI endpoints
4. Add **input validation** and **sanitization**
5. Monitor **API usage** and **costs** in Google Cloud Console

## Troubleshooting

### Common Issues

**1. Authentication Error**
```
Error: Failed to initialize Vertex AI
```
- Verify your `GOOGLE_CLOUD_PROJECT_ID` is correct
- Check that your service account key file exists and has correct permissions
- Ensure Vertex AI API is enabled in your GCP project

**2. Model Not Found**
```
Error: Model gemini-1.5-flash-preview-0514 not found
```
- The model name might have changed. Check the latest available models in Vertex AI
- Try using `gemini-1.0-pro` as an alternative

**3. Quota Exceeded**
```
Error: API quota exceeded
```
- Check your usage in Google Cloud Console
- Consider upgrading your billing plan or requesting quota increases

### Testing the Integration

```bash
# Test the health endpoint
curl http://localhost:3000/api/gemini/health

# Expected response:
{
  "status": "ok",
  "service": "Gemini Vertex AI",
  "configured": true,
  "model": "gemini-1.5-flash-preview-0514",
  "location": "us-central1",
  "timestamp": "2025-09-11T10:40:00.000Z"
}
```

## Contributing

We welcome contributions from developers, designers, mental health professionals, and youth advocates! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Project Information

- **License**: MIT License - see [LICENSE.md](LICENSE.md) for details
- **Code of Conduct**: Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Issues**: Report bugs and request features in our [Issues](https://github.com/VNSWAMY123/google-gen/issues)
- **Documentation**: Comprehensive docs available in `/docs` folder
- **Support**: Contact us at support@globalyouthwellness.org

## Cost Management

### Google Cloud Costs

- Vertex AI pricing is based on the number of characters processed
- Monitor usage in the [Google Cloud Console](https://console.cloud.google.com/billing)
- Set up **billing alerts** to avoid unexpected charges
- Consider implementing **caching** and **rate limiting** to reduce API calls

### Free Tier

Google Cloud offers a free tier with limited usage. Check current limits at [Google Cloud Free Tier](https://cloud.google.com/free).

## Acknowledgments

- **Google Cloud Platform** and **Vertex AI** for powerful AI capabilities
- **Mental health organizations** worldwide for their guidance
- **Youth advisors** who help shape our platform
- **Open source community** for amazing tools and libraries
- **All contributors** who make this project possible

Together, we're building a healthier future for global youth 🌍💚🤖
