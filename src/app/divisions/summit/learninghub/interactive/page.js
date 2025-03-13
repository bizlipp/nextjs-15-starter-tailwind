'use client';

import React from 'react';

import Link from 'next/link';

export default function InteractiveLearning() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 bg-[url('/images/classroom-bg.jpg')] bg-cover bg-fixed bg-center p-6 text-white">
            {/* Header with themed styling */}
            <div className='mb-8 max-w-3xl rounded-lg border border-[#228B22]/30 bg-black/70 p-6 text-center backdrop-blur-lg'>
                <h1 className='text-4xl font-bold text-[#228B22]'>Interactive Learning</h1>
                <p className='mt-3 max-w-xl text-gray-300'>
                    Engage with hands-on learning through quizzes, study tracking, and live virtual classrooms.
                </p>
            </div>

            {/* Interactive Features */}
            <div className='mt-6 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Quiz Button */}
                <Link href='/divisions/summit/learninghub/interactive/quizzes' className='group'>
                    <div className='flex h-full flex-col items-center justify-center rounded-lg border border-[#228B22]/30 bg-gray-900/80 p-6 text-center transition-all hover:border-[#228B22]/60 hover:bg-gray-900/90 hover:shadow-[0_0_15px_rgba(34,139,34,0.3)]'>
                        <div className='mb-4 text-4xl text-[#228B22]'>📝</div>
                        <h3 className='mb-2 text-xl font-semibold text-white'>Take a Quiz</h3>
                        <p className='text-sm text-gray-400'>Test your knowledge with interactive assessments</p>
                    </div>
                </Link>

                {/* Study Tracker Button */}
                <Link href='/divisions/summit/learninghub/interactive/tracker' className='group'>
                    <div className='flex h-full flex-col items-center justify-center rounded-lg border border-[#228B22]/30 bg-gray-900/80 p-6 text-center transition-all hover:border-[#228B22]/60 hover:bg-gray-900/90 hover:shadow-[0_0_15px_rgba(34,139,34,0.3)]'>
                        <div className='mb-4 text-4xl text-[#228B22]'>📊</div>
                        <h3 className='mb-2 text-xl font-semibold text-white'>Study Tracker</h3>
                        <p className='text-sm text-gray-400'>Monitor your progress and set learning goals</p>
                    </div>
                </Link>

                {/* Virtual Classroom Button - Updated with new link */}
                <Link href='/divisions/summit/learninghub/interactive/classroom' className='group'>
                    <div className='flex h-full flex-col items-center justify-center rounded-lg border border-[#228B22]/30 bg-gray-900/80 p-6 text-center transition-all hover:border-[#228B22]/60 hover:bg-gray-900/90 hover:shadow-[0_0_15px_rgba(34,139,34,0.3)]'>
                        <div className='mb-4 text-4xl text-[#228B22]'>🎓</div>
                        <h3 className='mb-2 text-xl font-semibold text-white'>Virtual Classroom</h3>
                        <p className='text-sm text-gray-400'>
                            Join interactive learning sessions with teachers and peers
                        </p>
                    </div>
                </Link>

                {/* Back Button */}
                <Link href='/divisions/summit/learninghub' className='group'>
                    <div className='flex h-full flex-col items-center justify-center rounded-lg border border-gray-700/50 bg-gray-800/50 p-6 text-center transition-all hover:bg-gray-800/80'>
                        <div className='mb-4 text-4xl text-gray-400'>⬅️</div>
                        <h3 className='mb-2 text-xl font-semibold text-white'>Back to Learning Hub</h3>
                        <p className='text-sm text-gray-400'>Return to the main learning portal</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
