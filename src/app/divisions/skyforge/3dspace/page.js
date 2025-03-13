'use client';

import { useEffect, useState } from 'react';
import React from 'react';

export default function SkyForgeHQ() {
    const [rotateY, setRotateY] = useState(0);
    const [rotateX, setRotateX] = useState(0);
    const [sparks, setSparks] = useState(false);
    const [forgeActive, setForgeActive] = useState(false);
    const [embersVisible, setEmbersVisible] = useState(false);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;
        setRotateY(x * 10);
        setRotateX(y * 10);
    };

    const triggerSparks = () => {
        setSparks(true);
        setForgeActive(true);
        setTimeout(() => {
            setSparks(false);
            setTimeout(() => setEmbersVisible(true), 300);
        }, 700);
    };

    useEffect(() => {
        if (embersVisible) {
            const timeout = setTimeout(() => {
                setEmbersVisible(false);
                setForgeActive(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [embersVisible]);

    const cuboidDepth = 800;
    const wallWidth = 100;
    const wallHeight = 100;
    const wallLeft = (100 - wallWidth) / 2;
    const wallTop = (100 - wallHeight) / 2;

    return (
        <div className='relative min-h-screen overflow-hidden bg-black text-white'>
            <div className='absolute inset-0 z-0 bg-gradient-to-br from-[#6A0DAD] via-black to-[#FF0090] opacity-70' />

            <div className='absolute inset-0 z-0 opacity-30 mix-blend-screen'>
                <div className='absolute inset-0 bg-[url("/images/skyfwrap.webp")] bg-cover bg-center opacity-20' />
            </div>

            <div className='absolute top-10 right-0 left-0 z-10 flex flex-col items-center justify-center'>
                <h1 className='font-orbitron mb-2 text-6xl font-bold tracking-wider text-white'>
                    <span className='text-shadow-glow-purple'>SkyForge</span>
                    <span className='font-light'> Creative Studios</span>
                </h1>
                <p className='font-montserrat max-w-2xl text-center text-xl text-[#FF90E8] opacity-80'>
                    Where digital worlds are forged through creativity and innovation
                </p>
            </div>

            <div className='flex min-h-screen items-center justify-center overflow-hidden bg-transparent text-white'>
                <div
                    className='relative h-screen w-full'
                    style={{ perspective: '250px' }}
                    onMouseMove={handleMouseMove}>
                    <div
                        className='relative h-full w-full transition-transform duration-300 ease-out'
                        style={{
                            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                            transformStyle: 'preserve-3d'
                        }}>
                        <div
                            className='absolute'
                            style={{
                                width: `${wallWidth}%`,
                                height: `${wallHeight}%`,
                                left: `${wallLeft}%`,
                                top: `${wallTop}%`,
                                transform: `translateZ(-${cuboidDepth}px)`,
                                backgroundImage: 'url("/images/skyf360.webp")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                boxShadow: 'inset 0 0 100px rgba(106, 13, 173, 0.8)'
                            }}></div>

                        <div
                            className='absolute top-0 bottom-0 left-0'
                            style={{
                                width: `${cuboidDepth}px`,
                                transform: 'rotateY(90deg)',
                                backgroundColor: 'rgba(106, 13, 173, 0.15)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid #6A0DAD',
                                boxShadow: 'inset 0 0 50px rgba(255, 0, 144, 0.3)'
                            }}></div>

                        <div
                            className='absolute top-0 right-0 bottom-0'
                            style={{
                                width: `${cuboidDepth}px`,
                                transform: 'rotateY(-90deg)',
                                backgroundColor: 'rgba(255, 0, 144, 0.15)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid #FF0090',
                                boxShadow: 'inset 0 0 50px rgba(106, 13, 173, 0.3)'
                            }}></div>

                        <div
                            className='absolute right-0 bottom-0 left-0'
                            style={{
                                height: `${cuboidDepth}px`,
                                backgroundImage: 'url("/images/skyfloor.jpg")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                transform: 'rotateX(90deg)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid #FF0090',
                                boxShadow: forgeActive
                                    ? 'inset 0 0 100px rgba(255, 144, 232, 0.8)'
                                    : 'inset 0 0 50px rgba(255, 144, 232, 0.4)'
                            }}></div>

                        <div
                            className='absolute top-0 right-0 left-0'
                            style={{
                                height: `${cuboidDepth}px`,
                                transform: 'rotateX(-90deg)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid #6A0DAD',
                                backgroundImage:
                                    'radial-gradient(circle, rgba(106, 13, 173, 0.2) 0%, rgba(0, 0, 0, 0.3) 70%)',
                                boxShadow: 'inset 0 0 50px rgba(106, 13, 173, 0.2)'
                            }}></div>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-center'>
                <div className={`mb-4 transition-all duration-500 ${forgeActive ? 'scale-110' : 'scale-100'}`}>
                    <svg width='80' height='80' viewBox='0 0 80 80' className='mx-auto'>
                        <defs>
                            <filter id='anvil-glow' x='-50%' y='-50%' width='200%' height='200%'>
                                <feGaussianBlur stdDeviation={forgeActive ? '4' : '2'} />
                            </filter>
                        </defs>
                        <path
                            d='M15,60 L65,60 L60,40 L50,35 L50,25 L40,20 L30,25 L30,35 L20,40 Z'
                            fill={forgeActive ? '#FF0090' : '#6A0DAD'}
                            stroke='white'
                            strokeWidth='1'
                            className='transition-all duration-300'
                        />
                        <circle
                            cx='40'
                            cy='40'
                            r={forgeActive ? '15' : '10'}
                            fill={forgeActive ? '#FF90E8' : '#9B59B6'}
                            filter='url(#anvil-glow)'
                            className='transition-all duration-300'
                        />
                    </svg>
                </div>
                <button
                    className={`rounded-lg px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 ${
                        forgeActive
                            ? 'bg-[#FF0090] shadow-[0_0_15px_rgba(255,0,144,0.7)]'
                            : 'bg-[#6A0DAD] hover:bg-[#9B59B6]'
                    } active:scale-95`}
                    onClick={triggerSparks}>
                    {forgeActive ? 'Forging...' : 'Strike the Anvil'}
                </button>
            </div>

            {sparks && (
                <div className='animate-fadeOut pointer-events-none absolute inset-0 z-30'>
                    <div className='absolute inset-0 bg-[url("/images/skyfd.webp")] bg-cover bg-center opacity-80' />
                </div>
            )}

            {embersVisible && (
                <div className='pointer-events-none absolute inset-0 z-20'>
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className='absolute rounded-full'
                            style={{
                                width: `${Math.random() * 10 + 3}px`,
                                height: `${Math.random() * 10 + 3}px`,
                                backgroundColor: i % 2 === 0 ? '#FF0090' : '#6A0DAD',
                                boxShadow: `0 0 ${Math.random() * 5 + 5}px ${i % 2 === 0 ? '#FF0090' : '#6A0DAD'}`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.7 + 0.3,
                                animation: `float ${Math.random() * 3 + 2}s ease-out forwards`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className='pointer-events-none absolute inset-0 z-10'>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute opacity-30'
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random() * 0.5 + 0.5})`,
                            animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`
                        }}>
                        <svg width='40' height='40' viewBox='0 0 40 40'>
                            <polygon
                                points='20,5 35,15 35,25 20,35 5,25 5,15'
                                fill='none'
                                stroke={i % 2 === 0 ? '#FF0090' : '#6A0DAD'}
                                strokeWidth='1'
                                opacity='0.7'
                            />
                            <text
                                x='20'
                                y='23'
                                textAnchor='middle'
                                fill={i % 2 === 0 ? '#FF0090' : '#6A0DAD'}
                                fontSize='8'
                                fontFamily='monospace'>
                                {i % 3 === 0 ? '010' : i % 3 === 1 ? '101' : '001'}
                            </text>
                        </svg>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .text-shadow-glow-purple {
                    text-shadow:
                        0 0 10px rgba(106, 13, 173, 0.7),
                        0 0 20px rgba(255, 0, 144, 0.5);
                }

                @font-face {
                    font-family: 'Orbitron';
                    src: url('/fonts/Orbitron-Regular.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }

                @font-face {
                    font-family: 'Montserrat';
                    src: url('/fonts/Montserrat-Regular.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }

                .font-orbitron {
                    font-family: 'Orbitron', sans-serif;
                }

                .font-montserrat {
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>
        </div>
    );
}
