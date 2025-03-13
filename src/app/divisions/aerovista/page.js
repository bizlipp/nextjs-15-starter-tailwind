'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

export default function AeroVistaMainPage() {
    const [activeTab, setActiveTab] = useState('welcome');
    const [typingMessage, setTypingMessage] = useState('');
    const [completedTyping, setCompletedTyping] = useState(false);
    const [visitorCount, setVisitorCount] = useState(Math.floor(Math.random() * 50) + 30);
    const [showNotification, setShowNotification] = useState(false);
    const [messageSubmitted, setMessageSubmitted] = useState(false);

    // Simulated typing effect for welcome message
    useEffect(() => {
        const welcomeMessage = '--Welcome to the AeroVista Complex main reception. How may I assist you today?';
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < welcomeMessage.length) {
                setTypingMessage((prev) => prev + welcomeMessage.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
                setCompletedTyping(true);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowNotification(true);
        setMessageSubmitted(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className='min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white'>
            {/* Digital noise and scanlines are now in the main layout */}

            {/* Reception Header Info */}
            <header className='mt-10 bg-black/40 pt-3 pb-2 backdrop-blur-sm md:mt-16 md:pt-4 md:pb-3'>
                <div className='container mx-auto flex flex-col items-center justify-between px-4 py-2 sm:flex-row'>
                    <h1 className="font-['Orbitron'] text-xl tracking-widest text-[#00AEEF] md:text-2xl">
                        RECEPTION <span className='text-xs opacity-60 md:text-sm'>GROUND FLOOR</span>
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 sm:mt-0'>
                        <div className='text-right'>
                            <div className="font-['Montserrat'] text-xs text-[#C0C0C0] md:text-sm">
                                Current Visitors
                            </div>
                            <div className="font-['Orbitron'] text-lg text-[#00AEEF] md:text-xl">{visitorCount}</div>
                        </div>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#00AEEF] to-[#004366] md:h-10 md:w-10'>
                            <span className='animate-pulse text-sm md:text-base'>AI</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main reception area */}
            <main className='container mx-auto px-4 py-4 md:py-8'>
                <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3'>
                    {/* Left sidebar - Building Information */}
                    <div className='lg:col-span-1'>
                        <div className='rounded-lg border border-[#00AEEF]/20 bg-gray-900/70 p-4 shadow-[0_0_15px_rgba(0,174,239,0.2)] backdrop-blur-sm md:p-6'>
                            <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                COMPLEX OVERVIEW
                            </h2>

                            <div className='space-y-4 md:space-y-6'>
                                {/* Quick Building Info */}
                                <div>
                                    <h3 className="mb-2 font-['Orbitron'] text-xs text-[#00AEEF] md:text-sm">
                                        ABOUT AEROVISTA
                                    </h3>
                                    <p className='mb-2 text-xs text-[#C0C0C0] md:text-sm'>
                                        AeroVista LLC is a multimedia and technology production company housing seven
                                        specialized divisions with a cyber aesthetic.
                                    </p>
                                    <div className='mt-3 flex justify-between rounded-sm bg-black/30 p-2 text-xs md:mt-4 md:text-sm'>
                                        <span className='text-gray-400'>Founded:</span>
                                        <span className='text-[#00AEEF]'>2023</span>
                                    </div>
                                    <div className='mt-1 flex justify-between rounded-sm bg-black/30 p-2 text-xs md:mt-2 md:text-sm'>
                                        <span className='text-gray-400'>Floors:</span>
                                        <span className='text-[#00AEEF]'>8</span>
                                    </div>
                                    <div className='mt-1 flex justify-between rounded-sm bg-black/30 p-2 text-xs md:mt-2 md:text-sm'>
                                        <span className='text-gray-400'>Divisions:</span>
                                        <span className='text-[#00AEEF]'>7</span>
                                    </div>
                                </div>

                                {/* Use Navigation Component Prompt */}
                                <div className='mt-4 border-t border-gray-800 pt-4 md:mt-6 md:pt-6'>
                                    <h3 className="mb-2 font-['Orbitron'] text-xs text-[#00AEEF] md:text-sm">
                                        QUICK ACCESS
                                    </h3>
                                    <p className='mb-3 text-xs text-gray-400 md:text-sm'>
                                        Use the <span className='text-[#00AEEF]'>Divisions</span> dropdown in the
                                        navigation bar to quickly access any part of the AeroVista Complex.
                                    </p>
                                    <div className='mt-3 flex justify-center'>
                                        <svg
                                            className='h-5 w-5 animate-bounce text-[#00AEEF] md:h-6 md:w-6'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M5 15l7-7 7 7'
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Facilities */}
                                <div className='mt-4 border-t border-gray-800 pt-4 md:mt-6 md:pt-6'>
                                    <h3 className="mb-2 font-['Orbitron'] text-xs text-[#00AEEF] md:text-sm">
                                        FACILITIES
                                    </h3>
                                    <ul className='space-y-2 text-xs text-gray-300 md:text-sm'>
                                        <li className='flex items-center'>
                                            <span className='mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-xs md:h-5 md:w-5'>
                                                C
                                            </span>
                                            Cafeteria - Ground Floor
                                        </li>
                                        <li className='flex items-center'>
                                            <span className='mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-xs md:h-5 md:w-5'>
                                                P
                                            </span>
                                            Parking - Sublevel 1-3
                                        </li>
                                        <li className='flex items-center'>
                                            <span className='mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-xs md:h-5 md:w-5'>
                                                M
                                            </span>
                                            Meeting Pods - Every Floor
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content area - Reception */}
                    <div className='lg:col-span-2'>
                        {/* AI Receptionist */}
                        <div className='mb-6 rounded-lg border border-[#00AEEF]/30 bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-[0_0_25px_rgba(0,174,239,0.2)] md:mb-8 md:p-6'>
                            <div className='flex flex-col items-start sm:flex-row'>
                                <div className='mr-4 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#00AEEF] to-[#004366] shadow-[0_0_15px_rgba(0,174,239,0.4)] sm:mb-0 md:h-16 md:w-16'>
                                    <span className='text-xl md:text-2xl'>AI</span>
                                </div>
                                <div className='flex-1'>
                                    <h2 className="mb-2 font-['Orbitron'] text-lg text-[#00AEEF] md:text-xl">
                                        VIRTUAL RECEPTIONIST
                                    </h2>
                                    <div className='relative min-h-[100px] rounded border border-gray-800 bg-gray-950 p-3 md:p-4'>
                                        <p className="font-['Montserrat'] text-sm text-gray-300 md:text-base">
                                            {typingMessage}
                                            {!completedTyping && <span className='animate-blink'>|</span>}
                                        </p>

                                        {completedTyping && (
                                            <div className='mt-4 flex flex-wrap gap-2'>
                                                <button
                                                    onClick={() => setActiveTab('map')}
                                                    className='rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-3 py-1 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:px-4 md:py-2 md:text-sm'>
                                                    Building Map
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('services')}
                                                    className='rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-3 py-1 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:px-4 md:py-2 md:text-sm'>
                                                    Services
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('contact')}
                                                    className='rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-3 py-1 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:px-4 md:py-2 md:text-sm'>
                                                    Leave a Message
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('tour')}
                                                    className='rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-3 py-1 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:px-4 md:py-2 md:text-sm'>
                                                    Take a Tour
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive content area based on selected tab */}
                        <div className='rounded-lg border border-[#00AEEF]/20 bg-gray-900/70 p-4 shadow-[0_0_15px_rgba(0,174,239,0.2)] backdrop-blur-sm md:p-6'>
                            <div className='mb-4 overflow-x-auto border-b border-gray-800 pb-3 md:mb-6 md:pb-4'>
                                <div className='flex min-w-max space-x-1 md:space-x-4'>
                                    {['welcome', 'map', 'services', 'contact', 'tour'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`rounded-t px-2 py-1 font-['Montserrat'] text-xs capitalize md:px-4 md:py-2 md:text-sm ${
                                                activeTab === tab
                                                    ? 'border-b-2 border-[#00AEEF] bg-[#00AEEF]/20 text-[#00AEEF]'
                                                    : 'text-gray-400 hover:text-gray-200'
                                            }`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Welcome Tab */}
                            {activeTab === 'welcome' && (
                                <div>
                                    <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                        WELCOME TO AEROVISTA
                                    </h2>
                                    <div className="prose prose-invert max-w-none font-['Montserrat'] text-sm md:text-base">
                                        <p>
                                            AeroVista LLC is a multimedia and technology production company dedicated to
                                            pushing the boundaries of storytelling, gaming, music, immersive media, and
                                            education.
                                        </p>
                                        <p className='mt-3 md:mt-4'>
                                            Our seven specialized divisions work together to create high-impact digital
                                            experiences, educational programs, and interactive content that merge human
                                            creativity with cutting-edge technology.
                                        </p>
                                        <p className='mt-3 md:mt-4'>
                                            Please use the{' '}
                                            <span className='font-semibold text-[#00AEEF]'>Divisions</span> dropdown in
                                            the navigation bar to visit any of our departments, or select one of the
                                            options above to learn more about our services.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* The rest of the tabs remain unchanged */}
                            {/* Building Map Tab */}
                            {activeTab === 'map' && (
                                <div>
                                    <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                        INTERACTIVE BUILDING MAP
                                    </h2>
                                    <div className='relative flex h-64 items-center justify-center rounded-lg border border-gray-800 bg-black/60 md:h-96'>
                                        <div className='flex flex-col items-center'>
                                            <div className='relative h-48 w-48 md:h-64 md:w-64'>
                                                {/* Building visualization */}
                                                {[...Array(7)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className='absolute h-8 w-full rounded border border-[#00AEEF]/40 md:h-10'
                                                        style={{
                                                            bottom: `${i * 28}px`,
                                                            left: 0,
                                                            backgroundColor: `rgba(0, 174, 239, ${0.1 + i * 0.05})`,
                                                            width: `${100 - i * 5}%`,
                                                            marginLeft: `${i * 2.5}%`
                                                        }}>
                                                        <div className='absolute top-1/2 left-4 -translate-y-1/2 transform text-[10px] text-[#00AEEF] md:text-xs'>
                                                            Floor {7 - i}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Ground floor (reception) */}
                                                <div
                                                    className='absolute h-10 w-full animate-pulse rounded border-2 border-[#00AEEF] md:h-14'
                                                    style={{
                                                        bottom: `-32px`,
                                                        backgroundColor: 'rgba(0, 174, 239, 0.2)'
                                                    }}>
                                                    <div className='absolute top-1/2 left-4 -translate-y-1/2 transform text-xs font-bold text-[#00AEEF] md:text-sm'>
                                                        RECEPTION
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='mt-6 text-xs text-gray-400 md:mt-8 md:text-sm'>
                                                Interactive 3D Map Coming Soon
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Services Tab content updated for mobile */}
                            {activeTab === 'services' && (
                                <div>
                                    <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                        OUR SERVICES
                                    </h2>
                                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4'>
                                        {[
                                            {
                                                name: 'Game Development',
                                                icon: '🎮',
                                                color: '#6A0DAD',
                                                division: 'SkyForge Creative Studios'
                                            },
                                            {
                                                name: 'Content Creation',
                                                icon: '📱',
                                                color: '#FFD700',
                                                division: 'Lumina Creative Media'
                                            },
                                            {
                                                name: 'Web Development',
                                                icon: '💻',
                                                color: '#00FF7F',
                                                division: 'Nexus TechWorks'
                                            },
                                            {
                                                name: 'Drone Photography',
                                                icon: '📷',
                                                color: '#87CEEB',
                                                division: 'Horizon Aerial & Visual'
                                            },
                                            {
                                                name: 'Book Publishing',
                                                icon: '📚',
                                                color: '#DC143C',
                                                division: 'Vespera Publishing'
                                            },
                                            {
                                                name: 'Online Courses',
                                                icon: '🎓',
                                                color: '#228B22',
                                                division: 'Summit Learning'
                                            },
                                            {
                                                name: 'Audio Production',
                                                icon: '🎵',
                                                color: '#FF1493',
                                                division: 'EchoVerse Audio'
                                            },
                                            {
                                                name: 'AI Integration',
                                                icon: '🤖',
                                                color: '#00AEEF',
                                                division: 'All Divisions'
                                            }
                                        ].map((service, index) => (
                                            <div
                                                key={index}
                                                className='rounded-lg border border-gray-700 bg-gray-800/50 p-3 transition-all hover:border-[service.color] hover:bg-gray-800 md:p-4'
                                                style={{ borderLeftColor: service.color, borderLeftWidth: '4px' }}>
                                                <div className='flex items-start'>
                                                    <div className='mr-3 text-xl'>{service.icon}</div>
                                                    <div>
                                                        <h3 className="font-['Montserrat'] text-sm font-medium text-white md:text-base">
                                                            {service.name}
                                                        </h3>
                                                        <p className='text-[10px] text-gray-400 md:text-xs'>
                                                            {service.division}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-5 rounded-lg border border-[#00AEEF]/30 bg-[#00AEEF]/10 p-3 md:mt-6 md:p-4'>
                                        <p className='text-xs text-[#C0C0C0] md:text-sm'>
                                            Need more information about our services? Contact our divisions directly
                                            using the navigation dropdown or leave a message with our reception team.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Contact Tab content updated for mobile */}
                            {activeTab === 'contact' && (
                                <div>
                                    <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                        LEAVE A MESSAGE
                                    </h2>
                                    {messageSubmitted ? (
                                        <div className='rounded-lg border border-[#00AEEF]/40 bg-[#00AEEF]/10 p-4 text-center md:p-6'>
                                            <div className='mb-3 text-3xl md:mb-4 md:text-4xl'>✓</div>
                                            <h3 className="mb-2 font-['Montserrat'] text-base text-[#00AEEF] md:text-lg">
                                                Message Received
                                            </h3>
                                            <p className='text-sm text-[#C0C0C0] md:text-base'>
                                                Thank you for your message. Our team will get back to you shortly.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setMessageSubmitted(false);
                                                    setActiveTab('welcome');
                                                }}
                                                className='mt-4 rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-3 py-1.5 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:mt-6 md:px-4 md:py-2 md:text-sm'>
                                                Return to Reception
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className='space-y-3 md:space-y-4'>
                                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'>
                                                <div>
                                                    <label className='mb-1 block text-xs font-medium text-[#C0C0C0] md:text-sm'>
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        className='w-full rounded-md border border-gray-700 bg-gray-800/70 p-2 text-sm text-white focus:border-[#00AEEF] md:p-3 md:text-base'
                                                        placeholder='Enter your name'
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className='mb-1 block text-xs font-medium text-[#C0C0C0] md:text-sm'>
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type='email'
                                                        className='w-full rounded-md border border-gray-700 bg-gray-800/70 p-2 text-sm text-white focus:border-[#00AEEF] md:p-3 md:text-base'
                                                        placeholder='Enter your email'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className='mb-1 block text-xs font-medium text-[#C0C0C0] md:text-sm'>
                                                    Division
                                                </label>
                                                <select className='w-full rounded-md border border-gray-700 bg-gray-800/70 p-2 text-sm text-white focus:border-[#00AEEF] md:p-3 md:text-base'>
                                                    <option value=''>Select a division</option>
                                                    <option value='skyforge'>SkyForge Creative Studios</option>
                                                    <option value='lumina'>Lumina Creative Media</option>
                                                    <option value='nexus'>Nexus TechWorks</option>
                                                    <option value='horizon'>Horizon Aerial & Visual</option>
                                                    <option value='vespera'>Vespera Publishing</option>
                                                    <option value='summit'>Summit Learning</option>
                                                    <option value='echoverse'>EchoVerse Audio</option>
                                                    <option value='general'>General Inquiry</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className='mb-1 block text-xs font-medium text-[#C0C0C0] md:text-sm'>
                                                    Your Message
                                                </label>
                                                <textarea
                                                    className='min-h-[100px] w-full rounded-md border border-gray-700 bg-gray-800/70 p-2 text-sm text-white focus:border-[#00AEEF] md:min-h-[150px] md:p-3 md:text-base'
                                                    placeholder='How can we help you?'
                                                    required></textarea>
                                            </div>

                                            <button
                                                type='submit'
                                                className="w-full rounded-md bg-[#00AEEF] py-2 font-['Montserrat'] text-sm font-semibold text-black transition-all hover:bg-[#00AEEF]/80 md:py-3 md:text-base">
                                                Send Message
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* Tour Tab content updated for mobile */}
                            {activeTab === 'tour' && (
                                <div>
                                    <h2 className="mb-3 font-['Orbitron'] text-lg text-[#00AEEF] md:mb-4 md:text-xl">
                                        BUILDING TOUR
                                    </h2>
                                    <div className='mb-4 rounded-lg border border-gray-800 bg-black/40 p-4 md:mb-6 md:p-6'>
                                        <p className='mb-3 text-xs text-[#C0C0C0] md:mb-4 md:text-sm'>
                                            Schedule a guided tour of the AeroVista Complex and visit our seven
                                            divisions. Learn about our creative processes, technologies, and see our
                                            teams in action.
                                        </p>
                                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                            <div>
                                                <h3 className="mb-2 font-['Orbitron'] text-xs text-[#00AEEF] md:text-sm">
                                                    AVAILABLE TOURS
                                                </h3>
                                                <ul className='space-y-2 text-xs md:text-sm'>
                                                    <li className='flex items-center'>
                                                        <span className='mr-2 h-2 w-2 rounded-full bg-green-500 md:h-3 md:w-3'></span>
                                                        Full Complex Tour (3 hours)
                                                    </li>
                                                    <li className='flex items-center'>
                                                        <span className='mr-2 h-2 w-2 rounded-full bg-green-500 md:h-3 md:w-3'></span>
                                                        Tech Divisions Tour (1.5 hours)
                                                    </li>
                                                    <li className='flex items-center'>
                                                        <span className='mr-2 h-2 w-2 rounded-full bg-yellow-500 md:h-3 md:w-3'></span>
                                                        Creative Divisions Tour (1.5 hours)
                                                    </li>
                                                    <li className='flex items-center'>
                                                        <span className='mr-2 h-2 w-2 rounded-full bg-red-500 md:h-3 md:w-3'></span>
                                                        Custom Tour (By appointment)
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="mb-2 font-['Orbitron'] text-xs text-[#00AEEF] md:text-sm">
                                                    NEXT AVAILABLE SLOTS
                                                </h3>
                                                <ul className='space-y-2 text-xs md:text-sm'>
                                                    <li className='flex items-center justify-between'>
                                                        <span>Tomorrow, 10:00 AM</span>
                                                        <button className='rounded bg-[#00AEEF]/20 px-2 py-1 text-[10px] hover:bg-[#00AEEF]/30 md:text-xs'>
                                                            Book
                                                        </button>
                                                    </li>
                                                    <li className='flex items-center justify-between'>
                                                        <span>Tomorrow, 2:00 PM</span>
                                                        <button className='rounded bg-[#00AEEF]/20 px-2 py-1 text-[10px] hover:bg-[#00AEEF]/30 md:text-xs'>
                                                            Book
                                                        </button>
                                                    </li>
                                                    <li className='flex items-center justify-between'>
                                                        <span>Friday, 11:00 AM</span>
                                                        <button className='rounded bg-[#00AEEF]/20 px-2 py-1 text-[10px] hover:bg-[#00AEEF]/30 md:text-xs'>
                                                            Book
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='overflow-hidden rounded-lg bg-gray-800/40'>
                                        <div className='border-b border-[#00AEEF]/30 bg-gradient-to-r from-[#00AEEF]/20 to-transparent p-3 md:p-4'>
                                            <h3 className="md:text-md font-['Orbitron'] text-sm text-[#00AEEF]">
                                                VIRTUAL TOUR
                                            </h3>
                                        </div>
                                        <div className='flex min-h-[150px] flex-col items-center justify-center p-4 md:min-h-[200px] md:p-6'>
                                            <p className='mb-3 text-center text-xs text-[#C0C0C0] md:mb-4 md:text-sm'>
                                                Experience the AeroVista Complex from anywhere in the world
                                            </p>
                                            <button className='rounded border border-[#00AEEF]/40 bg-[#00AEEF]/20 px-4 py-1.5 text-xs text-[#00AEEF] transition-colors hover:bg-[#00AEEF]/30 md:px-6 md:py-2 md:text-sm'>
                                                Launch Virtual Tour
                                            </button>
                                            <p className='mt-2 text-[10px] text-gray-500 md:text-xs'>Coming Soon</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Notification popup */}
            {showNotification && (
                <div className='animate-slideIn fixed right-3 bottom-3 z-50 rounded-lg bg-[#00AEEF]/90 p-3 text-black shadow-lg md:right-4 md:bottom-4 md:p-4'>
                    <div className='flex items-center'>
                        <div className='mr-2 text-lg md:mr-3 md:text-xl'>✓</div>
                        <div>
                            <h4 className='text-sm font-bold md:text-base'>Message Sent</h4>
                            <p className='text-xs md:text-sm'>Your message has been received</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer is now in the main layout */}
        </div>
    );
}
