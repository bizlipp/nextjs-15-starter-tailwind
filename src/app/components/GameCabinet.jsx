'use client';

import React, { useEffect, useState } from 'react';

import styles from './GameCabinet.module.css';

const GameCabinet = ({
    gameTitle = 'Ascension Awaits',
    isPowered = false,
    showMenu = false,
    selectedOption = 0,
    currentScreen = 'game'
}) => {
    // Internal state management
    const [demoStationPowered, setDemoStationPowered] = useState(isPowered);
    const [demoLoadingPhase, setDemoLoadingPhase] = useState(0); // 0: off, 1: booting, 2: menu, 3: game
    const [selectedDemoMenuItem, setSelectedDemoMenuItem] = useState(selectedOption);
    const [demoMenuOpen, setDemoMenuOpen] = useState(showMenu);
    const [playTrailer, setPlayTrailer] = useState(false);
    const [currentView, setCurrentView] = useState(currentScreen);
    const demoMenuItems = ['Ascension Awaits Demo', 'Game Info', 'Controls', 'Settings'];

    // Sync with external props
    useEffect(() => {
        setDemoStationPowered(isPowered);
    }, [isPowered]);

    useEffect(() => {
        setDemoMenuOpen(showMenu);
    }, [showMenu]);

    useEffect(() => {
        setSelectedDemoMenuItem(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        setCurrentView(currentScreen);
        // Map currentScreen to appropriate loading phase
        if (currentScreen === 'off') {
            setDemoLoadingPhase(0);
        } else if (currentScreen === 'boot') {
            setDemoLoadingPhase(1);
        } else if (currentScreen === 'menu' || currentScreen === 'settings' || currentScreen === 'highscores') {
            setDemoLoadingPhase(2);
        } else if (currentScreen === 'game') {
            setDemoLoadingPhase(3);
        }
    }, [currentScreen]);

    // Demo station boot sequence
    useEffect(() => {
        if (demoStationPowered) {
            // Start boot sequence
            setDemoLoadingPhase(1);
            const bootTimer = setTimeout(() => {
                setDemoLoadingPhase(2); // Move to menu phase after boot
            }, 3000);
            return () => clearTimeout(bootTimer);
        } else {
            setDemoLoadingPhase(0);
            setDemoMenuOpen(false);
        }
    }, [demoStationPowered]);

    const toggleTrailer = () => {
        if (!demoStationPowered) {
            setPlayTrailer(!playTrailer);
        }
    };

    const toggleDemoPower = () => {
        if (playTrailer) {
            setPlayTrailer(false); // Turn off trailer if it's playing
        }
        setDemoStationPowered(!demoStationPowered);
    };

    const toggleDemoMenu = () => {
        if (demoLoadingPhase >= 2) {
            // Only work if booted
            setDemoMenuOpen(!demoMenuOpen);
        }
    };

    const selectDemoMenuItem = (index) => {
        setSelectedDemoMenuItem(index);
        if (index === 0) {
            // Launch demo
            setDemoLoadingPhase(3); // Game running state
            setDemoMenuOpen(false);
        }
    };

    const navigateDemoMenu = (direction) => {
        if (demoMenuOpen) {
            let newIndex = selectedDemoMenuItem;
            if (direction === 'up') {
                newIndex = (selectedDemoMenuItem - 1 + demoMenuItems.length) % demoMenuItems.length;
            } else if (direction === 'down') {
                newIndex = (selectedDemoMenuItem + 1) % demoMenuItems.length;
            }
            setSelectedDemoMenuItem(newIndex);
        }
    };

    const handleDemoBack = () => {
        if (demoLoadingPhase === 3) {
            // If in game
            setDemoLoadingPhase(2); // Return to menu
        } else if (demoMenuOpen) {
            setDemoMenuOpen(false);
        }
    };

    // Determine what to show in the main display area
    const renderMainDisplay = () => {
        if (demoStationPowered) {
            // Show content based on current screen state
            if (currentView === 'boot' || demoLoadingPhase === 1) {
                return (
                    <div className={styles.demoScreen}>
                        <div className={styles.bootSequence}>
                            <div className={styles.loadingBar}></div>
                            <p>Initializing Demo Environment...</p>
                        </div>
                    </div>
                );
            }

            if (demoMenuOpen || currentView === 'menu') {
                return (
                    <div className={styles.demoScreen}>
                        <div className={styles.demoMenu}>
                            <h4>Game Options</h4>
                            <ul>
                                {demoMenuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={index === selectedDemoMenuItem ? styles.menuItemSelected : ''}
                                        onClick={() => selectDemoMenuItem(index)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            }

            if (currentView === 'settings') {
                return (
                    <div className={styles.demoScreen}>
                        <div className={styles.settingsScreen}>
                            <h3>Settings</h3>
                            <div className={styles.settingsContent}>
                                <div className={styles.settingItem}>
                                    <span>Display: Full Screen</span>
                                </div>
                                <div className={styles.settingItem}>
                                    <span>Audio: Enabled</span>
                                </div>
                                <div className={styles.settingItem}>
                                    <span>Difficulty: Normal</span>
                                </div>
                                <div className={styles.settingItem}>
                                    <span>Controls: Standard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            if (currentView === 'highscores') {
                return (
                    <div className={styles.demoScreen}>
                        <div className={styles.highScoresScreen}>
                            <h3>High Scores</h3>
                            <div className={styles.scoreTable}>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRank}>1</span>
                                    <span className={styles.scoreName}>CYB3R</span>
                                    <span className={styles.scoreValue}>9,850</span>
                                </div>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRank}>2</span>
                                    <span className={styles.scoreName}>NEON</span>
                                    <span className={styles.scoreValue}>8,720</span>
                                </div>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRank}>3</span>
                                    <span className={styles.scoreName}>PULSE</span>
                                    <span className={styles.scoreValue}>7,540</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            if (currentView === 'game' || demoLoadingPhase === 3) {
                return (
                    <div className={styles.demoScreen}>
                        <div className={styles.demoRunning}>
                            <h3>Demo Running</h3>
                            <p>Playing: {gameTitle}</p>
                            <div className={styles.gamePlaceholder}>
                                <div className={styles.gameCharacter}></div>
                            </div>
                        </div>
                    </div>
                );
            }

            // Default idle screen
            return (
                <div className={styles.demoScreen}>
                    <div className={styles.demoIdle}>
                        <div className={styles.gameTitle}>{gameTitle}</div>
                        <p className={styles.pressStart}>Press MENU to start</p>
                    </div>
                </div>
            );
        } else if (playTrailer) {
            // Show trailer if it's playing and demo is not powered
            return (
                <div className={styles.trailerContainer}>
                    <button className={styles.closeTrailer} onClick={toggleTrailer}>
                        ×
                    </button>
                    <div className={styles.videoPlaceholder}>
                        {/* Video trailer would be embedded here */}
                        <p>Game Trailer Playing</p>
                    </div>
                </div>
            );
        } else {
            // Default diorama view
            return (
                <div className={styles.diorama}>
                    {/* 3D Diorama content would go here */}
                    <div className={styles.dioramaScene}></div>
                    <button className={styles.infoButton}>+</button>
                    <button className={styles.anvilIcon} onClick={toggleTrailer}>
                        <span className={styles.anvilSvg}>⚒️</span>
                    </button>
                </div>
            );
        }
    };

    return (
        <div className={styles.cabinetWithBase}>
            <div className={styles.gameCabinetContainer}>
                {/* Title Section */}
                <div className={`${styles.titleSection} ${demoStationPowered ? styles.portalActive : ''}`}>
                    <h3 className={styles.cabinetTitle}>Demo Experience</h3>
                    <div className={styles.titleAccent}></div>
                </div>

                {/* Main Display */}
                <div className={styles.displayScreen}>{renderMainDisplay()}</div>

                {/* Controls Panel */}
                <div className={styles.controlsPanel}>
                    <div className={styles.demoControls}>
                        {/* Power Button */}
                        <div className={styles.powerSection}>
                            <button
                                className={`${styles.powerButton} ${demoStationPowered ? styles.powerActive : ''}`}
                                onClick={toggleDemoPower}
                                aria-label='Power on/off demo station'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M12 2V12M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </button>
                            <span className={styles.buttonLabel}>POWER</span>
                        </div>

                        <div className={styles.controlsRow}>
                            <button
                                className={`${styles.demoButton} ${demoMenuOpen ? styles.activeButton : ''}`}
                                onClick={toggleDemoMenu}
                                disabled={!demoStationPowered || demoLoadingPhase < 2}
                                title='Menu'>
                                <span>☰</span>
                            </button>
                            <span className={styles.buttonLabel}>MENU</span>
                        </div>

                        <div className={styles.dPadContainer}>
                            <div className={styles.dPad}>
                                <button
                                    className={styles.dPadUp}
                                    onClick={() => navigateDemoMenu('up')}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2}
                                    aria-label='Up'>
                                    ▲
                                </button>
                                <button
                                    className={styles.dPadRight}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2}
                                    aria-label='Right'>
                                    ▶
                                </button>
                                <button
                                    className={styles.dPadDown}
                                    onClick={() => navigateDemoMenu('down')}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2}
                                    aria-label='Down'>
                                    ▼
                                </button>
                                <button
                                    className={styles.dPadLeft}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2}
                                    aria-label='Left'>
                                    ◀
                                </button>
                                <div className={styles.dPadCenter}></div>
                            </div>
                            <span className={styles.buttonLabel}>D-PAD</span>
                        </div>

                        <div className={styles.actionButtonsContainer}>
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => selectDemoMenuItem(selectedDemoMenuItem)}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2 || !demoMenuOpen}
                                    style={{ backgroundColor: '#44cc44' }}
                                    aria-label='Select'>
                                    A
                                </button>
                                <button
                                    className={styles.actionButton}
                                    onClick={handleDemoBack}
                                    disabled={!demoStationPowered || demoLoadingPhase < 2}
                                    style={{ backgroundColor: '#cc4444' }}
                                    aria-label='Back'>
                                    B
                                </button>
                            </div>
                            <span className={styles.buttonLabel}>ACTION</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressBar}>
                    <div className={styles.progressItem} data-status='completed'>
                        <span className={styles.milestone}>Concept</span>
                    </div>
                    <div className={styles.progressItem} data-status='completed'>
                        <span className={styles.milestone}>Alpha</span>
                    </div>
                    <div className={styles.progressItem} data-status='in-progress'>
                        <span className={styles.milestone}>Beta</span>
                    </div>
                    <div className={styles.progressItem} data-status='upcoming'>
                        <span className={styles.milestone}>Release</span>
                    </div>
                </div>
            </div>

            {/* Cabinet Base with Legs */}
            <div className={styles.cabinetBase}>
                <div className={styles.cabinetLeg}></div>
                <div className={styles.cabinetLeg}></div>
            </div>
        </div>
    );
};

export default GameCabinet;
