'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function LuminaCreative() {
    // State for managing the active channel and content views
    const [activeView, setActiveView] = useState('home');
    const [showContact, setShowContact] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(18720);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Sample videos data
    const videos = [
        {
            id: 'v1',
            title: 'Brand Storytelling Masterclass',
            views: '24K',
            likes: '2.1K',
            thumbnail:
                'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            duration: '12:34'
        },
        {
            id: 'v2',
            title: 'Social Media Strategy for 2023',
            views: '18K',
            likes: '1.8K',
            thumbnail:
                'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            duration: '18:22'
        },
        {
            id: 'v3',
            title: 'The Art of Visual Storytelling',
            views: '32K',
            likes: '3.5K',
            thumbnail:
                'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0b3J5dGVsbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            duration: '22:10'
        },
        {
            id: 'v4',
            title: 'Digital Marketing Trends for Creators',
            views: '15K',
            likes: '1.5K',
            thumbnail:
                'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFya2V0aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            duration: '15:45'
        },
        {
            id: 'v5',
            title: 'Content Creation Workflow',
            views: '22K',
            likes: '2.4K',
            thumbnail:
                'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGVudCUyMGNyZWF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            duration: '19:30'
        },
        {
            id: 'v6',
            title: 'Building Your Personal Brand',
            views: '28K',
            likes: '3.2K',
            thumbnail:
                'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uYWwlMjBicmFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            duration: '24:15'
        }
    ];

    // Services offered
    const services = [
        {
            icon: '🎬',
            title: 'Video Production',
            description: 'Professional cinematic videos for brands and businesses with storytelling at the core.'
        },
        {
            icon: '📱',
            title: 'Social Media Management',
            description: 'Complete handling of content creation, scheduling, and engagement across platforms.'
        },
        {
            icon: '🎨',
            title: 'Brand Identity',
            description: 'Visual identity development including logos, style guides, and brand voice creation.'
        },
        {
            icon: '📊',
            title: 'Marketing Strategy',
            description: 'Data-driven marketing plans tailored to your business goals and target audience.'
        }
    ];

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Handle subscriber button click
    const handleSubscribe = () => {
        setSubscriberCount((prev) => prev + 1);
    };

    // Handle video selection
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        // Scroll to top on mobile when video is selected
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-black to-gray-900 text-white'>
            {/* Loading screen */}
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='text-center'>
                        <div className='inline-block h-16 w-16 animate-spin rounded-full border-t-4 border-red-600 border-r-transparent'></div>
                        <h2 className='mt-4 text-xl font-semibold text-red-600'>Lumina Creative Media</h2>
                        <p className='mt-2 text-gray-400'>Loading creative space...</p>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className='container mx-auto px-4 py-6 md:px-8 md:py-12'>
                {/* Header and navigation */}
                <header className='mb-6 md:mb-12'>
                    <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
                        <div className='mb-4 text-center md:mb-0 md:text-left'>
                            <h1 className='bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl'>
                                Lumina Creative Media
                            </h1>
                            <p className='mt-2 text-sm text-gray-400 md:text-base'>
                                Illuminating brands through powerful visual storytelling
                            </p>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <div className='relative h-8 w-8 overflow-hidden rounded-full border-2 border-red-500 md:h-10 md:w-10'>
                                <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600'></div>
                                <div className='absolute inset-1.5 rounded-full bg-black'></div>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <span className='text-xs font-bold text-white md:text-sm'>LCM</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className='flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-red-700 md:px-4 md:py-2 md:text-sm'>
                                <span className='mr-1.5'>SUBSCRIBE</span>
                                <span className='text-xs opacity-80'>{subscriberCount.toLocaleString()}</span>
                            </button>
                        </div>
                    </div>

                    <nav className='scrollbar-hide flex justify-center space-x-1 overflow-x-auto py-2 md:justify-start md:space-x-4'>
                        {['home', 'videos', 'services', 'portfolio', 'about'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveView(item)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap capitalize transition-all md:px-4 md:py-2 md:text-sm ${
                                    activeView === item
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}>
                                {item}
                            </button>
                        ))}
                    </nav>
                </header>

                {/* Main content area with video player or hero section */}
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                    {/* Left side - Video player or hero */}
                    <div className='lg:col-span-2'>
                        {selectedVideo ? (
                            <div className='overflow-hidden rounded-xl bg-gray-900 shadow-2xl'>
                                <div className='relative aspect-video w-full bg-black'>
                                    {/* Placeholder for actual video player */}
                                    <Image
                                        src={selectedVideo.thumbnail}
                                        alt={selectedVideo.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className='opacity-90'
                                    />

                                    {/* Play button overlay */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-600/80 transition-all hover:bg-red-600 md:h-20 md:w-20'>
                                            <svg className='h-8 w-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                                                <path d='M8 5v14l11-7z' />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Duration badge */}
                                    <div className='absolute right-3 bottom-3 rounded bg-black/80 px-2 py-0.5 text-xs text-white'>
                                        {selectedVideo.duration}
                                    </div>
                                </div>

                                <div className='p-4 md:p-6'>
                                    <h2 className='mb-2 text-lg font-semibold md:text-xl'>{selectedVideo.title}</h2>
                                    <div className='flex items-center text-xs text-gray-400 md:text-sm'>
                                        <span>{selectedVideo.views} views</span>
                                        <span className='mx-2'>•</span>
                                        <div className='flex items-center'>
                                            <svg
                                                className='mr-1 h-4 w-4 text-red-500'
                                                fill='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                                            </svg>
                                            {selectedVideo.likes}
                                        </div>
                                    </div>

                                    <div className='my-4 border-t border-gray-800 pt-4'>
                                        <button
                                            onClick={() => setSelectedVideo(null)}
                                            className='text-xs text-gray-400 hover:text-white md:text-sm'>
                                            ← Back to videos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-black shadow-2xl'>
                                <div className='p-6 md:p-8'>
                                    <h2 className='mb-3 text-2xl font-bold md:mb-4 md:text-3xl'>
                                        <span className='bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent'>
                                            Elevate Your Brand's Story
                                        </span>
                                    </h2>
                                    <p className='mb-4 text-sm text-gray-300 md:mb-6 md:text-base'>
                                        At Lumina Creative Media, we transform ideas into compelling visual narratives
                                        that resonate with audiences and elevate your brand presence across all digital
                                        platforms.
                                    </p>

                                    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                                        {services.map((service, index) => (
                                            <div
                                                key={index}
                                                className='rounded-lg border border-gray-800 bg-black/40 p-4 transition-all hover:border-red-500/30'>
                                                <div className='mb-2 text-2xl'>{service.icon}</div>
                                                <h3 className='mb-1 text-base font-semibold md:text-lg'>
                                                    {service.title}
                                                </h3>
                                                <p className='text-xs text-gray-400 md:text-sm'>
                                                    {service.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setShowContact(true)}
                                        className='rounded-md bg-gradient-to-r from-red-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-red-500 hover:to-purple-500 md:px-6 md:py-3 md:text-base'>
                                        Start Your Creative Journey
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right side - Videos listing */}
                    <div className='lg:col-span-1'>
                        <div className='rounded-xl bg-black/30 p-4 shadow-lg'>
                            <h3 className='mb-3 text-base font-semibold md:mb-4 md:text-lg'>Latest Content</h3>

                            <div className='space-y-3 md:space-y-4'>
                                {videos.map((video) => (
                                    <div
                                        key={video.id}
                                        onClick={() => handleVideoSelect(video)}
                                        className={`flex cursor-pointer space-x-2 rounded-lg p-2 transition-all hover:bg-gray-800/50 md:space-x-3 ${
                                            selectedVideo && selectedVideo.id === video.id
                                                ? 'bg-gray-800/70 ring-1 ring-red-500/30'
                                                : ''
                                        }`}>
                                        <div className='relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md md:h-24 md:w-36'>
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className='transition-transform hover:scale-105'
                                            />
                                            <div className='absolute right-1 bottom-1 rounded bg-black/80 px-1 py-0.5 text-[10px]'>
                                                {video.duration}
                                            </div>
                                        </div>

                                        <div className='min-w-0 flex-1'>
                                            <h4 className='mb-1 line-clamp-2 text-xs font-medium md:text-sm'>
                                                {video.title}
                                            </h4>
                                            <div className='flex items-center text-[10px] text-gray-400 md:text-xs'>
                                                <span>{video.views} views</span>
                                                <span className='mx-1'>•</span>
                                                <span>{video.likes} likes</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact form overlay */}
                {showContact && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
                        <div className='w-full max-w-md rounded-xl bg-gray-900 p-4 md:p-6'>
                            <div className='mb-4 flex items-center justify-between'>
                                <h3 className='text-lg font-semibold md:text-xl'>Contact Us</h3>
                                <button
                                    onClick={() => setShowContact(false)}
                                    className='text-gray-400 hover:text-white'>
                                    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form className='space-y-4'>
                                <div>
                                    <label className='mb-1 block text-xs text-gray-400 md:text-sm'>Your Name</label>
                                    <input
                                        type='text'
                                        className='w-full rounded-md border border-gray-700 bg-black/50 px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:outline-none md:text-base'
                                    />
                                </div>

                                <div>
                                    <label className='mb-1 block text-xs text-gray-400 md:text-sm'>Email</label>
                                    <input
                                        type='email'
                                        className='w-full rounded-md border border-gray-700 bg-black/50 px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:outline-none md:text-base'
                                    />
                                </div>

                                <div>
                                    <label className='mb-1 block text-xs text-gray-400 md:text-sm'>Message</label>
                                    <textarea
                                        rows='4'
                                        className='w-full rounded-md border border-gray-700 bg-black/50 px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:outline-none md:text-base'></textarea>
                                </div>

                                <button
                                    type='button'
                                    className='w-full rounded-md bg-gradient-to-r from-red-600 to-purple-600 py-2 text-sm font-medium text-white transition-all hover:from-red-500 hover:to-purple-500 md:text-base'>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className='mt-12 text-center text-xs text-gray-500 md:mt-16 md:text-sm'>
                    <p>© {new Date().getFullYear()} Lumina Creative Media - A Division of AeroVista LLC</p>
                    <p className='mt-1'>Illuminating stories that captivate audiences</p>
                </footer>
            </div>

            {/* CSS for horizontal scrollbar hiding */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
