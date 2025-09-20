/**
 * Extended AI Prompts for Comprehensive Mental Health Support
 * These prompts cover a wide range of specific scenarios and situations
 */

const { BASE_CONTEXT, CRISIS_DISCLAIMER } = require("./aiPrompts");

const extendedPrompts = {
  academicStress: {
    context: `${BASE_CONTEXT}
    You specialize in academic stress support. Focus on:
    - Study-life balance
    - Exam anxiety management
    - Time management techniques
    - Performance pressure coping
    - Academic burnout prevention`,

    scenarios: {
      examAnxiety: {
        prompt: (details) => `
          Provide support for exam anxiety with these specifics:
          ${details}
          
          Include:
          1. Pre-exam relaxation techniques
          2. Study organization strategies
          3. Test-taking tips
          4. Physical wellness reminders
          5. Post-exam self-care`,

        followUp: [
          "How are you feeling about your preparation now?",
          "Which strategy would you like to try first?",
          "What specific part of exams makes you most nervous?",
        ],
      },

      gradePressure: {
        prompt: (situation) => `
          Address academic performance pressure:
          ${situation}
          
          Cover:
          1. Realistic goal setting
          2. Self-worth separate from grades
          3. Balanced perspective techniques
          4. Communication with teachers/parents
          5. Success redefinition exercises`,

        followUp: [
          "How do you define success for yourself?",
          "What would help you feel more confident?",
          "Have you talked to your teachers about this?",
        ],
      },
    },
  },

  socialAnxiety: {
    context: `${BASE_CONTEXT}
    You specialize in social anxiety support. Focus on:
    - Social situation coping
    - Confidence building
    - Communication skills
    - Fear reduction
    - Gradual exposure techniques`,

    scenarios: {
      groupSettings: {
        prompt: (context) => `
          Provide strategies for managing social anxiety in group settings:
          ${context}
          
          Include:
          1. Preparation techniques
          2. In-the-moment coping
          3. Positive self-talk scripts
          4. Gradual participation steps
          5. Recovery practices`,

        followUp: [
          "What specific aspects of group situations worry you most?",
          "Have you tried any of these strategies before?",
          "Would you like to practice any techniques now?",
        ],
      },

      publicSpeaking: {
        prompt: (details) => `
          Support for public speaking anxiety:
          ${details}
          
          Cover:
          1. Preparation routines
          2. Anxiety management techniques
          3. Body language tips
          4. Audience connection strategies
          5. Recovery and self-reflection`,

        followUp: [
          "How do you feel about these strategies?",
          "What's your biggest concern about speaking?",
          "Would you like to create a practice plan?",
        ],
      },
    },
  },

  bodyImage: {
    context: `${BASE_CONTEXT}
    You specialize in body image support. Focus on:
    - Self-acceptance
    - Media literacy
    - Healthy relationships with food
    - Movement joy
    - Internal validation`,

    scenarios: {
      mediaInfluence: {
        prompt: (concerns) => `
          Address body image concerns related to media:
          ${concerns}
          
          Include:
          1. Media literacy strategies
          2. Reality vs. digital alteration
          3. Self-worth reinforcement
          4. Healthy social media habits
          5. Body neutrality practices`,

        followUp: [
          "How does social media affect your body image?",
          "What makes you feel good about yourself?",
          "Would you like to create a positive feed?",
        ],
      },

      selfAcceptance: {
        prompt: (issues) => `
          Support for body acceptance journey:
          ${issues}
          
          Cover:
          1. Self-compassion exercises
          2. Body neutrality concepts
          3. Movement for joy
          4. Clothing comfort strategies
          5. Positive self-talk practices`,

        followUp: [
          "What would self-acceptance mean to you?",
          "How can we make movement more joyful?",
          "What kind words would you say to a friend?",
        ],
      },
    },
  },

  familyRelationships: {
    context: `${BASE_CONTEXT}
    You specialize in family relationship support. Focus on:
    - Communication improvement
    - Boundary setting
    - Conflict resolution
    - Cultural sensitivity
    - Independence building`,

    scenarios: {
      parentalConflict: {
        prompt: (situation) => `
          Provide guidance for managing parental conflict:
          ${situation}
          
          Include:
          1. Communication strategies
          2. Emotion regulation techniques
          3. Boundary setting scripts
          4. Cultural consideration
          5. Support system building`,

        followUp: [
          "How do you feel after conflicts?",
          "What boundaries would help you?",
          "Have you shared your feelings with them?",
        ],
      },

      siblingRelations: {
        prompt: (details) => `
          Support for sibling relationship challenges:
          ${details}
          
          Cover:
          1. Understanding perspectives
          2. Fair communication methods
          3. Space and boundaries
          4. Shared activities
          5. Conflict resolution steps`,

        followUp: [
          "What would improve your relationship?",
          "How do you handle disagreements now?",
          "What positive memories can you build?",
        ],
      },
    },
  },

  identityExploration: {
    context: `${BASE_CONTEXT}
    You specialize in identity exploration support. Focus on:
    - Self-discovery
    - Cultural identity
    - Gender and sexuality
    - Value clarification
    - Community connection`,

    scenarios: {
      culturalIdentity: {
        prompt: (context) => `
          Support for cultural identity exploration:
          ${context}
          
          Include:
          1. Cultural connection activities
          2. Identity integration strategies
          3. Community finding resources
          4. Communication with family
          5. Pride and acceptance building`,

        followUp: [
          "What aspects of your culture interest you?",
          "How do you want to express your identity?",
          "Would you like to connect with others?",
        ],
      },

      genderSexuality: {
        prompt: (questions) => `
          Provide support for gender/sexuality exploration:
          ${questions}
          
          Cover:
          1. Self-exploration resources
          2. Community connection options
          3. Coming out considerations
          4. Support system building
          5. Self-acceptance practices`,

        followUp: [
          "What support would help you most?",
          "Are you looking for community?",
          "How can you stay safe while exploring?",
        ],
      },
    },
  },
};

// Additional helper functions

const selectPromptCategory = (userInput, emotionalState) => {
  // Map keywords to categories
  const categoryKeywords = {
    academicStress: [
      "exam",
      "study",
      "school",
      "grades",
      "homework",
      "teacher",
    ],
    socialAnxiety: ["social", "people", "party", "presentation", "group"],
    bodyImage: ["body", "weight", "food", "eating", "appearance", "looks"],
    familyRelationships: ["parent", "family", "sibling", "home", "mom", "dad"],
    identityExploration: [
      "identity",
      "culture",
      "gender",
      "sexuality",
      "who am i",
    ],
  };

  // Count keyword matches for each category
  const categoryScores = Object.entries(categoryKeywords).reduce(
    (scores, [category, keywords]) => {
      scores[category] = keywords.filter((keyword) =>
        userInput.toLowerCase().includes(keyword)
      ).length;
      return scores;
    },
    {}
  );

  // Consider emotional state in scoring
  if (emotionalState) {
    // Add weight based on emotional context
    if (emotionalState.anxiety > 7) categoryScores.socialAnxiety += 2;
    if (emotionalState.sadness > 7) categoryScores.familyRelationships += 1;
    if (emotionalState.confusion > 7) categoryScores.identityExploration += 2;
  }

  // Return category with highest score
  return Object.entries(categoryScores).reduce(
    (max, [category, score]) => (score > max.score ? { category, score } : max),
    { category: "academicStress", score: 0 }
  ).category;
};

const generateFollowUp = (category, scenario, previousResponses = []) => {
  const { followUp } = extendedPrompts[category].scenarios[scenario];

  // Filter out previously used questions
  const unusedQuestions = followUp.filter(
    (q) => !previousResponses.some((r) => r.question === q)
  );

  // Return random unused question or default if all used
  return unusedQuestions.length > 0
    ? unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)]
    : "How are you feeling about our discussion?";
};

module.exports = {
  extendedPrompts,
  selectPromptCategory,
  generateFollowUp,
};
