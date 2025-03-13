'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';

export default function NexusTechWorks() {
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [terminalText, setTerminalText] = useState('');
    const [terminalCursor, setTerminalCursor] = useState(true);
    const [dataFlowActive, setDataFlowActive] = useState(true);
    const [accessGranted, setAccessGranted] = useState(false);
    const terminalRef = useRef(null);

    // Terminal text typing animation
    useEffect(() => {
        if (!terminalOpen) return;

        const fullText = `> NEXUS OS v3.7.2 [BUILD 20XX-04-12]
> QUANTUM INTERFACE INITIALIZED
> ESTABLISHING SECURE CONNECTION...
> ACCESS GRANTED TO NEXUS TECHWORKS MAINFRAME
> LOADING AI DEVELOPMENT ENVIRONMENT...
> INITIALIZING NEURAL NETWORK CLUSTERS...
> QUANTUM PROCESSORS ONLINE
> WELCOME TO NEXUS`;

        let index = 0;
        const typingInterval = setInterval(() => {
            setTerminalText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(typingInterval);
                setTimeout(() => setAccessGranted(true), 1000);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [terminalOpen]);

    // Cursor blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setTerminalCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(blinkInterval);
    }, []);

    // Handle terminal toggle
    const toggleTerminal = () => {
        setTerminalOpen((prev) => !prev);
        if (!terminalOpen) {
            setTerminalText('');
            setAccessGranted(false);
        }
    };

    // Handle data flow animation toggling
    const toggleDataFlow = () => {
        setDataFlowActive((prev) => !prev);
    };

    // Render matrix-style raining code
    const renderRainingCode = () => {
        if (!dataFlowActive) return null;

        return (
            <div className='pointer-events-none absolute inset-0 overflow-hidden opacity-20'>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute top-0 font-mono text-sm text-[#00FF7F]'
                        style={{
                            left: `${i * 7 + Math.random() * 5}%`,
                            animationDuration: `${Math.random() * 5 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationIterationCount: 'infinite',
                            animationName: 'matrixRain',
                            animationTimingFunction: 'linear'
                        }}>
                        {[...Array(15)].map((_, j) => (
                            <div
                                key={j}
                                style={{
                                    opacity: Math.random() * 0.5 + 0.5,
                                    transform: `translateY(${j * 20}px)`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}>
                                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='relative min-h-screen w-full overflow-hidden bg-[#101820] text-white'>
            {/* Matrix Data Flow Animation */}
            {renderRainingCode()}

            {/* Background radial gradient */}
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,127,0.1),transparent_50%)]' />

            {/* Grid Lines */}
            <div
                className='absolute inset-0 opacity-20'
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,255,127,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,255,127,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Hexagon Pattern */}
            <div
                className='absolute inset-0 opacity-5'
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/hexellence.png")'
                }}
            />

            {/* Header */}
            <div className='relative z-10 px-4 pt-6 pb-4 text-center md:pt-10'>
                <h1 className='font-orbitron text-3xl font-bold tracking-wider md:text-5xl'>
                    <span className='text-shadow-green'>NEXUS</span>
                    <span className='font-light text-[#00FF7F]'> TECHWORKS</span>
                </h1>
                <p className='font-montserrat mx-auto max-w-2xl text-sm text-[#00FF7F]/80 md:text-lg'>
                    Advanced AI Development & Neural Network Engineering
                </p>
            </div>

            {/* Main Content Area */}
            <div className='relative z-10 px-4 pb-8'>
                <div className='container mx-auto'>
                    <div className='flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6'>
                        {/* Left Panel - Stats & Info */}
                        <div className='w-full md:w-1/3'>
                            <div className='rounded-lg border border-[#00FF7F]/30 bg-black/50 p-4 backdrop-blur-sm md:p-6'>
                                <h2 className='font-orbitron mb-3 text-lg font-semibold text-[#00FF7F] md:mb-4 md:text-xl'>
                                    System Analytics
                                </h2>

                                <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#00FF7F]/50 to-transparent md:mb-6' />

                                {/* System Statistics */}
                                <div className='space-y-3 md:space-y-4'>
                                    {[
                                        { label: 'Neural Processing', value: '87%', color: 'bg-[#00FF7F]' },
                                        { label: 'Quantum Throughput', value: '62%', color: 'bg-blue-400' },
                                        { label: 'AI Model Training', value: '91%', color: 'bg-purple-400' },
                                        { label: 'Data Encryption', value: '99%', color: 'bg-yellow-400' }
                                    ].map((stat, i) => (
                                        <div key={i} className='space-y-1'>
                                            <div className='flex justify-between'>
                                                <span className='font-montserrat text-xs text-white/70 md:text-sm'>
                                                    {stat.label}
                                                </span>
                                                <span className='font-montserrat text-xs font-semibold text-white/90 md:text-sm'>
                                                    {stat.value}
                                                </span>
                                            </div>
                                            <div className='h-2 w-full rounded-full bg-white/10 md:h-1.5'>
                                                <div
                                                    className={`h-full rounded-full ${stat.color}`}
                                                    style={{ width: stat.value }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* System Controls */}
                                <div className='mt-4 grid grid-cols-2 gap-2 md:mt-6'>
                                    <button
                                        onClick={toggleDataFlow}
                                        className={`rounded border px-2 py-2 text-xs font-semibold transition-colors md:px-3 ${
                                            dataFlowActive
                                                ? 'border-[#00FF7F]/50 bg-[#00FF7F]/10 text-[#00FF7F]'
                                                : 'border-white/10 bg-black/20 text-white/50'
                                        }`}>
                                        {dataFlowActive ? 'DATA FLOW: ON' : 'DATA FLOW: OFF'}
                                    </button>
                                    <button className='rounded border border-white/10 bg-black/20 px-2 py-2 text-xs font-semibold text-white/50 md:px-3'>
                                        SECURE NETWORK
                                    </button>
                                    <button className='rounded border border-white/10 bg-black/20 px-2 py-2 text-xs font-semibold text-white/50 md:px-3'>
                                        AI CLUSTERS
                                    </button>
                                    <button className='rounded border border-white/10 bg-black/20 px-2 py-2 text-xs font-semibold text-white/50 md:px-3'>
                                        QUANTUM CORE
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className='mt-4 rounded-lg border border-[#00FF7F]/30 bg-black/50 p-4 backdrop-blur-sm md:mt-6 md:p-6'>
                                <h2 className='font-orbitron mb-3 text-lg font-semibold text-[#00FF7F] md:mb-4 md:text-xl'>
                                    Recent Activity
                                </h2>

                                <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#00FF7F]/50 to-transparent md:mb-6' />

                                <div className='max-h-40 space-y-2 overflow-auto pr-2 font-mono text-xs md:space-y-3'>
                                    <div className='flex'>
                                        <span className='mr-2 text-[#00FF7F]'>12:42:07</span>
                                        <span className='text-white/70'>Neural model v4.7 optimization complete</span>
                                    </div>
                                    <div className='flex'>
                                        <span className='mr-2 text-[#00FF7F]'>11:37:19</span>
                                        <span className='text-white/70'>Quantum processor array synchronized</span>
                                    </div>
                                    <div className='flex'>
                                        <span className='mr-2 text-[#00FF7F]'>10:15:52</span>
                                        <span className='text-white/70'>New dataset integration: processing</span>
                                    </div>
                                    <div className='flex'>
                                        <span className='mr-2 text-[#00FF7F]'>09:03:41</span>
                                        <span className='text-white/70'>System security scan: no threats detected</span>
                                    </div>
                                    <div className='flex'>
                                        <span className='mr-2 text-[#00FF7F]'>08:30:15</span>
                                        <span className='text-white/70'>Daily backup completed successfully</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Terminal Console */}
                        <div className='w-full md:w-2/3'>
                            <div className='relative rounded-lg border border-[#00FF7F]/30 bg-black/70 backdrop-blur-sm'>
                                {/* Virtual Terminal */}
                                <div
                                    className={`group relative w-full overflow-hidden transition-all duration-700 ${
                                        terminalOpen
                                            ? 'aspect-auto h-[50vh] md:aspect-video md:h-auto'
                                            : 'aspect-video scale-95 opacity-80'
                                    }`}
                                    onClick={!terminalOpen ? toggleTerminal : undefined}>
                                    {/* Terminal content when closed */}
                                    {!terminalOpen && (
                                        <div className='bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center bg-black'>
                                            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#00FF7F]/50 md:h-16 md:w-16'>
                                                <svg
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    className='md:h-8 md:w-8'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z'
                                                        stroke='#00FF7F'
                                                        strokeWidth='1.5'
                                                    />
                                                    <path
                                                        d='M5 8L9 12L5 16'
                                                        stroke='#00FF7F'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                    <path
                                                        d='M11 16H16'
                                                        stroke='#00FF7F'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            </div>
                                            <p className='font-orbitron text-base font-light text-[#00FF7F] transition-all group-hover:scale-105 md:text-lg'>
                                                Click to Access Terminal
                                            </p>
                                            <p className='font-montserrat mt-2 max-w-md px-4 text-center text-xs text-white/60 md:text-sm'>
                                                Secure console providing access to Nexus TechWorks' AI development
                                                environment and neural network clusters
                                            </p>
                                        </div>
                                    )}

                                    {/* Terminal background and frame */}
                                    <div
                                        className={`absolute inset-0 transition-all duration-1000 ${terminalOpen ? 'opacity-100' : 'opacity-0'}`}>
                                        {/* Terminal header */}
                                        <div className='absolute inset-x-0 top-0 flex h-8 items-center bg-gradient-to-r from-[#00FF7F]/10 via-[#00FF7F]/30 to-[#00FF7F]/10 px-4'>
                                            <div
                                                className='mr-2 h-3 w-3 rounded-full bg-red-500 opacity-70'
                                                onClick={toggleTerminal}
                                            />
                                            <div className='mr-2 h-3 w-3 rounded-full bg-yellow-500 opacity-70' />
                                            <div className='mr-4 h-3 w-3 rounded-full bg-green-500 opacity-70' />
                                            <div className='hidden font-mono text-xs text-white/70 sm:block'>
                                                nexus@techworks:~/quantum-ai-cluster
                                            </div>
                                            <div className='font-mono text-xs text-white/70 sm:hidden'>
                                                nexus@techworks:~
                                            </div>
                                        </div>

                                        {/* Terminal content */}
                                        <div ref={terminalRef} className='absolute inset-0 flex flex-col bg-black pt-8'>
                                            <div className='h-full overflow-auto p-4 font-mono text-xs md:text-sm'>
                                                <pre className='text-[#00FF7F]'>{terminalText}</pre>
                                                {terminalCursor && (
                                                    <span className='animate-blink text-[#00FF7F]'>▌</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hidden Lab Access - appears after terminal sequence */}
                                <div
                                    className={`absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 transition-all duration-1000 md:p-8 ${accessGranted ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                                    <div className='text-center'>
                                        <h3 className='font-orbitron mb-3 text-xl font-semibold text-[#00FF7F] md:mb-4 md:text-2xl'>
                                            Access Granted
                                        </h3>
                                        <p className='font-montserrat mb-6 text-sm text-white/70 md:mb-8 md:text-base'>
                                            Welcome to Nexus TechWorks. Select a lab to continue.
                                        </p>

                                        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4'>
                                            <a
                                                href='/divisions/nexus/lab'
                                                className='group flex cursor-pointer flex-col rounded-lg border border-[#00FF7F]/30 bg-black/40 p-4 text-center transition-all hover:border-[#00FF7F]/60 hover:bg-black/60 md:p-6'>
                                                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#00FF7F]/50 group-hover:border-[#00FF7F] md:mb-4 md:h-16 md:w-16'>
                                                    <svg
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        className='md:h-8 md:w-8'
                                                        xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M12 6.5V3'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M6 8L4 6'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M18 8L20 6'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M19 14L21 14.5'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M5 14L3 14.5'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                        />
                                                        <path
                                                            d='M12 13V17'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M9 19L10 17H14L15 19'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                        <path
                                                            d='M9 19H15'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                    </svg>
                                                </div>
                                                <h4 className='font-orbitron mb-1 text-base text-[#00FF7F] md:mb-2 md:text-lg'>
                                                    Neural Lab
                                                </h4>
                                                <p className='font-montserrat text-xs text-white/60 md:text-sm'>
                                                    AI model development and testing environment
                                                </p>
                                            </a>

                                            <a
                                                href='/divisions/nexus/lab2'
                                                className='group flex cursor-pointer flex-col rounded-lg border border-[#00FF7F]/30 bg-black/40 p-4 text-center transition-all hover:border-[#00FF7F]/60 hover:bg-black/60 md:p-6'>
                                                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#00FF7F]/50 group-hover:border-[#00FF7F] md:mb-4 md:h-16 md:w-16'>
                                                    <svg
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        className='md:h-8 md:w-8'
                                                        xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M12 16V21'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M15 19H9'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M5 8V16'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M5 16C5 16 5 19 12 19C19 19 19 16 19 16'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M5 8C5 8 5 5 12 5C19 5 19 8 19 8'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M19 8V16'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                        <path
                                                            d='M12 5V3'
                                                            stroke='#00FF7F'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        />
                                                    </svg>
                                                </div>
                                                <h4 className='font-orbitron mb-1 text-base text-[#00FF7F] md:mb-2 md:text-lg'>
                                                    Quantum Core
                                                </h4>
                                                <p className='font-montserrat text-xs text-white/60 md:text-sm'>
                                                    Quantum computing and simulation center
                                                </p>
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        onClick={toggleTerminal}
                                        className='font-orbitron mt-6 rounded-lg border border-[#00FF7F]/30 bg-black/40 px-4 py-2 text-sm text-[#00FF7F] transition-all hover:border-[#00FF7F]/60 hover:bg-black/60 md:mt-8 md:px-6 md:py-3'>
                                        Return to Terminal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating holographic elements */}
            <div className='pointer-events-none absolute inset-0 z-0'>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute opacity-30'
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random() * 0.5 + 0.5})`,
                            animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`
                        }}>
                        <svg width='80' height='80' viewBox='0 0 80 80'>
                            {i % 3 === 0 ? (
                                // Circuit board pattern
                                <>
                                    <rect
                                        x='10'
                                        y='10'
                                        width='60'
                                        height='60'
                                        rx='4'
                                        fill='none'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='10'
                                        y1='25'
                                        x2='70'
                                        y2='25'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='10'
                                        y1='40'
                                        x2='70'
                                        y2='40'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='10'
                                        y1='55'
                                        x2='70'
                                        y2='55'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='25'
                                        y1='10'
                                        x2='25'
                                        y2='70'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='40'
                                        y1='10'
                                        x2='40'
                                        y2='70'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <line
                                        x1='55'
                                        y1='10'
                                        x2='55'
                                        y2='70'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                        opacity='0.5'
                                    />
                                    <circle cx='25' cy='25' r='3' fill='#00FF7F' opacity='0.5' />
                                    <circle cx='55' cy='40' r='3' fill='#00FF7F' opacity='0.5' />
                                    <circle cx='40' cy='55' r='3' fill='#00FF7F' opacity='0.5' />
                                </>
                            ) : i % 3 === 1 ? (
                                // AI neural network
                                <>
                                    <circle cx='40' cy='20' r='4' fill='#00FF7F' opacity='0.7' />
                                    <circle cx='20' cy='40' r='4' fill='#00FF7F' opacity='0.7' />
                                    <circle cx='40' cy='40' r='4' fill='#00FF7F' opacity='0.7' />
                                    <circle cx='60' cy='40' r='4' fill='#00FF7F' opacity='0.7' />
                                    <circle cx='30' cy='60' r='4' fill='#00FF7F' opacity='0.7' />
                                    <circle cx='50' cy='60' r='4' fill='#00FF7F' opacity='0.7' />
                                    <line x1='40' y1='20' x2='20' y2='40' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='40' y1='20' x2='40' y2='40' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='40' y1='20' x2='60' y2='40' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='20' y1='40' x2='30' y2='60' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='40' y1='40' x2='30' y2='60' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='40' y1='40' x2='50' y2='60' stroke='#00FF7F' strokeWidth='0.5' />
                                    <line x1='60' y1='40' x2='50' y2='60' stroke='#00FF7F' strokeWidth='0.5' />
                                </>
                            ) : (
                                // Code symbols
                                <>
                                    <text
                                        x='15'
                                        y='30'
                                        fill='#00FF7F'
                                        opacity='0.7'
                                        fontSize='8'
                                        fontFamily='monospace'>
                                        function
                                    </text>
                                    <text
                                        x='20'
                                        y='40'
                                        fill='#00FF7F'
                                        opacity='0.7'
                                        fontSize='8'
                                        fontFamily='monospace'>
                                        AI.train()
                                    </text>
                                    <text
                                        x='25'
                                        y='50'
                                        fill='#00FF7F'
                                        opacity='0.7'
                                        fontSize='8'
                                        fontFamily='monospace'>
                                        {'{data}'}
                                    </text>
                                    <rect
                                        x='10'
                                        y='15'
                                        width='60'
                                        height='40'
                                        rx='2'
                                        fill='none'
                                        stroke='#00FF7F'
                                        strokeWidth='0.5'
                                    />
                                </>
                            )}
                        </svg>
                    </div>
                ))}
            </div>

            {/* Animation styling */}
            <style jsx global>{`
                @keyframes matrixRain {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100vh);
                    }
                }

                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0);
                    }
                    50% {
                        transform: translateY(-15px) rotate(5deg);
                    }
                    100% {
                        transform: translateY(0) rotate(0);
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
                    animation: blink 1s step-end infinite;
                }

                .text-shadow-green {
                    text-shadow:
                        0 0 10px rgba(0, 255, 127, 0.7),
                        0 0 20px rgba(0, 255, 127, 0.5);
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
