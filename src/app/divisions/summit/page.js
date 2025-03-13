'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../context/AuthContext';

export default function SummitReception() {
    const router = useRouter();
    const { user } = useAuth();
    const [assistantMessage, setAssistantMessage] = useState(
        'Welcome to Summit Learning. How can I assist you on your educational journey today?'
    );
    const [showAssistant, setShowAssistant] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');
    const [sunriseProgress, setSunriseProgress] = useState(0);
    const [showQuote, setShowQuote] = useState(false);

    // References for animations
    const mountainRef = useRef(null);
    const sunRef = useRef(null);

    // Wisdom quotes that appear during sunrise
    const wisdomQuotes = [
        'The summit is what drives us, but the climb itself is what matters.',
        'Education is not the filling of a pail, but the lighting of a fire.',
        'The mind is not a vessel to be filled, but a fire to be kindled.',
        'Knowledge speaks, but wisdom listens.',
        'The best view comes after the hardest climb.'
    ];

    // Random quote selection
    const [currentQuote, setCurrentQuote] = useState('');

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

    // Assistant response handler
    const handleAssistantResponse = (message) => {
        setAssistantMessage(message);
        setShowAssistant(true);
    };

    // Question submission handler
    const handleQuestionSubmit = () => {
        if (userQuestion.trim() === '') return;

        // Enhanced responses with educational focus
        const responses = {
            'how do i enroll':
                "To enroll in our courses, click the 'Sign Up' button. We offer a variety of learning paths tailored to your educational goals.",
            'where are my courses':
                'Once signed in, you can access your personalized learning journey through the Learning Hub. Your progress is saved automatically.',
            'who teaches the classes':
                'Our facilitators are experts in their fields with a passion for transformative education. Meet them in the Learning Hub after signing in.',
            'what courses do you offer':
                'We offer courses in sustainable development, holistic wellness, creative expression, digital literacy, and philosophical inquiry. Each pathway is designed for immersive learning.',
            'how does ar learning work':
                'Our Augmented Reality classrooms blend digital content with your physical space, creating an immersive learning environment. Try a demo in the Learning Hub.'
        };

        // Find the best matching response
        let bestResponse =
            "I'm not sure, but I believe you'll find deeper insights inside the Learning Hub. Would you like me to guide you there?";

        Object.entries(responses).forEach(([key, value]) => {
            if (userQuestion.toLowerCase().includes(key)) {
                bestResponse = value;
            }
        });

        setAssistantMessage(bestResponse);
        setUserQuestion('');
    };

    // Direct to sign in page
    const navigateToSignIn = () => {
        router.push('/divisions/summit/signin');
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
                            <h1 className='mb-2 text-3xl font-bold text-[#FFD700]'>SUMMIT LEARNING</h1>
                            <p className='text-lg text-white/80'>
                                Elevate Your Knowledge • Transform Your Understanding
                            </p>
                        </div>

                        <div className='p-6'>
                            <div className='mb-6 text-center'>
                                <p className='mb-6 text-white/90'>
                                    Welcome to the Summit Learning retreat, where knowledge meets nature. Our immersive
                                    educational experiences connect mind, body, and environment.
                                </p>
                            </div>

                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                {/* Left Side - Self Assessment (replacing AR Classroom) */}
                                <div className='flex flex-col items-center justify-center rounded-lg border border-[#FFD700]/20 bg-[#228B22]/10 p-6'>
                                    <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#FFD700]/30 bg-[#228B22]/20'>
                                        <svg
                                            width='32'
                                            height='32'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='text-[#FFD700]'>
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
                                    </div>
                                    <h3 className='mb-2 text-xl text-[#FFD700]'>Personal Growth Assessment</h3>
                                    <p className='mb-4 text-center text-white/80'>
                                        Discover your learning path and strengths with our personalized assessment tools
                                    </p>
                                    <Link href='/divisions/summit/learninghub/self-assessment'>
                                        <button className='rounded bg-[#228B22] px-4 py-2 text-white transition-colors hover:bg-[#2E8B57]'>
                                            Begin Assessment
                                        </button>
                                    </Link>
                                </div>

                                {/* Right Side - Navigation */}
                                <div className='flex flex-col space-y-4'>
                                    {!user ? (
                                        <button
                                            onClick={navigateToSignIn}
                                            className='flex items-center justify-between rounded-lg bg-[#228B22] px-6 py-3 text-white transition-all hover:bg-[#2E8B57]'>
                                            <span>Sign In</span>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M12 4L20 12L12 20M4 12H20'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <Link href='/divisions/summit/learninghub'>
                                            <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22] px-6 py-3 text-white transition-all hover:bg-[#2E8B57]'>
                                                <span>Enter Learning Hub</span>
                                                <svg
                                                    width='20'
                                                    height='20'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'>
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
                                    )}

                                    <Link href='/divisions/summit/signup'>
                                        <button className='flex w-full items-center justify-between rounded-lg bg-[#228B22]/80 px-6 py-3 text-white transition-all hover:bg-[#228B22]'>
                                            <span>Sign Up for Courses</span>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'>
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

                                    <button
                                        onClick={() =>
                                            handleAssistantResponse(
                                                'How can I assist with your learning journey today?'
                                            )
                                        }
                                        className='flex w-full items-center justify-between rounded-lg bg-[#228B22]/60 px-6 py-3 text-white transition-all hover:bg-[#228B22]/80'>
                                        <span>Speak to a Guide</span>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M8 10V11C8 12.8856 8 13.8284 8.58579 14.4142C9.17157 15 10.1144 15 12 15C13.8856 15 14.8284 15 15.4142 14.4142C16 13.8284 16 12.8856 16 11V10'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M12 15V17'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M15 18H9'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M12 7C10.8954 7 10 7.89543 10 9V10H14V9C14 7.89543 13.1046 7 12 7Z'
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

                        {/* Footer */}
                        <div className='border-t border-[#FFD700]/20 p-4 text-center'>
                            <p className='text-sm text-white/60'>Established 2046 • AeroVista LLC</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Assistant Popup */}
            {showAssistant && (
                <div className='fixed right-8 bottom-8 z-20 w-full max-w-md rounded-lg border border-[#FFD700]/30 bg-[#133A1B]/90 shadow-xl'>
                    <div className='flex items-center justify-between border-b border-[#FFD700]/20 p-4'>
                        <div className='flex items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#228B22] to-[#FFD700]/70'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm text-[#FFD700]'>Mountain Guide</h3>
                                <div className='text-xs text-white/60'>Learning Assistant</div>
                            </div>
                        </div>
                        <button onClick={() => setShowAssistant(false)} className='text-white/60 hover:text-white'>
                            <svg
                                width='18'
                                height='18'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='M18 6L6 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                                <path d='M6 6L18 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                            </svg>
                        </button>
                    </div>

                    <div className='p-4'>
                        <div className='mb-4 rounded-lg border border-[#FFD700]/10 bg-[#228B22]/20 p-3'>
                            <p className='text-white/90'>{assistantMessage}</p>
                        </div>

                        <div className='flex'>
                            <input
                                type='text'
                                className='flex-grow rounded-l border border-[#228B22]/30 bg-black/20 px-4 py-2 text-white focus:border-[#FFD700]/50 focus:outline-none'
                                placeholder='Ask about our courses...'
                                value={userQuestion}
                                onChange={(e) => setUserQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                            />
                            <button
                                onClick={handleQuestionSubmit}
                                className='rounded-r bg-[#228B22] px-4 py-2 text-white transition-colors hover:bg-[#2E8B57]'>
                                <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M22 2L11 13'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M22 2L15 22L11 13L2 9L22 2Z'
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
            )}

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
