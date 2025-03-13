"use client";
import { useState, useEffect } from "react";

export default function DraggablePanel({ title, children }) {
  const storageKey = `panel-${title.replace(/\s+/g, "-").toLowerCase()}`; // Unique key per panel
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem(storageKey);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  // Function to start dragging
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Function to move the panel
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newPosition = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };

    setPosition(newPosition);
    localStorage.setItem(storageKey, JSON.stringify(newPosition)); // Save position
  };

  // Function to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Attach global event listeners for smooth dragging
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      className="absolute bg-[#0d1a17] border border-green-500 shadow-md p-4 rounded-lg cursor-grab"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <h2 className="text-green-400 text-lg">{title}</h2>
      <div className="text-green-300 text-sm mt-2">{children}</div>
    </div>
  );
}
