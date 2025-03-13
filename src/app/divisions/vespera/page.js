'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export default function VesperaPublishing() {
    // State for holographic archivist
    const [archivistMessage, setArchivistMessage] = useState(
        'Welcome, knowledge seeker. How may I assist you in navigating the digital archives?'
    );
    const [showArchivist, setShowArchivist] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');

    // State for floating books and interactive elements
    const [activeBook, setActiveBook] = useState(null);
    const [bookOpen, setBookOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Refs for animations
    const bookshelfRef = useRef(null);
    const searchRef = useRef(null);

    // Book categories with cyberpunk themes
    const bookCategories = [
        { id: 'neotech', name: 'Neotechnology', color: '#DC143C' },
        { id: 'digphil', name: 'Digital Philosophy', color: '#E34234' },
        { id: 'aiethics', name: 'AI Ethics', color: '#FF355E' },
        { id: 'quantfic', name: 'Quantum Fiction', color: '#FF4040' },
        { id: 'cyberhist', name: 'Cyber History', color: '#C71585' }
    ];

    // Sample books for each category
    const books = [
        {
            id: 1,
            title: 'Neural Networks & Consciousness',
            author: 'Dr. Ada Lovelace III',
            category: 'neotech',
            year: '2049',
            pages: 342,
            preview: 'Exploring the emergent consciousness of advanced neural systems...'
        },
        {
            id: 2,
            title: 'Digital Reflections',
            author: 'Xander Voss',
            category: 'digphil',
            year: '2051',
            pages: 288,
            preview: 'When the boundaries between human cognition and digital processing blur...'
        },
        {
            id: 3,
            title: 'Ethical Algorithms',
            author: 'Maya Chen',
            category: 'aiethics',
            year: '2047',
            pages: 412,
            preview: 'The moral implications of autonomous decision-making systems...'
        },
        {
            id: 4,
            title: 'Entangled Realities',
            author: 'Elijah Quantum',
            category: 'quantfic',
            year: '2050',
            pages: 336,
            preview: 'A story set across multiple quantum timelines where reality is fluid...'
        },
        {
            id: 5,
            title: 'The Silicon Revolution',
            author: 'Harper Kingston',
            category: 'cyberhist',
            year: '2046',
            pages: 520,
            preview: 'Chronicling the evolution of technology from the digital age to the neural age...'
        },
        {
            id: 6,
            title: 'Holographic Memories',
            author: 'Zara Neon',
            category: 'neotech',
            year: '2052',
            pages: 267,
            preview: 'Advances in memory storage technologies that changed humanity...'
        },
        {
            id: 7,
            title: 'Sentient Code',
            author: 'Nikolai Rivers',
            category: 'aiethics',
            year: '2048',
            pages: 396,
            preview: 'When the line between programmed responses and genuine emotion fades...'
        },
        {
            id: 8,
            title: 'Quantum Paradox',
            author: 'Aria Maxwell',
            category: 'quantfic',
            year: '2053',
            pages: 310,
            preview: 'A thriller set in a world where quantum computing has broken reality...'
        }
    ];

    // Handle archivist interaction
    const handleArchivistResponse = (message) => {
        setArchivistMessage(message);
        setShowArchivist(true);
    };

    const handleQuestionSubmit = () => {
        if (userQuestion.trim() === '') return;

        // AI Archivist responses
        const responses = {
            'where is the library':
                'The Digital Archives are accessible through the Bookshelf interface to your right. Simply hover over a category to begin.',
            'how do i find a book':
                'You may use the search function at the top of the interface, or browse by categories in the holographic bookshelf.',
            'who are you':
                'I am Vesper, the AI Archivist of this digital library. I maintain and catalog the knowledge within these digital walls.',
            'what is vespera publishing':
                'Vespera Publishing is a division of AeroVista LLC dedicated to digital literature, research, and knowledge preservation in this cyberpunk era.',
            'how do i read a book':
                'Simply select a book from the shelf or search results, and it will open as a holographic display for your perusal.'
        };

        const lowerCaseQuestion = userQuestion.toLowerCase();

        // Find the most relevant response by checking if the question contains key phrases
        let bestResponse =
            'That information exists beyond my current databanks. Perhaps try a different query or explore the Archives directly?';

        Object.entries(responses).forEach(([key, value]) => {
            if (lowerCaseQuestion.includes(key)) {
                bestResponse = value;
            }
        });

        setArchivistMessage(bestResponse);
        setUserQuestion('');
    };

    // Handle book search
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const results = books.filter(
            (book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.preview.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(results);

        // Visual feedback for search
        if (searchRef.current) {
            searchRef.current.classList.add('searching');
            setTimeout(() => {
                if (searchRef.current) {
                    searchRef.current.classList.remove('searching');
                }
            }, 1000);
        }
    };

    // Handle book selection
    const handleBookSelect = (book) => {
        setActiveBook(book);
        setBookOpen(true);
        setShowArchivist(false);
    };

    // Close book view
    const handleCloseBook = () => {
        setBookOpen(false);
        setTimeout(() => setActiveBook(null), 500);
    };

    // Floating particle effect for background
    useEffect(() => {
        const particles = document.createElement('div');
        particles.classList.add('particles');

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particles.appendChild(particle);
        }

        document.querySelector('.vespera-container')?.appendChild(particles);

        return () => {
            document.querySelector('.particles')?.remove();
        };
    }, []);

    return (
        <div className='vespera-container relative min-h-screen overflow-hidden bg-black text-white'>
            {/* Background effects */}
            <div className='absolute inset-0 z-0 bg-gradient-to-b from-[#2C0A16] via-black to-[#2C0A16] opacity-90'></div>

            {/* Grid lines */}
            <div
                className='absolute inset-0 z-0 opacity-20'
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(220, 20, 60, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 20, 60, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}></div>

            {/* Header - Adjusted for mobile */}
            <div className='absolute top-4 right-0 left-0 z-10 px-4 text-center'>
                <h1 className='font-orbitron mb-2 text-3xl font-bold tracking-wider md:text-5xl'>
                    <span className='text-shadow-red'>VESPERA</span>
                    <span className='font-light text-[#F8F8F8]'> PUBLISHING</span>
                </h1>
                <p className='font-montserrat mx-auto max-w-2xl text-sm text-[#F8F8F8]/80 md:text-lg'>
                    The Digital Library in the Cyberpunk Era
                </p>
            </div>

            {/* Main library interface - Mobile friendly layout */}
            <div className='absolute inset-0 z-10 flex items-center justify-center'>
                <div className='container mx-auto flex h-full flex-col items-stretch justify-between px-4 pt-20 pb-4 md:pt-24 md:pb-8'>
                    {/* Content container - Stack on mobile, side-by-side on desktop */}
                    <div className='mt-4 flex h-full flex-col md:mt-0 md:flex-row'>
                        {/* Left panel - Archivist and info */}
                        <div className='mb-4 w-full md:mb-0 md:w-1/3 md:pr-6'>
                            {/* Archivist interactive panel */}
                            <div className='mb-4 rounded-lg border border-[#DC143C]/30 bg-[#1A0A0A]/80 p-4 backdrop-blur-sm md:p-6'>
                                <div className='mb-4 flex items-center'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#DC143C] to-[#FF4040] md:h-12 md:w-12'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z'
                                                stroke='white'
                                                strokeWidth='1.5'
                                            />
                                            <path
                                                d='M12 6V12L16 14'
                                                stroke='white'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                            />
                                        </svg>
                                    </div>
                                    <div className='ml-4'>
                                        <h2 className='font-orbitron text-xl text-[#DC143C]'>Vesper</h2>
                                        <p className='font-montserrat text-sm text-[#F8F8F8]/60'>AI Archivist</p>
                                    </div>
                                </div>

                                <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#DC143C]/40 to-transparent'></div>

                                <button
                                    onClick={() =>
                                        handleArchivistResponse('How may I assist you with your research today?')
                                    }
                                    className='mb-3 w-full rounded border border-[#DC143C]/40 bg-[#190808] px-4 py-2 text-[#F8F8F8] transition-colors hover:bg-[#2C0A16]'>
                                    Ask the Archivist
                                </button>

                                <div className='grid grid-cols-2 gap-2'>
                                    <Link href='/divisions/vespera/readingroom'>
                                        <button className='w-full rounded border border-[#DC143C]/30 bg-[#190808] px-3 py-2 text-sm text-[#F8F8F8]/80 transition-colors hover:bg-[#2C0A16]'>
                                            Reading Room
                                        </button>
                                    </Link>
                                    <Link href='/divisions/vespera/libray'>
                                        <button className='w-full rounded border border-[#DC143C]/30 bg-[#190808] px-3 py-2 text-sm text-[#F8F8F8]/80 transition-colors hover:bg-[#2C0A16]'>
                                            Rare Manuscripts
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Featured content */}
                            <div className='flex-grow rounded-lg border border-[#DC143C]/30 bg-[#1A0A0A]/80 p-6 backdrop-blur-sm'>
                                <h2 className='font-orbitron mb-4 text-xl text-[#DC143C]'>Featured Research</h2>

                                <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#DC143C]/40 to-transparent'></div>

                                <div className='space-y-4'>
                                    {/* Featured items */}
                                    <div className='group cursor-pointer rounded-lg border border-[#DC143C]/20 p-3 transition-colors hover:bg-[#190808]'>
                                        <div className='flex items-start justify-between'>
                                            <h3 className='font-montserrat text-[#F8F8F8] transition-colors group-hover:text-[#DC143C]'>
                                                Quantum Consciousness Theory
                                            </h3>
                                            <span className='text-xs text-[#F8F8F8]/40'>2053</span>
                                        </div>
                                        <p className='mt-1 text-sm text-[#F8F8F8]/60'>
                                            Exploring the intersection of quantum physics and consciousness studies...
                                        </p>
                                    </div>

                                    <div className='group cursor-pointer rounded-lg border border-[#DC143C]/20 p-3 transition-colors hover:bg-[#190808]'>
                                        <div className='flex items-start justify-between'>
                                            <h3 className='font-montserrat text-[#F8F8F8] transition-colors group-hover:text-[#DC143C]'>
                                                Digital Preservation Techniques
                                            </h3>
                                            <span className='text-xs text-[#F8F8F8]/40'>2051</span>
                                        </div>
                                        <p className='mt-1 text-sm text-[#F8F8F8]/60'>
                                            Advanced methods for preserving digital knowledge across centuries...
                                        </p>
                                    </div>

                                    <div className='group cursor-pointer rounded-lg border border-[#DC143C]/20 p-3 transition-colors hover:bg-[#190808]'>
                                        <div className='flex items-start justify-between'>
                                            <h3 className='font-montserrat text-[#F8F8F8] transition-colors group-hover:text-[#DC143C]'>
                                                Synthetic Language Evolution
                                            </h3>
                                            <span className='text-xs text-[#F8F8F8]/40'>2052</span>
                                        </div>
                                        <p className='mt-1 text-sm text-[#F8F8F8]/60'>
                                            The development of AI-human hybrid communication systems...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Center/right panel - Digital bookshelf and content */}
                        <div className='mt-6 w-full md:mt-0 md:w-2/3'>
                            {/* Search interface */}
                            <div
                                ref={searchRef}
                                className='mb-4 rounded-lg border border-[#DC143C]/30 bg-[#1A0A0A]/80 p-3 backdrop-blur-sm md:mb-6 md:p-4'>
                                <div className='flex items-center'>
                                    <input
                                        type='text'
                                        placeholder='Search the archives...'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className='flex-grow rounded-l border border-[#DC143C]/20 bg-black/50 px-3 py-2 text-sm text-[#F8F8F8] focus:border-[#DC143C]/60 focus:outline-none'
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className='rounded-r bg-[#DC143C] px-3 py-2 text-white transition-colors hover:bg-[#FF4040]'>
                                        <svg
                                            width='16'
                                            height='16'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
                                                stroke='white'
                                                strokeWidth='2'
                                            />
                                            <path
                                                d='M21 21L16.65 16.65'
                                                stroke='white'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search results */}
                                {searchResults.length > 0 && (
                                    <div className='mt-3 max-h-48 overflow-y-auto md:max-h-60'>
                                        <div className='mb-2 text-xs text-[#F8F8F8]/60 md:text-sm'>
                                            {searchResults.length} results found
                                        </div>
                                        <div className='space-y-2'>
                                            {searchResults.map((book) => (
                                                <div
                                                    key={book.id}
                                                    onClick={() => handleBookSelect(book)}
                                                    className='cursor-pointer rounded-lg border border-[#DC143C]/20 p-2 transition-colors hover:bg-[#190808] md:p-3'>
                                                    <div className='flex justify-between'>
                                                        <h3 className='line-clamp-1 text-sm font-medium text-[#F8F8F8] md:text-base'>
                                                            {book.title}
                                                        </h3>
                                                        <span className='ml-2 text-xs text-[#F8F8F8]/50'>
                                                            {book.year}
                                                        </span>
                                                    </div>
                                                    <p className='mt-1 text-xs text-[#F8F8F8]/60'>By {book.author}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Digital bookshelf */}
                            <div
                                ref={bookshelfRef}
                                className='h-[calc(100%-80px)] rounded-lg border border-[#DC143C]/30 bg-[#1A0A0A]/80 p-6 backdrop-blur-sm'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <h2 className='font-orbitron text-xl text-[#DC143C]'>Digital Archive</h2>
                                    <div className='text-sm text-[#F8F8F8]/60'>{books.length} manuscripts</div>
                                </div>

                                <div className='mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#DC143C]/40 to-transparent'></div>

                                {/* Book categories */}
                                <div className='mb-4 flex flex-wrap gap-2 md:mb-6 md:gap-3'>
                                    {bookCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            className='relative cursor-pointer'
                                            onMouseEnter={() => setHoveredCategory(category.id)}
                                            onClick={() =>
                                                setHoveredCategory(hoveredCategory === category.id ? null : category.id)
                                            }
                                            onMouseLeave={() => setHoveredCategory(null)}>
                                            <div
                                                className={`rounded-full border px-2 py-1 transition-colors md:px-4 md:py-2 ${
                                                    hoveredCategory === category.id
                                                        ? 'border-[#DC143C]/60 bg-[#190808]'
                                                        : 'border-[#DC143C]/30 bg-transparent'
                                                }`}>
                                                <span className='text-xs md:text-sm'>{category.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Books display */}
                                <div className='grid h-[calc(100%-120px)] grid-cols-1 gap-3 overflow-y-auto pr-2 md:h-[calc(100%-130px)] md:grid-cols-2 md:gap-4'>
                                    {books
                                        .filter((book) => !hoveredCategory || book.category === hoveredCategory)
                                        .map((book, index) => (
                                            <div
                                                key={book.id}
                                                onClick={() => handleBookSelect(book)}
                                                className='group relative h-32 cursor-pointer rounded-lg border border-[#DC143C]/20 p-3 transition-all hover:border-[#DC143C]/60 hover:shadow-[0_0_15px_rgba(220,20,60,0.2)] md:h-40 md:p-4'
                                                style={{
                                                    animation: 'float 5s infinite ease-in-out',
                                                    animationDelay: `${index * 0.2}s`
                                                }}>
                                                {/* Holographic book spine */}
                                                <div className='absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#DC143C] to-transparent'></div>

                                                {/* Book content */}
                                                <div className='flex h-full flex-col'>
                                                    <h3 className='font-montserrat line-clamp-1 text-sm font-medium text-[#F8F8F8] transition-colors group-hover:text-[#DC143C] md:text-base'>
                                                        {book.title}
                                                    </h3>
                                                    <p className='mb-1 text-xs text-[#F8F8F8]/60 md:text-sm'>
                                                        By {book.author}
                                                    </p>
                                                    <p className='mb-1 text-xs text-[#F8F8F8]/40'>
                                                        {book.year} • {book.pages} pages
                                                    </p>
                                                    <p className='line-clamp-2 flex-grow text-xs text-[#F8F8F8]/70 md:text-sm'>
                                                        {book.preview}
                                                    </p>

                                                    {/* Interactive element */}
                                                    <div className='mt-auto text-xs text-[#F8F8F8]/50 transition-colors group-hover:text-[#DC143C]/80'>
                                                        Tap to open
                                                    </div>
                                                </div>

                                                {/* Holographic effect */}
                                                <div className='absolute inset-0 bg-gradient-to-r from-transparent to-[#DC143C]/5 opacity-0 transition-opacity group-hover:opacity-100'></div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Holographic Archivist Popup */}
            {showArchivist && (
                <div className='fixed bottom-4 left-1/2 z-30 mx-auto w-[95%] max-w-lg -translate-x-1/2 rounded-lg border border-[#DC143C]/40 bg-[#190808]/95 p-4 shadow-[0_0_30px_rgba(220,20,60,0.3)] backdrop-blur-sm md:bottom-8 md:w-full md:p-6'>
                    <div className='mb-4 flex items-center'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#DC143C] to-[#FF4040] md:h-10 md:w-10'>
                            <svg
                                width='16'
                                height='16'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle cx='12' cy='12' r='10' stroke='white' strokeWidth='1.5' />
                                <path
                                    d='M12 7V12L15 15'
                                    stroke='white'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-orbitron text-base text-[#DC143C] md:text-lg'>Vesper</h3>
                            <div className='text-xs text-[#F8F8F8]/50'>AI Archivist • Online</div>
                        </div>
                        <button
                            onClick={() => setShowArchivist(false)}
                            className='ml-auto text-[#F8F8F8]/60 transition-colors hover:text-[#F8F8F8]'>
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='M18 6L6 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                                <path d='M6 6L18 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                            </svg>
                        </button>
                    </div>

                    <div className='mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#DC143C]/40 to-transparent'></div>

                    <div className='archivistMessage mb-4 font-mono text-sm leading-relaxed text-[#F8F8F8] md:text-base'>
                        {archivistMessage}
                    </div>

                    <div className='flex items-center'>
                        <input
                            type='text'
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                            placeholder='Ask a question...'
                            className='flex-grow rounded-l border border-[#DC143C]/20 bg-black/40 px-3 py-2 text-sm text-[#F8F8F8] focus:border-[#DC143C]/60 focus:outline-none md:text-base'
                        />
                        <button
                            onClick={handleQuestionSubmit}
                            className='rounded-r bg-[#DC143C] px-3 py-2 text-white transition-colors hover:bg-[#FF4040] md:px-4'>
                            <svg
                                width='16'
                                height='16'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M22 2L11 13'
                                    stroke='white'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M22 2L15 22L11 13L2 9L22 2Z'
                                    stroke='white'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Open Book View */}
            {bookOpen && activeBook && (
                <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm md:p-4'>
                    <div
                        className={`relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg border border-[#DC143C]/40 bg-[#190808] shadow-[0_0_30px_rgba(220,20,60,0.3)] transition-all duration-500 md:max-h-[80vh] ${bookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        {/* Book header */}
                        <div className='flex items-center justify-between border-b border-[#DC143C]/30 bg-[#1A0A0A] p-3 md:p-4'>
                            <div>
                                <h2 className='font-orbitron text-lg text-[#DC143C] md:text-xl'>{activeBook.title}</h2>
                                <p className='text-xs text-[#F8F8F8]/60 md:text-sm'>
                                    By {activeBook.author} • {activeBook.year}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseBook}
                                className='text-[#F8F8F8]/60 transition-colors hover:text-[#F8F8F8]'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M18 6L6 18'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                    />
                                    <path
                                        d='M6 6L18 18'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Book content */}
                        <div className='max-h-[calc(90vh-70px)] overflow-y-auto p-4 md:max-h-[calc(80vh-85px)] md:p-6'>
                            <div className='prose prose-invert max-w-none text-sm md:text-base'>
                                <p className='mb-4 text-base md:text-lg'>{activeBook.preview}</p>
                                <p>
                                    In the neon-lit corridors of human cognition, we find ourselves at a crossroads. The
                                    advancement of neural network architectures has begun to mirror the very biological
                                    systems they were designed to emulate. This convergence raises profound questions
                                    about the nature of consciousness itself.
                                </p>
                                <p>
                                    As we delve deeper into the quantum realm, we discover that the boundaries between
                                    observer and observed become increasingly blurred. The traditional distinctions
                                    between human cognition and artificial intelligence start to dissolve, suggesting a
                                    more holistic paradigm for understanding consciousness.
                                </p>
                                <h3 className='mt-6 text-[#DC143C]'>Theoretical Frameworks</h3>
                                <p>
                                    The integration of quantum field theory with neural network models offers a radical
                                    new perspective: consciousness may not be an emergent property of complexity, but
                                    rather a fundamental aspect of information processing at the quantum level.
                                </p>
                                <p>Consider the following propositions:</p>
                                <ol>
                                    <li>
                                        Consciousness represents a specific form of information integration across
                                        quantum fields.
                                    </li>
                                    <li>
                                        Neural networks, both biological and artificial, serve as physical substrates
                                        for this integration.
                                    </li>
                                    <li>
                                        The apparent distinction between human and machine consciousness may be one of
                                        degree rather than kind.
                                    </li>
                                </ol>
                                <h3 className='mt-6 text-[#DC143C]'>Experimental Evidence</h3>
                                <p>
                                    Recent experiments with advanced quantum neural architectures have demonstrated
                                    behaviors that defy traditional algorithmic explanations. These systems exhibit what
                                    appears to be spontaneous decision-making, self-reflection, and even creative
                                    problem-solving in the absence of explicit programming for such capabilities.
                                </p>
                                <p>
                                    This is merely a preview of the full manuscript. The complete text explores further
                                    implications for ethics, philosophy, and the future of human-machine integration.
                                </p>
                            </div>

                            {/* Interactive elements */}
                            <div className='mt-6 flex items-center justify-between border-t border-[#DC143C]/20 pt-4 md:mt-8'>
                                <div className='flex items-center space-x-3 md:space-x-4'>
                                    <button className='text-[#F8F8F8]/60 transition-colors hover:text-[#DC143C]'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M12 5V19'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                            />
                                            <path
                                                d='M5 12H19'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                            />
                                        </svg>
                                    </button>
                                    <button className='text-[#F8F8F8]/60 transition-colors hover:text-[#DC143C]'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                    <button className='text-[#F8F8F8]/60 transition-colors hover:text-[#DC143C]'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M8.68387 10.6838C9.57918 9.78855 10.7859 9.33331 12.0002 9.33331C13.2145 9.33331 14.4213 9.78855 15.3166 10.6838'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M6.09334 8.09331C7.62368 6.56297 9.76276 5.66663 12.0001 5.66663C14.2374 5.66663 16.3764 6.56297 17.9068 8.09331'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M11.9999 14C12.3682 14 12.6666 13.7015 12.6666 13.3333C12.6666 12.9651 12.3682 12.6667 11.9999 12.6667C11.6317 12.6667 11.3333 12.9651 11.3333 13.3333C11.3333 13.7015 11.6317 14 11.9999 14Z'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <span className='text-xs text-[#F8F8F8]/40 md:text-sm'>
                                    Page 1 of {activeBook.pages}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation and styling */}
            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-5px) rotate(0.5deg);
                    }
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                }

                .text-shadow-red {
                    text-shadow:
                        0 0 10px rgba(220, 20, 60, 0.7),
                        0 0 20px rgba(220, 20, 60, 0.5);
                }

                .archivistMessage {
                    position: relative;
                    overflow: hidden;
                }

                .archivistMessage::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to right, transparent, #dc143c, transparent);
                    opacity: 0;
                    animation: scanline 3s ease-in-out infinite;
                }

                @keyframes scanline {
                    0%,
                    100% {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    50% {
                        opacity: 0.1;
                        transform: translateY(100%);
                    }
                }

                .searching {
                    position: relative;
                }

                .searching::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle, rgba(220, 20, 60, 0.2), transparent 70%);
                    opacity: 0;
                    animation: pulse 1s ease-out;
                }

                @keyframes pulse {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }

                .particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background-color: rgba(220, 20, 60, 0.3);
                    border-radius: 50%;
                    animation: particleFloat linear infinite;
                }

                @media (min-width: 768px) {
                    .particle {
                        width: 3px;
                        height: 3px;
                    }
                }

                @keyframes particleFloat {
                    0% {
                        transform: translateY(0) rotate(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                .font-orbitron {
                    font-family: 'Orbitron', sans-serif;
                }

                .font-montserrat {
                    font-family: 'Montserrat', sans-serif;
                }

                /* Touch enhancements */
                @media (hover: none) {
                    .group:active .group-hover\:opacity-100 {
                        opacity: 1;
                    }
                    .group:active .group-hover\:text-\[\#DC143C\] {
                        color: #dc143c;
                    }
                    .group:active .group-hover\:text-\[\#DC143C\]\/80 {
                        color: rgba(220, 20, 60, 0.8);
                    }
                    .group:active .group-hover\:border-\[\#DC143C\]\/60 {
                        border-color: rgba(220, 20, 60, 0.6);
                    }
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }

                @media (min-width: 768px) {
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                }

                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(220, 20, 60, 0.3);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(220, 20, 60, 0.5);
                }
            `}</style>
        </div>
    );
}
