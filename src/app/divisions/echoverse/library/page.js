"use client";

import React, { useState } from "react";

const sampleTracks = [
  { title: "Neon Nights", artist: "CyberBeats", duration: "3:45" },
  { title: "Pulsewave", artist: "EchoSynth", duration: "4:12" },
  { title: "AI Frequency", artist: "Digital Nomad", duration: "2:58" }
];

export default function AudioLibrary() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-800 to-black opacity-90 z-0"></div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-pink-500 drop-shadow-lg mb-4 z-10">
        Audio Library
      </h1>

      {/* Track List */}
      <div className="relative flex flex-col bg-purple-900 border-2 border-pink-500 p-6 rounded-lg shadow-xl z-10">
        {sampleTracks.map((track, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedTrack(track)}
            className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition mb-2">
            🎵 {track.title} - {track.artist} ({track.duration})
          </button>
        ))}
      </div>

      {/* Now Playing */}
      {selectedTrack && (
        <div className="absolute bottom-20 bg-purple-900 border border-pink-500 p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg text-gray-200 font-mono">
            Now Playing: {selectedTrack.title} by {selectedTrack.artist}
          </p>
        </div>
      )}
    </div>
  );
}
