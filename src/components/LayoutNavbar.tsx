'use client';

import { useEffect, useState } from 'react';

import { Montserrat, Orbitron } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Load fonts from Google Fonts - reference these from props since we'll pass from layout
interface NavbarProps {
    orbitronClass: string;
    montserratClass: string;
}

// Navigation links for divisions (excluding AeroVista Complex which will be on the far right)
const divisions = [
    { name: 'SkyForge', path: '/divisions/skyforge', color: '#6A0DAD' },
    { name: 'Lumina', path: '/divisions/lumina', color: '#FFD700' },
    { name: 'Nexus', path: '/divisions/nexus', color: '#00FF7F' },
    { name: 'Horizon', path: '/divisions/horizon', color: '#87CEEB' },
    { name: 'Vespera', path: '/divisions/vespera', color: '#DC143C' },
    { name: 'Summit', path: '/divisions/summit', color: '#228B22' },
    { name: 'EchoVerse', path: '/divisions/echoverse', color: '#FF1493' }
];

// Enhanced Navbar Component with Cyberpunk flair and proper mobile support
export const LayoutNavbar = ({ orbitronClass, montserratClass }: NavbarProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Force close menu - more aggressive approach
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Navigate and close menu
    const handleNavigation = (path: string) => (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default link behavior
        closeMobileMenu();
        router.push(path);
    };

    // Handle menu toggle with stopPropagation
    const toggleMobileMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close menu on route change
    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    // Add global click handler to close menu (more aggressive approach)
    useEffect(() => {
        if (mobileMenuOpen) {
            const closeMenu = () => setMobileMenuOpen(false);
            document.addEventListener('click', closeMenu);
            return () => document.removeEventListener('click', closeMenu);
        }
    }, [mobileMenuOpen]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <header className='sticky top-0 z-50 border-b border-[#00AEEF]/50 bg-black/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md'>
            {/* Animated cyber line at the top - thinner */}
            <div className='relative h-[1px] w-full overflow-hidden bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent'>
                <div className='animate-cyberscan absolute h-full w-16 bg-white/80'></div>
            </div>

            <div className='container mx-auto px-4'>
                <nav className='relative flex h-12 items-center justify-between md:h-14'>
                    {/* Blurry background glow for the navigation bar */}
                    <div className='absolute inset-0 bg-[#00AEEF]/5 blur-md'></div>

                    {/* Logo with enhanced glow effect - more compact */}
                    <Link href='/' onClick={handleNavigation('/')} className='group relative z-10 flex items-center'>
                        <div className='relative'>
                            <span
                                className={`${orbitronClass} text-sm font-bold tracking-wider text-[#00AEEF] drop-shadow-[0_0_10px_rgba(0,174,239,0.8)] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(0,174,239,1)] md:text-base`}>
                                AEROVISTA
                            </span>
                            <div className='absolute -inset-1 rounded-lg bg-[#00AEEF]/20 opacity-40 blur-sm transition-all duration-300 group-hover:animate-pulse group-hover:bg-[#00AEEF]/40'></div>
                        </div>
                        {/* Small decorative circuit line */}
                        <div className='ml-3 hidden h-[1px] w-8 bg-gradient-to-r from-[#00AEEF] to-transparent md:block'></div>
                    </Link>

                    {/* Navigation Links with hover effects - smaller text */}
                    <div className='relative z-10 hidden space-x-4 md:flex'>
                        {divisions.map((div) => (
                            <Link
                                key={div.path}
                                href={div.path}
                                onClick={handleNavigation(div.path)}
                                className='group relative'>
                                <span
                                    className={`${montserratClass} relative z-10 text-xs text-[#C0C0C0] transition-colors group-hover:text-white`}
                                    style={{
                                        textShadow: `0 0 8px ${div.color}33`
                                    }}>
                                    {div.name}
                                </span>
                                {/* Hover line animation */}
                                <span
                                    className='absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full'
                                    style={{ backgroundColor: div.color }}></span>
                            </Link>
                        ))}
                    </div>

                    {/* AeroVista Complex button styled as a prominent cyberpunk element (far right) - more compact */}
                    <Link
                        href='/divisions/aerovista'
                        onClick={handleNavigation('/divisions/aerovista')}
                        className='group relative z-10 hidden items-center space-x-1 rounded border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-3 py-1 transition-all duration-300 hover:bg-[#00AEEF]/20 md:flex'>
                        <span
                            className={`${orbitronClass} text-xs text-[#00AEEF] transition-colors group-hover:text-white`}>
                            COMPLEX
                        </span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-3 w-3 text-[#00AEEF] transition-colors group-hover:text-white'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                        {/* Animated radar ping effect */}
                        <span className='absolute inset-0 scale-110 rounded border border-[#00AEEF]/0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:border-[#00AEEF]/50 group-hover:opacity-100'></span>
                        <span className='absolute inset-0 scale-120 rounded border border-[#00AEEF]/0 opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:border-[#00AEEF]/30 group-hover:opacity-100'></span>
                    </Link>

                    {/* Mobile Menu Button with enhanced styling - smaller */}
                    <div className='relative z-10 flex md:hidden'>
                        <button
                            onClick={toggleMobileMenu}
                            className='group relative overflow-hidden rounded border border-gray-700 bg-gray-900/70 p-1 text-gray-300 transition-colors hover:border-[#00AEEF]/50 hover:text-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                {mobileMenuOpen ? (
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
                            <span className='absolute inset-0 bg-[#00AEEF]/0 transition-colors group-hover:bg-[#00AEEF]/10'></span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Dropdown - Clicking Outside Closes Menu */}
            {mobileMenuOpen && (
                <div className='animate-slideDown fixed inset-0 z-40 md:hidden' onClick={closeMobileMenu}>
                    <div className='fixed inset-0 bg-black/60 backdrop-blur-md'></div>
                    <div
                        className='relative mt-[calc(12px+1px)] max-h-[70vh] overflow-y-auto border-t border-[#00AEEF]/30 bg-black/95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='space-y-4 p-4'>
                            {/* Mobile Division Links */}
                            <div className='grid grid-cols-2 gap-3'>
                                {divisions.map((div) => (
                                    <Link
                                        key={div.path}
                                        href={div.path}
                                        onClick={handleNavigation(div.path)}
                                        className={`block rounded-md border border-gray-800 p-3 transition-all ${
                                            pathname === div.path
                                                ? 'bg-gray-800/50 shadow-[0_0_8px_rgba(0,0,0,0.5)]'
                                                : 'hover:bg-gray-800/30'
                                        }`}>
                                        <div
                                            className='flex items-center'
                                            style={{
                                                borderLeft: `3px solid ${div.color}`,
                                                paddingLeft: '8px'
                                            }}>
                                            <div
                                                className='mr-2 h-2 w-2 rounded-full'
                                                style={{ backgroundColor: div.color }}></div>
                                            <span
                                                className={`${montserratClass} text-sm text-[#C0C0C0] group-hover:text-white`}>
                                                {div.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* AeroVista Complex Button (Featured) */}
                            <Link
                                href='/divisions/aerovista'
                                onClick={handleNavigation('/divisions/aerovista')}
                                className='group block w-full rounded-md border border-[#00AEEF]/40 bg-[#00AEEF]/10 p-3 text-center transition-all hover:bg-[#00AEEF]/20'>
                                <div className='flex items-center justify-center space-x-2'>
                                    <span className={`${orbitronClass} text-sm text-[#00AEEF]`}>AEROVISTA COMPLEX</span>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-4 w-4 text-[#00AEEF]'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M9 5l7 7-7 7'
                                        />
                                    </svg>
                                </div>
                            </Link>

                            {/* Other links */}
                            <div className='flex justify-around border-t border-[#00AEEF]/20 pt-4'>
                                <Link
                                    href='/about'
                                    onClick={handleNavigation('/about')}
                                    className='flex flex-col items-center p-2 text-[#C0C0C0] hover:text-white'>
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
                                            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                    <span className='mt-1 text-xs'>About</span>
                                </Link>
                                <Link
                                    href='/contact'
                                    onClick={handleNavigation('/contact')}
                                    className='flex flex-col items-center p-2 text-[#C0C0C0] hover:text-white'>
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
                                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                        />
                                    </svg>
                                    <span className='mt-1 text-xs'>Contact</span>
                                </Link>
                                <Link
                                    href='/services'
                                    onClick={handleNavigation('/services')}
                                    className='flex flex-col items-center p-2 text-[#C0C0C0] hover:text-white'>
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
                                            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                        />
                                    </svg>
                                    <span className='mt-1 text-xs'>Services</span>
                                </Link>
                            </div>

                            {/* Close button */}
                            <div className='flex justify-center pt-2'>
                                <button
                                    onClick={closeMobileMenu}
                                    className='rounded-md border border-[#00AEEF]/40 bg-gray-800/40 px-4 py-2 text-white hover:bg-gray-700/50'>
                                    Close Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom decorative elements - fewer and thinner */}
            <div className='flex h-[1px] items-center justify-around opacity-70'>
                <div className='h-full w-10 bg-[#00AEEF]/60'></div>
                <div className='h-full w-16 bg-[#00AEEF]/40'></div>
                <div className='h-full w-8 bg-[#00AEEF]/70'></div>
                <div className='h-full w-12 bg-[#00AEEF]/50'></div>
            </div>
        </header>
    );
};
