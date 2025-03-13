'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeSwitch from '@/app/divisions/ThemeSwitch';

// Division data with their respective brand colors
const divisions = [
    { name: 'AeroVista Complex', path: '/divisions/aerovista', color: '#00AEEF' },
    { name: 'SkyForge Creative Studios', path: '/divisions/skyforge-creative-studios', color: '#6A0DAD' },
    { name: 'Lumina Creative Media', path: '/divisions/lumina-creative-media', color: '#FFD700' },
    { name: 'Nexus TechWorks', path: '/divisions/nexus-techworks', color: '#00FF7F' },
    { name: 'Horizon Aerial & Visual', path: '/divisions/horizon-aerial-visual', color: '#87CEEB' },
    { name: 'Vespera Publishing', path: '/divisions/vespera-publishing', color: '#DC143C' },
    { name: 'Summit Learning', path: '/divisions/summit-learning', color: '#228B22' },
    { name: 'EchoVerse Audio', path: '/divisions/echoverse-audio', color: '#FF1493' }
];

// Main navigation links
const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
];

export const GlobalNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [divisionsOpen, setDivisionsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handling mobile menu toggle
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (divisionsOpen) setDivisionsOpen(false);
    };

    // Handling divisions dropdown toggle
    const toggleDivisions = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDivisionsOpen(!divisionsOpen);
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (divisionsOpen) setDivisionsOpen(false);
            if (menuOpen) setMenuOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [divisionsOpen, menuOpen]);

    // Set scrolled state for navbar appearance change on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close divisions dropdown when route changes
    useEffect(() => {
        setDivisionsOpen(false);
        setMenuOpen(false);
    }, [pathname]);

    // Check if a path is active (current page)
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    // Find current division based on path
    const currentDivision = divisions.find((div) => pathname.includes(div.path.split('/').pop() || ''));

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'bg-black/90 shadow-[0_0_15px_rgba(0,0,0,0.7)] backdrop-blur-md'
                    : 'bg-black/60 backdrop-blur-sm'
            } border-b border-[#00AEEF]/30`}>
            <div className='container mx-auto px-4'>
                <nav className='flex h-16 items-center justify-between md:h-20'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center space-x-2'>
                        <div className='relative'>
                            <span className="font-['Orbitron'] text-base font-bold tracking-wider text-[#00AEEF] drop-shadow-[0_0_8px_rgba(0,174,239,0.7)] md:text-lg">
                                AEROVISTA
                            </span>
                            {/* Animated neon glow effect */}
                            <div className='absolute -inset-1 animate-pulse bg-[#00AEEF]/20 opacity-50 blur-sm'></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:ml-12 md:flex md:flex-1 md:items-center md:justify-between'>
                        <ul className='flex space-x-6'>
                            {mainNavLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className={`font-['Montserrat'] text-sm transition-colors ${
                                            isActive(link.path)
                                                ? 'font-medium text-[#00AEEF]'
                                                : 'text-[#C0C0C0] hover:text-white'
                                        }`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}

                            {/* Divisions Dropdown */}
                            <li className='relative'>
                                <button
                                    onClick={toggleDivisions}
                                    className={`flex items-center space-x-1 font-['Montserrat'] text-sm transition-colors ${
                                        divisionsOpen || currentDivision
                                            ? 'font-medium text-[#00AEEF]'
                                            : 'text-[#C0C0C0] hover:text-white'
                                    }`}>
                                    <span>Divisions</span>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className={`h-4 w-4 transition-transform ${divisionsOpen ? 'rotate-180' : ''}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M19 9l-7 7-7-7'
                                        />
                                    </svg>
                                </button>

                                {/* Divisions Dropdown Menu */}
                                {divisionsOpen && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='animate-slideIn absolute right-0 z-50 mt-2 w-64 rounded-md border border-[#00AEEF]/30 bg-gray-900/90 px-1 py-2 shadow-[0_0_15px_rgba(0,174,239,0.3)] backdrop-blur-md'>
                                        <div className='py-1'>
                                            {divisions.map((division, index) => (
                                                <Link key={index} href={division.path} className='block'>
                                                    <div
                                                        className={`group flex items-center rounded-sm px-3 py-2 hover:bg-gray-800/70 ${
                                                            pathname.includes(division.path.split('/').pop() || '')
                                                                ? 'bg-gray-800/40'
                                                                : ''
                                                        }`}
                                                        style={{ borderLeft: `3px solid ${division.color}` }}>
                                                        <div
                                                            className='mr-2 h-2 w-2 rounded-full'
                                                            style={{ backgroundColor: division.color }}></div>
                                                        <span className="font-['Montserrat'] text-sm text-[#C0C0C0] transition-colors group-hover:text-white">
                                                            {division.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        </ul>

                        {/* Right side items: Theme switcher, search, etc. */}
                        <div className='flex items-center space-x-4'>
                            <ThemeSwitch />

                            {/* Search Icon */}
                            <button className='text-[#C0C0C0] transition-colors hover:text-[#00AEEF]'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </button>

                            {/* GitHub Icon */}
                            <Link
                                href='https://github.com'
                                target='_blank'
                                className='text-[#C0C0C0] transition-colors hover:text-[#00AEEF]'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24'>
                                    <path
                                        fill='currentColor'
                                        d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z'
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='flex items-center md:hidden'>
                        <ThemeSwitch />
                        <button
                            onClick={toggleMenu}
                            className='ml-4 rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-800/30 hover:text-white focus:outline-none'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                {menuOpen ? (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                ) : (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='animate-slideDown fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#00AEEF]/20 bg-gray-900/95 pb-6 shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-md md:hidden'>
                    <div className='space-y-1 px-4 pt-2 pb-4'>
                        {mainNavLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`block rounded-md px-3 py-3 font-['Montserrat'] text-base ${
                                    isActive(link.path)
                                        ? 'bg-gray-800/50 text-[#00AEEF]'
                                        : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                                }`}>
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Divisions Dropdown */}
                        <div className='py-2'>
                            <button
                                onClick={toggleDivisions}
                                className={`flex w-full items-center justify-between rounded-md px-3 py-3 font-['Montserrat'] text-base ${
                                    divisionsOpen || currentDivision
                                        ? 'bg-gray-800/50 text-[#00AEEF]'
                                        : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                                }`}>
                                <span>Divisions</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className={`h-5 w-5 transition-transform ${divisionsOpen ? 'rotate-180' : ''}`}
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M19 9l-7 7-7-7'
                                    />
                                </svg>
                            </button>

                            {divisionsOpen && (
                                <div className='mt-2 space-y-1 border-l-2 border-[#00AEEF]/30 pl-4'>
                                    {divisions.map((division, index) => (
                                        <Link key={index} href={division.path} className='block'>
                                            <div
                                                className={`group flex items-center rounded-md px-3 py-3 ${
                                                    pathname.includes(division.path.split('/').pop() || '')
                                                        ? 'bg-gray-800/40 text-white'
                                                        : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                                                }`}
                                                style={{ borderLeft: `3px solid ${division.color}` }}>
                                                <div
                                                    className='mr-2 h-3 w-3 rounded-full'
                                                    style={{ backgroundColor: division.color }}></div>
                                                <span className="font-['Montserrat'] text-base">{division.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Search and GitHub */}
                        <div className='mt-4 border-t border-[#00AEEF]/20 pt-4'>
                            <div className='flex items-center justify-around'>
                                <button className='flex flex-col items-center p-2 text-[#C0C0C0] transition-colors hover:text-[#00AEEF]'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                        />
                                    </svg>
                                    <span className='mt-1 text-xs'>Search</span>
                                </button>

                                <Link
                                    href='https://github.com'
                                    target='_blank'
                                    className='flex flex-col items-center p-2 text-[#C0C0C0] transition-colors hover:text-[#00AEEF]'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 24 24'>
                                        <path
                                            fill='currentColor'
                                            d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z'
                                        />
                                    </svg>
                                    <span className='mt-1 text-xs'>GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Division Indicator */}
            {currentDivision && (
                <div
                    className='h-1 w-full'
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, ${currentDivision.color} 50%, transparent 100%)`,
                        boxShadow: `0 0 8px ${currentDivision.color}`
                    }}></div>
            )}
        </header>
    );
};
