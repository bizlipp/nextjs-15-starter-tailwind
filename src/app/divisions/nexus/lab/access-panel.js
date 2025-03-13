"use client";
import { useState } from "react";

export default function AccessPanel({ onUnlock }) {
  const [code, setCode] = useState([]);
  const correctCode = ["🟢", "🔵", "🔺"]; // Secret Code Pattern

  const handleClick = (symbol) => {
    if (code.length < 3) {
      setCode([...code, symbol]);
    }

    if (code.length === 2) {
      if (JSON.stringify([...code, symbol]) === JSON.stringify(correctCode)) {
        onUnlock(); // Unlocks the lab
      } else {
        setCode([]); // Reset on failure
      }
    }
  };

  return (
    <div className="mt-6 p-4 bg-[#101820] border border-green-500 rounded-lg text-center">
      <p className="text-green-400 mb-2">🔐 Enter Code to Access Lab</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleClick("🟢")}
          className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-300"
        >
          🟢
        </button>
        <button
          onClick={() => handleClick("🔵")}
          className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-300"
        >
          🔵
        </button>
        <button
          onClick={() => handleClick("🔺")}
          className="bg-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-300"
        >
          🔺
        </button>
      </div>
      <p className="text-green-200 mt-2">Code Entered: {code.join(" ")}</p>
    </div>
  );
}
