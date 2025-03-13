'use client';

import { useState } from 'react';

export default function TheFoundry() {
    const [isForging, setIsForging] = useState(false);
    const [artifact, setArtifact] = useState(null);
    const [runicGlow, setRunicGlow] = useState(false);
    const [rotateY, setRotateY] = useState(0);
    const [rotateX, setRotateX] = useState(0);
    const [forgedArtifacts, setForgedArtifacts] = useState([]); // Track forged relics

    // 🔥 Expanded Artifact List with Special Rarity
    const artifacts = [
        { name: 'Neon Gauntlet 🖐️', description: 'An electrified glove pulsing with raw energy.', rarity: 'common' },
        {
            name: 'Cyber Blade ⚔️',
            description: 'A sword made of liquid plasma, reforging itself mid-swing.',
            rarity: 'common'
        },
        {
            name: 'Holo Shield 🛡️',
            description: "A protective barrier that adapts to its wielder's energy.",
            rarity: 'common'
        },
        {
            name: 'Runic Circuit 💠',
            description: 'An ancient technology infused with forgotten magic.',
            rarity: 'uncommon'
        },
        {
            name: 'Shadow Core 🔮',
            description: 'A dark, swirling mass of power that warps reality.',
            rarity: 'uncommon'
        },
        {
            name: 'Astral Compass 🧭',
            description: 'Points not to places, but to *destinies* yet to unfold.',
            rarity: 'rare'
        },
        {
            name: 'Singularity Orb 🌀',
            description: 'A micro black hole contained in a crystal casing.',
            rarity: 'rare'
        },
        {
            name: 'Void Harbinger 🕶️',
            description: 'A mask that allows its wearer to *see beyond dimensions*.',
            rarity: 'ultra-rare'
        },
        {
            name: 'Synth Phylactery 💾',
            description: "A digitized soul storage unit—who's inside?",
            rarity: 'ultra-rare'
        },
        {
            name: 'Echo of the First Forge 🔥',
            description: 'The very essence of creation itself.',
            rarity: 'legendary'
        },
        {
            name: 'Celestial Gauntlet 🌌',
            description: 'A glove infused with the raw energy of collapsing stars.',
            rarity: 'legendary'
        },
        {
            name: 'The Final Key 🔑',
            description: 'A key to a door that does not yet exist... or does it?',
            rarity: 'legendary'
        }
    ];

    // 🔥 Forge Mechanic with Randomized Artifact Selection
    const forgeArtifact = () => {
        setIsForging(true);
        setRunicGlow(true);

        setTimeout(() => {
            // Pick a random artifact
            const newArtifact = artifacts[Math.floor(Math.random() * artifacts.length)];
            setArtifact(newArtifact);
            setForgedArtifacts([...forgedArtifacts, newArtifact]); // Store forged artifacts
            setIsForging(false);
        }, 2000);
    };

    // Handle Mouse Movement for Depth Effect
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;
        setRotateY(x * 10);
        setRotateX(y * 10);
    };

    return (
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white'>
            {/* Dimensional Rift Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 opacity-70 blur-lg'></div>

            {/* The Foundry - 3D Environment */}
            <div className='relative h-screen w-full' style={{ perspective: '1200px' }} onMouseMove={handleMouseMove}>
                <div
                    className='relative h-full w-full transition-transform duration-300 ease-out'
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transformStyle: 'preserve-3d'
                    }}>
                    {/* Floating Runes Effect */}
                    {runicGlow && (
                        <div className='absolute inset-0 flex animate-pulse items-center justify-center text-6xl font-bold text-yellow-400 opacity-30'>
                            ✨ The Foundry Awakens ✨
                        </div>
                    )}

                    {/* 🔥 Floating Anvil */}
                    <div
                        className={`absolute top-1/2 left-1/2 flex h-24 w-48 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-md border-4 border-yellow-500 bg-gray-900 shadow-lg transition-all hover:scale-105 ${
                            runicGlow ? 'animate-pulse shadow-yellow-500/50' : ''
                        }`}
                        onClick={forgeArtifact}>
                        {isForging ? 'Forging... ⚡' : 'Tap to Forge ⚒️'}
                    </div>

                    {/* 🔥 Artifact Display */}
                    {artifact && (
                        <div
                            className={`animate-fade-in bottom-20% absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold ${
                                artifact.rarity === 'legendary'
                                    ? 'text-yellow-400'
                                    : artifact.rarity === 'ultra-rare'
                                      ? 'text-purple-400'
                                      : artifact.rarity === 'rare'
                                        ? 'text-blue-400'
                                        : artifact.rarity === 'uncommon'
                                          ? 'text-green-400'
                                          : 'text-cyan-400'
                            }`}>
                            {artifact.name}
                            <p className='text-sm text-gray-300'>{artifact.description}</p>
                        </div>
                    )}

                    {/* 🔥 Previously Forged Artifacts */}
                    {forgedArtifacts.length > 0 && (
                        <div className='absolute top-5 right-5 rounded-lg border border-gray-700 bg-black/50 p-4'>
                            <h3 className='text-lg font-bold'>Forged Relics:</h3>
                            <ul className='mt-2 space-y-1'>
                                {forgedArtifacts.slice(-5).map((item, index) => (
                                    <li
                                        key={index}
                                        className={`text-sm ${
                                            item.rarity === 'legendary'
                                                ? 'text-yellow-400'
                                                : item.rarity === 'ultra-rare'
                                                  ? 'text-purple-400'
                                                  : item.rarity === 'rare'
                                                    ? 'text-blue-400'
                                                    : item.rarity === 'uncommon'
                                                      ? 'text-green-400'
                                                      : 'text-cyan-400'
                                        }`}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
