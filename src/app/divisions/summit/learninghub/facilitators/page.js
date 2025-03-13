'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export default function Facilitators() {
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Single facilitator
    const facilitator = {
        name: 'Cindy Santi',
        role: 'Lead Instructor',
        expertise: 'Mindfulness & Personal Growth',
        bio: 'With over 25 years of experience in transformative education, Cindy specializes in connecting ancient wisdom traditions with modern learning modalities.'
    };

    // Wisdom quotes about teaching and mentorship
    const wisdomQuotes = [
        'The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.',
        'Education is not the filling of a pail, but the lighting of a fire.',
        'In learning you will teach, and in teaching you will learn.',
        "The best teachers are those who show you where to look but don't tell you what to see.",
        'Teaching is the highest form of understanding.'
    ];

    // Handle sunrise animation on load
    useEffect(() => {
        // Select a random wisdom quote
        const randomQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
        setCurrentQuote(randomQuote);

        // Start sunrise animation
        const sunrise = setInterval(() => {
            setSunriseProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(sunrise);
                    setTimeout(() => setShowQuote(true), 1000);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(sunrise);
    }, []);

    return (
        <div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-[#133A1B] via-[#1E5631] to-[#133A1B] text-white'>
            {/* Mountain Landscape Background */}
            <div className='absolute inset-0 z-0 overflow-hidden'>
                {/* Sky gradient that changes with sunrise */}
                <div
                    className='absolute inset-0 transition-colors duration-1000'
                    style={{
                        background: `linear-gradient(to bottom,
              ${
                  sunriseProgress < 30
                      ? 'rgb(25, 33, 41)'
                      : sunriseProgress < 60
                        ? 'rgb(142, 87, 26)'
                        : 'rgb(115, 141, 174)'
              }
              0%,
              rgba(30, 86, 49, 0.8) 100%)`
                    }}></div>

                {/* Sun rising effect */}
                <div
                    ref={sunRef}
                    className='absolute rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]'
                    style={{
                        width: '120px',
                        height: '120px',
                        left: '50%',
                        top: `${100 - sunriseProgress}%`,
                        transform: 'translateX(-50%)',
                        boxShadow: `0 0 ${sunriseProgress / 2}px ${sunriseProgress / 3}px rgba(255, 215, 0, 0.7)`,
                        opacity: sunriseProgress / 100
                    }}></div>

                {/* Mountain range silhouette */}
                <div ref={mountainRef} className='absolute bottom-0 w-full'>
                    {/* Far mountains */}
                    <svg viewBox='0 0 1440 320' className='absolute bottom-0 w-full' preserveAspectRatio='none'>
                        <path
                            fill='#228B22'
                            fillOpacity='0.6'
                            d='M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,245.3C672,256,768,224,864,208C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
                    </svg>

                    {/* Mid mountains */}
                    <svg viewBox='0 0 1440 320' className='absolute bottom-0 w-full' preserveAspectRatio='none'>
                        <path
                            fill='#1E5631'
                            fillOpacity='0.7'
                            d='M0,320L48,293.3C96,267,192,213,288,197.3C384,181,480,203,576,229.3C672,256,768,288,864,277.3C960,267,1056,213,1152,192C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
                    </svg>

                    {/* Near mountains */}
                    <svg viewBox='0 0 1440 320' className='absolute bottom-0 w-full' preserveAspectRatio='none'>
                        <path
                            fill='#133A1B'
                            fillOpacity='0.9'
                            d='M0,320L48,304C96,288,192,256,288,234.7C384,213,480,203,576,208C672,213,768,235,864,250.7C960,267,1056,277,1152,261.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
                    </svg>
                </div>
            </div>

            {/* Wisdom Quote Overlay */}
            {showQuote && (
                <div className='absolute top-32 right-0 left-0 z-10 text-center'>
                    <div className='animate-fadeIn inline-block rounded-lg border border-[#FFD700]/20 bg-black/30 px-8 py-4 backdrop-blur-sm'>
                        <p className='font-serif text-xl text-[#FFD700]'>{currentQuote}</p>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className='relative z-10 flex min-h-screen items-center justify-center py-16'>
                <div className='w-full max-w-4xl px-4'>
                    <div className='overflow-hidden rounded-lg border border-[#FFD700]/30 bg-[#133A1B]/80 shadow-xl backdrop-blur-sm'>
                        {/* Header */}
                        <div className='border-b border-[#FFD700]/30 bg-gradient-to-r from-[#228B22]/90 to-[#133A1B]/90 p-6 text-center'>
                            <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>OUR FACILITATOR</h1>
                            <p className='text-lg text-white/80'>Your Guide on the Educational Journey</p>
                        </div>

                        <div className='p-6'>
                            <div className='mb-6 text-center'>
                                <p className='mb-6 text-white/90'>
                                    Meet our lead instructor who will guide your learning experience at Summit. With
                                    unique expertise and a passion for transformative education, our facilitator is
                                    dedicated to helping you achieve your educational goals.
                                </p>
                            </div>

                            {/* Single Facilitator Card - Centered */}
                            <div className='flex justify-center'>
                                <div className='max-w-2xl rounded-lg border border-[#FFD700]/20 bg-[#228B22]/10 p-5 transition-all hover:border-[#FFD700]/30 hover:bg-[#228B22]/20'>
                                    <div className='flex items-start space-x-4'>
                                        <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#228B22] to-[#FFD700]/30'>
                                            <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
                                                <path
                                                    d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
                                                    stroke='white'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M5 19.5C5 15.9101 8.13401 13 12 13C15.866 13 19 15.9101 19 19.5V21H5V19.5Z'
                                                    stroke='white'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='text-2xl font-bold text-[#FFD700]'>{facilitator.name}</h3>
                                            <p className='text-lg text-white/90'>{facilitator.role}</p>
                                            <p className='mb-2 text-white/70'>{facilitator.expertise}</p>
                                            <p className='text-white/80'>{facilitator.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className='mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
                                <Link href='/divisions/summit/learninghub'>
                                    <button className='flex w-full items-center justify-center rounded bg-[#228B22] px-4 py-2 text-white transition-colors hover:bg-[#2E8B57]'>
                                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' className='mr-2'>
                                            <path
                                                d='M3 12H21M12 3V21'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        Return to Learning Hub
                                    </button>
                                </Link>
                                <Link href='/divisions/summit'>
                                    <button className='flex w-full items-center justify-center rounded border border-[#FFD700]/20 bg-[#133A1B] px-4 py-2 text-white transition-colors hover:bg-[#0F2D15]'>
                                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' className='mr-2'>
                                            <path
                                                d='M19 12H5M5 12L12 19M5 12L12 5'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        Return to Summit Reception
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='border-t border-[#FFD700]/20 p-4 text-center'>
                            <p className='text-sm text-white/60'>
                                Mentorship & Guidance • Summit Learning • AeroVista LLC
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
