'use client';

import { useEffect, useRef, useState } from 'react';

import FormBuilder from '@/app/components/FormBuilder';

import AccessPanel from '../lab/access-panel';
import DraggablePanel from '../lab/draggable-panel';

export default function LabEntry() {
    const [unlocked, setUnlocked] = useState(false);
    const [bootingUp, setBootingUp] = useState(true);
    const [bootMessages, setBootMessages] = useState([]);

    // Simulated boot sequence
    useEffect(() => {
        if (!bootingUp) return;

        const messages = [
            'Nexus TechWorks OS v2.0.4',
            'Initializing quantum neural interface...',
            'Loading matrix protocols...',
            'Establishing secure connection...',
            'Activating holographic terminal...',
            'WARNING: Unauthorized access detected',
            'Authentication required...'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < messages.length) {
                setBootMessages((prev) => [...prev, messages[index]]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => setBootingUp(false), 1000);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [bootingUp]);

    if (bootingUp) {
        return (
            <div className='flex h-screen w-full items-center justify-center overflow-hidden bg-black'>
                <div className='w-[600px] rounded-lg border-2 border-[#00FF7F] bg-[#101820] p-8 shadow-[0_0_15px_rgba(0,255,127,0.5)]'>
                    <h2 className='glitch-text mb-4 font-mono text-2xl text-[#00FF7F]'>Nexus TechWorks Terminal</h2>
                    <div className='h-64 overflow-auto border border-[#00FF7F] bg-black p-4 font-mono text-[#00FF7F]'>
                        {bootMessages.map((msg, i) => (
                            <div key={i} className='mb-2 flex items-start'>
                                <span className='mr-2'>$&gt;</span>
                                <p className={`typing-effect ${i === bootMessages.length - 1 ? 'typing' : 'typed'}`}>
                                    {msg}
                                </p>
                            </div>
                        ))}
                        {bootMessages.length === 7 && (
                            <div className='mt-4 flex items-center'>
                                <span className='animate-pulse'>▌</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-grid-pattern relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black'>
            {/* Matrix-style digital rain in background */}
            <MatrixRain />

            {/* Main content */}
            {!unlocked ? (
                <div className='z-10'>
                    <h1 className='glitch-text mb-8 text-center font-[Orbitron] text-4xl text-[#00FF7F]'>
                        NEXUS TECHWORKS <span className='text-xl'>v2.0</span>
                    </h1>
                    <AccessPanel
                        onUnlock={() => {
                            // Play unlock sound
                            const audio = new Audio('/sounds/access-granted.mp3');
                            audio.play().catch((e) => console.log('Audio play failed:', e));

                            // Initiate unlock sequence with delay
                            setTimeout(() => setUnlocked(true), 1000);
                        }}
                    />
                    <p className='mt-4 text-center text-sm text-[#00FF7F] opacity-70'>
                        * Hint: The access sequence is Green Circle, Blue Circle, Red Triangle *
                    </p>
                </div>
            ) : (
                <AdvancedLabWorkbench />
            )}
        </div>
    );
}

// Matrix digital rain animation component
function MatrixRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Characters to display
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        // Array to track the Y position of each column
        const drops = Array(columns).fill(0);

        function draw() {
            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Green text
            ctx.fillStyle = '#00FF7F';
            ctx.font = `${fontSize}px monospace`;

            // For each column
            for (let i = 0; i < drops.length; i++) {
                // Get a random character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Draw the character
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                // Move it down
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        const interval = setInterval(draw, 33);

        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className='absolute top-0 left-0 z-0 h-full w-full opacity-40' />;
}

function AdvancedLabWorkbench() {
    const [code, setCode] = useState(`
// Welcome to Nexus TechWorks Lab v2.0
// Try editing this React code and click Run to see the results

import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [glitchText, setGlitchText] = useState("NEXUS");

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGlitch = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGlitchText(result);
    setTimeout(() => setGlitchText("NEXUS"), 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#00FF7F', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '28px' }}>🔥 Nexus TechWorks Lab</h1>
      <div style={{ marginTop: '20px', border: '1px solid #00FF7F', padding: '15px', borderRadius: '5px' }}>
        <h2 onClick={handleGlitch} style={{ cursor: 'pointer' }}>{glitchText}</h2>
        <p>Time in lab: {count} seconds</p>
        <button
          onClick={() => setCount(0)}
          style={{ background: '#00FF7F', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
}

export default App;
  `);

    const [consoleOutput, setConsoleOutput] = useState([
        { type: 'info', message: 'System initialized. Ready for code execution.' }
    ]);
    const [aiAssistant, setAiAssistant] = useState(false);
    const [aiThinking, setAiThinking] = useState(false);
    const [codeHistory, setCodeHistory] = useState([]);

    const editorRef = useRef(null);
    const consoleRef = useRef(null);

    // Add to console
    const addToConsole = (message, type = 'info') => {
        setConsoleOutput((prev) => [...prev, { type, message, timestamp: new Date().toLocaleTimeString() }]);

        // Auto-scroll console to bottom
        if (consoleRef.current) {
            setTimeout(() => {
                consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }, 10);
        }
    };

    // Load code from file
    const loadCode = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Save current code to history
        setCodeHistory((prev) => [...prev, { code, timestamp: new Date().toISOString() }]);

        const reader = new FileReader();
        reader.onload = (e) => {
            setCode(e.target.result);
            addToConsole(`Loaded file: ${file.name}`, 'success');
        };
        reader.readAsText(file);
    };

    // Save code to file
    const downloadCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'nexus-code.jsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        addToConsole('Code exported successfully', 'success');
    };

    // Run code
    const runCode = () => {
        const iframe = document.getElementById('preview-iframe');
        if (!iframe) return;

        addToConsole('Executing code...', 'info');

        // Save to history before running
        setCodeHistory((prev) => [...prev, { code, timestamp: new Date().toISOString() }]);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
      <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          <style>
            body {
              background-color: #101820;
              font-family: 'Montserrat', sans-serif;
              color: #00FF7F;
              padding: 20px;
              overflow: auto;
            }

            .glitch {
              animation: glitch 500ms infinite;
            }

            @keyframes glitch {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(2px, 2px); }
              80% { transform: translate(2px, -2px); }
              100% { transform: translate(0); }
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            // Console logger
            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;
            const originalConsoleWarn = console.warn;

            // Override console methods to capture them
            console.log = (...args) => {
              // Post message to parent
              window.parent.postMessage({
                type: 'console',
                method: 'log',
                args: args.map(arg => String(arg))
              }, '*');
              originalConsoleLog(...args);
            };

            console.error = (...args) => {
              window.parent.postMessage({
                type: 'console',
                method: 'error',
                args: args.map(arg => String(arg))
              }, '*');
              originalConsoleError(...args);
            };

            console.warn = (...args) => {
              window.parent.postMessage({
                type: 'console',
                method: 'warn',
                args: args.map(arg => String(arg))
              }, '*');
              originalConsoleWarn(...args);
            };

            try {
              ${code}

              // React 18 rendering
              const rootElement = document.getElementById('root');
              const root = ReactDOM.createRoot(rootElement);
              root.render(React.createElement(App));
            } catch (error) {
              console.error(error.message);
              document.getElementById("root").innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
            }
          </script>
        </body>
      </html>
    `);
        iframeDoc.close();
    };

    // Listen for console.log messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'console') {
                const { method, args } = event.data;
                addToConsole(args.join(' '), method === 'error' ? 'error' : method === 'warn' ? 'warning' : 'log');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // AI Assistant functionality
    const askAI = () => {
        setAiThinking(true);
        addToConsole('AI Assistant analyzing your code...', 'info');

        // Simulate AI thinking
        setTimeout(() => {
            setAiThinking(false);

            // Provide a contextually relevant suggestion based on the code
            if (code.includes('useState')) {
                addToConsole(
                    "AI Assistant: I notice you're using React state. Consider adding error boundaries for better error handling.",
                    'ai'
                );
            } else if (code.includes('setInterval')) {
                addToConsole(
                    'AI Assistant: Remember to clear your intervals in the useEffect cleanup function to prevent memory leaks.',
                    'ai'
                );
            } else {
                addToConsole(
                    'AI Assistant: Your code looks good! For better performance, consider memoizing functions with useCallback.',
                    'ai'
                );
            }
        }, 2000);
    };

    // Create a cyberpunk-style time display
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='relative z-10 h-[95%] w-[95%] rounded-lg border-2 border-[#00FF7F] bg-[#101820] p-6 shadow-[0_0_30px_rgba(0,255,127,0.3)]'>
            {/* Top bar with time and status */}
            <div className='mb-4 flex items-center justify-between border-b border-[#00FF7F] pb-2'>
                <h1 className='font-[Orbitron] text-3xl text-[#00FF7F]'>🛠️ Nexus TechWorks Lab v2.0</h1>
                <div className='flex items-center gap-4'>
                    <div className='rounded border border-[#00FF7F] bg-black px-3 py-1 font-mono text-[#00FF7F]'>
                        <span className='mr-2 animate-pulse'>●</span>
                        {time}
                    </div>
                    <button
                        onClick={() => setAiAssistant(!aiAssistant)}
                        className={`rounded border px-3 py-1 font-mono ${
                            aiAssistant
                                ? 'border-[#00FF7F] bg-[#00FF7F] text-black'
                                : 'border-[#00FF7F] bg-black text-[#00FF7F]'
                        }`}>
                        {aiAssistant ? '🤖 AI: ON' : '🤖 AI: OFF'}
                    </button>
                </div>
            </div>

            <div className='grid h-[calc(100%-60px)] grid-cols-1 gap-4 lg:grid-cols-2'>
                {/* Left column: Code editor and controls */}
                <div className='flex h-full flex-col'>
                    <div className='mb-3 flex items-center justify-between'>
                        <h2 className='font-[Orbitron] text-xl text-[#00FF7F]'>Quantum Code Editor</h2>
                        <div className='flex gap-2'>
                            <span className='inline-block h-3 w-3 rounded-full bg-red-500'></span>
                            <span className='inline-block h-3 w-3 rounded-full bg-yellow-500'></span>
                            <span className='inline-block h-3 w-3 rounded-full bg-green-500'></span>
                        </div>
                    </div>

                    <div className='relative flex-grow'>
                        <textarea
                            ref={editorRef}
                            className='h-full w-full resize-none rounded-md border border-[#00FF7F] bg-black p-4 font-mono text-[#00FF7F] focus:ring-1 focus:ring-[#00FF7F] focus:outline-none'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='// Write your code here...'
                            spellCheck='false'
                        />

                        {/* Line numbers (simplified) */}
                        <div className='absolute top-0 bottom-0 left-0 w-10 bg-[#101820] pt-4 pr-2 pb-4 text-right font-mono text-gray-500 opacity-70 select-none'>
                            {code.split('\n').map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-4 flex gap-3'>
                        <button
                            onClick={runCode}
                            className='hover:bg-opacity-80 flex items-center rounded-lg bg-[#00FF7F] px-4 py-2 font-medium text-black transition'>
                            <span className='mr-2'>▶</span> Run Code
                        </button>
                        <button
                            onClick={downloadCode}
                            className='rounded-lg border border-[#00FF7F] bg-[#101820] px-4 py-2 text-[#00FF7F] transition hover:bg-[#1a2b30]'>
                            Save As...
                        </button>
                        <input
                            type='file'
                            accept='.jsx,.js,.txt'
                            onChange={loadCode}
                            className='hidden'
                            id='fileInput'
                        />
                        <label
                            htmlFor='fileInput'
                            className='cursor-pointer rounded-lg border border-[#00FF7F] bg-[#101820] px-4 py-2 text-[#00FF7F] transition hover:bg-[#1a2b30]'>
                            Load File
                        </label>

                        {aiAssistant && (
                            <button
                                onClick={askAI}
                                disabled={aiThinking}
                                className={`ml-auto flex items-center rounded-lg border border-[#00FF7F] bg-black px-4 py-2 text-[#00FF7F] transition ${
                                    aiThinking ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#1a2b30]'
                                }`}>
                                {aiThinking ? (
                                    <>
                                        <span className='mr-2 animate-spin'>◌</span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className='mr-2'>🤖</span>
                                        Ask AI
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Right column: Preview and console */}
                <div className='flex h-full flex-col'>
                    <div className='mb-3'>
                        <h2 className='font-[Orbitron] text-xl text-[#00FF7F]'>Holographic Preview</h2>
                    </div>

                    {/* Live preview with holographic effect */}
                    <div className='relative mb-4 flex-grow overflow-hidden rounded-md border-2 border-[#00FF7F] bg-black'>
                        <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/hologram-grid.png')] bg-repeat opacity-20"></div>
                        <iframe id='preview-iframe' title='Preview' className='h-full w-full bg-[#101820]'></iframe>
                        <div className='absolute top-2 right-2 flex gap-1'>
                            <div className='h-2 w-2 animate-pulse rounded-full bg-[#00FF7F]'></div>
                            <div
                                className='h-2 w-2 animate-pulse rounded-full bg-[#00FF7F]'
                                style={{ animationDelay: '0.5s' }}></div>
                            <div
                                className='h-2 w-2 animate-pulse rounded-full bg-[#00FF7F]'
                                style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>

                    {/* Console output */}
                    <div className='h-40'>
                        <h2 className='mb-2 font-[Orbitron] text-xl text-[#00FF7F]'>Neural Console</h2>
                        <div
                            ref={consoleRef}
                            className='h-full overflow-y-auto rounded-md border border-[#00FF7F] bg-black p-2 font-mono text-sm text-[#00FF7F]'>
                            {consoleOutput.map((entry, i) => (
                                <div
                                    key={i}
                                    className={`mb-1 ${entry.type === 'error' ? 'text-red-400' : entry.type === 'warning' ? 'text-yellow-400' : entry.type === 'ai' ? 'text-purple-400' : 'text-[#00FF7F]'}`}>
                                    <span className='opacity-70'>[{entry.timestamp || '00:00:00'}]</span>{' '}
                                    {entry.type === 'error' && '❌ '}
                                    {entry.type === 'warning' && '⚠️ '}
                                    {entry.type === 'success' && '✅ '}
                                    {entry.type === 'ai' && '🤖 '}
                                    {entry.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating panels */}
            <DraggablePanel title='Form Builder'>
                <FormBuilder />
            </DraggablePanel>

            <DraggablePanel title='Recent Code History'>
                <div className='max-h-48 w-64 overflow-y-auto'>
                    <h3 className='mb-2 text-sm text-[#00FF7F]'>Previous Sessions:</h3>
                    {codeHistory.length === 0 ? (
                        <p className='text-xs text-gray-500'>No history yet</p>
                    ) : (
                        codeHistory.map((item, i) => (
                            <div
                                key={i}
                                className='mb-1 cursor-pointer rounded border border-[#00FF7F] bg-black p-2 text-xs hover:bg-[#101820]'
                                onClick={() => setCode(item.code)}>
                                <div className='text-[#00FF7F]'>Session {codeHistory.length - i}</div>
                                <div className='text-[10px] text-gray-400'>
                                    {new Date(item.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DraggablePanel>

            {/* AI Assistant floating panel */}
            {aiAssistant && (
                <div className='fixed right-4 bottom-4 z-20 w-64 rounded-lg border border-[#00FF7F] bg-black p-3 shadow-lg'>
                    <div className='mb-2 flex items-center justify-between'>
                        <h3 className='text-sm font-bold text-[#00FF7F]'>🤖 AI Assistant</h3>
                        <button onClick={() => setAiAssistant(false)} className='text-[#00FF7F] hover:text-white'>
                            ×
                        </button>
                    </div>
                    <p className='text-xs text-[#00FF7F]'>
                        AI Assistant is active. Click "Ask AI" for code suggestions and optimizations.
                    </p>
                </div>
            )}
        </div>
    );
}

// Add global styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    .bg-grid-pattern {
      background-image:
        linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    .glitch-text {
      text-shadow:
        0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
        0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
      animation: glitch 500ms infinite;
    }

    .typing-effect {
      overflow: hidden;
      border-right: 0.15em solid #00FF7F;
      white-space: nowrap;
      margin: 0;
      letter-spacing: 0.1em;
    }

    .typing {
      animation:
        typing 3.5s steps(40, end),
        blink-caret 0.75s step-end infinite;
    }

    .typed {
      border-right: none;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: #00FF7F; }
    }

    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
  `;
    document.head.appendChild(style);
}
