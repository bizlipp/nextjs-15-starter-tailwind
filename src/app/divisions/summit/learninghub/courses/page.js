"use client";

import React from "react";
import Link from "next/link";

export default function Courses() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-yellow-400">🎓 Current Courses</h1>
      <p className="text-gray-300 mt-2">Explore the courses available at Summit Learning.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 w-full max-w-lg">
        <Link href="/divisions/summit/learninghub/courses/spring-awakening">
          <button className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
            🌱 Seasons of Change - Spring Course
          </button>
        </Link>
      </div>

      {/* Back to Home */}
      <Link href="/divisions/summit/learninghub">
        <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
          🔙 Back to Summit Learning Hub
        </button>
      </Link>
    </div>
  );
}
