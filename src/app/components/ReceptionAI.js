import { useState, useEffect } from "react";

export default function ReceptionAI() {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow((prev) => !prev);
    }, 2000); // Toggle glow every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`mt-4 p-4 border ${
        glow ? "border-green-400 shadow-lg shadow-green-400" : "border-green-500"
      } bg-[#101820] rounded-md text-center transition-all duration-500`}
    >
      <p className="text-green-300 text-lg">👩‍💻 AI Receptionist Online</p>
      <p className="text-green-500 text-sm animate-pulse">
        "How can I assist you today?"
      </p>
    </div>
  );
}
