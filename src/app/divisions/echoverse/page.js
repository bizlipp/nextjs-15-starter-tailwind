'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EchoVerseReception() {
    const router = useRouter();
    const audioContainerRef = useRef(null);
    const [engineerMessage, setEngineerMessage] = useState(
        'Welcome to EchoVerse Audio. The rhythm of the future awaits.'
    );
    const [showEngineer, setShowEngineer] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioVolume, setAudioVolume] = useState(70);
    const [showWaveform, setShowWaveform] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    // Audio visualization elements
    const waveformCanvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Sample frequently asked questions
    const faqQuestions = [
        'Where is the Sound Lab?',
        'How do I upload music?',
        'Who are you?',
        'What services do you offer?'
    ];

    // Initialize loading animation
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        setTimeout(() => {
            setFadeIn(true);
        }, 2500);

        return () => {
            // Clean up any audio context when component unmounts
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Handle engineer responses
    const handleEngineerResponse = (message) => {
        setEngineerMessage(message);
        setShowEngineer(true);
    };

    // Handle question submission
    const handleQuestionSubmit = () => {
        if (userQuestion.trim() === '') return;

        // Basic responses - Can be expanded with AI integration later
        const responses = {
            'where is the sound lab?':
                'The Sound Lab is through the Enter Sound Lab button. Prepare for an immersive audio creation experience.',
            'how do i upload music?':
                'Music uploads are handled in the Sound Lab. Step inside and explore the advanced tools.',
            'who are you?':
                'I am the Sound Engineer, the keeper of rhythm and sound in EchoVerse Audio. I can guide you through this world of sonic innovation.',
            'what services do you offer?':
                'EchoVerse Audio specializes in AI-driven soundscapes, music production, immersive audio experiences, and cutting-edge sound design.'
        };

        const lowerCaseQuestion = userQuestion.toLowerCase();
        const response =
            responses[lowerCaseQuestion] ||
            'That is a frequency I have yet to decode. Try exploring the EchoVerse for answers, or ask another question.';

        setEngineerMessage(response);
        setUserQuestion('');
    };

    // Handle FAQ selection
    const selectFaqQuestion = (question) => {
        setUserQuestion(question);
    };

    // Set up and start audio visualization
    const startAudioVisualization = () => {
        if (!waveformCanvasRef.current) return;

        // Set up audio context if it doesn't exist
        if (!audioContextRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;

                // Create oscillator for demo sound
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();
                gainNode.gain.value = (audioVolume / 100) * 0.2; // Keep volume reasonable

                oscillator.type = 'sine';
                oscillator.frequency.value = 440; // A4 note
                oscillator.connect(gainNode);
                gainNode.connect(analyserRef.current);
                analyserRef.current.connect(audioContextRef.current.destination);

                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, 3000);
            } catch (error) {
                console.error('Web Audio API error:', error);
                return;
            }
        }

        setShowWaveform(true);
        setAudioPlaying(true);

        // Start visualization
        const canvas = waveformCanvasRef.current;
        const canvasContext = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function drawWaveform() {
            // Only continue if we're still showing the waveform
            if (!showWaveform) {
                return;
            }

            animationFrameRef.current = requestAnimationFrame(drawWaveform);
            analyserRef.current.getByteFrequencyData(dataArray);

            canvasContext.fillStyle = 'rgba(14, 14, 22, 0.2)';
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;

                // Create gradient for the bars
                const gradient = canvasContext.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, '#FF1493'); // Neon Pink
                gradient.addColorStop(1, '#9400D3'); // Dark Violet

                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        drawWaveform();

        // Simulate fading out after a few seconds
        setTimeout(() => {
            setAudioPlaying(false);
            // Gradually decrease visualization
            let opacity = 1;
            const fadeInterval = setInterval(() => {
                opacity -= 0.1;
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                    setShowWaveform(false);
                    cancelAnimationFrame(animationFrameRef.current);
                }
            }, 200);
        }, 5000);
    };

    // Update volume
    const handleVolumeChange = (e) => {
        setAudioVolume(e.target.value);
    };

    // Handle sound lab entry
    const enterSoundLab = () => {
        startAudioVisualization();
        handleEngineerResponse('The Sound Lab awaits. Immerse yourself in sonic creation.');

        // Navigate to soundlab2 after visualization effect
        setTimeout(() => {
            router.push('/divisions/echoverse/soundlab2');
        }, 2000);
    };

    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white'>
            {/* Loading screen */}
            {isLoading && (
                <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black'>
                    <div className='relative h-20 w-20'>
                        <div className='absolute inset-0 rounded-full border-2 border-[#9400D3] opacity-20'></div>
                        <div className='absolute inset-[15%] animate-ping rounded-full border-2 border-[#FF1493] opacity-30'></div>
                        <div className='absolute inset-[30%] animate-pulse rounded-full border-2 border-[#FF1493] opacity-50'></div>
                        <div className='absolute inset-[45%] rounded-full bg-[#FF1493]'></div>
                    </div>
                    <h2 className='font-orbitron mt-6 text-xl text-[#FF1493]'>EchoVerse Audio</h2>
                    <p className='font-montserrat mt-2 text-sm tracking-wider text-purple-300'>
                        Initializing sound systems...
                    </p>
                </div>
            )}

            {/* Background & Room Atmosphere */}
            <div className='absolute inset-0 z-0 bg-gradient-to-b from-black via-[#9400D3]/20 to-black'></div>

            {/* Audio waveform grid background */}
            <div
                className='absolute inset-0 z-0 opacity-10'
                style={{
                    backgroundImage: `
                        radial-gradient(circle, rgba(255,20,147,0.15) 1px, transparent 1px),
                        radial-gradient(circle, rgba(148,0,211,0.1) 1px, transparent 2px)
                    `,
                    backgroundSize: '30px 30px, 50px 50px'
                }}></div>

            {/* Animated sound waves */}
            <div className='absolute inset-0 z-0 overflow-hidden'>
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className='absolute right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#FF1493]/30 to-transparent'
                        style={{
                            top: `${20 + index * 15}%`,
                            animation: `wave ${8 + index * 2}s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`
                        }}></div>
                ))}
            </div>

            {/* Main content container with fade-in effect */}
            <div
                className={`relative z-10 w-full max-w-6xl px-4 py-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <header className='mb-8 flex flex-col items-center'>
                    <h1 className='font-orbitron drop-shadow-glow text-4xl font-bold tracking-wider text-[#FF1493] md:text-6xl'>
                        Echo<span className='text-[#9400D3]'>Verse</span>
                    </h1>
                    <p className='font-montserrat mt-2 text-center text-sm tracking-wide text-purple-300 md:text-base'>
                        Immersive Audio Experience | AI-Driven Soundscapes
                    </p>
                </header>

                {/* Main content area */}
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {/* Left side visualization */}
                    <div className='flex flex-col items-center justify-center'>
                        <div
                            ref={audioContainerRef}
                            className='group shadow-glow relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#FF1493]/20 bg-black/70 transition-all hover:border-[#FF1493]/40 md:h-80'>
                            {/* Audio visualization canvas */}
                            <canvas
                                ref={waveformCanvasRef}
                                width='500'
                                height='300'
                                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${showWaveform ? 'opacity-100' : 'opacity-0'}`}></canvas>

                            {/* Sound visualization elements */}
                            {!showWaveform && (
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='relative flex h-32 w-32 items-center justify-center'>
                                        <div className='absolute inset-0 rounded-full border border-[#9400D3]/50'></div>
                                        <div
                                            className={`absolute inset-[10%] rounded-full border border-[#FF1493]/40 ${audioPlaying ? 'animate-ping' : ''}`}></div>
                                        <div
                                            className={`absolute inset-[20%] rounded-full border border-[#FF1493]/60 ${audioPlaying ? 'animate-pulse' : ''}`}></div>
                                        <div className='absolute inset-[45%] rounded-full bg-[#FF1493]'></div>

                                        {/* Sound waves */}
                                        <div className={`absolute h-1/2 w-1/2 ${audioPlaying ? '' : 'opacity-30'}`}>
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`absolute inset-0 rounded-full border border-[#FF1493]/60 ${audioPlaying ? 'animate-ping' : ''}`}
                                                    style={{
                                                        animationDelay: `${i * 0.3}s`,
                                                        animationDuration: `${1.5 + i * 0.5}s`
                                                    }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className='font-montserrat mt-4 text-center text-sm text-purple-300 md:text-base'>
                                        {audioPlaying ? 'Audio visualizing...' : 'Click buttons below to interact'}
                                    </p>
                                </div>
                            )}

                            {/* Volume control */}
                            <div className='absolute bottom-4 flex w-3/4 items-center justify-center space-x-2'>
                                <span className='text-xs text-[#FF1493]'>🔈</span>
                                <input
                                    type='range'
                                    min='0'
                                    max='100'
                                    value={audioVolume}
                                    onChange={handleVolumeChange}
                                    className='h-1 w-full appearance-none rounded-full bg-gray-700 outline-none'
                                    style={{
                                        backgroundImage: `linear-gradient(to right, #FF1493 0%, #FF1493 ${audioVolume}%, #333 ${audioVolume}%, #333 100%)`
                                    }}
                                />
                                <span className='text-xs text-[#FF1493]'>🔊</span>
                            </div>
                        </div>

                        <div className='mt-6 flex w-full flex-col space-y-4'>
                            <button
                                onClick={enterSoundLab}
                                className='group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5 transition-transform hover:scale-[1.02] active:scale-[0.98]'>
                                <div className='font-orbitron flex items-center justify-center rounded-xl bg-black px-6 py-3 text-lg font-bold text-white transition-colors group-hover:bg-black/80'>
                                    <div className='relative flex items-center'>
                                        <span className='mr-2 text-2xl'>🎧</span>
                                        ENTER SOUND LAB 2.0
                                        <div className='animate-blink absolute -right-4 h-6 w-1 bg-[#FF1493]'></div>
                                    </div>
                                </div>
                            </button>

                            <Link href='/divisions/echoverse/library' className='w-full'>
                                <button
                                    onClick={() =>
                                        handleEngineerResponse(
                                            'The Audio Library is vast. Find the beats that resonate with your soul.'
                                        )
                                    }
                                    className='font-orbitron w-full rounded-xl border border-[#FF1493]/40 bg-black/40 px-6 py-3 text-base text-white backdrop-blur-sm transition hover:bg-[#FF1493]/10 hover:text-[#FF1493]'>
                                    BROWSE AUDIO LIBRARY
                                </button>
                            </Link>

                            <button
                                onClick={() => {
                                    handleEngineerResponse(
                                        'Ah, you wish to consult the Sound Engineer. Speak your query.'
                                    );
                                    startAudioVisualization();
                                }}
                                className='font-orbitron w-full rounded-xl border border-[#9400D3]/40 bg-black/40 px-6 py-3 text-base text-white backdrop-blur-sm transition hover:bg-[#9400D3]/10 hover:text-[#9400D3]'>
                                SPEAK TO ENGINEER
                            </button>
                        </div>
                    </div>

                    {/* Right side content */}
                    <div className='rounded-2xl bg-black/50 p-6 backdrop-blur-md'>
                        <div className='mb-4 border-b border-[#FF1493]/20 pb-3'>
                            <h2 className='font-orbitron text-xl font-bold text-[#FF1493] md:text-2xl'>
                                EchoVerse Terminal
                            </h2>
                            <p className='font-montserrat text-sm text-purple-300'>Real-time audio processing system</p>
                        </div>

                        <div className='font-mono text-sm'>
                            <div className='mb-4 space-y-2 rounded-lg bg-gray-900/60 p-4'>
                                <div className='flex'>
                                    <span className='mr-2 text-[#FF1493]'>{'>'}</span>
                                    <span className='text-purple-300'>Initializing audio systems...</span>
                                </div>
                                <div className='flex'>
                                    <span className='mr-2 text-[#FF1493]'>{'>'}</span>
                                    <span className='text-purple-300'>AI Audio Engine online.</span>
                                </div>
                                <div className='flex'>
                                    <span className='mr-2 text-[#FF1493]'>{'>'}</span>
                                    <span className='text-purple-300'>Sound processing modules active.</span>
                                </div>
                                <div className='flex'>
                                    <span className='mr-2 text-[#FF1493]'>{'>'}</span>
                                    <span className='text-purple-300'>EchoVerse Audio v2.3 ready.</span>
                                </div>
                            </div>

                            <div className='rounded-lg bg-gray-900/60 p-4'>
                                <h3 className='font-orbitron mb-3 text-base text-[#9400D3]'>Latest Productions</h3>
                                <ul className='space-y-2 text-xs'>
                                    <li className='flex items-center justify-between'>
                                        <span className='text-purple-300'>Cybernetic Dreams</span>
                                        <span className='rounded-full bg-[#FF1493]/20 px-2 py-0.5 text-[#FF1493]'>
                                            New
                                        </span>
                                    </li>
                                    <li className='flex items-center justify-between'>
                                        <span className='text-purple-300'>Neural Symphony</span>
                                        <span className='rounded-full bg-[#9400D3]/20 px-2 py-0.5 text-[#9400D3]'>
                                            Featured
                                        </span>
                                    </li>
                                    <li className='text-purple-300'>Quantum Frequencies</li>
                                    <li className='text-purple-300'>Digital Harmonic</li>
                                </ul>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h3 className='font-orbitron mb-2 text-base text-[#FF1493]'>System Status</h3>
                            <div className='grid grid-cols-2 gap-2 text-xs'>
                                <div className='flex items-center rounded-lg bg-black/60 p-2'>
                                    <div className='mr-2 h-2 w-2 animate-pulse rounded-full bg-[#FF1493]'></div>
                                    <span className='text-purple-300'>AI Engine: Online</span>
                                </div>
                                <div className='flex items-center rounded-lg bg-black/60 p-2'>
                                    <div className='mr-2 h-2 w-2 rounded-full bg-[#00FF7F]'></div>
                                    <span className='text-purple-300'>Audio Processing: 100%</span>
                                </div>
                                <div className='flex items-center rounded-lg bg-black/60 p-2'>
                                    <div className='mr-2 h-2 w-2 rounded-full bg-[#9400D3]'></div>
                                    <span className='text-purple-300'>Neural Link: Secure</span>
                                </div>
                                <div className='flex items-center rounded-lg bg-black/60 p-2'>
                                    <div className='mr-2 h-2 w-2 animate-ping rounded-full bg-yellow-400'></div>
                                    <span className='text-purple-300'>New Updates: 2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Sound Engineer Popup with Question Input */}
            {showEngineer && (
                <div className='fixed right-0 bottom-0 left-0 z-20 mx-auto flex w-full max-w-2xl flex-col items-center rounded-t-xl border border-[#FF1493]/30 bg-black/90 backdrop-blur-md transition-all md:bottom-8 md:rounded-xl'>
                    <div className='w-full p-4'>
                        <div className='relative mb-4 rounded-lg bg-[#12071a] p-4'>
                            <div className='absolute -top-2 -left-2 h-4 w-4 rounded-full bg-[#FF1493]'></div>
                            <p className='font-mono text-sm tracking-wide text-purple-300 md:text-base'>
                                {engineerMessage}
                            </p>
                        </div>

                        <div className='relative mb-2'>
                            <input
                                type='text'
                                className='w-full rounded-lg border border-[#9400D3]/30 bg-black/60 p-3 text-sm text-white placeholder-purple-300/50 focus:border-[#FF1493]/50 focus:outline-none'
                                placeholder='Ask the Sound Engineer...'
                                value={userQuestion}
                                onChange={(e) => setUserQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                            />
                            {userQuestion.length > 0 && (
                                <div
                                    className='animate-blink absolute top-1/2 right-3 h-4 w-1 -translate-y-1/2 bg-[#FF1493]'
                                    style={{ animationDuration: '1s' }}></div>
                            )}
                        </div>

                        {/* Suggested questions */}
                        <div className='mb-4 flex flex-wrap gap-2'>
                            {faqQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectFaqQuestion(question)}
                                    className='rounded-full border border-[#9400D3]/30 bg-black/40 px-3 py-1 text-xs text-purple-300 hover:border-[#FF1493]/50 hover:bg-[#FF1493]/10'>
                                    {question}
                                </button>
                            ))}
                        </div>

                        <div className='flex justify-between space-x-3'>
                            <button
                                onClick={handleQuestionSubmit}
                                className='font-orbitron flex-1 rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90'>
                                ASK
                            </button>
                            <button
                                onClick={() => setShowEngineer(false)}
                                className='font-orbitron flex-1 rounded-lg border border-[#9400D3]/30 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9400D3]/10'>
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className='relative z-10 w-full border-t border-[#FF1493]/10 bg-black/60 py-2 text-center'>
                <p className='font-montserrat text-xs text-purple-300'>
                    © {new Date().getFullYear()} EchoVerse Audio - A Division of AeroVista
                </p>
            </footer>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes wave {
                    0%,
                    100% {
                        transform: scaleY(1);
                    }
                    50% {
                        transform: scaleY(2);
                    }
                }

                @keyframes blink {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0;
                    }
                }

                .animate-blink {
                    animation: blink 1.2s infinite;
                }

                .drop-shadow-glow {
                    filter: drop-shadow(0 0 10px rgba(255, 20, 147, 0.7));
                }

                .shadow-glow {
                    box-shadow: 0 0 15px rgba(255, 20, 147, 0.2);
                }

                .font-orbitron {
                    font-family: 'Orbitron', sans-serif;
                }

                .font-montserrat {
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>
        </div>
    );
}
