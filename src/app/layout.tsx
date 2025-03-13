import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Montserrat, Orbitron } from 'next/font/google';
import Link from 'next/link';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { LayoutNavbar } from '@/components/LayoutNavbar';
import { AuthProvider } from '@/context/AuthContext';

// Load fonts from Google Fonts
const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    display: 'swap',
    weight: ['400', '500', '600', '700']
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
    weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'AeroVista',
    description: 'Where Vision Takes Flight',
    keywords: 'AeroVista, cyberpunk, digital, creative, technology, multimedia',
    authors: [{ name: 'AeroVista LLC', url: 'https://aerovista.com' }],
    openGraph: {
        title: 'AeroVista - Where Vision Takes Flight',
        description: 'Multimedia and technology production across gaming, publishing, music, and immersive media',
        siteName: 'AeroVista LLC',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AeroVista LLC'
            }
        ]
    }
};

// Main Layout Component
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${orbitron.variable} ${montserrat.variable} bg-background text-foreground antialiased`}>
                <ThemeProvider attribute='class'>
                    <AuthProvider>
                        <div className='flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-black text-white'>
                            {/* Digital noise and scanline overlays */}
                            <div className='bg-noise pointer-events-none fixed inset-0 z-0 opacity-5'></div>
                            <div className='bg-scanlines pointer-events-none fixed inset-0 z-0 opacity-10'></div>

                            {/* Global Navigation - Using client component */}
                            <LayoutNavbar orbitronClass={orbitron.className} montserratClass={montserrat.className} />

                            {/* Main Content */}
                            <main className='relative z-10 flex-grow'>{children}</main>

                            {/* Footer - Sleeker version */}
                            <footer className='relative z-10 border-t border-[#00AEEF]/30 bg-black/80 py-3 backdrop-blur-sm'>
                                <div className='container mx-auto px-4'>
                                    <div className='flex flex-row items-center justify-between text-xs'>
                                        <div className='flex items-center space-x-2'>
                                            <div className='h-6 w-[1px] bg-[#00AEEF]/50'></div>
                                            <div>
                                                <h2 className={`text-sm ${orbitron.className} text-[#00AEEF]`}>
                                                    AEROVISTA LLC
                                                </h2>
                                                <p className={`text-xs ${montserrat.className} text-[#C0C0C0]`}>
                                                    Where Vision Takes Flight
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <a
                                                href='#'
                                                className='text-xs text-[#00AEEF] transition-colors hover:text-[#00AEEF]/70'>
                                                <span>Privacy</span>
                                            </a>
                                            <a
                                                href='#'
                                                className='text-xs text-[#00AEEF] transition-colors hover:text-[#00AEEF]/70'>
                                                <span>Terms</span>
                                            </a>
                                            <a
                                                href='#'
                                                className='text-xs text-[#00AEEF] transition-colors hover:text-[#00AEEF]/70'>
                                                <span>Contact</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='mt-2 text-center text-[10px] text-gray-500'>
                                        <p>© {new Date().getFullYear()} AeroVista LLC. All rights reserved.</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
