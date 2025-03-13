"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SummitReception() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState(
    "Welcome to Summit Learning. How can I assist you today?"
  );
  const [showAssistant, setShowAssistant] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  const handleAssistantResponse = (message) => {
    setAssistantMessage(message);
    setShowAssistant(true);
  };

  const handleQuestionSubmit = () => {
    if (userQuestion.trim() === "") return;

    // Basic responses - Can be expanded with AI later
    const responses = {
      "how do i enroll?": "Click 'Sign Up' to register for upcoming courses.",
      "where are my courses?": "Once signed in, you can access your courses from the Learning Hub.",
      "who teaches the classes?": "Meet our facilitators inside the Learning Hub after signing in.",
    };

    const lowerCaseQuestion = userQuestion.toLowerCase();
    const response = responses[lowerCaseQuestion] || "I'm not sure, but I bet you'll find the answer inside the Learning Hub.";

    setAssistantMessage(response);
    setUserQuestion("");
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden p-6">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-opacity-80 z-0"></div>

      {/* Reception Desk */}
      <div className="relative flex flex-col items-center p-6 bg-gray-800 border-2 border-yellow-500 rounded-lg shadow-xl z-10">
        <h1 className="text-4xl font-bold text-yellow-400">🏛️ Summit Learning Reception</h1>
        <p className="text-gray-300 mt-2 text-center max-w-md">
          Welcome to Summit Learning. How would you like to get started?
        </p>

        <div className="mt-4 flex space-x-4">
          {!isSignedIn ? (
            <button 
              onClick={handleSignIn} 
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
              🔐 Sign In
            </button>
          ) : (
            <Link href="summit/learninghub">
              <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
                📚 Enter Learning Hub
              </button>
            </Link>
          )}
          
          <Link href="summit/signup">
            <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
              📝 Sign Up for Courses
            </button>
          </Link>
          <button 
            onClick={() => handleAssistantResponse("How can I assist you today?")}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
            💬 Speak to Someone
          </button>
        </div>
      </div>

      {/* AI Assistant Popup */}
      {showAssistant && (
        <div className="absolute bottom-20 flex flex-col items-center z-10 bg-gray-800 border border-yellow-500 p-4 rounded-lg shadow-lg max-w-lg w-full text-center">
          <div className="text-lg text-gray-200 font-mono mb-2">{assistantMessage}</div>
          <input 
            type="text" 
            className="w-full p-2 text-black rounded-lg" 
            placeholder="Ask a question..." 
            value={userQuestion} 
            onChange={(e) => setUserQuestion(e.target.value)} 
          />
          <button 
            onClick={handleQuestionSubmit} 
            className="mt-2 px-4 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
            Submit
          </button>
          <button 
            onClick={() => setShowAssistant(false)} 
            className="mt-2 px-4 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
