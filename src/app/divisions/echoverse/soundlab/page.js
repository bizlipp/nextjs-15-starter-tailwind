"use client";

import React, { useState, useRef, useEffect } from "react";

export default function SoundLab() {
  const [currentSound, setCurrentSound] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(new Uint8Array(0));
  const [uploadedTracks, setUploadedTracks] = useState([]);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  // Preloaded sounds
  const soundFiles = {
    "Bass Drop": "/sounds/bass-drop.mp3",
    "Synth Wave": "/sounds/synth-wave.mp3",
    "Vocal Echo": "/sounds/vocal-echo.mp3",
    "Future Beat": "/sounds/future-beat.mp3",
    "Cyber Bass": "/sounds/cyber-bass.mp3",
    "Echo Pulse": "/sounds/echo-pulse.mp3",
    "Neon Groove": "/sounds/neon-groove.mp3",
  };

  useEffect(() => {
    if (!audioContext) {
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      const newAnalyser = newAudioContext.createAnalyser();
      newAnalyser.fftSize = 256;

      setAudioContext(newAudioContext);
      setAnalyser(newAnalyser);
    }
  }, []);

  // Handles playing sound + waveform reaction
  const playSound = (sound, file = null) => {
    setCurrentSound(sound);
    setIsPlaying(true);

    let audioSrc = file ? URL.createObjectURL(file) : soundFiles[sound];

    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current.play().catch((error) => console.error("Audio Playback Error:", error));

      // Connect audio to analyser for waveform
      if (audioContext && analyser) {
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const bufferLength = analyser.frequencyBinCount;
        const newDataArray = new Uint8Array(bufferLength);
        setDataArray(newDataArray);
      }
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Uploading new tracks
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedTracks([...uploadedTracks, file]);
      console.log("Uploaded file:", file.name);
    }
  };

  // Draw the waveform
  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FF1493";
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255.0;
        const y = v * canvas.height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();
    };

    draw();
  }, [analyser]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-800 to-black opacity-90 z-0"></div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-pink-500 drop-shadow-lg mb-4 z-10">
        AI Sound Lab
      </h1>

      {/* Waveform Visualizer */}
      <canvas ref={canvasRef} width={600} height={200} className="bg-black border-2 border-pink-500 shadow-lg z-10"></canvas>

      {/* Soundboard (4-Wide Layout) */}
      <div className="grid grid-cols-4 gap-4 bg-purple-900 border-2 border-pink-500 p-6 rounded-lg shadow-xl z-10">
        {Object.keys(soundFiles).map((sound, index) => (
          <button 
            key={index} 
            onClick={() => playSound(sound)}
            className="px-6 py-3 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition">
            🎵 {sound}
          </button>
        ))}

        {/* Upload Track Button */}
        <input 
          id="fileUpload" 
          type="file" 
          accept="audio/*" 
          className="hidden" 
          onChange={handleUpload} 
        />
        <button 
          onClick={() => document.getElementById("fileUpload").click()} 
          className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition shadow-lg">
          🎵 Upload Track
        </button>
      </div>

      {/* Uploaded Tracks (Same 4-Wide Layout) */}
      {uploadedTracks.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4 bg-purple-900 border-2 border-pink-500 p-6 rounded-lg shadow-xl z-10">
          {uploadedTracks.map((track, index) => (
            <button 
              key={index} 
              onClick={() => playSound(track.name, track)}
              className="px-6 py-3 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition">
              🎵 {track.name}
            </button>
          ))}
        </div>
      )}

      {/* Playback Controls (Fixed to Forefront) */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 p-4 bg-purple-900 border border-pink-500 rounded-lg shadow-lg z-50">
        <button 
          onClick={pauseSound} 
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition">
          ⏸ Pause
        </button>
        <button 
          onClick={() => playSound(currentSound)} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition">
          ▶ Play
        </button>
        <button 
          onClick={stopSound} 
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition">
          ⏹ Stop
        </button>
      </div>

      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} controls className="hidden"></audio>
    </div>
  );
}
