"use client";

import React from "react";
import Link from "next/link";
import Door from "./Door";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Futuristic Building Background - Large Vertical Panels */}
      <div className="absolute inset-0 z-10 bg-gray-900 flex gap-2 p-4" style={{
        background: `linear-gradient(to bottom, #111 10%, #222 40%, #000 100%)`,
        boxShadow: `inset 0 0 50px rgba(0, 255, 255, 0.1)`,
      }}>
        {/* Simulated Vertical Panels */}
        {[...Array(6)].map((_, colIndex) => (
          <div
            key={colIndex}
            className="flex-1 bg-gray-850 border border-gray-700 relative"
            style={{
              height: "100%", // Full height vertical panels
              background: `linear-gradient(90deg, rgba(50, 50, 50, 0.9), rgba(20, 20, 20, 1))`,
              boxShadow: `inset 0 0 20px rgba(0, 255, 255, 0.1)`,
            }}
          >
            {/* Randomized Details - Light Strips & Vents */}
            {Math.random() > 0.6 && (
              <div className="absolute top-2 left-2 w-6 h-6 bg-gray-700 border border-cyan-500"></div>
            )}
            {Math.random() > 0.7 && (
              <div className="absolute inset-y-0 right-2 w-[3px] bg-cyan-400 opacity-50 animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation Bar Placeholder */}
      <nav className="absolute top-0 w-full py-6 bg-black/80 backdrop-blur-md text-center z-20">
        <h1 className="text-4xl font-bold text-cyan-400">AeroVista LLC</h1>
      </nav>
      
      {/* Hero Section - Integrated Signage */}
      <header className="relative text-center py-16 z-20">
        <h1 className="text-6xl font-bold text-cyan-500 drop-shadow-lg tracking-wide uppercase">
          Where Vision Takes Flight
        </h1>
      </header>
      
      {/* Door Positioned to Match Building Entrance */}
      <div className="absolute z-30" style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <Door />
      </div>
    </div>
  );
}




===========================================================

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Reception() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const randomResponses = [
    "Welcome to AeroVista! How can I assist you today?",
    "Hey there! Looking for something special?",
    "Ah, a traveler! What brings you to our domain?",
    "I'm just a humble receptionist AI, but I'll do my best to help!",
    "Shh... don’t tell anyone, but there's a hidden easter egg in the building!"
  ];

  const handleAsk = () => {
    if (message.trim() === "") return;
    setResponse(randomResponses[Math.floor(Math.random() * randomResponses.length)]);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">💬 AeroVista Reception Desk</h1>
      <p className="text-gray-300 mb-4">Need help? Ask away!</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your question..."
        className="px-4 py-2 rounded-md text-black"
      />
      <button onClick={handleAsk} className="mt-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition">
        Ask
      </button>

      {response && <p className="mt-4 text-green-400">🤖 {response}</p>}

      <Link href="/">
        <button className="mt-6 px-4 py-2 bg-red-500 rounded-md hover:bg-red-700 transition">Return Home</button>
      </Link>
    </div>
  );
}
