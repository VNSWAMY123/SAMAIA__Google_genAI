export interface Meditation {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration: string;
  category: string;
  tags: string[];
  level: "beginner" | "intermediate" | "advanced";
}

export const meditations: Meditation[] = [
  {
    id: "1",
    title: "Morning Mindfulness",
    description:
      "Start your day with a calming meditation to set a positive intention.",
    audioUrl: "/meditations/morning-mindfulness.mp3",
    imageUrl: "/images/meditations/morning.jpg",
    duration: "10 min",
    category: "Mindfulness",
    tags: ["morning", "mindfulness", "beginners"],
    level: "beginner",
  },
  {
    id: "2",
    title: "Stress Relief",
    description: "A guided meditation to help reduce stress and anxiety.",
    audioUrl: "/meditations/stress-relief.mp3",
    imageUrl: "/images/meditations/stress-relief.jpg",
    duration: "15 min",
    category: "Stress Management",
    tags: ["stress", "anxiety", "relaxation"],
    level: "beginner",
  },
  {
    id: "3",
    title: "Deep Focus",
    description:
      "Enhance your concentration and productivity with this focused meditation.",
    audioUrl: "/meditations/deep-focus.mp3",
    imageUrl: "/images/meditations/focus.jpg",
    duration: "20 min",
    category: "Productivity",
    tags: ["focus", "concentration", "work"],
    level: "intermediate",
  },
  {
    id: "4",
    title: "Better Sleep",
    description:
      "A calming meditation to help you relax and prepare for restful sleep.",
    audioUrl: "/meditations/sleep.mp3",
    imageUrl: "/images/meditations/sleep.jpg",
    duration: "30 min",
    category: "Sleep",
    tags: ["sleep", "relaxation", "evening"],
    level: "beginner",
  },
  {
    id: "5",
    title: "Emotional Balance",
    description:
      "Develop emotional awareness and stability through guided meditation.",
    audioUrl: "/meditations/emotional-balance.mp3",
    imageUrl: "/images/meditations/emotional.jpg",
    duration: "25 min",
    category: "Emotional Wellness",
    tags: ["emotions", "balance", "awareness"],
    level: "intermediate",
  },
  {
    id: "6",
    title: "Advanced Mindfulness",
    description:
      "A deeper exploration of mindfulness practices for experienced meditators.",
    audioUrl: "/meditations/advanced-mindfulness.mp3",
    imageUrl: "/images/meditations/advanced.jpg",
    duration: "45 min",
    category: "Mindfulness",
    tags: ["mindfulness", "advanced", "practice"],
    level: "advanced",
  },
];
