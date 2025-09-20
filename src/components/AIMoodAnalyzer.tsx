import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import geminiService from "../services/geminiService";

interface MoodAnalysis {
  mood: string;
  confidence: number;
  insights: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

const AIMoodAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMood = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      if (!geminiService.isConfigured()) {
        throw new Error("Gemini AI not properly configured");
      }

      const analysisData = await geminiService.analyzeMood(text);
      setAnalysis(analysisData);
    } catch (error) {
      console.error("Mood analysis error:", error);
      setError("Failed to analyze mood. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: { [key: string]: string } = {
      happy: "😊", sad: "😢", anxious: "😰", stressed: "😤",
      calm: "😌", angry: "😠", excited: "🤗", worried: "😟",
      depressed: "😞", content: "😊", frustrated: "😤", peaceful: "☮️"
    };
    return moodEmojis[mood.toLowerCase()] || "😐";
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl mr-4 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white text-lg font-bold">S</span>
          </motion.div>
          <div className="text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SAMAIA Mood Analysis
            </h2>
            <p className="text-gray-600 text-sm">
              Advanced AI emotional intelligence
            </p>
          </div>
        </div>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Share your thoughts and feelings with SAMAIA. Our advanced AI will analyze your emotional state 
          and provide personalized insights to support your mental wellness journey.
        </motion.p>
      </motion.div>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div>
          <motion.label 
            htmlFor="mood-text" 
            className="block text-lg font-semibold text-gray-700 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            💭 Share what's on your mind:
          </motion.label>
          <motion.textarea
            id="mood-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I've been feeling overwhelmed lately with work and personal responsibilities. I find it hard to relax and my sleep has been affected..."
            className="w-full h-40 px-6 py-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-none bg-white/80 backdrop-blur-sm transition-all duration-300 text-gray-700"
            disabled={isAnalyzing}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <motion.button
          onClick={analyzeMood}
          disabled={isAnalyzing || !text.trim()}
          className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isAnalyzing || !text.trim()
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
          }`}
          whileHover={!isAnalyzing && text.trim() ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isAnalyzing && text.trim() ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                🧠
              </motion.div>
              <span>SAMAIA is analyzing...</span>
            </div>
          ) : (
            <span>✨ Analyze My Emotional State</span>
          )}
        </motion.button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {analysis && (
          <div className="mt-6 space-y-4">
            {/* Mood Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getMoodEmoji(analysis.mood)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 capitalize">
                      {analysis.mood}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Confidence: {analysis.confidence}%
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Insights
              </h4>
              <ul className="space-y-2">
                {analysis.insights.map((insight, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🌟</span>
                Recommendations
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.riskLevel === 'high' && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                  <span className="mr-2">🚨</span>
                  Important Notice
                </h4>
                <p className="text-red-700 mb-3">
                  Our analysis suggests you may be experiencing significant distress. Please consider reaching out to a mental health professional for support.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-red-600">Crisis Resources:</p>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• National Suicide Prevention Lifeline: 988</li>
                    <li>• Crisis Text Line: Text HOME to 741741</li>
                    <li>• Emergency Services: 911</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AIMoodAnalyzer;
