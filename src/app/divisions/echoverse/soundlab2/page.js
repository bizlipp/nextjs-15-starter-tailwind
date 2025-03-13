'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

export default function SoundLab2() {
    const router = useRouter();
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // Audio state management
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackName, setCurrentTrackName] = useState('No track selected');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [audioContext, setAudioContext] = useState(null);
    const [audioError, setAudioError] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    const [visualizerMode, setVisualizerMode] = useState('waveform'); // waveform, bars, circle

    // Track management
    const [uploadedTracks, setUploadedTracks] = useState([]);
    const [libraryTracks, setLibraryTracks] = useState([]);
    const [projectName, setProjectName] = useState('Untitled Project');
    const [bpm, setBpm] = useState(120);
    const [activeView, setActiveView] = useState('mixer'); // mixer, effects, sequencer, samples

    // Sequencer state
    const [sequencerPlaying, setSequencerPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [sequencerTracks] = useState([
        { name: 'Kick', sound: '/sounds/seq-kick.mp3' },
        { name: 'Snare', sound: '/sounds/seq-snare.mp3' },
        { name: 'Hi-hat', sound: '/sounds/seq-hihat.mp3' },
        { name: 'Clap', sound: '/sounds/seq-clap.mp3' },
        { name: 'Bass', sound: '/sounds/seq-bass.mp3' }
    ]);
    const [pattern, setPattern] = useState(() => {
        // Initialize with a 5×16 grid of false values (5 tracks, 16 steps)
        return Array(sequencerTracks.length)
            .fill(0)
            .map(() => Array(16).fill(false));
    });

    // Sequencer timing refs
    const sequencerIntervalRef = useRef(null);
    const lastStepTimeRef = useRef(0);

    // Effects management
    const [effects, setEffects] = useState({
        reverb: { active: false, level: 0.3 },
        delay: { active: false, level: 0.2, time: 0.5 },
        distortion: { active: false, level: 0.2 },
        filter: { active: false, frequency: 1000, type: 'lowpass' }
    });

    // Preloaded sound library
    const soundLibrary = {
        'Cyber Bass': '/sounds/cyber-bass.mp3',
        'Neon Dreams': '/sounds/neon-dreams.mp3',
        'Digital Rain': '/sounds/digital-rain.mp3',
        'Echo Pulse': '/sounds/echo-pulse.mp3',
        'Future Beat': '/sounds/future-beat.mp3',
        Synthwave: '/sounds/synthwave.mp3',
        'Glitch Core': '/sounds/glitch-core.mp3',
        'Void Caller': '/sounds/void-caller.mp3'
    };

    // Initialize audio context
    useEffect(() => {
        const initAudioContext = () => {
            try {
                if (typeof window !== 'undefined') {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (AudioContext) {
                        const newContext = new AudioContext();
                        setAudioContext(newContext);
                        console.log('Audio context initialized successfully');

                        // Some browsers require user interaction to start audio context
                        if (newContext.state === 'suspended') {
                            const resumeAudioContext = () => {
                                newContext.resume().then(() => {
                                    console.log('Audio context resumed');
                                    document.removeEventListener('click', resumeAudioContext);
                                });
                            };
                            document.addEventListener('click', resumeAudioContext);
                        }
                    } else {
                        setAudioError('Web Audio API is not supported in your browser');
                    }
                }
            } catch (error) {
                console.error('Error initializing audio context:', error);
                setAudioError(`Error initializing audio: ${error.message}`);
            }
        };

        initAudioContext();

        return () => {
            // Clean up
            if (audioContext) {
                audioContext.close().catch(console.error);
            }
        };
    }, []);

    // Initialize Audio Context and Library Tracks
    useEffect(() => {
        if (typeof window !== 'undefined' && !audioContext) {
            // Initialize AudioContext on first render
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const context = new AudioContext();
                const newAnalyser = context.createAnalyser();

                // Configure analyser
                newAnalyser.fftSize = 2048;
                const bufferLength = newAnalyser.frequencyBinCount;
                const newDataArray = new Uint8Array(bufferLength);

                setAudioContext(context);
                setAnalyser(newAnalyser);
                setDataArray(newDataArray);

                // Set up library tracks
                const tracks = Object.keys(soundLibrary).map((name) => ({
                    name,
                    src: soundLibrary[name],
                    type: 'library'
                }));
                setLibraryTracks(tracks);

                // Cleanup on unmount
                return () => {
                    if (context.state !== 'closed') {
                        context.close();
                    }
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                };
            } catch (error) {
                console.error('Failed to create AudioContext:', error);
            }
        }
    }, []);

    // Audio unlock function to handle autoplay policy
    useEffect(() => {
        const unlockAudio = () => {
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('AudioContext resumed after user interaction');
                });
            }

            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };

        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);

        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
    }, [audioContext]);

    // Test Audio Function (this works)
    const testAudio = () => {
        const testSound = new Audio();
        testSound.src =
            'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdHyCe3Byj5iQpKZve2p0eIBugqBjUmN8lH1uaHKCioRwfXKHlINjaXKCk3xpannM1Lx7gIuTkpCVoII9MSJTf5qZi2hdaX6ajWpodH2Di3p1eHuFjKBpXmZwlZt0YWF0nqZpU1p0ra2XcG19xdCrfIeSmKaVmp93Slw9TXF9gvXo2aaGcXFqQFpgaebc5tfRr7KuiIeAcH5siKFrVl5rgpqCdXN6fJOaakMgKg==';
        testSound.volume = 0.2;

        testSound
            .play()
            .then(() => console.log('Audio test successful'))
            .catch((e) => console.error('Audio test failed:', e));
    };

    // Test Web Audio Function (this works)
    const testWebAudio = () => {
        if (audioContext) {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            try {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                gain.gain.value = 0.2;
                osc.type = 'sine';
                osc.frequency.value = 440; // A4 note

                osc.connect(gain);
                gain.connect(audioContext.destination);

                osc.start();
                setTimeout(() => {
                    osc.stop();
                    console.log('Web Audio API test completed');
                }, 500);
            } catch (e) {
                console.error('Web Audio API test failed:', e);
            }
        }
    };

    // Update volume function
    const updateVolume = (newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // Handle file upload function
    const handleUpload = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        // Create tracks from uploaded files
        const newTracks = Array.from(files).map((file) => ({
            name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            file: file,
            type: 'uploaded'
        }));

        // Add to uploaded tracks
        setUploadedTracks((prev) => [...prev, ...newTracks]);
        console.log(`Uploaded ${newTracks.length} track(s)`, newTracks);
    };

    // Create effects chain
    const createEffectsChain = () => {
        if (!audioContext) return { input: null, output: null };

        // Create audio nodes for each effect
        const reverbNode = audioContext.createConvolver();
        const delayNode = audioContext.createDelay();
        const distortionNode = audioContext.createWaveShaper();
        const filterNode = audioContext.createBiquadFilter();
        const gainNode = audioContext.createGain();

        // Setup nodes with current settings

        // 1. Reverb - not fully implemented - would require an impulse response
        // This is a placeholder

        // 2. Delay
        delayNode.delayTime.value = effects.delay.time;

        // 3. Distortion
        function createDistortionCurve(amount) {
            const k = typeof amount === 'number' ? amount : 50;
            const n_samples = 44100;
            const curve = new Float32Array(n_samples);
            const deg = Math.PI / 180;

            for (let i = 0; i < n_samples; ++i) {
                const x = (i * 2) / n_samples - 1;
                curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
            }
            return curve;
        }

        distortionNode.curve = createDistortionCurve(effects.distortion.level * 400);
        distortionNode.oversample = '4x';

        // 4. Filter
        filterNode.type = effects.filter.type;
        filterNode.frequency.value = effects.filter.frequency;

        // 5. Main gain
        gainNode.gain.value = 1.0; // Unity gain

        // Delay feedback (not connected by default)
        const delayFeedback = audioContext.createGain();
        delayFeedback.gain.value = 0.3;

        // Create connection chain based on active effects
        let inputNode = gainNode;
        let currentNode = gainNode;

        // Connect active effects
        if (effects.filter.active) {
            currentNode.connect(filterNode);
            currentNode = filterNode;
        }

        if (effects.distortion.active) {
            currentNode.connect(distortionNode);
            currentNode = distortionNode;
        }

        if (effects.delay.active) {
            currentNode.connect(delayNode);
            delayNode.connect(delayFeedback);
            delayFeedback.connect(delayNode);
            currentNode = delayNode;
        }

        if (effects.reverb.active) {
            currentNode.connect(reverbNode);
            currentNode = reverbNode;
        }

        // Output is the last node in the chain
        const outputNode = currentNode;

        return {
            input: inputNode,
            output: outputNode
        };
    };

    // Update effect parameters
    const updateEffect = (effectName, property, value) => {
        setEffects((prev) => ({
            ...prev,
            [effectName]: {
                ...prev[effectName],
                [property]: value
            }
        }));

        // If an audio is playing, update the effect immediately
        if (isPlaying && audioSource && audioContext) {
            // Recreate the effects chain with new parameters
            const sourceNode = audioRef.current._sourceNode;
            if (sourceNode) {
                sourceNode.disconnect();

                // Connect to new effects chain
                const effectsChain = createEffectsChain();
                sourceNode.connect(effectsChain.input);
                effectsChain.output.connect(analyser);
            }
        }
    };

    // Play a track
    const playTrack = (track) => {
        if (!audioContext) return;

        // Resume audioContext if it was suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Reset previous audio source if exists
        if (audioSource) {
            try {
                audioSource.disconnect();
            } catch (e) {
                console.log('Disconnect warning:', e);
            }
        }

        // Set up new audio
        let trackSrc = '';
        if (track.type === 'library') {
            trackSrc = track.src;
        } else if (track.type === 'uploaded') {
            trackSrc = URL.createObjectURL(track.file);
        }

        // Update state
        setCurrentTrack(track);
        setCurrentTrackName(track.name);
        setIsPlaying(true);

        // Set audio source and play
        audioRef.current.src = trackSrc;
        audioRef.current.volume = volume;
        audioRef.current.load();

        // Create a source node if it doesn't exist yet
        let sourceNode;
        if (!audioRef.current._sourceNode) {
            try {
                sourceNode = audioContext.createMediaElementSource(audioRef.current);
                audioRef.current._sourceNode = sourceNode;
            } catch (error) {
                console.error('Error creating source node:', error);
                // If we get an "already connected" error, try direct playback
                audioRef.current.play();
                return;
            }
        } else {
            sourceNode = audioRef.current._sourceNode;
        }

        // Save the source node
        setAudioSource(sourceNode);

        // Connect the audio node chain with effects
        try {
            sourceNode.disconnect();

            // Create and connect effects chain
            const effectsChain = createEffectsChain();
            sourceNode.connect(effectsChain.input);
            effectsChain.output.connect(analyser);
            analyser.connect(audioContext.destination);
        } catch (e) {
            console.log('Connection error:', e);
            // Fallback to direct connection
            try {
                sourceNode.connect(audioContext.destination);
            } catch (err) {
                console.error('Fallback connection error:', err);
            }
        }

        // Play the audio
        audioRef.current
            .play()
            .then(() => {
                console.log('Playback started');
                startVisualizer(); // Start the visualizer when playback begins
            })
            .catch((error) => {
                console.error('Playback error:', error);
                setIsPlaying(false);
            });
    };

    // Toggle play/pause
    const togglePlayback = () => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);

            // Stop animation frame
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        } else {
            // Resume context if suspended
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }

            audioRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                    startVisualizer(); // Restart visualizer when resuming playback
                })
                .catch((err) => {
                    console.error('Playback error:', err);
                });
        }
    };

    // Start visualizer animation
    const startVisualizer = () => {
        if (!canvasRef.current || !analyser || !dataArray) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Animation function
        const animate = () => {
            // Schedule next frame
            animationRef.current = requestAnimationFrame(animate);

            // Get analyzer data
            if (visualizerMode === 'waveform') {
                analyser.getByteTimeDomainData(dataArray);
            } else {
                analyser.getByteFrequencyData(dataArray);
            }

            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);

            // Draw based on mode
            if (visualizerMode === 'waveform') {
                drawWaveform(ctx, width, height, dataArray);
            } else if (visualizerMode === 'bars') {
                drawBars(ctx, width, height, dataArray);
            } else if (visualizerMode === 'circle') {
                drawCircle(ctx, width, height, dataArray);
            }
        };

        // Start animation
        animate();
    };

    // Stop playback
    const stopPlayback = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);

        // Stop animation frame
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    // Visualizer drawing functions
    const drawWaveform = (ctx, width, height, dataArray) => {
        const bufferLength = dataArray.length;

        // Create gradient for the line
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#FF1493'); // Neon Pink
        gradient.addColorStop(0.5, '#FF1493'); // Neon Pink
        gradient.addColorStop(1, '#9400D3'); // Dark Violet

        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient;
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FF1493';
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
    };

    const drawBars = (ctx, width, height, dataArray) => {
        const bufferLength = dataArray.length;
        const barWidth = (width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * height;

            // Create gradient for each bar
            const barGradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
            barGradient.addColorStop(0, '#FF1493'); // Neon Pink
            barGradient.addColorStop(1, '#9400D3'); // Dark Violet

            ctx.fillStyle = barGradient;

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FF1493';

            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 1; // Add a small gap between bars

            // Only process up to the canvas width
            if (x > width) break;
        }

        // Reset shadow
        ctx.shadowBlur = 0;
    };

    const drawCircle = (ctx, width, height, dataArray) => {
        const bufferLength = dataArray.length;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 4;

        // Draw base circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#9400D3';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw frequency bars around the circle
        const barCount = 180; // Number of bars to display
        const angleStep = (2 * Math.PI) / barCount;

        for (let i = 0; i < barCount; i++) {
            // Sample from the frequency data with some interpolation
            const dataIndex = Math.floor((i / barCount) * bufferLength);
            const amplitude = dataArray[dataIndex] / 255.0;

            // Calculate bar height based on frequency amplitude
            const barHeight = amplitude * (radius * 0.8);

            // Calculate angle for this bar
            const angle = i * angleStep;

            // Calculate start and end points for the bar
            const innerX = centerX + Math.cos(angle) * radius;
            const innerY = centerY + Math.sin(angle) * radius;
            const outerX = centerX + Math.cos(angle) * (radius + barHeight);
            const outerY = centerY + Math.sin(angle) * (radius + barHeight);

            // Draw the bar
            ctx.beginPath();
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(outerX, outerY);

            // Create color based on amplitude and position
            const hue = (i / barCount) * 360;
            ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
            ctx.lineWidth = 2;

            // Add glow for high amplitudes
            if (amplitude > 0.6) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.stroke();
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Draw a pulsing core in the center
        const coreRadius = radius * 0.3 * (1 + 0.2 * Math.sin(Date.now() * 0.003));
        const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
        coreGradient.addColorStop(0, '#FF1493'); // Bright center
        coreGradient.addColorStop(0.7, '#9400D3'); // Edge color
        coreGradient.addColorStop(1, 'rgba(148, 0, 211, 0)'); // Transparent edge

        ctx.beginPath();
        ctx.arc(centerX, centerY, coreRadius, 0, 2 * Math.PI);
        ctx.fillStyle = coreGradient;

        // Add glow to the core
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FF1493';

        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
    };

    // Sequencer functions
    const toggleSequencer = () => {
        if (sequencerPlaying) {
            stopSequencer();
        } else {
            startSequencer();
        }
    };

    const startSequencer = () => {
        if (sequencerPlaying) return;

        // Make sure audio context is running
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }

        setSequencerPlaying(true);
        setCurrentStep(-1); // Start at -1 so first step is 0

        const stepTimeMs = 60000 / bpm / 4; // 16th notes (4 steps per beat)
        lastStepTimeRef.current = audioContext ? audioContext.currentTime * 1000 : performance.now();

        // Clear any existing interval
        if (sequencerIntervalRef.current) {
            clearInterval(sequencerIntervalRef.current);
        }

        // Start the sequencer interval
        sequencerIntervalRef.current = setInterval(() => {
            const now = audioContext ? audioContext.currentTime * 1000 : performance.now();
            const elapsed = now - lastStepTimeRef.current;

            if (elapsed >= stepTimeMs) {
                // Time for next step
                lastStepTimeRef.current = now;

                setCurrentStep((prevStep) => {
                    const nextStep = (prevStep + 1) % 16;
                    playStep(nextStep);
                    return nextStep;
                });
            }
        }, 10); // Run frequently to minimize timing jitter
    };

    const stopSequencer = () => {
        setSequencerPlaying(false);
        setCurrentStep(-1);

        if (sequencerIntervalRef.current) {
            clearInterval(sequencerIntervalRef.current);
            sequencerIntervalRef.current = null;
        }
    };

    const playStep = (step) => {
        // Play the active sounds for this step
        sequencerTracks.forEach((track, trackIndex) => {
            if (pattern[trackIndex][step]) {
                playSample(track.sound);
            }
        });
    };

    // Update the playSample function to use volume control
    const playSample = (sampleUrl) => {
        if (!audioContext) return;

        // Create a new audio buffer source each time
        const source = audioContext.createBufferSource();

        // Create a gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volume; // Use the global volume setting

        // Check if we've already loaded and cached this sample
        if (sampleCache[sampleUrl]) {
            source.buffer = sampleCache[sampleUrl];
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.start();
            return;
        }

        // Otherwise, load the sample
        fetch(sampleUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
                // Cache the decoded buffer
                sampleCache[sampleUrl] = audioBuffer;

                // Play it
                source.buffer = audioBuffer;
                source.connect(gainNode);
                gainNode.connect(audioContext.destination);
                source.start();
            })
            .catch((error) => {
                console.error('Error loading sample:', error);
            });
    };

    // Sample cache to avoid reloading sounds
    const [sampleCache, setSampleCache] = useState({});

    // Handle toggling steps in the pattern
    const toggleStep = (trackIndex, stepIndex) => {
        const newPattern = [...pattern];
        newPattern[trackIndex] = [...pattern[trackIndex]];
        newPattern[trackIndex][stepIndex] = !newPattern[trackIndex][stepIndex];
        setPattern(newPattern);

        // Play the sound when toggling on
        if (newPattern[trackIndex][stepIndex]) {
            playSample(sequencerTracks[trackIndex].sound);
        }
    };

    // Additional sequencer styling
    const sequencerStyles = {
        sequencerSection: {
            marginTop: '2rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        },
        sequencerHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        controlsRow: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'center'
        },
        playButton: {
            backgroundColor: sequencerPlaying ? '#ff3366' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        bpmControl: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        gridContainer: {
            border: '1px solid #333',
            borderRadius: '4px',
            overflow: 'hidden'
        },
        trackRow: {
            display: 'flex',
            borderBottom: '1px solid #333',
            height: '40px',
            alignItems: 'center'
        },
        trackLabel: {
            width: '80px',
            backgroundColor: '#2a2a2a',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #333',
            fontWeight: 'bold',
            color: '#ddd'
        },
        stepsContainer: {
            display: 'flex',
            flex: 1
        },
        step: (active, isCurrent) => ({
            flex: 1,
            height: '80%',
            margin: '0 2px',
            backgroundColor: active ? (isCurrent ? '#ff9933' : '#3399ff') : isCurrent ? '#554433' : '#444',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'all 0.1s ease',
            border: active ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.1)'
        })
    };

    // Pattern save/load functionality
    const [savedPatterns, setSavedPatterns] = useState([]);
    const [patternName, setPatternName] = useState('');

    const saveCurrentPattern = () => {
        if (!patternName.trim()) {
            alert('Please enter a pattern name');
            return;
        }

        const newSavedPattern = {
            id: Date.now().toString(),
            name: patternName,
            bpm: bpm,
            pattern: JSON.parse(JSON.stringify(pattern)) // Deep clone the pattern
        };

        setSavedPatterns([...savedPatterns, newSavedPattern]);
        setPatternName('');
    };

    const loadPattern = (savedPattern) => {
        setBpm(savedPattern.bpm);
        setPattern(JSON.parse(JSON.stringify(savedPattern.pattern)));
    };

    const deletePattern = (id) => {
        setSavedPatterns(savedPatterns.filter((p) => p.id !== id));
    };

    return (
        <div className='relative flex min-h-screen flex-col overflow-hidden bg-black text-white'>
            {/* Background with EchoVerse Audio theme colors - Neon Pink & Dark Violet */}
            <div className='absolute inset-0 z-0 bg-gradient-to-b from-black via-[#9400D3] to-black opacity-30'></div>
            <div className="absolute inset-0 z-0 bg-[url('/images/sound-waves-bg.png')] bg-cover bg-center opacity-20"></div>

            {/* Digital grid overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/images/grid-overlay.png')] bg-repeat opacity-10"></div>

            {/* Main Content Container */}
            <main className='relative z-10 flex w-full flex-grow flex-col items-center p-6'>
                <h1
                    className='mt-6 mb-8 text-center text-6xl font-bold text-pink-500'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    <span className='text-[#FF1493]'>Echo</span>
                    <span className='text-[#9400D3]'>Verse</span>
                    <span className='text-white'>
                        {' '}
                        Sound<span className='text-[#FF1493]'>Lab</span>2
                    </span>
                </h1>

                {/* Project Info & Controls */}
                <div className='mb-6 flex w-full max-w-6xl items-center justify-between'>
                    <div className='flex items-center'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className='mr-4 rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                            <button
                                onClick={() => router.back()}
                                className='rounded-lg bg-black px-4 py-2 transition hover:bg-gray-900'>
                                ← Back to Studio
                            </button>
                        </motion.div>

                        <div className='rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                            <div className='rounded-lg bg-black px-4 py-2'>
                                <input
                                    type='text'
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className='border-b border-[#FF1493] bg-transparent px-2 font-mono text-white outline-none'
                                    placeholder='Project Name'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <div className='rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                            <div className='flex items-center rounded-lg bg-black px-4 py-2'>
                                <span className='mr-2 text-white'>BPM:</span>
                                <input
                                    type='number'
                                    min='60'
                                    max='200'
                                    value={bpm}
                                    onChange={(e) => setBpm(Number(e.target.value))}
                                    className='w-16 border-b border-[#FF1493] bg-transparent text-center text-white outline-none'
                                />
                            </div>
                        </div>

                        {/* Save/Export Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className='rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                            <button className='rounded-lg bg-black px-4 py-2 transition hover:bg-gray-900'>
                                Save Project
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Visualizer Canvas (Placeholder) */}
                <div className='mb-6 w-full max-w-6xl'>
                    <div className='rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                        <div className='rounded-lg bg-black p-4'>
                            <div className='mb-2 flex items-center justify-between'>
                                <h2 className='text-2xl text-[#FF1493]' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Visualizer
                                </h2>
                                <div className='flex space-x-2'>
                                    <button
                                        onClick={() => setVisualizerMode('waveform')}
                                        className={`rounded-md px-3 py-1 ${visualizerMode === 'waveform' ? 'bg-[#FF1493] text-black' : 'bg-gray-800 text-white'}`}>
                                        Waveform
                                    </button>
                                    <button
                                        onClick={() => setVisualizerMode('bars')}
                                        className={`rounded-md px-3 py-1 ${visualizerMode === 'bars' ? 'bg-[#FF1493] text-black' : 'bg-gray-800 text-white'}`}>
                                        Bars
                                    </button>
                                    <button
                                        onClick={() => setVisualizerMode('circle')}
                                        className={`rounded-md px-3 py-1 ${visualizerMode === 'circle' ? 'bg-[#FF1493] text-black' : 'bg-gray-800 text-white'}`}>
                                        Circle
                                    </button>
                                </div>
                            </div>
                            <canvas
                                ref={canvasRef}
                                width={1200}
                                height={300}
                                className='h-[300px] w-full rounded-md border border-gray-800'></canvas>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className='mb-6 w-full max-w-6xl'>
                    <div className='rounded-lg bg-gradient-to-r from-[#9400D3] to-[#FF1493] p-0.5'>
                        <div className='rounded-lg bg-black'>
                            {/* Tab Headers */}
                            <div className='flex border-b border-gray-800'>
                                <button
                                    onClick={() => setActiveView('mixer')}
                                    className={`px-6 py-3 ${activeView === 'mixer' ? 'border-b-2 border-[#FF1493] text-[#FF1493]' : 'text-gray-400'}`}
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Mixer
                                </button>
                                <button
                                    onClick={() => setActiveView('effects')}
                                    className={`px-6 py-3 ${activeView === 'effects' ? 'border-b-2 border-[#FF1493] text-[#FF1493]' : 'text-gray-400'}`}
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Effects
                                </button>
                                <button
                                    onClick={() => setActiveView('sequencer')}
                                    className={`px-6 py-3 ${activeView === 'sequencer' ? 'border-b-2 border-[#FF1493] text-[#FF1493]' : 'text-gray-400'}`}
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Sequencer
                                </button>
                                <button
                                    onClick={() => setActiveView('samples')}
                                    className={`px-6 py-3 ${activeView === 'samples' ? 'border-b-2 border-[#FF1493] text-[#FF1493]' : 'text-gray-400'}`}
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Samples
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className='p-6'>
                                {activeView === 'mixer' && (
                                    <div className='grid grid-cols-2 gap-6'>
                                        {/* Track Controls */}
                                        <div>
                                            <h3
                                                className='mb-4 text-xl text-[#FF1493]'
                                                style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                                Track Controls
                                            </h3>

                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <div className='mb-4'>
                                                    <p className='mb-2 text-lg'>
                                                        Current Track:{' '}
                                                        <span className='text-[#FF1493]'>{currentTrackName}</span>
                                                    </p>
                                                    <div className='mb-2 flex items-center'>
                                                        <span className='mr-2'>Volume:</span>
                                                        <input
                                                            type='range'
                                                            min='0'
                                                            max='1'
                                                            step='0.01'
                                                            value={volume}
                                                            onChange={(e) => updateVolume(parseFloat(e.target.value))}
                                                            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                        />
                                                        <span className='ml-2'>{Math.round(volume * 100)}%</span>
                                                    </div>
                                                </div>

                                                <div className='flex space-x-2'>
                                                    <button
                                                        onClick={togglePlayback}
                                                        className={`flex-1 rounded-lg px-4 py-2 ${isPlaying ? 'bg-yellow-500' : 'bg-green-500'} flex items-center justify-center text-black transition hover:opacity-90`}>
                                                        <span className='mr-2'>{isPlaying ? '⏸' : '▶'}</span>
                                                        {isPlaying ? 'Pause' : 'Play'}
                                                    </button>
                                                    <button
                                                        onClick={stopPlayback}
                                                        className='flex flex-1 items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-black transition hover:opacity-90'>
                                                        <span className='mr-2'>⏹</span>
                                                        Stop
                                                    </button>
                                                </div>

                                                <div className='mt-4 border-t border-gray-700 pt-4'>
                                                    <h4 className='mb-2 text-lg'>Test Functions</h4>
                                                    <div className='flex space-x-2'>
                                                        <button
                                                            onClick={testAudio}
                                                            className='flex-1 rounded-lg bg-[#FF1493] px-3 py-1 text-sm text-black transition hover:opacity-90'>
                                                            Test Basic Audio
                                                        </button>
                                                        <button
                                                            onClick={testWebAudio}
                                                            className='flex-1 rounded-lg bg-[#9400D3] px-3 py-1 text-sm text-white transition hover:opacity-90'>
                                                            Test Web Audio
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Upload Controls */}
                                        <div>
                                            <h3
                                                className='mb-4 text-xl text-[#FF1493]'
                                                style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                                Upload Audio
                                            </h3>

                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <p className='mb-4'>Upload your own audio files to mix and process:</p>

                                                <label className='flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 transition hover:border-[#FF1493]'>
                                                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                        <p className='text-sm text-gray-400'>
                                                            <span className='font-semibold'>Click to upload</span> or
                                                            drag and drop
                                                        </p>
                                                        <p className='mt-1 text-xs text-gray-400'>
                                                            Supported formats: MP3, WAV, OGG (max 10MB)
                                                        </p>
                                                    </div>
                                                    <input
                                                        id='dropzone-file'
                                                        type='file'
                                                        className='hidden'
                                                        accept='audio/*'
                                                        multiple
                                                        onChange={handleUpload}
                                                    />
                                                </label>

                                                {/* Uploaded Tracks List */}
                                                {uploadedTracks.length > 0 && (
                                                    <div className='mt-4'>
                                                        <h4 className='mb-2'>Uploaded Tracks</h4>
                                                        <div className='max-h-48 overflow-y-auto'>
                                                            {uploadedTracks.map((track, index) => (
                                                                <motion.button
                                                                    key={index}
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => playTrack(track)}
                                                                    className={`mb-2 w-full rounded-md px-3 py-2 text-left ${currentTrack?.name === track.name && isPlaying ? 'bg-[#FF1493] text-black' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                                                    <div className='flex items-center'>
                                                                        <span className='mr-2'>
                                                                            {currentTrack?.name === track.name &&
                                                                            isPlaying
                                                                                ? '⏸'
                                                                                : '▶'}
                                                                        </span>
                                                                        {track.name}
                                                                    </div>
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Effects Tab */}
                                {activeView === 'effects' && (
                                    <div>
                                        <h3
                                            className='mb-4 text-xl text-[#FF1493]'
                                            style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                            Audio Effects
                                        </h3>

                                        <div className='grid grid-cols-2 gap-6'>
                                            {/* Reverb */}
                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <div className='mb-2 flex items-center justify-between'>
                                                    <h4 className='text-lg'>Reverb</h4>
                                                    <label className='inline-flex cursor-pointer items-center'>
                                                        <input
                                                            type='checkbox'
                                                            className='peer sr-only'
                                                            checked={effects.reverb.active}
                                                            onChange={() =>
                                                                updateEffect('reverb', 'active', !effects.reverb.active)
                                                            }
                                                        />
                                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-700 peer-checked:bg-[#FF1493] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                </div>
                                                <div className='mb-2'>
                                                    <label className='mb-1 block text-sm'>Level</label>
                                                    <input
                                                        type='range'
                                                        min='0'
                                                        max='1'
                                                        step='0.01'
                                                        value={effects.reverb.level}
                                                        onChange={(e) =>
                                                            updateEffect('reverb', 'level', parseFloat(e.target.value))
                                                        }
                                                        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                    />
                                                </div>
                                            </div>

                                            {/* Delay */}
                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <div className='mb-2 flex items-center justify-between'>
                                                    <h4 className='text-lg'>Delay</h4>
                                                    <label className='inline-flex cursor-pointer items-center'>
                                                        <input
                                                            type='checkbox'
                                                            className='peer sr-only'
                                                            checked={effects.delay.active}
                                                            onChange={() =>
                                                                updateEffect('delay', 'active', !effects.delay.active)
                                                            }
                                                        />
                                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-700 peer-checked:bg-[#FF1493] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                </div>
                                                <div className='mb-2'>
                                                    <label className='mb-1 block text-sm'>Level</label>
                                                    <input
                                                        type='range'
                                                        min='0'
                                                        max='1'
                                                        step='0.01'
                                                        value={effects.delay.level}
                                                        onChange={(e) =>
                                                            updateEffect('delay', 'level', parseFloat(e.target.value))
                                                        }
                                                        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                    />
                                                </div>
                                                <div>
                                                    <label className='mb-1 block text-sm'>Time</label>
                                                    <input
                                                        type='range'
                                                        min='0.1'
                                                        max='1'
                                                        step='0.01'
                                                        value={effects.delay.time}
                                                        onChange={(e) =>
                                                            updateEffect('delay', 'time', parseFloat(e.target.value))
                                                        }
                                                        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                    />
                                                </div>
                                            </div>

                                            {/* Distortion */}
                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <div className='mb-2 flex items-center justify-between'>
                                                    <h4 className='text-lg'>Distortion</h4>
                                                    <label className='inline-flex cursor-pointer items-center'>
                                                        <input
                                                            type='checkbox'
                                                            className='peer sr-only'
                                                            checked={effects.distortion.active}
                                                            onChange={() =>
                                                                updateEffect(
                                                                    'distortion',
                                                                    'active',
                                                                    !effects.distortion.active
                                                                )
                                                            }
                                                        />
                                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-700 peer-checked:bg-[#FF1493] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                </div>
                                                <div className='mb-2'>
                                                    <label className='mb-1 block text-sm'>Amount</label>
                                                    <input
                                                        type='range'
                                                        min='0'
                                                        max='1'
                                                        step='0.01'
                                                        value={effects.distortion.level}
                                                        onChange={(e) =>
                                                            updateEffect(
                                                                'distortion',
                                                                'level',
                                                                parseFloat(e.target.value)
                                                            )
                                                        }
                                                        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                    />
                                                </div>
                                            </div>

                                            {/* Filter */}
                                            <div className='rounded-lg bg-gray-900 p-4'>
                                                <div className='mb-2 flex items-center justify-between'>
                                                    <h4 className='text-lg'>Filter</h4>
                                                    <label className='inline-flex cursor-pointer items-center'>
                                                        <input
                                                            type='checkbox'
                                                            className='peer sr-only'
                                                            checked={effects.filter.active}
                                                            onChange={() =>
                                                                updateEffect('filter', 'active', !effects.filter.active)
                                                            }
                                                        />
                                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-700 peer-checked:bg-[#FF1493] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                </div>
                                                <div className='mb-2'>
                                                    <label className='mb-1 block text-sm'>Frequency</label>
                                                    <input
                                                        type='range'
                                                        min='20'
                                                        max='20000'
                                                        step='1'
                                                        value={effects.filter.frequency}
                                                        onChange={(e) =>
                                                            updateEffect(
                                                                'filter',
                                                                'frequency',
                                                                parseFloat(e.target.value)
                                                            )
                                                        }
                                                        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700'
                                                    />
                                                    <div className='text-right text-xs'>
                                                        {effects.filter.frequency} Hz
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className='mb-1 block text-sm'>Filter Type</label>
                                                    <select
                                                        value={effects.filter.type}
                                                        onChange={(e) => updateEffect('filter', 'type', e.target.value)}
                                                        className='w-full rounded-md bg-gray-700 p-2 text-white'>
                                                        <option value='lowpass'>Low Pass</option>
                                                        <option value='highpass'>High Pass</option>
                                                        <option value='bandpass'>Band Pass</option>
                                                        <option value='notch'>Notch</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Effects Info */}
                                        <div className='mt-6 rounded-lg bg-gray-900 p-4'>
                                            <h4 className='mb-2 text-lg'>How to Use Effects</h4>
                                            <p className='mb-2 text-gray-300'>
                                                1. Toggle effects on/off using the switches
                                            </p>
                                            <p className='mb-2 text-gray-300'>2. Adjust parameters with the sliders</p>
                                            <p className='text-gray-300'>
                                                3. Effects are applied in real-time to the playing audio
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Sequencer Tab */}
                                {activeView === 'sequencer' && (
                                    <div style={sequencerStyles.sequencerSection}>
                                        <div style={sequencerStyles.sequencerHeader}>
                                            <h3 className='text-xl font-bold text-white'>Beat Sequencer</h3>
                                            <div style={sequencerStyles.controlsRow}>
                                                <button onClick={toggleSequencer} style={sequencerStyles.playButton}>
                                                    {sequencerPlaying ? 'Stop' : 'Play'}
                                                </button>
                                                <div style={sequencerStyles.bpmControl}>
                                                    <label className='text-white'>BPM: {bpm}</label>
                                                    <input
                                                        type='range'
                                                        min='60'
                                                        max='180'
                                                        value={bpm}
                                                        onChange={(e) => setBpm(Number(e.target.value))}
                                                        className='accent-pink-500'
                                                    />
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <label className='text-white'>Vol:</label>
                                                    <input
                                                        type='range'
                                                        min='0'
                                                        max='1'
                                                        step='0.01'
                                                        value={volume}
                                                        onChange={(e) => setVolume(Number(e.target.value))}
                                                        className='accent-pink-500'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={sequencerStyles.gridContainer}>
                                            {sequencerTracks.map((track, trackIndex) => (
                                                <div key={trackIndex} style={sequencerStyles.trackRow}>
                                                    <div style={sequencerStyles.trackLabel}>{track.name}</div>
                                                    <div style={sequencerStyles.stepsContainer}>
                                                        {pattern[trackIndex].map((isActive, stepIndex) => (
                                                            <div
                                                                key={stepIndex}
                                                                style={sequencerStyles.step(
                                                                    isActive,
                                                                    currentStep === stepIndex
                                                                )}
                                                                onClick={() => toggleStep(trackIndex, stepIndex)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add this after the sequencer grid container */}
                                        <div className='mt-6 rounded-lg bg-gray-800 p-4'>
                                            <h4 className='mb-3 text-lg font-semibold text-white'>Pattern Manager</h4>

                                            <div className='mb-4 flex gap-2'>
                                                <input
                                                    type='text'
                                                    value={patternName}
                                                    onChange={(e) => setPatternName(e.target.value)}
                                                    placeholder='Pattern name'
                                                    className='flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white'
                                                />
                                                <button
                                                    onClick={saveCurrentPattern}
                                                    className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                                                    Save Pattern
                                                </button>
                                            </div>

                                            {savedPatterns.length > 0 ? (
                                                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                                                    {savedPatterns.map((saved) => (
                                                        <div
                                                            key={saved.id}
                                                            className='flex items-center justify-between rounded bg-gray-700 p-3'>
                                                            <div>
                                                                <div className='font-medium text-white'>
                                                                    {saved.name}
                                                                </div>
                                                                <div className='text-xs text-gray-400'>
                                                                    BPM: {saved.bpm}
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <button
                                                                    onClick={() => loadPattern(saved)}
                                                                    className='rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700'>
                                                                    Load
                                                                </button>
                                                                <button
                                                                    onClick={() => deletePattern(saved.id)}
                                                                    className='rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700'>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className='py-3 text-center text-gray-400'>No saved patterns yet</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Samples Tab */}
                                {activeView === 'samples' && (
                                    <div>
                                        <h3
                                            className='mb-4 text-xl text-[#FF1493]'
                                            style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                            Sound Library
                                        </h3>

                                        <div className='grid grid-cols-2 gap-6'>
                                            {/* Library Tracks */}
                                            <div>
                                                <h4 className='mb-2 text-white'>EchoVerse Samples</h4>
                                                <div className='rounded-lg bg-gray-900 p-4'>
                                                    <div className='grid grid-cols-2 gap-2'>
                                                        {libraryTracks.map((track, index) => (
                                                            <motion.button
                                                                key={index}
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.97 }}
                                                                onClick={() => playTrack(track)}
                                                                className={`rounded-md px-4 py-3 text-left ${currentTrack?.name === track.name && isPlaying ? 'bg-[#FF1493] text-black' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                                                <div className='flex items-center'>
                                                                    <span className='mr-2'>
                                                                        {currentTrack?.name === track.name && isPlaying
                                                                            ? '⏸'
                                                                            : '▶'}
                                                                    </span>
                                                                    {track.name}
                                                                </div>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Uploaded Tracks */}
                                            <div>
                                                <h4 className='mb-2 text-white'>Your Uploads</h4>
                                                <div className='rounded-lg bg-gray-900 p-4'>
                                                    {uploadedTracks.length > 0 ? (
                                                        <div className='grid grid-cols-2 gap-2'>
                                                            {uploadedTracks.map((track, index) => (
                                                                <motion.button
                                                                    key={index}
                                                                    whileHover={{ scale: 1.03 }}
                                                                    whileTap={{ scale: 0.97 }}
                                                                    onClick={() => playTrack(track)}
                                                                    className={`rounded-md px-4 py-3 text-left ${currentTrack?.name === track.name && isPlaying ? 'bg-[#FF1493] text-black' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                                                    <div className='flex items-center'>
                                                                        <span className='mr-2'>
                                                                            {currentTrack?.name === track.name &&
                                                                            isPlaying
                                                                                ? '⏸'
                                                                                : '▶'}
                                                                        </span>
                                                                        {track.name}
                                                                    </div>
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className='py-8 text-center'>
                                                            <p className='mb-4 text-gray-400'>
                                                                No audio files uploaded yet
                                                            </p>
                                                            <label className='hover:bg-opacity-80 inline-block cursor-pointer rounded-lg bg-[#9400D3] px-4 py-2 transition'>
                                                                <span>Upload Files</span>
                                                                <input
                                                                    type='file'
                                                                    className='hidden'
                                                                    accept='audio/*'
                                                                    onChange={handleUpload}
                                                                    multiple
                                                                />
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Other Tabs Placeholder */}
                                {activeView !== 'mixer' &&
                                    activeView !== 'samples' &&
                                    activeView !== 'effects' &&
                                    activeView !== 'sequencer' && (
                                        <div className='flex items-center justify-center p-8'>
                                            <p className='text-lg text-[#FF1493]'>
                                                {activeView.charAt(0).toUpperCase() + activeView.slice(1)} tab content
                                                will be added in the next update
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Hidden audio element */}
            <audio ref={audioRef} className='hidden'></audio>

            {/* AI Assistant (Future Feature) */}
            <div className='fixed right-6 bottom-6 z-50'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#9400D3] to-[#FF1493] shadow-lg'>
                    <span className='text-2xl text-white'>🎧</span>
                </motion.button>
            </div>

            {/* Add an error message if audio context fails */}
            {audioError && <div className='mt-2 rounded bg-red-600 p-2 text-sm text-white'>{audioError}</div>}
        </div>
    );
}
