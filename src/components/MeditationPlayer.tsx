import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Meditation, meditations } from "../types/meditation";
import "../styles/audioPlayer.css";

const MeditationPlayer: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] =
    useState<Meditation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get unique categories and tags
  const allTags = Array.from(
    new Set(meditations.flatMap((meditation) => meditation.tags))
  );

  const filteredMeditations =
    activeFilter === "all"
      ? meditations
      : meditations.filter((meditation) =>
          meditation.tags.includes(activeFilter)
        );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateDuration);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateTime);
          audioRef.current.removeEventListener(
            "loadedmetadata",
            updateDuration
          );
        }
      };
    }
  }, [selectedMeditation]);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Guided Meditations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our collection of guided meditations to help you relax,
          reduce stress, and find inner peace. Each session is designed to
          support your mental wellness journey.
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

      {/* Meditation Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredMeditations.map((meditation) => (
          <motion.div
            key={meditation.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={meditation.imageUrl}
                alt={meditation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <button
                onClick={() => setSelectedMeditation(meditation)}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {meditation.title}
              </h3>
              <p className="text-gray-600 mb-4">{meditation.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {meditation.duration}
                </span>
                <span className="text-sm bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                  {meditation.category}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {meditation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {selectedMeditation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMeditation(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedMeditation.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedMeditation.description}
              </p>

              {/* Audio Player */}
              <div className="space-y-4">
                <audio
                  ref={audioRef}
                  src={selectedMeditation.audioUrl}
                  preload="metadata"
                />

                {/* Progress Bar */}
                <div className="w-full">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgress}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  {/* Rewind 10s */}
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime -= 10;
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                      />
                    </svg>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {isPlaying ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Forward 10s */}
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime += 10;
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                    }
                    setSelectedMeditation(null);
                    setIsPlaying(false);
                  }}
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

export default MeditationPlayer;
