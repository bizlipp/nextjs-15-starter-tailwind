'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import GameCabinet from '../../../components/GameCabinet';
import styles from './TestSpace.module.css';

export default function TestSpace() {
    // Game cabinet state management
    const [inputGameTitle, setInputGameTitle] = useState('Cyberpulse Warrior');
    const [gameTitle, setGameTitle] = useState('Cyberpulse Warrior');
    const [showDebug, setShowDebug] = useState(true);
    const [cabinetPower, setCabinetPower] = useState(true);
    const [cabinetMenu, setCabinetMenu] = useState(false);
    const [selectedMenuOption, setSelectedMenuOption] = useState(0);
    const [currentScreen, setCurrentScreen] = useState('game');
    const [lastAction, setLastAction] = useState('None');
    const [actionCount, setActionCount] = useState(0);

    // Update game title based on input
    const updateGameTitle = () => {
        setGameTitle(inputGameTitle);
        logAction('Changed game title');
    };

    // Log action for debug display
    const logAction = (action) => {
        setLastAction(action);
        setActionCount((prev) => prev + 1);
        // Optional: Could implement a full action log array if needed
    };

    // Cabinet power management
    const togglePower = () => {
        setCabinetPower(!cabinetPower);
        logAction(`${cabinetPower ? 'Powered off' : 'Powered on'} cabinet`);
        if (!cabinetPower) {
            setCurrentScreen('game');
            setCabinetMenu(false);
        }
    };

    // Cabinet menu management
    const toggleMenu = () => {
        if (cabinetPower) {
            setCabinetMenu(!cabinetMenu);
            setCurrentScreen(cabinetMenu ? 'game' : 'menu');
            logAction(`${cabinetMenu ? 'Closed' : 'Opened'} menu`);
        } else {
            logAction('Cannot toggle menu - cabinet is off');
        }
    };

    // Simulate pressing A button (select/confirm)
    const pressAButton = () => {
        if (!cabinetPower) {
            logAction('Cabinet is off');
            return;
        }

        if (cabinetMenu) {
            // Handle menu selection
            let actionResult = `Selected option ${selectedMenuOption + 1}`;

            if (selectedMenuOption === 0) {
                actionResult = 'Started new game';
                setCabinetMenu(false);
                setCurrentScreen('game');
            } else if (selectedMenuOption === 1) {
                actionResult = 'Opened settings';
                setCurrentScreen('settings');
            } else if (selectedMenuOption === 2) {
                actionResult = 'Viewed high scores';
                setCurrentScreen('highscores');
            }

            logAction(actionResult);
        } else {
            logAction('A button pressed in game');
        }
    };

    // Simulate pressing B button (back/cancel)
    const pressBButton = () => {
        if (!cabinetPower) {
            logAction('Cabinet is off');
            return;
        }

        if (currentScreen !== 'game' && currentScreen !== 'menu') {
            setCurrentScreen('menu');
            logAction('Returned to menu');
        } else if (cabinetMenu) {
            setCabinetMenu(false);
            setCurrentScreen('game');
            logAction('Closed menu');
        } else {
            logAction('B button pressed in game');
        }
    };

    // D-pad navigation simulation
    const pressDirection = (direction) => {
        if (!cabinetPower) {
            logAction('Cabinet is off');
            return;
        }

        if (cabinetMenu) {
            if (direction === 'up' && selectedMenuOption > 0) {
                setSelectedMenuOption((prev) => prev - 1);
                logAction('Menu: Moved up');
            } else if (direction === 'down' && selectedMenuOption < 2) {
                setSelectedMenuOption((prev) => prev + 1);
                logAction('Menu: Moved down');
            } else {
                logAction(`Menu: Cannot move ${direction}`);
            }
        } else {
            logAction(`D-pad ${direction} pressed in game`);
        }
    };

    return (
        <div className={styles.testContainer}>
            {/* Navigation bar */}
            <div className={styles.navigationBar}>
                <Link href='/divisions/skyforge' className={styles.navLink}>
                    &larr; Back to SkyForge
                </Link>
                <h1 className={styles.testTitle}>GameCabinet Test Station</h1>
                <button className={styles.navButton} onClick={() => setShowDebug(!showDebug)}>
                    {showDebug ? 'Hide Debug' : 'Show Debug'}
                </button>
            </div>

            {/* Component display with debug overlay */}
            <div className={styles.componentContainer}>
                <GameCabinet
                    gameTitle={gameTitle}
                    isPowered={cabinetPower}
                    showMenu={cabinetMenu}
                    selectedOption={selectedMenuOption}
                    currentScreen={currentScreen}
                />

                {showDebug && (
                    <div className={styles.debugOverlay}>
                        <div className={styles.debugInfo}>
                            <h3>Cabinet State</h3>
                            <p>Power: {cabinetPower ? 'ON' : 'OFF'}</p>
                            <p>Menu: {cabinetMenu ? 'OPEN' : 'CLOSED'}</p>
                            <p>Screen: {currentScreen.toUpperCase()}</p>
                            <p>Selected: {selectedMenuOption}</p>
                            <p>Last Action: {lastAction}</p>
                            <p>Action Count: {actionCount}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Control panel */}
            <div className={styles.controlPanel}>
                <h2>Test Controls</h2>
                <p>
                    Use these controls to test different aspects of the GameCabinet component. Changes made here are for
                    testing purposes only and don't affect the main application.
                </p>

                {/* Game title controls */}
                <div className={styles.controlRow}>
                    <span className={styles.controlLabel}>Game Title:</span>
                    <input
                        type='text'
                        className={styles.controlInput}
                        value={inputGameTitle}
                        onChange={(e) => setInputGameTitle(e.target.value)}
                    />
                    <button className={styles.controlButton} onClick={updateGameTitle}>
                        Update Title
                    </button>
                </div>

                {/* Power controls */}
                <div className={styles.controlRow}>
                    <span className={styles.controlLabel}>Cabinet Power:</span>
                    <div className={styles.buttonGroup}>
                        <button className={styles.controlButton} onClick={togglePower}>
                            {cabinetPower ? 'Power Off' : 'Power On'}
                        </button>
                    </div>
                </div>

                {/* Menu controls */}
                <div className={styles.controlRow}>
                    <span className={styles.controlLabel}>Menu Control:</span>
                    <div className={styles.buttonGroup}>
                        <button className={styles.controlButton} onClick={toggleMenu} disabled={!cabinetPower}>
                            {cabinetMenu ? 'Close Menu' : 'Open Menu'}
                        </button>
                    </div>
                </div>

                {/* Action buttons */}
                <div className={styles.controlRow}>
                    <span className={styles.controlLabel}>Action Buttons:</span>
                    <div className={styles.buttonGroup}>
                        <button
                            className={`${styles.controlButton} ${styles.aButton}`}
                            onClick={pressAButton}
                            disabled={!cabinetPower}>
                            A Button (Select)
                        </button>
                        <button
                            className={`${styles.controlButton} ${styles.bButton}`}
                            onClick={pressBButton}
                            disabled={!cabinetPower}>
                            B Button (Back)
                        </button>
                    </div>

                    {/* D-pad controls */}
                    <div className={styles.dPadTestControls}>
                        {/* Up */}
                        <div className={styles.horizontalButtons}>
                            <button
                                className={styles.directionButton}
                                onClick={() => pressDirection('up')}
                                disabled={!cabinetPower}>
                                ↑
                            </button>
                        </div>

                        {/* Left, Center, Right */}
                        <div className={styles.horizontalButtons}>
                            <button
                                className={styles.directionButton}
                                onClick={() => pressDirection('left')}
                                disabled={!cabinetPower}>
                                ←
                            </button>
                            <div className={styles.centerDot}></div>
                            <button
                                className={styles.directionButton}
                                onClick={() => pressDirection('right')}
                                disabled={!cabinetPower}>
                                →
                            </button>
                        </div>

                        {/* Down */}
                        <div className={styles.horizontalButtons}>
                            <button
                                className={styles.directionButton}
                                onClick={() => pressDirection('down')}
                                disabled={!cabinetPower}>
                                ↓
                            </button>
                        </div>
                    </div>
                </div>

                {/* Test notes section */}
                <div className={styles.testNotes}>
                    <h3>Development Notes</h3>
                    <ul>
                        <li>
                            The GameCabinet component is still in development - not all props may be functional yet.
                        </li>
                        <li>Test different states to ensure proper rendering in all situations.</li>
                        <li>Changes made in this test station won't affect the main application until applied.</li>
                        <li>Use the debug overlay to monitor the current state of the component.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
