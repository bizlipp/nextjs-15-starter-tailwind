'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../../context/AuthContext';
import { signUp } from '../../../../lib/auth';

export default function SignUp() {
    const router = useRouter();
    const { user } = useAuth();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            router.push('/divisions/summit/learninghub');
        }
    }, [user, router]);

    // Wisdom quotes about beginnings and learning
    const wisdomQuotes = [
        "Every new beginning comes from some other beginning's end.",
        'The beginning is the most important part of the work.',
        'Education is not preparation for life; education is life itself.',
        'The future belongs to those who believe in the beauty of their dreams.',
        'The journey of a lifetime starts with the turning of a page.'
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

        // Form validation
        if (!email || !password || !confirmPassword || !selectedCourse) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create user account
            await signUp(email, password);

            // Store course selection (in a real app, this would save to a database)
            // For now, we'll just set submitted to true
            setSubmitted(true);
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'An error occurred during sign up. Please try again.');
            setSubmitted(false);
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
                            <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>CREATE ACCOUNT</h1>
                            <p className='text-lg text-white/80'>Begin Your Learning Journey</p>
                        </div>

                        <div className='p-6'>
                            {/* Error Display */}
                            {error && (
                                <div className='mb-4 rounded-md border border-red-400/30 bg-red-400/10 p-3 text-red-300'>
                                    <p>{error}</p>
                                </div>
                            )}

                            {!submitted ? (
                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    {/* User Account Information */}
                                    <div>
                                        <h3 className='mb-4 text-xl font-medium text-[#FFD700]'>Account Information</h3>

                                        <div className='space-y-4'>
                                            <div>
                                                <label
                                                    htmlFor='email'
                                                    className='mb-1 block text-sm font-medium text-white/90'>
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
                                                <label
                                                    htmlFor='password'
                                                    className='mb-1 block text-sm font-medium text-white/90'>
                                                    Password
                                                </label>
                                                <input
                                                    type='password'
                                                    id='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className='w-full rounded-md border border-[#FFD700]/20 bg-[#0a0a0a]/60 px-4 py-2 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                                    placeholder='Create a password'
                                                    required
                                                    disabled={loading}
                                                />
                                                <p className='mt-1 text-xs text-white/60'>
                                                    Password must be at least 6 characters
                                                </p>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor='confirmPassword'
                                                    className='mb-1 block text-sm font-medium text-white/90'>
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type='password'
                                                    id='confirmPassword'
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className='w-full rounded-md border border-[#FFD700]/20 bg-[#0a0a0a]/60 px-4 py-2 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                                    placeholder='Confirm your password'
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Selection */}
                                    <div>
                                        <h3 className='mb-4 text-xl font-medium text-[#FFD700]'>
                                            Select Your First Course
                                        </h3>

                                        <label className='mb-2 block text-sm font-medium text-white/90'>
                                            Choose a Course:
                                        </label>
                                        <select
                                            value={selectedCourse}
                                            onChange={(e) => setSelectedCourse(e.target.value)}
                                            className='w-full rounded-md border border-[#FFD700]/20 bg-[#0a0a0a]/60 p-3 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                            required
                                            disabled={loading}>
                                            <option value=''>-- Choose a Course --</option>
                                            <option value='Seasons of Change'>🌱 Seasons of Change</option>
                                            <option value="Spring's Awakening">🧘 Spring's Awakening</option>
                                            <option value="Summer's Radiance">🎨 Summer's Radiance</option>
                                            <option value="Autumn's Reflection">🍂 Autumn's Reflection</option>
                                            <option value="Winter's Wisdom">❄️ Winter's Wisdom</option>
                                        </select>
                                    </div>

                                    <div className='rounded-md border border-[#228B22]/30 bg-[#228B22]/10 p-4'>
                                        <h3 className='mb-2 font-medium text-[#FFD700]'>Course Benefits:</h3>
                                        <ul className='space-y-2 text-white/90'>
                                            <li className='flex items-center'>
                                                <svg
                                                    width='16'
                                                    height='16'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    className='mr-2 text-[#FFD700]'>
                                                    <path
                                                        d='M5 13L9 17L19 7'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                                Personalized learning path
                                            </li>
                                            <li className='flex items-center'>
                                                <svg
                                                    width='16'
                                                    height='16'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    className='mr-2 text-[#FFD700]'>
                                                    <path
                                                        d='M5 13L9 17L19 7'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                                Access to all course materials
                                            </li>
                                            <li className='flex items-center'>
                                                <svg
                                                    width='16'
                                                    height='16'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    className='mr-2 text-[#FFD700]'>
                                                    <path
                                                        d='M5 13L9 17L19 7'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                                One-on-one sessions with facilitators
                                            </li>
                                        </ul>
                                    </div>

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
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                                    <path
                                                        d='M12 10V20M8 16L12 20L16 16'
                                                        stroke='currentColor'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                    <path
                                                        d='M20 6H12H4'
                                                        stroke='currentColor'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                                Create Account & Enroll
                                            </>
                                        )}
                                    </button>

                                    <div className='text-center'>
                                        <p className='text-sm text-white/70'>
                                            Already have an account?{' '}
                                            <Link
                                                href='/divisions/summit/signin'
                                                className='text-[#FFD700] hover:underline'>
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            ) : (
                                <div className='space-y-4 text-center'>
                                    <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FFD700]/30 bg-[#228B22]/30'>
                                        <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
                                            <path
                                                d='M5 13L9 17L19 7'
                                                stroke='#FFD700'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </div>
                                    <h2 className='text-xl font-bold text-[#FFD700]'>Enrollment Confirmed!</h2>
                                    <p className='text-white/90'>
                                        You have successfully enrolled in{' '}
                                        <span className='font-medium text-white'>{selectedCourse}</span>.
                                    </p>
                                    <p className='text-sm text-white/70'>
                                        We will follow up with course details soon. Check your Learning Hub for updates.
                                    </p>

                                    <div className='pt-4'>
                                        <Link href='/divisions/summit/learninghub'>
                                            <button className='w-full rounded-md bg-[#228B22] px-4 py-3 text-white transition-colors hover:bg-[#2E8B57]'>
                                                Go to Learning Hub
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Links */}
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
                            <p className='text-sm text-white/60'>
                                Start Your Journey • Summit Learning • AeroVista LLC
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
