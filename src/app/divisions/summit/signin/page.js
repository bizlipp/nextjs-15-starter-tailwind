'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '../../../../context/AuthContext';
import { signIn } from '../../../../lib/auth';

export default function SignIn() {
    const router = useRouter();
    const { user } = useAuth();
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            router.push('/divisions/summit/learninghub');
        }
    }, [user, router]);

    // Wisdom quotes about education and learning
    const wisdomQuotes = [
        'The journey of a thousand miles begins with a single step.',
        'Learning is a treasure that will follow its owner everywhere.',
        'The mind is not a vessel to be filled, but a fire to be kindled.',
        'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
        'The beautiful thing about learning is that nobody can take it away from you.'
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signIn(email, password);
            // The auth context will handle the user state and redirect
        } catch (err) {
            console.error('Sign-in error:', err);
            setError(err.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
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
                <div className='w-full max-w-md px-4'>
                    <div className='overflow-hidden rounded-lg border border-[#FFD700]/30 bg-[#133A1B]/80 shadow-xl backdrop-blur-sm'>
                        {/* Header */}
                        <div className='border-b border-[#FFD700]/30 bg-gradient-to-r from-[#228B22]/90 to-[#133A1B]/90 p-6 text-center'>
                            <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>SIGN IN</h1>
                            <p className='text-lg text-white/80'>Access Your Learning Journey</p>
                        </div>

                        <div className='p-6'>
                            {/* Error Display */}
                            {error && (
                                <div className='mb-4 rounded-md border border-red-400/30 bg-red-400/10 p-3 text-red-300'>
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <label htmlFor='email' className='mb-1 block text-sm font-medium text-white/90'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full rounded-md border border-[#FFD700]/20 bg-[#0a0a0a]/60 px-4 py-2 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                        placeholder='Enter your email'
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor='password' className='mb-1 block text-sm font-medium text-white/90'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full rounded-md border border-[#FFD700]/20 bg-[#0a0a0a]/60 px-4 py-2 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                        placeholder='Enter your password'
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <input
                                            type='checkbox'
                                            id='remember'
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className='h-4 w-4 rounded border-gray-300 text-[#228B22] focus:ring-[#FFD700]'
                                            disabled={loading}
                                        />
                                        <label htmlFor='remember' className='ml-2 block text-sm text-white/80'>
                                            Remember me
                                        </label>
                                    </div>

                                    <div className='text-sm'>
                                        <a href='#' className='font-medium text-[#FFD700] hover:text-[#FFD700]/80'>
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='flex w-full items-center justify-center gap-2 rounded-md bg-[#228B22] px-4 py-3 font-medium text-white transition-colors hover:bg-[#2E8B57] disabled:opacity-70'>
                                        {loading ? (
                                            <>
                                                <svg
                                                    className='mr-2 h-5 w-5 animate-spin'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'>
                                                    <circle
                                                        className='opacity-25'
                                                        cx='12'
                                                        cy='12'
                                                        r='10'
                                                        stroke='currentColor'
                                                        strokeWidth='4'></circle>
                                                    <path
                                                        className='opacity-75'
                                                        fill='currentColor'
                                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                                    <path
                                                        d='M12 15L17 10M17 10H7M17 10V20'
                                                        stroke='currentColor'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className='mt-4 text-center'>
                                    <p className='text-sm text-white/70'>
                                        Don't have an account?{' '}
                                        <a href='/divisions/summit/signup' className='text-[#FFD700] hover:underline'>
                                            Sign up
                                        </a>
                                    </p>
                                </div>
                            </form>

                            {/* Return Button */}
                            <div className='mt-8 text-center'>
                                <button
                                    onClick={() => router.push('/divisions/summit')}
                                    className='inline-flex items-center justify-center rounded border border-[#FFD700]/20 bg-[#133A1B] px-4 py-2 text-white transition-colors hover:bg-[#0F2D15]'>
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
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='border-t border-[#FFD700]/20 p-4 text-center'>
                            <p className='text-sm text-white/60'>Secure Access • Summit Learning • AeroVista LLC</p>
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
