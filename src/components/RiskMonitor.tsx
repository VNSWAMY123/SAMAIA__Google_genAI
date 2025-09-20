import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Resource {
  name: string;
  contact?: string;
  description: string;
}

interface Resources {
  immediate: Resource[];
  followUp: Resource[];
}

interface RiskAssessment {
  riskLevel: number;
  requiresImmediateAction: boolean;
  responseLevel: "emergency" | "urgent" | "elevated" | "standard";
  concerns: string[];
  resources: Resources;
  disclaimer: string;
  timestamp: string;
}

interface Message {
  content: string;
  timestamp: string;
  isUser: boolean;
}

const RiskMonitor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAssessment, setCurrentAssessment] =
    useState<RiskAssessment | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced risk assessment
  const debouncedAssess = useCallback(
    async (text: string) => {
      try {
        setIsAssessing(true);
        const response = await fetch("/api/risk/assess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            userHistory: messages.map((m) => m.content),
          }),
        });

        if (!response.ok) {
          throw new Error("Risk assessment failed");
        }

        const assessment = await response.json();
        setCurrentAssessment(assessment);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsAssessing(false);
      }
    },
    [messages]
  );

  // Monitor conversation for patterns
  useEffect(() => {
    const monitorConversation = async () => {
      if (messages.length < 3) return;

      try {
        const response = await fetch("/api/risk/monitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
          throw new Error("Conversation monitoring failed");
        }

        const analysis = await response.json();

        // Handle escalating risk
        if (analysis.requiresIntervention) {
          // Trigger intervention UI
          handleEscalatingRisk(analysis);
        }
      } catch (err) {
        console.error("Monitoring error:", err);
      }
    };

    monitorConversation();
  }, [messages]);

  const handleEscalatingRisk = (analysis: any) => {
    // Show immediate support resources
    setCurrentAssessment((prev) => ({
      ...prev!,
      requiresImmediateAction: true,
      responseLevel: "urgent",
      resources: analysis.recommendedAction.resources,
    }));
  };

  const ResourceList: React.FC<{ resources: Resource[] }> = ({ resources }) => (
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <h4 className="font-semibold text-gray-800">{resource.name}</h4>
          {resource.contact && (
            <p className="text-blue-600 font-medium">{resource.contact}</p>
          )}
          <p className="text-gray-600 mt-1">{resource.description}</p>
        </motion.div>
      ))}
    </div>
  );

  const RiskIndicator: React.FC<{ level: string }> = ({ level }) => {
    const colors = {
      emergency: "bg-red-500",
      urgent: "bg-orange-500",
      elevated: "bg-yellow-500",
      standard: "bg-green-500",
    };

    return (
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            colors[level as keyof typeof colors]
          }`}
        />
        <span className="capitalize text-sm font-medium">
          {level} Risk Level
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {currentAssessment && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <RiskIndicator level={currentAssessment.responseLevel} />
            <span className="text-sm text-gray-500">
              Updated: {new Date(currentAssessment.timestamp).toLocaleString()}
            </span>
          </div>

          {currentAssessment.requiresImmediateAction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-l-4 border-red-500 p-4"
            >
              <p className="text-red-700 font-medium">
                Immediate action recommended
              </p>
              <p className="text-red-600 mt-1">
                Please use the emergency resources below or contact a mental
                health professional.
              </p>
            </motion.div>
          )}

          {currentAssessment.concerns.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">
                Areas of Concern
              </h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                {currentAssessment.concerns.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Immediate Support Resources
              </h3>
              <ResourceList resources={currentAssessment.resources.immediate} />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4">
                Follow-up Resources
              </h3>
              <ResourceList resources={currentAssessment.resources.followUp} />
            </section>
          </div>

          <div className="text-sm text-gray-500 mt-6 p-4 bg-gray-50 rounded">
            {currentAssessment.disclaimer}
          </div>
        </div>
      )}

      {isAssessing && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default RiskMonitor;
