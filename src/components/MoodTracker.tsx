import React, { useState } from "react";

interface MoodEntry {
  mood: string;
  note: string;
  timestamp: string;
}

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤗", label: "Grateful" },
  { emoji: "🤔", label: "Confused" },
];

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleMoodSubmit = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      mood: selectedMood,
      note: note,
      timestamp: new Date().toISOString(),
    };

    setMoodEntries([newEntry, ...moodEntries]);
    setSelectedMood("");
    setNote("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Mood Tracker
      </h2>

      {/* Mood Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          How are you feeling right now?
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {moods.map(({ emoji, label }) => (
            <button
              key={label}
              onClick={() => setSelectedMood(emoji)}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedMood === emoji
                  ? "bg-indigo-100 border-2 border-indigo-500"
                  : "bg-gray-50 hover:bg-indigo-50"
              }`}
            >
              <div className="text-2xl mb-2">{emoji}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Note Input */}
      {selectedMood && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Add a note (optional):
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            rows={3}
            placeholder="How are you feeling? What's on your mind?"
          />
          <button
            onClick={handleMoodSubmit}
            className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Entry
          </button>
        </div>
      )}

      {/* Mood History */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Your Mood History
        </h3>
        <div className="space-y-4">
          {moodEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No mood entries yet. Start tracking your moods above!
            </p>
          ) : (
            moodEntries.map((entry, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{entry.mood}</span>
                  <span className="text-sm text-gray-600">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                {entry.note && (
                  <p className="text-gray-700 text-sm">{entry.note}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2">Mood Tracking Tips</h4>
        <ul className="text-sm text-green-700 space-y-2">
          <li>• Track your mood at the same times each day</li>
          <li>• Note what might have influenced your mood</li>
          <li>• Look for patterns in your mood changes</li>
          <li>• Share concerning patterns with a mental health professional</li>
        </ul>
      </div>
    </div>
  );
};

export default MoodTracker;
