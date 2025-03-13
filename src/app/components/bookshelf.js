"use client";

import React, { useState } from "react";

export default function VesperaEntrance() {
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const toggleBook = (book = null) => {
    setBookOpen((prev) => !prev);
    setSelectedBook(book);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden">
      {/* Neon Library Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[80vw] h-[60vh] border-2 border-red-500 bg-opacity-10 backdrop-blur-lg rounded-xl flex items-center justify-center transition-opacity duration-500 ${bookOpen ? 'opacity-70' : 'opacity-30'}`}
        >
          <h1 className="text-4xl font-bold text-red-500 drop-shadow-lg">
            Vespera Publishing
          </h1>
        </div>
      </div>

      {/* Interactive Pop-Up Book */}
      <div
        className="relative flex items-center justify-center mt-20 cursor-pointer"
        onClick={() => toggleBook(null)}
      >
        <div
          className={`p-6 bg-red-700 rounded-lg shadow-xl relative transition-transform duration-700 ${bookOpen ? 'rotate-x-0 opacity-100' : 'rotate-x-90 opacity-0'}`}
        >
          <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full font-bold text-lg">
            📜
          </div>
          <p className="text-white text-lg font-semibold mt-2 text-center">
            {selectedBook ? selectedBook.title : "Unfold the Stories Within"}
          </p>
          {selectedBook && (
            <p className="text-sm text-gray-300 mt-2 text-center">
              {selectedBook.description}
            </p>
          )}
        </div>
        <div
          className={`p-6 bg-red-900 rounded-lg shadow-xl absolute top-0 left-0 right-0 bottom-0 transition-transform duration-700 ${bookOpen ? 'rotate-x-90 opacity-0' : 'rotate-x-0 opacity-100'}`}
        >
          <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full font-bold text-lg">
            📖
          </div>
          <p className="text-white text-lg font-semibold mt-2 text-center">
            Click to Open
          </p>
        </div>
      </div>

      {/* Floating Bookshelves */}
      <div className="absolute bottom-10 flex space-x-6">
        {[
          { title: "The Crimson Codex", description: "A lost manuscript filled with forbidden knowledge." },
          { title: "Echoes of the Archive", description: "Whispers from a forgotten cyberpunk future." },
          { title: "Horizon Scrolls", description: "Ancient wisdom meets futuristic prophecy." }
        ].map((book, index) => (
          <div
            key={index}
            className="w-24 h-32 bg-red-600 text-white flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-110 active:scale-90"
            onClick={() => toggleBook(book)}
          >
            {book.title}
          </div>
        ))}
      </div>
    </div>
  );
}
