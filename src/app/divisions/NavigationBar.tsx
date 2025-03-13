import { useState } from 'react';

import Link from 'next/link';

import ThemeSwitch from '@/app/divisions/ThemeSwitch';

const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <nav className='relative z-50'>
            {/* Main Navigation Bar */}
            <div className='flex w-full items-center justify-between gap-2 border-b border-[#00AEEF]/30 bg-black/80 px-4 py-2 backdrop-blur-md'>
                {/* Logo/Home Link */}
                <Link href='/' className='flex items-center'>
                    <span className="mr-2 font-['Orbitron'] text-lg tracking-wider text-[#00AEEF]">AEROVISTA</span>
                </Link>

                {/* Division Dropdown Toggle */}
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center space-x-1 font-['Montserrat'] text-sm text-[#C0C0C0] transition-colors hover:text-[#00AEEF]">
                        <span>Divisions</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                    </button>

                    <ThemeSwitch />

                    <Link href='https://github.com/SiddharthaMaity/nextjs-15-starter-tailwind' target='_blank'>
                        {/* prettier-ignore */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='size-6' viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
                    </Link>
                </div>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div className='animate-slideIn absolute right-0 z-50 mt-1 w-64 rounded-md border border-[#00AEEF]/30 bg-gray-900/90 px-1 py-2 shadow-[0_0_15px_rgba(0,174,239,0.3)] backdrop-blur-md'>
                    <div className='py-1'>
                        {divisions.map((division, index) => (
                            <Link key={index} href={division.path} onClick={() => setMenuOpen(false)}>
                                <div
                                    className='group flex items-center rounded-sm px-3 py-2 hover:bg-gray-800/70'
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
        </nav>
    );
};

export default NavigationBar;
