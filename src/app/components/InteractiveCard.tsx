"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        className="relative w-80 p-6 bg-gray-800 text-white rounded-2xl shadow-lg transform transition-transform duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(220, 20, 60, 0.8)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl font-bold text-crimson-500">Cyberpunk Card</h2>
        <p className="mt-2 text-gray-300">Hover to see the effect. Click the button to interact!</p>

        <motion.button
          className="mt-4 px-6 py-2 bg-crimson-500 rounded-lg text-white font-semibold relative overflow-hidden"
          whileTap={{ scale: 0.9 }}
        >
          <span className="relative z-10">Click Me</span>
          <motion.div
            className="absolute inset-0 bg-crimson-700 opacity-20"
            animate={{ scale: isHovered ? 1.5 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        {isHovered && (
          <motion.div
            className="absolute inset-0 border-4 border-crimson-500 rounded-2xl opacity-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  );
}
