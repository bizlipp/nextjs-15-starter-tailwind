'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ForgeNavMenu from '../../components/ForgeNavMenu';
import GameCabinet from '../../components/GameCabinet';
import styles from './SkyForge.module.css';

const SkyforgePage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const [showReel, setShowReel] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showGameDetail, setShowGameDetail] = useState(false);
    const detailRef = useRef(null);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const projects = [
        {
            id: 'ascension',
            title: 'Ascension Awaits',
            description:
                'An epic journey through realms of fantasy and technology, where players forge their own destiny.',
            status: 'In Development',
            progress: 65
        },
        {
            id: 'nexus',
            title: 'Nexus Chronicles',
            description: 'A narrative-driven adventure at the intersection of ancient magic and futuristic technology.',
            status: 'Concept Phase',
            progress: 30
        },
        {
            id: 'ethereal',
            title: 'Ethereal Legends',
            description: 'Strategic combat meets immersive storytelling in this tactical RPG experience.',
            status: 'Planning',
            progress: 15
        }
    ];

    // Character animation states
    const [characterPos, setCharacterPos] = useState(50);
    const [isRunning, setIsRunning] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left

    // Handle selection of a game
    const selectGame = (game) => {
        if (selectedGame && selectedGame.id === game.id) {
            setShowGameDetail(false);
            setTimeout(() => setSelectedGame(null), 500);
        } else {
            setSelectedGame(game);
            setShowGameDetail(true);
        }
    };

    // Handle keyboard navigation for character
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setDirection(1);
                setIsRunning(true);
            } else if (e.key === 'ArrowLeft') {
                setDirection(-1);
                setIsRunning(true);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                setIsRunning(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Move character based on running state
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setCharacterPos((prev) => {
                const newPos = prev + direction * 2;
                return Math.min(Math.max(newPos, 0), 100);
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, [isRunning, direction]);

    // Auto-scroll to detail view when a game is selected
    useEffect(() => {
        if (showGameDetail && detailRef.current) {
            setTimeout(() => {
                detailRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [showGameDetail]);

    return (
        <div className={styles.skyforgeContainer}>
            {/* Entrance Animation Overlay */}
            <div className={`${styles.entranceOverlay} ${isLoaded ? styles.fadeOut : ''}`}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logoText}>SkyForge</h1>
                    <div className={styles.forgeEmbers}></div>
                </div>
            </div>

            {/* Main Content */}
            <main className={`${styles.mainContent} px-4 md:px-8`}>
                {/* Hero Section */}
                <section className={`${styles.heroSection} py-8 md:py-16`}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.titleForge}>Sky</span>
                            <span className={styles.titleSky}>Forge</span>
                        </h1>
                        <h2 className={`${styles.heroSubtitle} text-xl md:text-2xl`}>Creative Studios</h2>
                        <p className={`${styles.heroTagline} text-sm md:text-base`}>
                            Forging Digital Worlds Through Creativity and Innovation
                        </p>

                        <div className={`${styles.heroCta} flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3`}>
                            <button
                                className={`${styles.primaryButton} w-full px-4 py-2 text-sm sm:w-auto md:text-base`}
                                onClick={() => setShowReel(true)}>
                                <span className={styles.buttonGlow}></span>
                                Watch Studio Reel
                            </button>
                            <Link
                                href='/projects'
                                className={`${styles.secondaryButton} w-full px-4 py-2 text-center text-sm sm:w-auto md:text-base`}>
                                Explore Projects
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.heroVisual} mt-6 md:mt-0`}>
                        <div className={styles.forgeAnimation}>
                            {/* Digital forge animation container */}
                            <div className={styles.forgeFire}></div>
                            <div className={styles.forgeAnvil}></div>
                            <div className={styles.forgeEmbers}></div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className={`${styles.aboutSection} py-8 md:py-16`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={`${styles.sectionTitle} text-2xl md:text-3xl`}>About The Studio</h2>
                        <div className={styles.sectionDivider}></div>
                    </div>
                    <div className={`${styles.aboutContent} flex-col md:flex-row`}>
                        <div className={`${styles.aboutText} mb-6 text-sm md:mb-0 md:text-base`}>
                            <p className='mb-3'>
                                SkyForge Creative Studios specializes in game development and interactive storytelling,
                                pushing the boundaries of what's possible in digital entertainment.
                            </p>
                            <p className='mb-3'>
                                Our team of designers, developers, and storytellers work collaboratively to create
                                immersive experiences that blend innovative gameplay, captivating narratives, and
                                stunning visuals.
                            </p>
                            <p>
                                As part of the AeroVista LLC family, we leverage cutting-edge technology and creative
                                vision to forge worlds that players can lose themselves in.
                            </p>
                        </div>
                        <div className={`${styles.studioStats} grid grid-cols-1 gap-4 sm:grid-cols-3`}>
                            <div className={`${styles.statCard} p-3 md:p-4`}>
                                <div className={styles.statIcon}>🎮</div>
                                <div className={`${styles.statNumber} text-xl md:text-2xl`}>12+</div>
                                <div className={`${styles.statLabel} text-xs md:text-sm`}>Games in Development</div>
                            </div>
                            <div className={`${styles.statCard} p-3 md:p-4`}>
                                <div className={styles.statIcon}>👨‍💻</div>
                                <div className={`${styles.statNumber} text-xl md:text-2xl`}>30+</div>
                                <div className={`${styles.statLabel} text-xs md:text-sm`}>Creative Minds</div>
                            </div>
                            <div className={`${styles.statCard} p-3 md:p-4`}>
                                <div className={styles.statIcon}>🏆</div>
                                <div className={`${styles.statNumber} text-xl md:text-2xl`}>8</div>
                                <div className={`${styles.statLabel} text-xs md:text-sm`}>Industry Awards</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <section className={`${styles.projectsSection} py-8 md:py-16`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={`${styles.sectionTitle} text-2xl md:text-3xl`}>Featured Projects</h2>
                        <div className={styles.sectionDivider}></div>
                    </div>

                    <div
                        className={`${styles.projectShowcase} grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3`}>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`${styles.projectCard} ${activeProject === project.id ? styles.activeProject : ''} p-3 md:p-5`}
                                onClick={() => setActiveProject(project.id === activeProject ? null : project.id)}>
                                <div
                                    className={`${styles.projectHeader} flex-col items-start sm:flex-row sm:items-center`}>
                                    <h3 className={`${styles.projectTitle} mb-1 text-lg sm:mb-0 md:text-xl`}>
                                        {project.title}
                                    </h3>
                                    <span className={`${styles.projectStatus} px-2 py-1 text-xs`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className={styles.projectContent}>
                                    <p className={`${styles.projectDescription} my-3 text-sm`}>{project.description}</p>
                                    <div className={styles.projectProgress}>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                        <span className={`${styles.progressText} text-xs`}>
                                            {project.progress}% Complete
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles.projectExpand} mt-3 text-sm`}>
                                    {activeProject === project.id ? (
                                        <span>Close Details</span>
                                    ) : (
                                        <span>View Details</span>
                                    )}
                                </div>

                                {/* Expanded Project Content */}
                                {activeProject === project.id && (
                                    <div className={`${styles.expandedProject} mt-4 pt-4`}>
                                        <div
                                            className={`${styles.projectGallery} grid grid-cols-1 gap-3 sm:grid-cols-2`}>
                                            {/* Placeholder for project images/videos */}
                                            <div className={styles.galleryItem}></div>
                                            <div className={styles.galleryItem}></div>
                                        </div>
                                        <div className={`${styles.projectDetails} mt-4 text-sm`}>
                                            <h4 className='mb-2 text-base md:text-lg'>Development Team</h4>
                                            <p className='mb-3'>
                                                A dedicated team of artists, programmers, and designers bringing this
                                                vision to life.
                                            </p>
                                            <div className={`${styles.projectTags} flex flex-wrap gap-2`}>
                                                {['RPG', 'Adventure', 'Fantasy', 'Action'].map((tag) => (
                                                    <span key={tag} className={`${styles.tag} px-2 py-1 text-xs`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Game Cabinet Section */}
                <section className={`${styles.gameCabinetSection} py-8 md:py-16`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={`${styles.sectionTitle} text-2xl md:text-3xl`}>Game Library</h2>
                        <div className={styles.sectionDivider}></div>
                    </div>
                    <p className={`${styles.sectionDesc} mx-auto mb-8 max-w-3xl text-center text-sm md:text-base`}>
                        Explore our collection of completed and in-progress game projects. Click on a title to learn
                        more about each unique gaming experience.
                    </p>
                    <div className={styles.cabinetContainer}>
                        <GameCabinet />
                    </div>
                </section>
            </main>

            {/* Studio Reel Modal */}
            {showReel && (
                <div className={styles.videoModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeModal} onClick={() => setShowReel(false)}>
                            ✕
                        </button>
                        <div className={styles.videoContainer}>
                            {/* Video placeholder - would be replaced with actual video component */}
                            <div className={styles.videoPlaceholder}>
                                <div className={styles.playButton}></div>
                                <span>SkyForge Studio Reel</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Menu */}
            <ForgeNavMenu />

            {/* Footer */}
            <footer className={`${styles.footer} px-4 py-6 text-center text-sm md:py-8`}>
                <p>
                    © {new Date().getFullYear()} SkyForge Creative Studios - A division of AeroVista LLC. All rights
                    reserved.
                </p>
            </footer>

            {/* Game detail section */}
            {selectedGame && (
                <section
                    ref={detailRef}
                    className={`relative mx-auto max-w-5xl px-4 py-6 transition-all duration-500 md:px-8 md:py-12 ${showGameDetail ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='rounded-xl border border-purple-500/30 bg-gray-800/70 p-4 shadow-lg shadow-purple-500/10 backdrop-blur-sm md:p-8'>
                        <div className='flex flex-col gap-6 md:flex-row'>
                            <div className='relative h-48 overflow-hidden rounded-lg md:h-auto md:w-1/3'>
                                <Image
                                    src={selectedGame.imageUrl}
                                    alt={selectedGame.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            <div className='md:w-2/3'>
                                <div className='mb-3 flex flex-col items-start justify-between md:mb-4 md:flex-row md:items-center'>
                                    <h2 className='text-2xl font-bold text-purple-300 md:text-3xl'>
                                        {selectedGame.title}
                                    </h2>
                                    <span className='mt-1 rounded-full border border-purple-500/30 bg-purple-900/50 px-3 py-1 text-xs md:mt-0'>
                                        {selectedGame.status}
                                    </span>
                                </div>

                                <p className='mb-4 text-sm text-gray-300 md:mb-6 md:text-base'>
                                    {selectedGame.description}
                                </p>

                                <h3 className='mb-2 text-sm font-semibold text-purple-300 md:text-base'>
                                    Key Features:
                                </h3>
                                <ul className='mb-4 space-y-1 md:mb-6'>
                                    {selectedGame.features.map((feature, index) => (
                                        <li key={index} className='flex items-start text-xs text-gray-400 md:text-sm'>
                                            <svg
                                                className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-purple-500'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M5 13l4 4L19 7'
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => setShowGameDetail(false)}
                                        className='rounded-lg bg-purple-900 px-3 py-1 text-xs text-purple-100 transition-colors hover:bg-purple-800 md:px-4 md:py-2 md:text-sm'>
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default SkyforgePage;
