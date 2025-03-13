'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';

export default function HorizonHQ() {
    const [droneActive, setDroneActive] = useState(false);
    const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0 });
    const [showFeed, setShowFeed] = useState(false);
    const [currentView, setCurrentView] = useState(0);
    const viewRef = useRef(null);

    // Array of aerial view descriptions for the drone feed
    const aerialViews = [
        { name: 'Cityscape', description: 'Urban landscape at twilight, neon lights reflecting off skyscrapers' },
        { name: 'Coastline', description: 'Dramatic cliffs meeting turquoise waters, waves crashing below' },
        { name: 'Mountain Range', description: 'Snow-capped peaks above the clouds, golden sunrise' },
        { name: 'Forest Canopy', description: 'Emerald green trees stretching to the horizon, mist rising' }
    ];

    // Handle camera/lens rotation
    const handleLensMove = (e) => {
        if (!droneActive) return;

        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = ((clientX - left - width / 2) / (width / 2)) * 15;
        const y = ((clientY - top - height / 2) / (height / 2)) * 15;

        setCameraAngle({ x, y });
    };

    // Activate drone and camera
    const activateDrone = () => {
        setDroneActive(true);

        // After a delay, show the drone feed
        setTimeout(() => {
            setShowFeed(true);

            // Cycle through aerial views
            const interval = setInterval(() => {
                setCurrentView((prev) => (prev + 1) % aerialViews.length);
            }, 8000);

            return () => clearInterval(interval);
        }, 1500);
    };

    // Parallax effect for the clouds background
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (window.innerWidth / 2 - clientX) / 50;
            const y = (window.innerHeight / 2 - clientY) / 50;
            setParallax({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Auto-scroll drone feed text
    useEffect(() => {
        if (viewRef.current && showFeed) {
            viewRef.current.scrollTop = 0;
        }
    }, [currentView, showFeed]);

    return (
        <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#001133] via-[#002366] to-[#001133] text-white'>
            {/* Parallax Clouds */}
            <div
                className='absolute inset-0 z-0 opacity-40'
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1585424264970-f8892f5d0b1f?q=80&w=1000")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateX(${parallax.x}px) translateY(${parallax.y}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            />

            {/* Overlay gradient */}
            <div className='bg-gradient-radial absolute inset-0 z-0 from-transparent to-[#001133] opacity-70' />

            {/* Header */}
            <div className='absolute top-4 right-0 left-0 z-10 px-4 text-center md:top-10'>
                <h1 className='font-orbitron text-3xl font-bold tracking-wider text-white md:text-5xl'>
                    <span className='text-shadow-blue'>Horizon</span>
                    <span className='font-light text-[#87CEEB]'> Aerial & Visual</span>
                </h1>
                <p className='font-montserrat mt-1 text-sm text-[#A0D8EF] opacity-80 md:mt-2 md:text-xl'>
                    Elevating perspectives through cutting-edge aerial cinematography
                </p>
            </div>

            {/* Main Content - Drone Bay */}
            <div className='absolute inset-0 z-10 flex items-center justify-center'>
                <div className='relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-16 md:flex-row md:items-start md:justify-between md:pt-0'>
                    {/* Left Panel - Drone Controls */}
                    <div className='mb-4 w-full max-w-md md:mb-10 md:w-2/5'>
                        <div className='rounded-xl border border-[#87CEEB]/30 bg-[#002366]/40 p-4 backdrop-blur-sm md:p-6'>
                            <h2 className='font-orbitron mb-3 text-xl font-semibold text-[#87CEEB] md:mb-4 md:text-2xl'>
                                Drone Control Center
                            </h2>
                            <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#87CEEB]/50 to-transparent md:mb-6' />

                            <div className='mb-4 space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='font-montserrat text-xs text-white/70 md:text-sm'>
                                        Signal Strength
                                    </span>
                                    <div className='flex'>
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`mx-0.5 h-2 w-0.5 rounded-sm md:h-3 md:w-1 ${droneActive && i < 3 ? 'bg-[#87CEEB]' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <span className='font-montserrat text-xs text-white/70 md:text-sm'>Battery</span>
                                    <div className='h-2 w-12 rounded-full bg-white/20 md:h-3 md:w-16'>
                                        <div
                                            className={`h-full rounded-full ${droneActive ? 'animate-pulse bg-green-400' : 'w-1/3 bg-red-400'}`}
                                            style={{ width: droneActive ? '85%' : '30%' }}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <span className='font-montserrat text-xs text-white/70 md:text-sm'>Status</span>
                                    <span
                                        className={`font-montserrat text-xs md:text-sm ${droneActive ? 'text-green-400' : 'text-[#87CEEB]/70'}`}>
                                        {droneActive ? 'AIRBORNE' : 'READY'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={activateDrone}
                                disabled={droneActive}
                                className={`mt-3 w-full rounded-lg px-4 py-2 text-center text-sm font-semibold transition-all md:mt-4 md:px-6 md:py-3 md:text-lg ${
                                    droneActive
                                        ? 'cursor-default bg-[#87CEEB]/30 text-white/50'
                                        : 'bg-[#002366] text-white shadow-lg shadow-[#87CEEB]/20 hover:bg-[#003399] hover:shadow-[#87CEEB]/40 active:scale-[0.98]'
                                }`}>
                                {droneActive ? 'Drone Deployed' : 'Launch Drone'}
                            </button>
                        </div>

                        {/* Drone Info */}
                        {showFeed && (
                            <div
                                ref={viewRef}
                                className='mt-4 max-h-48 overflow-hidden rounded-xl border border-[#87CEEB]/30 bg-[#002366]/40 p-3 backdrop-blur-sm md:mt-6 md:max-h-60 md:p-6'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-orbitron text-base font-semibold text-[#87CEEB] md:text-lg'>
                                        {aerialViews[currentView].name}
                                    </h3>
                                    <span className='font-montserrat h-5 w-12 rounded-full bg-[#001133] text-center text-[10px] leading-5 text-[#87CEEB]/80 md:h-6 md:w-16 md:text-xs md:leading-6'>
                                        LIVE
                                    </span>
                                </div>

                                <div className='mt-2 opacity-80'>
                                    <p className='font-montserrat text-xs leading-relaxed md:text-sm'>
                                        {aerialViews[currentView].description}
                                    </p>
                                </div>

                                <div className='mt-4 grid grid-cols-4 gap-2'>
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 rounded-full ${i === currentView ? 'bg-[#87CEEB]' : 'bg-white/30'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Camera/Lens */}
                    <div className='w-full max-w-md md:w-1/2'>
                        <div
                            className='relative aspect-video overflow-hidden rounded-xl border border-[#87CEEB]/50 bg-[#001133]/70 p-1'
                            onMouseMove={handleLensMove}
                            onClick={!droneActive ? activateDrone : undefined}>
                            {/* Camera Lens Graphics */}
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${droneActive ? 'opacity-0' : 'opacity-100'}`}>
                                <div className='relative h-32 w-32 md:h-48 md:w-48'>
                                    {/* Outer Ring */}
                                    <div className='absolute inset-0 rounded-full border-2 border-[#87CEEB]/40' />

                                    {/* Inner Circles */}
                                    {[0.85, 0.7, 0.55, 0.4].map((size, i) => (
                                        <div
                                            key={i}
                                            className='absolute rounded-full border border-[#87CEEB]/30'
                                            style={{
                                                inset: `${(1 - size) * 50}%`,
                                                backgroundColor: i === 3 ? 'rgba(135, 206, 235, 0.2)' : 'transparent'
                                            }}
                                        />
                                    ))}

                                    {/* Crosshairs */}
                                    <div className='absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#87CEEB]/60 to-transparent' />
                                    <div className='absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#87CEEB]/60 to-transparent' />

                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <span className='font-orbitron text-xs font-light text-[#87CEEB]/80 md:text-sm'>
                                            CLICK TO ACTIVATE
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Drone Feed */}
                            <div
                                className={`absolute inset-0 overflow-hidden transition-all duration-1000 ${showFeed ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    transform: `perspective(1000px) rotateX(${cameraAngle.y}deg) rotateY(${cameraAngle.x}deg)`
                                }}>
                                {/* Placeholder for drone feed - would be real-time footage in production */}
                                <div
                                    className='absolute inset-0 bg-cover bg-center'
                                    style={{
                                        backgroundImage:
                                            'url("https://images.unsplash.com/photo-1576293876830-578a3d7968d2?q=80&w=2000")',
                                        filter: 'saturate(1.2) contrast(1.1)'
                                    }}
                                />

                                {/* HUD Elements */}
                                <div className='absolute inset-0'>
                                    {/* Top-left data */}
                                    <div className='font-montserrat absolute top-2 left-2 text-[10px] text-[#87CEEB]/90 md:top-3 md:left-3 md:text-xs'>
                                        <div>ALT: 320m</div>
                                        <div>SPD: 42km/h</div>
                                        <div>BAT: 85%</div>
                                    </div>

                                    {/* Center reticle */}
                                    <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                                        <div className='h-12 w-12 rounded-full border border-[#87CEEB]/20 md:h-16 md:w-16'>
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <div className='h-1 w-1 rounded-full bg-[#87CEEB]/80' />
                                            </div>
                                            <div className='absolute inset-x-0 top-1/2 h-px bg-[#87CEEB]/30' />
                                            <div className='absolute inset-y-0 left-1/2 w-px bg-[#87CEEB]/30' />
                                        </div>
                                    </div>

                                    {/* Bottom-right timestamp */}
                                    <div className='font-montserrat absolute right-2 bottom-2 text-[10px] text-[#87CEEB]/90 md:right-3 md:bottom-3 md:text-xs'>
                                        LIVE: {new Date().toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>

                            {/* Lens iris animation */}
                            {droneActive && !showFeed && (
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='h-32 w-32 animate-pulse rounded-full border border-[#87CEEB]/60 md:h-40 md:w-40'>
                                        <div className='absolute inset-[15%] animate-pulse rounded-full border border-[#87CEEB]/60'>
                                            <div className='absolute inset-[20%] animate-pulse rounded-full border border-[#87CEEB]/60'>
                                                <div className='absolute inset-[30%] animate-pulse rounded-full bg-[#87CEEB]/20' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='mt-3 rounded-lg border border-[#87CEEB]/30 bg-[#002366]/40 p-2 text-center backdrop-blur-sm md:mt-4 md:p-3'>
                            <p className='font-montserrat text-xs text-[#87CEEB]/80 md:text-sm'>
                                {droneActive
                                    ? showFeed
                                        ? 'Live feed active. Move cursor over image to adjust camera angle.'
                                        : 'Establishing connection with drone...'
                                    : 'Drone ready for deployment. Click on lens to activate.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating UI elements */}
            <div className='pointer-events-none absolute inset-0 z-0'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute opacity-30'
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random() * 0.5 + 0.3})`,
                            animation: `float ${Math.random() * 20 + 15}s infinite ease-in-out`
                        }}>
                        <svg width='40' height='40' viewBox='0 0 60 60'>
                            <circle
                                cx='30'
                                cy='30'
                                r='28'
                                fill='none'
                                stroke={i % 2 === 0 ? '#87CEEB' : '#002366'}
                                strokeWidth='0.5'
                                opacity='0.5'
                            />
                            <circle
                                cx='30'
                                cy='30'
                                r='15'
                                fill='none'
                                stroke={i % 2 === 0 ? '#87CEEB' : '#002366'}
                                strokeWidth='0.5'
                                opacity='0.7'
                            />
                            <line
                                x1='10'
                                y1='30'
                                x2='50'
                                y2='30'
                                stroke={i % 2 === 0 ? '#87CEEB' : '#002366'}
                                strokeWidth='0.5'
                                opacity='0.7'
                            />
                            <line
                                x1='30'
                                y1='10'
                                x2='30'
                                y2='50'
                                stroke={i % 2 === 0 ? '#87CEEB' : '#002366'}
                                strokeWidth='0.5'
                                opacity='0.7'
                            />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Animation styling */}
            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                    100% {
                        transform: translateY(0) rotate(0);
                    }
                }

                .text-shadow-blue {
                    text-shadow:
                        0 0 10px rgba(0, 35, 102, 0.7),
                        0 0 20px rgba(135, 206, 235, 0.5);
                }

                .bg-gradient-radial {
                    background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
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
