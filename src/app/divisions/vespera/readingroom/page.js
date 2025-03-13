"use client";

import React, { useState } from "react";

export default function ReadingRoom() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [bookContent, setBookContent] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBookContent(e.target.result);
      reader.readAsText(file);
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-red-500 drop-shadow-lg mb-4">
        Holographic Reading Room
      </h1>
      <p className="text-gray-300 text-center max-w-lg mb-6">
        Upload a book or manuscript to read in this cyberpunk-inspired archive.
      </p>

      {/* File Upload */}
      <label className="cursor-pointer px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">
        Upload Book
        <input type="file" accept=".txt,.md,.pdf" className="hidden" onChange={handleFileUpload} />
      </label>

      {/* Display Uploaded Book */}
      {uploadedFile && (
        <div className="mt-6 p-4 bg-red-900 border border-red-500 rounded-lg w-full max-w-2xl h-[60vh] overflow-y-auto shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-white border-b border-red-500 pb-2">
            {uploadedFile}
          </h2>
          <pre className="text-gray-200 whitespace-pre-wrap leading-relaxed text-lg font-mono px-4 py-2">
            {bookContent}
          </pre>
        </div>
      )}
    </div>
  );
}
