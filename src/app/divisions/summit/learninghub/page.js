'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../../context/AuthContext';
import { signOut } from '../../../../lib/auth';

export default function LearningHub() {
    const router = useRouter();
    const { user } = useAuth();
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Check if user is authenticated
    useEffect(() => {
        if (!user) {
            router.push('/divisions/summit/signin');
        }
    }, [user, router]);

    // Wisdom quotes that appear during sunrise
    const wisdomQuotes = [
        'The true purpose of education is to make minds, not careers.',
        'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
        'Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.',
        'The beautiful thing about learning is nobody can take it away from you.',
        'Education is not preparation for life; education is life itself.'
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

    // Handle logout
    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await signOut();
            // The auth context will handle the user state and redirect
            router.push('/divisions/summit');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoggingOut(false);
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
            <div className='relative z-10 flex min-h-screen items-center justify-center'>
                <div className='w-full max-w-4xl px-4'>
                    <div className='overflow-hidden rounded-lg border border-[#FFD700]/30 bg-[#133A1B]/80 shadow-xl backdrop-blur-sm'>
                        {/* Header */}
                        <div className='border-b border-[#FFD700]/30 bg-gradient-to-r from-[#228B22]/90 to-[#133A1B]/90 p-6 text-center'>
                            <div className='flex items-center justify-between'>
                                <div className='flex-1'>{/* Spacer div for alignment */}</div>
                                <div className='flex-1 text-center'>
                                    <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>LEARNING HUB</h1>
                                    <p className='text-lg text-white/80'>
                                        Access Your Courses • Connect with Facilitators • Explore Resources
                                    </p>
                                </div>
                                <div className='flex flex-1 justify-end'>
                                    <button
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className='rounded-md border border-[#FFD700]/20 bg-[#133A1B] px-4 py-2 text-white transition-colors hover:bg-[#0F2D15] disabled:opacity-50'>
                                        {loggingOut ? 'Logging out...' : 'Log Out'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='p-6'>
                            <div className='mb-6 text-center'>
                                <p className='mb-6 text-white/90'>
                                    Welcome to your personal Learning Hub. Here you can access all your courses, connect
                                    with facilitators, and explore learning materials tailored to your journey.
                                </p>
                            </div>

                            {/* Learning Hub Navigation */}
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <Link href='/divisions/summit/learninghub/courses'>
                                    <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22] px-6 py-4 text-white transition-all hover:bg-[#2E8B57]'>
                                        <span className='flex items-center'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                className='mr-3'>
                                                <path
                                                    d='M12 14L5 9L12 4L19 9L12 14Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M5 14L12 19L19 14'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            My Courses
                                        </span>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M12 4L20 12L12 20M4 12H20'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </Link>

                                <Link href='/divisions/summit/learninghub/facilitators'>
                                    <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22]/90 px-6 py-4 text-white transition-all hover:bg-[#228B22]'>
                                        <span className='flex items-center'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                className='mr-3'>
                                                <path
                                                    d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M5 19.5C5 15.9101 8.13401 13 12 13C15.866 13 19 15.9101 19 19.5V21H5V19.5Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            Meet Your Facilitators
                                        </span>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M12 4L20 12L12 20M4 12H20'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </Link>

                                <Link href='/divisions/summit/learninghub/coursematerials'>
                                    <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22]/80 px-6 py-4 text-white transition-all hover:bg-[#228B22]'>
                                        <span className='flex items-center'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                className='mr-3'>
                                                <path
                                                    d='M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M7 7H17'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M7 12H17'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M7 17H13'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            Course Materials
                                        </span>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M12 4L20 12L12 20M4 12H20'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </Link>

                                <Link href='/divisions/summit/learninghub/interactive'>
                                    <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22]/70 px-6 py-4 text-white transition-all hover:bg-[#228B22]'>
                                        <span className='flex items-center'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                className='mr-3'>
                                                <path
                                                    d='M21 7L13 15L9 11L3 17'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M21 12V7H16'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            Interactive Learning
                                        </span>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M12 4L20 12L12 20M4 12H20'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </Link>

                                <Link href='/divisions/summit/learninghub/self-assessment' className='md:col-span-2'>
                                    <button className='flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-[#228B22]/90 to-[#FFD700]/40 px-6 py-4 text-white transition-all hover:from-[#228B22] hover:to-[#FFD700]/60'>
                                        <span className='flex items-center'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                className='mr-3'>
                                                <path
                                                    d='M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                />
                                                <path
                                                    d='M12 12H15M12 16H15M9 12H9.01M9 16H9.01'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                />
                                                <path
                                                    d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                />
                                            </svg>
                                            Personal Growth Assessment
                                        </span>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M12 4L20 12L12 20M4 12H20'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </Link>
                            </div>

                            {/* Back to Summit Link */}
                            <div className='mt-8 text-center'>
                                <Link href='/divisions/summit'>
                                    <button className='inline-flex items-center justify-center rounded border border-[#FFD700]/20 bg-[#133A1B] px-4 py-2 text-white transition-colors hover:bg-[#0F2D15]'>
                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='mr-2'>
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
                            <p className='text-sm text-white/60'>Knowledge Awaits • Summit Learning • AeroVista LLC</p>
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
