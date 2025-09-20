import React, { useState } from "react";
import "./App.css";
import WellnessChat from "./components/WellnessChat";
import MeditationPlayer from "./components/MeditationPlayer";
import MoodTracker from "./components/MoodTracker";
import JournalComponent from "./components/JournalComponent";
import RiskMonitor from "./components/RiskMonitor";
import StressRelief from "./components/StressRelief";
import AuthScreen from "./components/AuthScreen";
import AIMoodAnalyzer from "./components/AIMoodAnalyzer";
import AboutUs from "./components/AboutUs";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  emoji: string;
}

const navigation: NavItem[] = [
  { id: "home", label: "Home", emoji: "✨" },
  { id: "meditation", label: "Mindfulness", emoji: "🧘‍♂️" },
  { id: "stress", label: "Calm Space", emoji: "🌸" },
  { id: "mood", label: "Mood Insights", emoji: "📊" },
  { id: "ai-mood", label: "AI Analysis", emoji: "🧠" },
  { id: "journal", label: "Reflection", emoji: "📝" },
  { id: "chat", label: "AI Companion", emoji: "💫" },
  { id: "risk", label: "Support Hub", emoji: "🤗" },
  { id: "about", label: "About Us", emoji: "👥" },
];

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Show authentication screen if user is not logged in
  if (!currentUser) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setActiveSection("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-white text-sm font-bold">S</span>
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  SAMAIA
                </h1>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50/50"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="mr-2 text-base">{item.emoji}</span>
                  {item.label}
                </motion.button>
              ))}

              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <motion.span 
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {currentUser.email?.split('@')[0]}
                </motion.span>
                <motion.button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 focus:outline-none hover:bg-purple-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span 
                  className="text-2xl block"
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ☰
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden py-4 bg-white/90 backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg mx-2 my-1 transition-all ${
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-purple-500 to-indigo-600"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-3 text-base">{item.emoji}</span>
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WellnessChat />
            </motion.div>
          )}
          {activeSection === "meditation" && (
            <motion.div
              key="meditation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MeditationPlayer />
            </motion.div>
          )}
          {activeSection === "mood" && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MoodTracker />
            </motion.div>
          )}
          {activeSection === "ai-mood" && (
            <motion.div
              key="ai-mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AIMoodAnalyzer />
            </motion.div>
          )}
          {activeSection === "journal" && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <JournalComponent />
            </motion.div>
          )}
          {activeSection === "risk" && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <RiskMonitor />
            </motion.div>
          )}
          {activeSection === "stress" && (
            <motion.div
              key="stress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StressRelief />
            </motion.div>
          )}

          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutUs />
            </motion.div>
          )}

          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Welcome Section */}
              <motion.section 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <motion.span 
                      className="text-white text-3xl font-bold"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      S
                    </motion.span>
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Welcome to SAMAIA
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Your intelligent companion for mental wellness. Experience personalized AI-powered support, 
                  mindfulness practices, and emotional insights designed to nurture your mental health journey.
                </motion.p>
                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700 border border-white/20">
                    ✨ AI-Powered Support
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700 border border-white/20">
                    🧠 Smart Mood Analysis
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700 border border-white/20">
                    🌸 Mindful Practices
                  </div>
                </motion.div>
              </motion.section>

              {/* Features Grid */}
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {/* Mindfulness Card */}
                <motion.div
                  onClick={() => setActiveSection("meditation")}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 hover:border-purple-200"
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.div 
                    className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    🧘‍♂️
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                    Mindful Meditation
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Discover inner peace with AI-guided meditations tailored to your emotional state and preferences.
                  </p>
                  <div className="text-purple-600 font-semibold group-hover:text-purple-700 flex items-center">
                    Begin Journey 
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>

              {/* Mood Tracking Card */}
              <div
                onClick={() => setActiveSection("mood")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Mood Tracking
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your daily moods, identify patterns, and gain insights
                  into your emotional well-being.
                </p>
                <div className="text-indigo-600 font-medium hover:text-indigo-700">
                  Track Mood →
                </div>
              </div>

              {/* AI Chat Support Card */}
              <div
                onClick={() => setActiveSection("chat")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AI Chat Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Get 24/7 support from our AI wellness assistant powered by Gemini AI for empathetic guidance.
                </p>
                <div className="text-indigo-600 font-medium hover:text-indigo-700">
                  Start Chat →
                </div>
              </div>

              {/* AI Mood Analysis Card */}
              <div
                onClick={() => setActiveSection("ai-mood")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AI Mood Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Advanced AI-powered mood analysis that provides personalized insights and recommendations.
                </p>
                <div className="text-indigo-600 font-medium hover:text-indigo-700">
                  Analyze Mood →
                </div>
              </div>

              {/* Journaling Card */}
              <div
                onClick={() => setActiveSection("journal")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">📔</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Guided Journaling
                </h3>
                <p className="text-gray-600 mb-4">
                  Express your thoughts with guided prompts designed to promote
                  self-reflection and emotional processing.
                </p>
                <div className="text-indigo-600 font-medium hover:text-indigo-700">
                  Start Writing →
                </div>
              </div>

              {/* Stress Relief Card */}
              <div
                onClick={() => setActiveSection("stress")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">🌸</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Stress Relief Tools
                </h3>
                <p className="text-gray-600 mb-4">
                  Access tools, techniques and resources to help manage stress
                  and anxiety effectively.
                </p>
                <div className="text-indigo-600 font-medium hover:text-indigo-700">
                  Browse Tools →
                </div>
              </div>

              {/* Emergency Support Card */}
              <div
                onClick={() => setActiveSection("risk")}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-4">🛟</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Crisis Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Immediate access to crisis helplines and professional mental
                  health resources when you need them most.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection("risk");
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Get Help Now
                </button>
              </div>
              </motion.div>

              {/* Help Section */}
              <motion.section 
                className="text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Need Professional Support?
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                  While SAMAIA provides 24/7 AI support, sometimes you need human connection. 
                  We can help you find licensed therapists and counselors in your area.
                </p>
                <motion.button
                  onClick={() => setActiveSection("risk")}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Professional Help
                </motion.button>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-white/80 backdrop-blur-lg border-t border-white/20 py-12 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SAMAIA
              </h3>
            </motion.div>
            <p className="text-gray-600 mb-4">Your intelligent companion for mental wellness</p>
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
              <span>🔒 Secure & Private</span>
              <span>🤖 AI-Powered</span>
              <span>🌍 Available 24/7</span>
              <span>💝 Made with Care</span>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
                <motion.button
                  onClick={() => setActiveSection("about")}
                  className="text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  About Us
                </motion.button>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">Privacy Policy</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">Terms of Service</span>
              </div>
              <p className="text-gray-600 mb-2">© 2025 SAMAIA. All rights reserved.</p>
              <p className="text-sm text-gray-500">
                For emergencies, please call your local emergency services or mental health crisis hotline.
              </p>
            </div>
          </div>
        </div>
      </motion.footer>

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
