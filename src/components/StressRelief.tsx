import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StressReliefTool {
  id: string;
  title: string;
  description: string;
  technique: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  steps: string[];
}

const stressReliefTools: StressReliefTool[] = [
  {
    id: "breathing",
    title: "4-7-8 Breathing",
    description:
      "A simple breathing technique that promotes relaxation and reduces anxiety.",
    technique: "Breathe in for 4 counts, hold for 7, exhale for 8",
    duration: "5 minutes",
    difficulty: "Easy",
    tags: ["Anxiety", "Sleep", "Stress"],
    steps: [
      "Find a comfortable sitting position",
      "Breathe in through your nose for 4 seconds",
      "Hold your breath for 7 seconds",
      "Exhale completely through your mouth for 8 seconds",
      "Repeat cycle 4 times",
    ],
  },
  {
    id: "progressive-relaxation",
    title: "Progressive Muscle Relaxation",
    description:
      "Systematically tense and relax different muscle groups to reduce physical tension.",
    technique: "Tense muscles for 5 seconds, then relax for 10 seconds",
    duration: "15 minutes",
    difficulty: "Medium",
    tags: ["Tension", "Anxiety", "Sleep"],
    steps: [
      "Lie down in a comfortable position",
      "Start with your toes, tense them for 5 seconds",
      "Release and feel the relaxation for 10 seconds",
      "Move up through each muscle group",
      "End with facial muscles",
    ],
  },
  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding",
    description:
      "A mindfulness exercise using your senses to ground yourself in the present moment.",
    technique: "Identify things you can see, feel, hear, smell, and taste",
    duration: "5 minutes",
    difficulty: "Easy",
    tags: ["Anxiety", "Panic", "Focus"],
    steps: [
      "Name 5 things you can see",
      "Touch 4 things you can feel",
      "Listen for 3 different sounds",
      "Notice 2 things you can smell",
      "Focus on 1 thing you can taste",
    ],
  },
  {
    id: "visualization",
    title: "Safe Place Visualization",
    description:
      "Create and visit a mental safe place for comfort and relaxation.",
    technique: "Visualize a peaceful, safe place in detail",
    duration: "10 minutes",
    difficulty: "Medium",
    tags: ["Anxiety", "Trauma", "Relaxation"],
    steps: [
      "Close your eyes and take deep breaths",
      "Imagine a place where you feel completely safe",
      "Add details using all your senses",
      "Notice how your body feels there",
      "Stay as long as you need",
    ],
  },
  {
    id: "mindful-walk",
    title: "Mindful Walking",
    description:
      "A walking meditation that combines gentle movement with mindfulness.",
    technique: "Walk slowly while focusing on each sensation",
    duration: "15 minutes",
    difficulty: "Medium",
    tags: ["Exercise", "Mindfulness", "Stress"],
    steps: [
      "Find a quiet place to walk",
      "Walk at a natural, comfortable pace",
      "Notice the sensation in your feet",
      "Observe your breath and movement",
      "Gently return focus when mind wanders",
    ],
  },
];

const StressRelief: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<StressReliefTool | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Get unique tags for filter
  const allTags = Array.from(
    new Set(stressReliefTools.flatMap((tool) => tool.tags))
  );

  const filteredTools =
    activeFilter === "all"
      ? stressReliefTools
      : stressReliefTools.filter((tool) => tool.tags.includes(activeFilter));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Stress Relief Techniques
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover evidence-based techniques for managing stress and anxiety.
          Choose from our collection of exercises designed to help you find calm
          and balance.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              activeFilter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                activeFilter === tag
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedTool(tool)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {tool.title}
            </h3>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{tool.duration}</span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full
                ${
                  tool.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : tool.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tool.difficulty}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tool Detail Modal */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTool(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedTool.title}
              </h2>
              <p className="text-gray-600 mb-6">{selectedTool.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Technique</h3>
                <p className="text-gray-600">{selectedTool.technique}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Steps</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {selectedTool.steps.map((step, index) => (
                    <li key={index} className="text-gray-600">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedTool(null)}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StressRelief;
