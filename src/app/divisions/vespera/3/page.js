'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function VesperaEntrance() {
    // State for animations and interactions
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeClosed, setWelcomeClosed] = useState(false);
    const [receptionistGreeting, setReceptionistGreeting] = useState(false);
    const [ambientSoundActive, setAmbientSoundActive] = useState(false);
    const [libraryRevealed, setLibraryRevealed] = useState(false);

    // Reference for animation elements
    const entranceRef = useRef(null);

    // Dewey decimal categories for the shelves
    const deweyCategories = [
        { number: '000', name: 'Computer Science & Information' },
        { number: '100', name: 'Philosophy & Psychology' },
        { number: '200', name: 'Religion & Mythology' },
        { number: '300', name: 'Social Sciences' },
        { number: '400', name: 'Language & Linguistics' },
        { number: '500', name: 'Science & Mathematics' },
        { number: '600', name: 'Technology & Engineering' },
        { number: '700', name: 'Arts & Recreation' },
        { number: '800', name: 'Literature & Rhetoric' },
        { number: '900', name: 'History & Geography' }
    ];

    // Floating book data
    const floatingBooks = [
        { id: 1, title: 'Quantum Narratives', rotation: -15, delay: 0 },
        { id: 2, title: 'Digital Humanities', rotation: 10, delay: 2 },
        { id: 3, title: 'Neural Fiction', rotation: -5, delay: 4 },
        { id: 4, title: 'Holographic Poetry', rotation: 8, delay: 1 },
        { id: 5, title: 'Cyber Philosophy', rotation: -12, delay: 3 }
    ];

    // Entrance sequence animation
    useEffect(() => {
        // Initial loading sequence
        const loadingTimer = setTimeout(() => {
            setLoadingComplete(true);

            // Show welcome and reveal library
            const welcomeTimer = setTimeout(() => {
                setShowWelcome(true);
                setLibraryRevealed(true);

                // Show receptionist greeting
                const receptionistTimer = setTimeout(() => {
                    setReceptionistGreeting(true);
                }, 1500);

                return () => clearTimeout(receptionistTimer);
            }, 1000);

            return () => clearTimeout(welcomeTimer);
        }, 1000);

        return () => clearTimeout(loadingTimer);
    }, []);

    // Toggle ambient sound
    const toggleAmbientSound = () => {
        setAmbientSoundActive((prev) => !prev);
    };

    // Handle closing the welcome message
    const closeWelcomeMessage = () => {
        setWelcomeClosed(true);
    };

    return (
        <div className='relative min-h-screen w-full overflow-hidden bg-black text-white'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-b from-[#1A0A0A] via-black to-[#1A0A0A] opacity-90'></div>

            {/* Subtle Dust Particles */}
            <div className='absolute inset-0 opacity-30 mix-blend-screen'>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] bg-repeat opacity-20"></div>
            </div>

            {/* Grid Pattern */}
            <div
                className='absolute inset-0 z-0 opacity-10'
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(220, 20, 60, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(220, 20, 60, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}></div>

            {/* Loading Screen */}
            {!loadingComplete && (
                <div className='absolute inset-0 z-50 flex flex-col items-center justify-center bg-black'>
                    <div className='mb-8 h-16 w-16 animate-spin rounded-full border-t-2 border-l-2 border-[#DC143C]'></div>
                    <div className='font-orbitron text-xl text-[#DC143C]'>
                        Initializing Vespera Publishing Interface
                    </div>
                    <div className='font-montserrat mt-2 text-sm text-[#F8F8F8]/60'>
                        Establishing neural connection to the archives...
                    </div>
                </div>
            )}

            {/* Main Library Space */}
            <div ref={entranceRef} className='absolute inset-0 z-10 flex items-center justify-center'>
                <div className='relative h-full max-h-[80vh] w-full max-w-5xl overflow-hidden'>
                    {/* 3D Library Space */}
                    <div
                        className={`absolute inset-0 transition-all duration-1500 ease-out ${
                            libraryRevealed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                        }`}
                        style={{
                            perspective: '1500px',
                            transformStyle: 'preserve-3d'
                        }}>
                        {/* Library Interior */}
                        <div className='relative h-full w-full'>
                            {/* Wooden Floor Texture */}
                            <div className='absolute inset-0 z-0'>
                                <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3e2723]/80 to-transparent'></div>
                            </div>

                            {/* Left Bookshelf */}
                            <div className='absolute top-[20%] bottom-[10%] left-0 w-[20%] bg-[#3e2723]/70'>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-repeat opacity-30"></div>
                                <div className='h-full p-2'>
                                    {deweyCategories.slice(0, 5).map((category, index) => (
                                        <div key={index} className='mb-2 border-b border-[#8d6e63]/30 pb-1'>
                                            <div className='flex justify-between'>
                                                <span className='font-mono text-xs text-[#DC143C]/60'>
                                                    {category.number}
                                                </span>
                                                <span className='font-montserrat text-xs text-[#F8F8F8]/60'>
                                                    {category.name.slice(0, 10)}...
                                                </span>
                                            </div>
                                            <div className='mt-1 flex h-3 w-full'>
                                                {Array(6)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <div key={i} className='mx-0.5 h-full w-2 bg-[#5d4037]'></div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Rolling Ladder */}
                                <div className='absolute top-1/4 -right-5 h-24 w-5 bg-[#5d4037]'>
                                    <div className='absolute top-0 bottom-0 left-0 w-1 bg-[#8d6e63]'></div>
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className='absolute right-0 left-0 h-1 bg-[#8d6e63]'
                                                style={{ top: `${i * 20}%` }}></div>
                                        ))}
                                </div>
                            </div>

                            {/* Right Bookshelf */}
                            <div className='absolute top-[20%] right-0 bottom-[10%] w-[20%] bg-[#3e2723]/70'>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-repeat opacity-30"></div>
                                <div className='h-full p-2'>
                                    {deweyCategories.slice(5, 10).map((category, index) => (
                                        <div key={index} className='mb-2 border-b border-[#8d6e63]/30 pb-1'>
                                            <div className='flex justify-between'>
                                                <span className='font-mono text-xs text-[#DC143C]/60'>
                                                    {category.number}
                                                </span>
                                                <span className='font-montserrat text-xs text-[#F8F8F8]/60'>
                                                    {category.name.slice(0, 10)}...
                                                </span>
                                            </div>
                                            <div className='mt-1 flex h-3 w-full'>
                                                {Array(6)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <div key={i} className='mx-0.5 h-full w-2 bg-[#5d4037]'></div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Rolling Ladder */}
                                <div className='absolute top-2/3 -left-5 h-24 w-5 bg-[#5d4037]'>
                                    <div className='absolute top-0 right-0 bottom-0 w-1 bg-[#8d6e63]'></div>
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className='absolute right-0 left-0 h-1 bg-[#8d6e63]'
                                                style={{ top: `${i * 20}%` }}></div>
                                        ))}
                                </div>
                            </div>

                            {/* Wooden Reception Desk */}
                            <div className='absolute bottom-[12%] left-1/2 w-[60%] -translate-x-1/2'>
                                <div className='relative h-28 w-full rounded-t-lg bg-[#5d4037]'>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-repeat opacity-30"></div>
                                    <div className='absolute inset-x-0 top-0 h-8 border-b border-[#8d6e63]/30 bg-[#3e2723]'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <span className='font-serif text-lg tracking-wide text-[#F8F8F8]/80'>
                                                VESPERA LIBRARY
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Catalog Drawers */}
                                    <div className='absolute top-10 left-4 grid grid-cols-3 gap-1'>
                                        {Array(9)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div
                                                    key={i}
                                                    className='h-6 w-12 border border-[#8d6e63]/40 bg-[#3e2723]'>
                                                    <div className='flex h-full w-full items-center justify-center'>
                                                        <span className='font-mono text-[8px] text-[#F8F8F8]/60'>
                                                            {String.fromCharCode(65 + i * 3)}-
                                                            {String.fromCharCode(67 + i * 3)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Modern Terminal */}
                                    <div className='absolute top-10 right-4 h-10 w-24 rounded bg-black/50 backdrop-blur-sm'>
                                        <div className='absolute inset-0 border border-[#DC143C]/30'></div>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <span className='font-mono text-xs text-[#DC143C]'>CATALOG</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Holographic Receptionist */}
                                <div
                                    className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
                                        receptionistGreeting ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                    }`}>
                                    <div className='relative flex flex-col items-center'>
                                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#DC143C] to-[#FF4040]'>
                                            <svg
                                                className='h-9 w-9 text-white'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </div>

                                        <div className='font-orbitron mt-2 text-base text-[#DC143C]'>ARIA</div>
                                        <div className='font-montserrat text-xs text-[#F8F8F8]/60'>
                                            Digital Archivist
                                        </div>

                                        <div className='mt-3 max-w-sm border border-[#DC143C]/20 bg-[#1A0A0A]/70 p-3 backdrop-blur-sm'>
                                            <p className='font-montserrat text-sm text-[#F8F8F8]/90'>
                                                Welcome to Vespera Publishing. Our archives blend traditional
                                                organization with quantum storage technology. How may I assist you
                                                today?
                                            </p>

                                            <div className='mt-3 flex items-center justify-between'>
                                                <span className='font-mono text-xs text-[#DC143C]/70'>DEWEY v4.2</span>

                                                <button
                                                    onClick={toggleAmbientSound}
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                                                        ambientSoundActive
                                                            ? 'border-[#DC143C] text-[#DC143C]'
                                                            : 'border-white/30 text-white/30'
                                                    }`}>
                                                    <svg
                                                        className='h-3 w-3'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M11 5L6 9H2V15H6L11 19V5Z'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                        <path
                                                            d='M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Books in 3D Space */}
                            {floatingBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className='absolute'
                                    style={{
                                        left: `${25 + index * 12}%`,
                                        top: `${20 + (index % 3) * 15}%`,
                                        transform: `translateZ(${-50 - index * 20}px) rotateY(${book.rotation}deg)`,
                                        transformStyle: 'preserve-3d',
                                        animation: `float3d ${Math.random() * 4 + 8}s infinite ease-in-out`,
                                        animationDelay: `${book.delay}s`
                                    }}>
                                    <div className='flex h-16 w-28 flex-col border border-[#DC143C]/40 bg-[#1A0A0A]/70 p-2 backdrop-blur-sm'>
                                        <div className='font-montserrat text-sm font-medium text-[#F8F8F8]'>
                                            {book.title}
                                        </div>
                                        <div className='mt-1 h-px w-full bg-[#DC143C]/30'></div>
                                        <div className='mt-auto flex justify-between'>
                                            <span className='font-mono text-xs text-[#DC143C]/70'>
                                                {Math.floor(Math.random() * 900)}.{Math.floor(Math.random() * 100)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Library Ambiance - Dust Particles */}
                            <div className='absolute inset-0'>
                                {Array(20)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className='absolute h-1 w-1 rounded-full bg-[#F8F8F8] opacity-20'
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                                animation: `dust ${Math.random() * 10 + 15}s infinite linear`,
                                                animationDelay: `${Math.random() * 10}s`
                                            }}></div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome Overlay - positioned on top */}
            {showWelcome && !welcomeClosed && (
                <div className='pointer-events-auto absolute inset-0 z-30 flex items-center justify-center'>
                    <div className='relative flex h-[90%] w-[90%] flex-col justify-between border-4 border-[#DC143C]/40 bg-[#1A0A0A]/60 backdrop-blur-sm'>
                        {/* Header */}
                        <div className='w-full border-b border-[#DC143C]/40 bg-[#1A0A0A]/80 py-4 text-center'>
                            <h1 className='font-orbitron text-2xl tracking-widest text-[#DC143C]'>
                                VESPERA PUBLISHING
                            </h1>
                        </div>

                        {/* Center welcome message */}
                        <div className='flex flex-grow items-center justify-center'>
                            <div className='p-4 text-center'>
                                <div className='font-orbitron text-shadow-red mb-2 text-6xl font-bold text-[#DC143C]'>
                                    WELCOME
                                </div>
                                <div className='font-montserrat text-2xl text-[#F8F8F8]/90'>to Vespera Publishing</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='w-full border-t border-[#DC143C]/40 bg-[#1A0A0A]/80 py-3 text-center'>
                            <div className='font-montserrat text-sm text-[#F8F8F8]/40'>
                                ESTABLISHED 2046 • AEROVISTA LLC
                            </div>
                        </div>

                        {/* Close button - larger and more visible */}
                        <button
                            onClick={closeWelcomeMessage}
                            className='absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#DC143C]/50 bg-black/70 text-[#DC143C] transition-colors hover:bg-[#DC143C]/20'>
                            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M18 6L6 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                                <path d='M6 6L18 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Visual Elements & Animation Styles */}
            <style jsx global>{`
                @keyframes float3d {
                    0% {
                        transform: translateZ(${(props) => -(50 + props.index * 20)}px) translateY(0)
                            rotateY(${(props) => props.rotation}deg);
                    }
                    50% {
                        transform: translateZ(${(props) => -(50 + props.index * 20)}px) translateY(-10px)
                            rotateY(${(props) => props.rotation + 5}deg);
                    }
                    100% {
                        transform: translateZ(${(props) => -(50 + props.index * 20)}px) translateY(0)
                            rotateY(${(props) => props.rotation}deg);
                    }
                }

                @keyframes dust {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.2;
                    }
                    90% {
                        opacity: 0.2;
                    }
                    100% {
                        transform: translateY(-100vh);
                        opacity: 0;
                    }
                }

                .text-shadow-red {
                    text-shadow: 0 0 20px rgba(220, 20, 60, 0.7);
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
