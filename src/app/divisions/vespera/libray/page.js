"use client";

import React from "react";
import Link from "next/link";

export default function VesperaLibrary() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-red-500 drop-shadow-lg mb-4">
        The Grand Archive
      </h1>
      <p className="text-gray-300 text-center max-w-lg mb-6">
        A vast digital library, waiting to be filled with knowledge.
      </p>

      {/* Placeholder for Books */}
      <div className="w-full max-w-4xl h-80 bg-red-900 border border-red-500 rounded-lg flex items-center justify-center shadow-lg">
        <p className="text-gray-400 text-lg">No books available yet. Upload a manuscript to begin the collection.</p>
      </div>

      {/* Upload & Navigation Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link href="/vespera/readingroom">
          <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">
            Upload a Book
          </button>
        </Link>
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">
          Browse Collection
        </button>
      </div>
    </div>
  );
}