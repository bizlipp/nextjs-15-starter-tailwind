'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

/**
 * A futuristic cyberpunk-inspired door that opens to reveal the AeroVista reception area.
 */
export default function DoorWithView() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [accessText, setAccessText] = useState('');
    const [currentTime, setCurrentTime] = useState('--:-- --');

    // Update time only on the client side to avoid hydration mismatch
    useEffect(() => {
        // Initial time set
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Update time every minute
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000);

        return () => clearInterval(timeInterval);
    }, []);

    // Open the door & sync background visibility
    const handleDoorClick = () => {
        setIsOpen(true);
        setShowBackground(true); // Show background immediately

        // Simulate access verification
        setAccessText('SCANNING');

        setTimeout(() => {
            setAccessText('ACCESS GRANTED');

            // Auto-close the door after 5 seconds
            setTimeout(() => {
                setIsOpen(false);

                // Delay hiding the background until the door fully closes
                setTimeout(() => {
                    setShowBackground(false);
                    setAccessText('');
                }, 1500); // Matches the door's closing speed
            }, 5000);
        }, 800);
    };

    return (
        <div
            className='relative flex flex-col items-center'
            style={{
                width: '400px',
                height: '280px',
                perspective: '1000px'
            }}>
            {/* Digital noise overlay */}
            <div className='bg-noise pointer-events-none absolute inset-0 z-40 opacity-5'></div>

            {/* Scan lines */}
            <div className='bg-scanlines pointer-events-none absolute inset-0 z-40 opacity-10'></div>

            {/* Wrapper container for the image and door */}
            <div className='relative h-full w-full overflow-hidden rounded-sm border border-[#00AEEF]/40 shadow-[0_0_20px_rgba(0,174,239,0.3)]'>
                {/* Background / reception area view behind the door */}
                <Link href='/divisions/aerovista'>
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out ${
                            showBackground
                                ? 'scale-[1.15] cursor-pointer opacity-100'
                                : 'pointer-events-none scale-[1] opacity-0'
                        }`}
                        style={{
                            // Replace the missing image with a styled background
                            background: 'radial-gradient(circle at center, #001a33 0%, #000a14 70%, #000510 100%)',
                            boxShadow: 'inset 0 0 50px rgba(0, 174, 239, 0.3)'
                        }}>
                        {/* Add some visual elements to simulate a reception area */}
                        <div className='absolute top-[30%] left-[30%] h-[40%] w-[40%] border border-[#00AEEF]/30 bg-black/40 backdrop-blur-sm'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='text-center'>
                                    <div className="font-['Orbitron'] text-sm text-[#00AEEF]">RECEPTION</div>
                                    <div className="mt-2 font-['Montserrat'] text-xs text-[#C0C0C0]">Level 1</div>
                                </div>
                            </div>
                        </div>
                        {/* Floor lines */}
                        <div className='absolute right-[10%] bottom-[20%] left-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#00AEEF]/40 to-transparent'></div>
                        <div className='absolute right-[5%] bottom-[40%] left-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#00AEEF]/20 to-transparent'></div>
                    </div>
                </Link>

                {/* Cyberpunk doorframe - left edge */}
                <div className='absolute top-0 left-0 z-10 h-full w-[calc(32%-20px)] border-r-2 border-[#00AEEF] bg-gradient-to-r from-gray-900 to-gray-800 shadow-[0_0_10px_rgba(0,174,239,0.4)]' />

                {/* Cyberpunk doorframe - right edge */}
                <div className='absolute top-0 right-0 z-10 h-full w-[calc(32%-20px)] border-l-2 border-[#00AEEF] bg-gradient-to-r from-gray-800 to-gray-900 shadow-[0_0_10px_rgba(0,174,239,0.4)]' />

                {/* The main entrance door */}
                <div
                    onClick={handleDoorClick}
                    className={`absolute top-0 left-1/2 z-20 h-full w-[200px] origin-left -translate-x-1/2 transform transform-gpu cursor-pointer border-2 border-[#00AEEF] bg-gradient-to-br from-gray-800 to-gray-900 shadow-[0_0_15px_rgba(0,174,239,0.6)] transition-all transition-transform duration-300 duration-[1500ms] ease-in-out hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,174,239,0.9)]`}
                    style={{
                        transform: isOpen ? 'rotateY(-98deg)' : 'rotateY(0deg)',
                        boxShadow: '12px 0 15px rgba(0, 174, 239, 0.5)' // Neon glow effect
                    }}>
                    {/* AeroVista Logo on Door */}
                    <div className='absolute top-1/4 left-1/2 -translate-x-1/2 transform text-center'>
                        <div className="font-['Orbitron'] text-xl leading-tight tracking-widest text-[#00AEEF]">
                            AERO
                            <br />
                            VISTA
                        </div>
                        <div className="mt-1 font-['Montserrat'] text-xs text-[#C0C0C0]">MAIN ENTRANCE</div>
                    </div>

                    {/* Door Handle */}
                    <div
                        className='absolute top-1/2 right-3 h-8 w-4 rounded-full border border-[#00AEEF] bg-gray-900 shadow-[0_0_10px_rgba(0,174,239,0.7)]'
                        style={{ transform: 'translateY(-50%)' }}>
                        <div className='absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#00AEEF]'></div>
                    </div>

                    {/* Biometric Scanner */}
                    <div className='absolute bottom-20 left-1/2 flex h-8 w-20 -translate-x-1/2 transform items-center justify-center overflow-hidden rounded border border-[#00AEEF]'>
                        <div
                            className={`font-['Orbitron'] text-xs ${accessText ? 'text-green-400' : 'text-[#00AEEF]'}`}>
                            {accessText || 'TOUCH ID'}
                        </div>
                        {/* Scanner light effect */}
                        {accessText === 'SCANNING' && (
                            <div className='animate-scan absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-[#00AEEF]/30 to-transparent'></div>
                        )}
                    </div>
                </div>

                {/* Environment details */}
                <div className="absolute bottom-2 left-2 z-5 font-['Montserrat'] text-[10px] text-[#00AEEF]/70">
                    <div>ENV.TEMP: 22.4°C</div>
                    <div>SECURITY: ACTIVE</div>
                </div>

                <div className="absolute right-2 bottom-2 z-5 text-right font-['Montserrat'] text-[10px] text-[#00AEEF]/70">
                    <div>VISITORS: 37</div>
                    <div>TIME: {currentTime}</div>
                </div>
            </div>
        </div>
    );
}
