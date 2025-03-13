"use client";

import React from "react";
import Link from "next/link";

export default function SpringAwakening() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-yellow-400">🌱 Spring Awakening Course</h1>
      <p className="text-gray-300 mt-2 text-center max-w-xl">
        A transformative journey aligning with the energy of Spring through **Qi Gong, Breathwork, Meditation, and Seasonal Rituals.**  
      </p>

      {/* Course Overview */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-yellow-500 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-yellow-300">📚 Course Overview</h2>
        <p className="text-gray-300 mt-2">
          This 3-month guided course helps you:
        </p>
        <ul className="mt-2 list-disc list-inside text-gray-400">
          <li>🌿 Align with **nature’s cycles** to cultivate renewal and growth.</li>
          <li>🧘‍♂️ Use **Qi Gong and Breathwork** to clear stagnation and enhance energy flow.</li>
          <li>🔮 Practice **meditation & reflection** for deeper clarity and intention setting.</li>
          <li>🔥 Engage in **seasonal rituals** that strengthen personal transformation.</li>
        </ul>
      </div>

      {/* Course Breakdown */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-yellow-500 shadow-lg">
          <h3 className="text-xl font-bold text-yellow-300">🌿 Month 1: Cultivating Fresh Starts</h3>
          <ul className="text-gray-300 mt-2 list-disc list-inside">
            <li>Spring Clean Your Mind – Releasing old patterns.</li>
            <li>Planting Seeds of Intention – Vision setting.</li>
            <li>Strengthening Self-Trust – Grounding & stability.</li>
            <li>Building Healthy Habits – Sustainable growth.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border-2 border-yellow-500 shadow-lg">
          <h3 className="text-xl font-bold text-yellow-300">🌱 Month 2: Nurturing New Growth</h3>
          <ul className="text-gray-300 mt-2 list-disc list-inside">
            <li>Expanding Confidence – Embracing progress.</li>
            <li>Creating Rituals – Strengthening daily practice.</li>
            <li>Aligning with Purpose – Setting clear goals.</li>
            <li>Manifesting Intentions – Turning vision into action.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border-2 border-yellow-500 shadow-lg">
          <h3 className="text-xl font-bold text-yellow-300">🌸 Month 3: Embracing Abundance</h3>
          <ul className="text-gray-300 mt-2 list-disc list-inside">
            <li>Celebrating Growth – Recognizing progress.</li>
            <li>Harnessing Energy – Strengthening resilience.</li>
            <li>Integration & Transition – Preparing for the next season.</li>
            <li>Personal Commitment – Sealing the transformation.</li>
          </ul>
        </div>
      </div>

      {/* Back to Learning Hub */}
      <Link href="/summit/learninghub">
        <button className="mt-6 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
          🔙 Back to Learning Hub
        </button>
      </Link>
    </div>
  );
}
