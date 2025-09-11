import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Global Youth Wellness
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering young people worldwide to achieve holistic wellness through 
            accessible digital resources, community support, and evidence-based practices.
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-green-500 text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Mental Health Resources
            </h3>
            <p className="text-gray-600">
              Access guided meditation, stress management tools, and mental wellness tracking.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-blue-500 text-3xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Physical Wellness
            </h3>
            <p className="text-gray-600">
              Fitness routines, nutrition guidance, and health monitoring tools designed for youth.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-purple-500 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community Support
            </h3>
            <p className="text-gray-600">
              Safe spaces for peer connection, discussion forums, and mentorship programs.
            </p>
          </div>
        </main>

        <div className="text-center mt-12">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
