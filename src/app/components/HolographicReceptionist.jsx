'use client';

import React, { useState } from 'react';

import styles from './HolographicReceptionist.module.css';

const HolographicReceptionist = ({
    message = 'Welcome to SkyForge Studios. What would you like to explore today?',
    initialVisible = false,
    deskWidth = 200,
    deskHeight = 100
}) => {
    const [isVisible, setIsVisible] = useState(initialVisible);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={styles.receptionistContainer}
            style={{ width: `${deskWidth}px`, height: `${deskHeight}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={styles.deskSurface}></div>

            {isVisible && (
                <div className={styles.hologramContainer}>
                    <div className={styles.hologramFigure}></div>
                    <div className={styles.speechBubble}>{message}</div>
                </div>
            )}
        </div>
    );
};

export default HolographicReceptionist;
