import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import geminiService from "../services/geminiService";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: string;
  mood?: string;
  suggestions?: string[];
}

const WellnessChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Check if Gemini AI is configured
  const isGeminiConfigured = () => {
    return geminiService.isConfigured();
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      if (!isGeminiConfigured()) {
        throw new Error("Gemini API not properly configured. Please check your API key.");
      }

      // Use the Gemini service to generate response
      const text = await geminiService.generateWellnessResponse(currentInput, conversationContext);

      // Extract suggestions if present
      const lines = text.split('\n');
      const suggestions = lines
        .filter(line => line.trim().startsWith('• '))
        .map(line => line.replace('• ', '').trim())
        .slice(0, 3);

      const mainContent = lines
        .filter(line => !line.trim().startsWith('• '))
        .join('\n')
        .trim();

      const aiMessage: ChatMessage = {
        role: "ai",
        content: mainContent,
        timestamp: new Date().toISOString(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      };

      // Update conversation context
      setConversationContext(prev => [...prev.slice(-4), `User: ${currentInput}`, `Assistant: ${mainContent}`]);

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      let errorMessage = "I apologize, but I'm having trouble responding right now. ";
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage += "Please check that the Gemini API key is properly configured.";
        } else if (error.message.includes("quota") || error.message.includes("limit")) {
          errorMessage += "The API quota has been exceeded. Please try again later.";
        } else {
          errorMessage += "Please check your internet connection and try again in a moment.";
        }
      }

      const aiErrorMessage: ChatMessage = {
        role: "ai",
        content: errorMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const quickActions = [
    "I'm feeling anxious today",
    "I need help with stress",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
  ];

  return (
    <motion.div 
      className="flex flex-col h-full max-h-[700px] bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Chat Header */}
      <motion.div 
        className="p-6 border-b border-white/20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white font-bold">S</span>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SAMAIA Companion
            </h2>
            <p className="text-sm text-gray-600">
              Your AI wellness companion is here to listen
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div 
              className="text-center text-gray-500 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mb-8"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-6xl">💫</span>
              </motion.div>
              <motion.p 
                className="mb-4 text-lg font-medium text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome to your personal wellness space!
              </motion.p>
              <motion.p 
                className="mb-8 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                How are you feeling today? Choose a quick start or type your own message.
              </motion.p>
              <motion.div 
                className="grid grid-cols-1 gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(action)}
                    className="text-sm bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 px-4 py-3 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-200 hover:border-purple-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {action}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              >
                <motion.div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                      : "bg-white/90 backdrop-blur-sm text-gray-800 border border-white/20"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <motion.p 
                    className="text-sm whitespace-pre-wrap leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {msg.content}
                  </motion.p>
                  
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <motion.div 
                      className="mt-4 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-xs font-medium opacity-75 mb-2">💡 Try asking:</p>
                      {msg.suggestions.map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block text-xs bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-left hover:bg-white/30 transition-all duration-200 w-full border border-white/10"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                  
                  <motion.span 
                    className="text-xs opacity-60 mt-3 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.6 }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))
          )}
        
        {isLoading && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-white text-xs font-bold">S</span>
                </motion.div>
                <div className="flex items-center space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm text-gray-600">SAMAIA is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        className="border-t border-white/20 p-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 backdrop-blur-sm rounded-b-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex space-x-3">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80 backdrop-blur-sm transition-all duration-300"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isLoading || !input.trim()
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg"
            }`}
            whileHover={!isLoading && input.trim() ? { scale: 1.05, y: -2 } : {}}
            whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⟳
              </motion.div>
            ) : (
              <span>Send ✨</span>
            )}
          </motion.button>
        </div>
        <motion.p 
          className="text-xs text-gray-500 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          💝 SAMAIA provides supportive guidance. For emergencies, contact professional services.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default WellnessChat;
