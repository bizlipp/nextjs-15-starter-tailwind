'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import styles from './ForgeNavMenu.module.css';

const ForgeNavMenu = ({ basePath = '/divisions/skyforge' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const menuItems = [
        {
            id: 'game-forge',
            name: 'Projects Forge',
            description: 'Current game development projects',
            icon: (
                <svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M15 12H12M12 12H9M12 12V9M12 12V15'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                    />
                    <path
                        d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                    />
                </svg>
            )
        },
        {
            id: 'creative-arsenal',
            name: 'Creative Arsenal',
            description: 'Tools, technologies, and design approach',
            icon: (
                <svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5 8H19M5 12H19M5 16H19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                </svg>
            )
        },
        {
            id: 'team-artisans',
            name: 'Team of Artisans',
            description: 'Meet the development team',
            icon: (
                <svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                        stroke='currentColor'
                        strokeWidth='1.5'
                    />
                    <path
                        d='M3 21C3 16.5817 7.02944 13 12 13C16.9706 13 21 16.5817 21 21'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                    />
                </svg>
            )
        },
        {
            id: 'apprenticeship',
            name: 'Apprenticeship',
            description: 'Join our creative team',
            icon: (
                <svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M12 6V22M12 6L7 11M12 6L17 11'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            )
        },
        {
            id: 'contact',
            name: 'Contact the Forge Master',
            description: 'Get in touch',
            icon: (
                <svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            )
        }
    ];

    const toggleMenu = () => {
        // Animate the toggle with a clang sound effect here if desired
        setIsOpen(!isOpen);
    };

    const handleItemHover = (id) => {
        setActiveItem(id);
    };

    const handleItemLeave = () => {
        setActiveItem(null);
    };

    return (
        <div className={styles.navContainer}>
            {/* Anvil Toggle Button */}
            <div className={`${styles.anvilToggle} ${isOpen ? styles.anvilActive : ''}`} onClick={toggleMenu}>
                <div className={styles.anvil}></div>
                <div className={styles.anvilGlow}></div>
            </div>

            {/* Navigation Menu Panel */}
            {isOpen && (
                <div className={styles.menuPanel}>
                    {menuItems.map((item) => (
                        <Link
                            href={`${basePath}/${item.id}`}
                            key={item.id}
                            className={styles.menuItem}
                            onMouseEnter={() => handleItemHover(item.id)}
                            onMouseLeave={handleItemLeave}>
                            <div className={styles.iconContainer}>{item.icon}</div>
                            <div className={styles.textContent}>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForgeNavMenu;
