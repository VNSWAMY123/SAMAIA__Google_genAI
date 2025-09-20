import React from "react";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "V N Swamy"
  },
  {
    name: "Priya Vijay Palekar"
  },
  {
    name: "Krupasham S Jadhav"
  },
  {
    name: "Srinidhi N"
  },
  {
    name: "Divya Sharma"
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <motion.span 
              className="text-white text-4xl font-bold"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              S
            </motion.span>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          About SAMAIA
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Smart AI Mental wellness Assistant Intelligent Analysis - Your compassionate companion 
          in the journey toward better mental health and emotional well-being.
        </motion.p>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16 border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            We believe that mental wellness support should be accessible, immediate, and personalized for everyone. 
            SAMAIA was born from the recognition that traditional mental health resources often have barriers - 
            long wait times, high costs, limited availability, and stigma. Our mission is to democratize mental 
            health support by combining cutting-edge AI technology with evidence-based therapeutic approaches, 
            providing 24/7 compassionate care that adapts to each individual's unique needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility</h3>
            <p className="text-gray-600">
              Making mental health support available to everyone, regardless of location, time, or financial constraints.
            </p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Leveraging the latest AI technology to provide intelligent, empathetic, and personalized mental wellness support.
            </p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compassion</h3>
            <p className="text-gray-600">
              Ensuring every interaction is filled with empathy, understanding, and genuine care for mental wellness.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            A passionate group of developers, designers, and mental health advocates working together 
            to create meaningful technology that makes a difference in people's lives.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-purple-200 group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {member.name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-3xl p-12 mb-16 border border-purple-200/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.0 }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            Our Values
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 3.4 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔒</span>
              Privacy First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize your privacy and security. No conversation data is stored on our servers, 
              and all processing happens client-side to ensure your mental health journey remains completely private.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 3.6 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Evidence-Based
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI responses and therapeutic approaches are grounded in established mental health practices 
              and evidence-based interventions, ensuring professional-quality support.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 3.8 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">🌱</span>
              Continuous Growth
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We're committed to continuously improving SAMAIA based on user feedback, latest research, 
              and advancements in AI technology to better serve your mental wellness needs.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 4.0 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">🤝</span>
              Human Connection
            </h3>
            <p className="text-gray-600 leading-relaxed">
              While we leverage AI technology, we never forget the importance of human connection and 
              professional support when needed. SAMAIA complements, not replaces, human care.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="text-center bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.2 }}
      >
        <motion.h2 
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.4 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.6 }}
        >
          Have questions, feedback, or want to contribute to SAMAIA's mission? 
          We'd love to hear from you and learn how we can better support your mental wellness journey.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.8 }}
        >
          <div className="bg-purple-50 px-6 py-3 rounded-full text-purple-700 font-medium">
            📧 support@samaia.app
          </div>
          <div className="bg-indigo-50 px-6 py-3 rounded-full text-indigo-700 font-medium">
            🐙 GitHub: VNSWAMY123/google-gen
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
