'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export default function CourseMaterials() {
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Sample course materials
    const materials = [
        {
            id: 1,
            title: 'Seasons of Change: Core Textbook',
            type: 'book',
            course: 'Seasons of Change',
            format: 'PDF',
            size: '12.4 MB',
            lastUpdated: '2023-09-15',
            description:
                'The primary textbook for the Seasons of Change course, covering foundational concepts and core teachings.'
        },
        {
            id: 2,
            title: 'Mindfulness Meditation Audio Series',
            type: 'audio',
            course: "Winter's Wisdom",
            format: 'MP3',
            size: '45.8 MB',
            lastUpdated: '2023-08-22',
            description:
                "A collection of guided meditations to enhance your mindfulness practice throughout the Winter's Wisdom journey."
        },
        {
            id: 3,
            title: 'Creative Expression Workbook',
            type: 'workbook',
            course: "Summer's Radiance",
            format: 'PDF',
            size: '8.7 MB',
            lastUpdated: '2023-10-01',
            description:
                'Interactive workbook with exercises designed to unlock your creative potential through reflection and practice.'
        },
        {
            id: 4,
            title: 'Leadership Principles: Video Lecture Series',
            type: 'video',
            course: "Spring's Awakening",
            format: 'MP4',
            size: '1.2 GB',
            lastUpdated: '2023-07-19',
            description:
                'A comprehensive video series exploring emotional intelligence and leadership principles with practical exercises.'
        },
        {
            id: 5,
            title: 'Nature Connection Field Journal',
            type: 'workbook',
            course: "Autumn's Reflection",
            format: 'PDF',
            size: '5.3 MB',
            lastUpdated: '2023-09-30',
            description:
                'Fieldwork journal for recording observations, insights, and experiences from your nature immersion practices.'
        },
        {
            id: 6,
            title: 'Holistic Health Assessment Tools',
            type: 'interactive',
            course: 'Holistic Wellness',
            format: 'Interactive PDF',
            size: '3.8 MB',
            lastUpdated: '2023-10-05',
            description: 'Self-assessment tools and tracking systems for monitoring your holistic wellness journey.'
        }
    ];

    // Wisdom quotes about learning and knowledge
    const wisdomQuotes = [
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        'The beautiful thing about learning is that nobody can take it away from you.',
        'Knowledge is of no value unless you put it into practice.',
        'The roots of education are bitter, but the fruit is sweet.',
        'Live as if you were to die tomorrow. Learn as if you were to live forever.'
    ];

    // Filter materials based on active category
    const filteredMaterials =
        activeCategory === 'all' ? materials : materials.filter((item) => item.type === activeCategory);

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

    // Icon mapping for material types
    const getIcon = (type) => {
        switch (type) {
            case 'book':
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M4 19.5V4.5C4 3.95 4.196 3.45 4.588 3.05C4.98 2.65 5.467 2.45 6 2.45H18C18.55 2.45 19.021 2.65 19.413 3.05C19.805 3.45 20.001 3.95 20.001 4.5V19.5C20.001 20.05 19.805 20.5 19.413 20.9C19.021 21.3 18.55 21.5 18 21.5H6C5.467 21.5 4.98 21.3 4.588 20.9C4.196 20.5 4 20.05 4 19.5Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                        />
                        <path
                            d='M9 7H15M9 11H15M9 15H13'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                        />
                    </svg>
                );
            case 'audio':
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M12 18V12M12 12V6M12 12H18M12 12H6'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                        />
                    </svg>
                );
            case 'video':
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M4 5.5C4 4.94772 4.44772 4.5 5 4.5H15C15.5523 4.5 16 4.94772 16 5.5V18.5C16 19.0523 15.5523 19.5 15 19.5H5C4.44772 19.5 4 19.0523 4 18.5V5.5Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                        />
                        <path
                            d='M16 8L20 5V19L16 16'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                );
            case 'workbook':
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M8 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H8M8 4V20M8 4H16M8 20H16M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H16M16 4V20'
                            stroke='currentColor'
                            strokeWidth='1.5'
                        />
                        <path d='M12 8V16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                    </svg>
                );
            case 'interactive':
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                        />
                    </svg>
                );
            default:
                return (
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M8 6H16M8 10H16M8 14H12M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                        />
                    </svg>
                );
        }
    };

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
                            <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>COURSE MATERIALS</h1>
                            <p className='text-lg text-white/80'>Resources for Your Learning Journey</p>
                        </div>

                        <div className='p-6'>
                            <div className='mb-6 text-center'>
                                <p className='mb-6 text-white/90'>
                                    Access all your learning resources in one place. Download materials, explore
                                    interactive content, and enhance your educational experience with our carefully
                                    crafted learning tools.
                                </p>
                            </div>

                            {/* Filter Categories */}
                            <div className='mb-6 flex flex-wrap justify-center gap-2'>
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'all'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    All Materials
                                </button>
                                <button
                                    onClick={() => setActiveCategory('book')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'book'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    Books
                                </button>
                                <button
                                    onClick={() => setActiveCategory('workbook')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'workbook'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    Workbooks
                                </button>
                                <button
                                    onClick={() => setActiveCategory('audio')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'audio'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    Audio
                                </button>
                                <button
                                    onClick={() => setActiveCategory('video')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'video'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    Videos
                                </button>
                                <button
                                    onClick={() => setActiveCategory('interactive')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeCategory === 'interactive'
                                            ? 'bg-[#228B22] text-white'
                                            : 'bg-[#228B22]/20 text-white/80 hover:bg-[#228B22]/40'
                                    }`}>
                                    Interactive
                                </button>
                            </div>

                            {/* Materials List */}
                            <div className='space-y-4'>
                                {filteredMaterials.map((material) => (
                                    <div
                                        key={material.id}
                                        className='rounded-lg border border-[#FFD700]/20 bg-[#228B22]/10 p-4 transition-colors hover:bg-[#228B22]/20'>
                                        <div className='flex flex-col justify-between sm:flex-row sm:items-center'>
                                            <div className='flex items-start gap-3'>
                                                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#228B22]/30'>
                                                    {getIcon(material.type)}
                                                </div>
                                                <div>
                                                    <h3 className='font-bold text-[#FFD700]'>{material.title}</h3>
                                                    <p className='text-sm text-white/80'>{material.description}</p>
                                                    <div className='mt-2 flex flex-wrap gap-2'>
                                                        <span className='rounded bg-[#228B22]/20 px-2 py-0.5 text-xs text-white/90'>
                                                            {material.course}
                                                        </span>
                                                        <span className='rounded bg-[#228B22]/20 px-2 py-0.5 text-xs text-white/90'>
                                                            {material.format}
                                                        </span>
                                                        <span className='rounded bg-[#228B22]/20 px-2 py-0.5 text-xs text-white/90'>
                                                            {material.size}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-3 flex gap-2 sm:mt-0'>
                                                <button className='rounded bg-[#228B22]/40 px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#228B22]/60'>
                                                    <span className='flex items-center'>
                                                        <svg
                                                            width='16'
                                                            height='16'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            className='mr-1'>
                                                            <path
                                                                d='M12 4V16M12 16L7 11M12 16L17 11'
                                                                stroke='currentColor'
                                                                strokeWidth='1.5'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                            <path
                                                                d='M20 21H4'
                                                                stroke='currentColor'
                                                                strokeWidth='1.5'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                        </svg>
                                                        Download
                                                    </span>
                                                </button>
                                                <button className='rounded bg-[#133A1B] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#0F2D15]'>
                                                    Preview
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Links */}
                            <div className='mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
                                <Link href='/divisions/summit/learninghub'>
                                    <button className='flex w-full items-center justify-center rounded bg-[#228B22] px-4 py-2 text-white transition-colors hover:bg-[#2E8B57]'>
                                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' className='mr-2'>
                                            <path
                                                d='M19 12H5M5 12L12 19M5 12L12 5'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        Return to Learning Hub
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='border-t border-[#FFD700]/20 p-4 text-center'>
                            <p className='text-sm text-white/60'>
                                Resources & Materials • Summit Learning • AeroVista LLC
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
