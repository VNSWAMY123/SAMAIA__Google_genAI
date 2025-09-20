import React, { useState } from "react";

interface JournalEntry {
  id: string;
  content: string;
  prompt: string;
  timestamp: string;
}

const journalPrompts = [
  "What are three things you're grateful for today?",
  "How are you feeling right now, and why?",
  "What's one challenge you faced today, and how did you handle it?",
  "What's something that made you smile today?",
  "What's one thing you'd like to improve about yourself?",
  "Write about a recent accomplishment, no matter how small.",
  "What are your hopes for tomorrow?",
  "Describe a moment of peace you experienced recently.",
];

const JournalComponent: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      prompt: selectedPrompt,
      timestamp: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry("");
    setSelectedPrompt("");
  };

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    setSelectedPrompt(journalPrompts[randomIndex]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Guided Journal
      </h2>

      {/* Writing Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={getRandomPrompt}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Get Writing Prompt
          </button>
        </div>

        {selectedPrompt && (
          <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
            <p className="text-indigo-800">{selectedPrompt}</p>
          </div>
        )}

        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          rows={8}
          placeholder="Start writing here..."
        />

        <button
          onClick={handleSaveEntry}
          disabled={!currentEntry.trim()}
          className={`mt-4 px-6 py-2 rounded-lg text-white ${
            currentEntry.trim()
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          } transition-colors`}
        >
          Save Entry
        </button>
      </div>

      {/* Journal Entries */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Previous Entries
        </h3>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No journal entries yet. Start writing to see your entries here!
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-50 rounded-lg">
                {entry.prompt && (
                  <div className="text-sm text-indigo-600 mb-2">
                    Prompt: {entry.prompt}
                  </div>
                )}
                <p className="text-gray-700 whitespace-pre-wrap mb-2">
                  {entry.content}
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Journaling Tips</h4>
        <ul className="text-sm text-purple-700 space-y-2">
          <li>• Write freely without judging yourself</li>
          <li>• Try to journal regularly, even if briefly</li>
          <li>• Focus on your thoughts and feelings</li>
          <li>• Use prompts when you need inspiration</li>
          <li>• Review your entries to track your growth</li>
        </ul>
      </div>
    </div>
  );
};

export default JournalComponent;
