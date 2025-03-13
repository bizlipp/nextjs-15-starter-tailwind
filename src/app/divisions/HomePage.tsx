'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import Door from './Door';

// Define interfaces for component props
interface NeonTextProps {
    text: string;
    className?: string;
}

interface DivisionProps {
    name: string;
    path: string;
    color: string;
    description: string;
}

// Component for neon text with flicker effect
const NeonText: React.FC<NeonTextProps> = ({ text, className = '' }) => {
    const [flicker, setFlicker] = useState(false);

    // Create neon sign flickering effect
    useEffect(() => {
        const flickerInterval = setInterval(() => {
            // Random flickering with 15% chance
            if (Math.random() < 0.15) {
                setFlicker(true);
                // Random duration for the flicker
                setTimeout(() => setFlicker(false), Math.random() * 200 + 50);
            }
        }, 2000);

        return () => clearInterval(flickerInterval);
    }, []);

    return (
        <div
            className={`px-4 py-2 font-['Orbitron'] text-sm font-light tracking-widest uppercase md:text-base ${
                flicker ? 'opacity-70' : 'opacity-100'
            } transition-opacity duration-50 ${className}`}
            style={{
                color: '#00AEEF',
                textShadow: `
                    0 0 5px #00AEEF,
                    0 0 10px #00AEEF
                `
            }}>
            {text}
        </div>
    );
};

// Division Card Component
const DivisionCard: React.FC<DivisionProps> = ({ name, path, color, description }) => {
    return (
        <Link
            href={path}
            className='group hover:border-opacity-70 relative block rounded-lg border border-gray-800 bg-black/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
            style={
                {
                    // Apply color dynamically with inline styles instead of CSS vars
                    '--tw-shadow-color': `${color}40`,
                    borderHoverColor: color
                } as React.CSSProperties
            }>
            <div
                className='absolute top-0 left-0 h-full w-1 rounded-l-lg transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:rounded-lg group-hover:opacity-10'
                style={{ backgroundColor: color }}
            />
            <h3 className='mb-1 text-lg font-bold' style={{ color: color }}>
                {name}
            </h3>
            <p className='text-sm text-gray-300'>{description}</p>
        </Link>
    );
};

// Login/Logout Button Component
const AuthButton: React.FC<{ isLoggedIn: boolean; toggleAuth: () => void; className?: string }> = ({
    isLoggedIn,
    toggleAuth,
    className = ''
}) => {
    return (
        <button
            onClick={toggleAuth}
            className={`group rounded-md border border-[#00AEEF]/60 bg-black/80 px-6 py-2 font-['Montserrat'] text-sm backdrop-blur-sm transition-all duration-300 hover:border-[#00AEEF] hover:bg-[#011627] hover:shadow-[0_0_15px_rgba(0,174,239,0.5)] ${className}`}>
            <span className='flex items-center justify-center'>
                <span
                    className={`mr-2 inline-block h-3 w-3 rounded-full ${
                        isLoggedIn ? 'animate-pulse bg-green-500' : 'bg-red-500'
                    }`}></span>
                <span className='font-semibold text-[#00AEEF]'>{isLoggedIn ? 'Logout' : 'Login'}</span>
                <span className='ml-1 -translate-x-2 text-[#00AEEF] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                    {isLoggedIn ? '→' : '←'}
                </span>
            </span>
        </button>
    );
};

export default function HomePage() {
    const [activeGlow, setActiveGlow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Toggle entrance glow effect periodically
    useEffect(() => {
        const glowInterval = setInterval(() => {
            setActiveGlow(true);
            setTimeout(() => setActiveGlow(false), 1500);
        }, 5000);

        return () => clearInterval(glowInterval);
    }, []);

    // Toggle login state
    const toggleAuth = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    // Division data
    const divisions: DivisionProps[] = [
        {
            name: 'AeroVista Complex',
            path: '/divisions/aerovista',
            color: '#00AEEF',
            description: 'Business oversight and strategy division - the central hub for all operations.'
        },
        {
            name: 'SkyForge Creative Studios',
            path: '/divisions/skyforge',
            color: '#6A0DAD',
            description: 'Game development and interactive storytelling with AI-driven creativity.'
        },
        {
            name: 'Lumina Creative Media',
            path: '/divisions/lumina',
            color: '#FFD700',
            description: 'YouTube content, branding, social media, and digital marketing solutions.'
        },
        {
            name: 'Nexus TechWorks',
            path: '/divisions/nexus',
            color: '#00FF7F',
            description: 'Web/app development, AI tools, and experimental tech solutions.'
        },
        {
            name: 'Horizon Aerial & Visual',
            path: '/divisions/horizon',
            color: '#87CEEB',
            description: 'Drone photography, aerial surveys, and digital merchandising.'
        },
        {
            name: 'Vespera Publishing',
            path: '/divisions/vespera',
            color: '#DC143C',
            description: 'Fiction/non-fiction books, research-based content and publishing services.'
        },
        {
            name: 'Summit Learning',
            path: '/divisions/summit',
            color: '#228B22',
            description: 'Online education, courses, research, consulting, and LMS tech support.'
        },
        {
            name: 'EchoVerse Audio',
            path: '/divisions/echoverse',
            color: '#FF1493',
            description: 'Music production, AI-driven soundscapes, and sound engineering services.'
        }
    ];

    return (
        <div className='relative min-h-screen w-full overflow-x-hidden bg-black text-white'>
            {/* Animated background */}
            <div className='fixed inset-0 bg-gradient-to-b from-black via-[#010a14] to-[#001a33]'>
                {/* Digital Grid Lines */}
                <div
                    className='absolute inset-0 opacity-20'
                    style={{
                        backgroundImage:
                            'linear-gradient(#00AEEF20 1px, transparent 1px), linear-gradient(90deg, #00AEEF20 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>

                {/* Simplified particles - just a few static dots */}
                <div className='absolute inset-0'>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className='absolute animate-pulse rounded-full bg-cyan-400'
                            style={{
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.1,
                                animationDuration: `${Math.random() * 3 + 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <main className='relative z-10 px-4 py-8 sm:px-6 md:py-12'>
                {/* Header */}
                <header className='mb-10 text-center'>
                    <h1 className="font-['Orbitron'] text-3xl font-bold tracking-wide text-[#00AEEF] uppercase drop-shadow-md md:text-4xl">
                        AeroVista
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl font-['Montserrat'] text-sm text-gray-300 md:text-base">
                        A fusion of cyberpunk aesthetics, digital nostalgia, and cutting-edge AI creativity
                    </p>
                    {isLoggedIn && (
                        <div className='mt-2 inline-block rounded border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-3 py-1 text-sm'>
                            <span className='text-[#00AEEF]'>Welcome back, Agent</span>
                        </div>
                    )}
                </header>

                {/* Main entrance - simplified with clear call to action */}
                <div className='mx-auto mb-16 max-w-md rounded-lg border-2 border-[#00AEEF]/40 bg-[#011627]/90 p-4 shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,174,239,0.4)]'>
                    {/* Title */}
                    <div className='mb-4 text-center'>
                        <h2 className="mb-2 font-['Orbitron'] text-xl text-[#00AEEF]">MAIN ENTRANCE</h2>
                        <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-[#00AEEF]/60 to-transparent'></div>
                    </div>

                    {/* Door component with glow effect when active */}
                    <div
                        className={`relative transition-all duration-300 ${activeGlow ? 'shadow-[0_0_15px_rgba(0,174,239,0.5)]' : ''}`}>
                        <Door />
                    </div>

                    {/* CTA Text */}
                    <p className='mt-4 text-center text-sm text-gray-300'>
                        {isLoggedIn ? 'Welcome back. Click to enter the complex.' : 'Click to enter the complex'}
                    </p>
                </div>

                {/* Login/Logout Control - Replace Status Section */}
                <div className='mb-12 text-center'>
                    <div className='inline-block rounded-md border border-[#00AEEF]/40 bg-black/60 p-4 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm'>
                        <div className='flex flex-col items-center space-y-3'>
                            <p className='text-sm text-gray-300'>
                                User Status:{' '}
                                <span className={isLoggedIn ? 'text-green-400' : 'text-red-400'}>
                                    {isLoggedIn ? 'Authenticated' : 'Not Authenticated'}
                                </span>
                            </p>
                            <div className='transform transition-transform hover:scale-105'>
                                <AuthButton
                                    isLoggedIn={isLoggedIn}
                                    toggleAuth={toggleAuth}
                                    className='px-8 py-2.5 text-base md:text-base'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Division cards section */}
                <section>
                    <div className='mb-6 text-center'>
                        <h2 className="mb-2 font-['Orbitron'] text-2xl text-[#00AEEF]">OUR DIVISIONS</h2>
                        <NeonText text='Direct Access Portals' className='inline-block' />
                        <p className='mx-auto mt-3 max-w-2xl text-sm text-gray-400'>
                            Select a division to quickly navigate to its section
                        </p>
                    </div>

                    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {divisions.map((division) => (
                            <DivisionCard
                                key={division.path}
                                name={division.name}
                                path={division.path}
                                color={division.color}
                                description={division.description}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className='mt-16 text-center text-sm text-gray-500'>
                    <div className='mx-auto mb-4 h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-[#00AEEF]/30 to-transparent'></div>
                    <p>AeroVista Complex • Where Vision Takes Flight</p>
                    {isLoggedIn && (
                        <p className='mt-2 text-[#00AEEF]/50'>Secure connection active • User authenticated</p>
                    )}
                </footer>
            </main>

            {/* Custom animations */}
            <style jsx global>{`
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </div>
    );
}
