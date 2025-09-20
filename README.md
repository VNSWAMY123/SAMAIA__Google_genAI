# SAMAIA - Smart AI Mental wellness Assistant Intelligent Analysis

**Your intelligent AI companion that transforms mental wellness through personalized conversations, advanced mood analysis, and 24/7 emotional support.**

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

</div>

## Problem Statement

Mental health support is often inaccessible, expensive, or unavailable when people need it most. Traditional mental health resources have long wait times, high costs, and limited availability. Many individuals struggle with understanding their emotional patterns, lack immediate support during crises, and need personalized coping strategies that fit their unique situations. The stigma around seeking mental health support further prevents people from getting the help they need.

## Our Solution

SAMAIA addresses these challenges by providing an intelligent, accessible, and personalized mental wellness platform that combines cutting-edge AI technology with evidence-based therapeutic approaches:

**🤖 AI-Powered Companion**: Provides 24/7 availability with personalized conversations that remember context and adapt to unique user needs. Features automatic crisis detection and empathetic responses using therapeutic-grade prompts.

**🧠 Advanced Mood Analysis**: Uses AI for deep emotional intelligence analysis, categorizing emotional states with Low/Medium/High risk assessment and providing personalized insights with professional referrals when needed.

**🎨 Accessible Interface**: Features a modern glassmorphism design with smooth animations, mobile-responsive layout, and secure Firebase authentication for a protected, private mental health space.

SAMAIA democratizes mental health support by making professional-quality emotional assistance accessible to everyone, regardless of location, time, or financial constraints.

## How Gemini is Used

SAMAIA leverages Google's **Gemini 2.0 Flash** and **Gemini Pro** models to provide intelligent, therapeutic-grade mental health support through specific API implementations:

### 1. AI Chat Companion
```typescript
await geminiService.generateWellnessResponse(userMessage, conversationContext)
```
We use the **Gemini 2.0 Flash model** to generate empathetic, personalized responses to user mental health concerns. The system maintains conversation history for meaningful, continuous support and automatically identifies high-risk language to provide immediate crisis resources.

### 2. Advanced Mood Analysis  
```typescript
await geminiService.analyzeMood(userText)
```
We use the **Gemini 2.0 Flash model** to analyze written text and determine emotional state, confidence levels, and risk assessment. The output is JSON-structured analysis including mood classification, insights, recommendations, and risk level (Low/Medium/High) with automatic professional referrals for high-risk situations.

### 3. Personalized Journal Prompts
```typescript
await geminiService.generateJournalPrompts(currentMood, previousEntries)
```
We use the **Gemini Pro model** to create personalized, therapeutic journal prompts based on the user's emotional state and history, adapting to previous entries and current mood for maximum relevance.

### 4. Guided Meditation Scripts
```typescript
await geminiService.generateMeditationScript(duration, focusArea)
```
We use the **Gemini Pro model** to generate personalized meditation scripts tailored to user's specific needs and time constraints, with therapeutic focus on anxiety relief, stress management, and emotional regulation.

## Tech Stack

**Frontend Framework:**
- React 18.2.0 - Modern React with hooks and concurrent features
- TypeScript - Type-safe development with enhanced IDE support
- Vite - Fast build tool and development server

**Styling & Animation:**
- Tailwind CSS - Utility-first CSS framework for responsive styling
- Framer Motion - Production-ready motion library for smooth animations
- Custom CSS - Glassmorphism effects and gradient themes

**AI & APIs:**
- Google Gemini 2.0 Flash - Latest AI model for conversations and mood analysis
- Gemini Pro - Fallback model for specialized tasks
- Gemini API - RESTful API integration for AI-powered features

**Authentication & Security:**
- Firebase Authentication - Secure user authentication with email/password and Google Sign-In
- Firebase Security Rules - Protected user data and session management
- Environment Variables - Secure API key management

**Development Tools:**
- ESLint & Prettier - Code quality and formatting
- Git - Version control and collaboration

## 📋 Prerequisites

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Google Gemini API Key** - [Get from AI Studio](https://aistudio.google.com/app/apikey)
- **Firebase Project** - [Create at Firebase Console](https://console.firebase.google.com/)

## 🚀 Setup Instructions

Follow these clear steps to run SAMAIA locally on your machine:

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/VNSWAMY123/google-gen.git
cd google-gen
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Get Your API Keys**

#### **Gemini AI API Key**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

#### **Firebase Configuration**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings → General → Your apps
4. Add a web app and copy the configuration values
5. Enable Authentication → Sign-in method → Email/Password and Google

### **Step 4: Environment Configuration**

Create a `.env` file in the root directory and add your keys:

```env
# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **Step 5: Start Development Server**

```bash
npm run dev
```

### **Step 6: Access SAMAIA**

Open your browser and navigate to `http://localhost:5173`

🎉 **You're ready to experience SAMAIA!** 

- Create an account or sign in with Google
- Start chatting with your AI wellness companion
- Try the mood analysis feature
- Explore all the mental wellness tools

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run code linting
```

## 📱 Application Architecture

```
src/
├── components/
│   ├── AuthScreen.tsx          # Firebase Authentication (mandatory login)
│   ├── WellnessChat.tsx        # AI Chat Companion with Gemini integration
│   ├── AIMoodAnalyzer.tsx      # Advanced mood analysis using Gemini AI
│   ├── MeditationPlayer.tsx    # Mindfulness and meditation sessions
│   ├── MoodTracker.tsx         # Mood tracking and insights
│   ├── JournalComponent.tsx    # Reflection journaling with AI prompts
│   ├── StressRelief.tsx        # Stress management tools
│   └── RiskMonitor.tsx         # Crisis support and professional resources
├── contexts/
│   └── AuthContext.tsx         # Firebase Authentication context
├── services/
│   └── geminiService.ts        # Centralized Gemini AI service
├── App.tsx                     # Main application with routing
├── App.css                     # Custom styles and animations
└── main.tsx                    # Application entry point
```

## 🌟 Key Features

- **🤖 AI Chat Companion** - 24/7 conversational support with context awareness
- **🧠 Mood Analysis** - Deep emotional state analysis with risk assessment  
- **🔐 Secure Authentication** - Firebase-powered login with Google Sign-In
- **🎨 Beautiful UI** - Glassmorphism design with smooth animations
- **📱 Responsive Design** - Works seamlessly on all devices
- **🛡️ Privacy-First** - No conversation data stored, client-side processing
- **⚡ Real-time Support** - Instant AI responses and crisis detection

## 🎯 Core Components

### 🤖 **AI Chat Companion** (`WellnessChat.tsx`)
- **Context-aware conversations** with memory of previous interactions
- **Quick action buttons** for common mental health concerns
- **Suggestion extraction** from AI responses for follow-up questions
- **Crisis detection** with automatic professional resource recommendations
- **Beautiful animations** with Framer Motion for engaging interactions

### 🧠 **Mood Analysis Tool** (`AIMoodAnalyzer.tsx`)
- **Deep emotional analysis** using Gemini 2.0 Flash AI model
- **Risk level assessment** (Low/Medium/High) with appropriate interventions
- **Personalized insights** based on your written thoughts and feelings
- **Professional recommendations** tailored to your emotional state
- **Crisis resource integration** for high-risk situations

### 🔐 **Authentication System** (`AuthScreen.tsx`)
- **Mandatory authentication** before accessing wellness features
- **Firebase Auth integration** with email/password and Google Sign-In
- **Beautiful UI with animations** to encourage user engagement
- **Features preview** to showcase app capabilities during signup
- **Secure session management** with automatic redirects

### 🎨 **Design System**
- **Glassmorphism effects** with backdrop blur and transparency
- **Purple-to-indigo gradient theme** for calming, professional aesthetic
- **Smooth animations** and micro-interactions throughout the app
- **Responsive design** optimized for mobile and desktop experiences
- **Custom CSS animations** for loading states and transitions

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔧 Gemini AI Service

SAMAIA uses a centralized `geminiService.ts` that provides:

### **Core Methods**

```typescript
// Generate wellness-focused responses
await geminiService.generateWellnessResponse(userMessage, context)

// Analyze emotional state and provide insights
await geminiService.analyzeMood(userText)

// Generate personalized journal prompts
await geminiService.generateJournalPrompts(mood, previousEntries)

// Create guided meditation scripts
await geminiService.generateMeditationScript(duration, focus)

// Check if service is properly configured
geminiService.isConfigured()
```

### **AI Features**

- **Gemini 2.0 Flash Model** with automatic fallback to Gemini Pro
- **Specialized mental health prompts** designed by wellness professionals
- **Context-aware conversations** that remember previous interactions
- **Crisis detection algorithms** for user safety
- **Professional therapeutic response generation**

## 🎨 UI/UX Highlights

### **Animations & Interactions**

- **Page transitions** with AnimatePresence for smooth section changes
- **Micro-interactions** on buttons, cards, and form elements
- **Loading animations** with rotating SAMAIA logos and pulsing elements
- **Hover effects** with scale transformations and shadow changes
- **Mobile-optimized** touch interactions and responsive animations

### **Design Philosophy**

- **Glassmorphism aesthetic** for modern, approachable interface
- **Purple-to-indigo gradients** creating calming, professional atmosphere
- **Consistent spacing** and typography using Inter font family
- **Accessibility-first** design with proper contrast and focus states
- **Mental health-focused** color psychology and visual hierarchy

## 🛡️ Security & Privacy

### **Data Protection**
- **Firebase Authentication** ensures secure user sessions
- **Client-side AI processing** with no conversation data stored on servers
- **Environment variable protection** for API keys and sensitive data
- **HTTPS enforcement** for all production deployments

### **Mental Health Safety**
- **Crisis detection** algorithms identify high-risk conversations
- **Professional resource integration** with immediate help options
- **Risk level assessment** (Low/Medium/High) with appropriate interventions
- **Privacy-first approach** with no personal data retention

## 🚀 Deployment

### **Production Build**

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### **Environment Variables for Production**

```env
# Production environment variables
VITE_GEMINI_API_KEY=your_production_gemini_key
VITE_FIREBASE_API_KEY=your_production_firebase_key
# ... other Firebase config values
```

### **Recommended Hosting Platforms**

- **Firebase Hosting** - Integrated with Firebase services
- **GitHub Pages** - Free hosting for open source projects

## 🤝 Contributing

We welcome contributions to make SAMAIA even better! Here's how you can help:

### **Ways to Contribute**

- 🐛 **Bug Reports** - Found an issue? Let us know!
- ✨ **Feature Requests** - Have ideas for new wellness features?
- 🎨 **UI/UX Improvements** - Help make SAMAIA more beautiful and accessible
- 🧠 **AI Enhancements** - Improve prompts and conversation quality
- 📚 **Documentation** - Help others understand and use SAMAIA

### **Development Setup**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request with detailed description

## 📞 Support & Resources

### **Mental Health Resources**

- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988
- **SAMHSA National Helpline**: 1-800-662-4357
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)

### **Technical Support**

- 📧 **Email**: support@samaia.app
- 🐛 **Issues**: [GitHub Issues](https://github.com/VNSWAMY123/google-gen/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/VNSWAMY123/google-gen/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## 👥 Our Team

- [V N Swamy]((https://www.linkedin.com/in/v-n-swamy-72ba87322/))  
- [Priya Vijay Palekar](https://www.linkedin.com/in/priya-palekar-750b4435a/))  
- [Krupasham S Jadhav]((https://www.linkedin.com/in/krupasham-s-jadhav-80a61031a/))  
- [Srinidhi N]((https://www.linkedin.com/in/srinidhi-nagaraj-05b66b374))  
- [Divya Sharma]((http://www.linkedin.com/in/divya-sharma-22b735295))


## 🙏 Acknowledgments

- **Google AI** for the powerful Gemini models that make SAMAIA possible
- **Firebase** for secure authentication and hosting infrastructure
- **Mental health professionals** who guided our therapeutic approach
- **Open source community** for the amazing tools and libraries
- **All users** who trust SAMAIA with their mental wellness journey

---

<div align="center">

**Made with 💜 for mental wellness**

*SAMAIA - Your intelligent companion for a healthier, happier mind*

[![GitHub stars](https://img.shields.io/github/stars/VNSWAMY123/google-gen?style=social)](https://github.com/VNSWAMY123/google-gen)
[![Follow on GitHub](https://img.shields.io/github/followers/VNSWAMY123?style=social)](https://github.com/VNSWAMY123)

