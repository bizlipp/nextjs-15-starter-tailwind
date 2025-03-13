'use client';

import { useEffect, useRef, useState } from 'react';

// Remove FontAwesome imports
// import {
//     faChalkboardTeacher,
//     faCog,
//     faComment,
//     faCompress,
//     faExpand,
//     faFileAlt,
//     faHandPaper,
//     faMicrophone,
//     faMicrophoneSlash,
//     faPlus,
//     faPoll,
//     faQuestion,
//     faThumbsUp,
//     faTimes,
//     faUsers,
//     faVideo,
//     faVideoSlash,
//     faVolumeMute,
//     faVolumeUp
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Remove framer-motion if not using it
// import { motion } from 'framer-motion';

// Placeholder for actual video chat integration (e.g., WebRTC, Agora, etc.)
const VideoConference = () => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Ms. Johnson', isTeacher: true, avatar: '/images/avatars/teacher1.jpg' },
        { id: 2, name: 'Alex Chen', avatar: '/images/avatars/student1.jpg' },
        { id: 3, name: 'Jordan Smith', avatar: '/images/avatars/student2.jpg' },
        { id: 4, name: 'Taylor Williams', avatar: '/images/avatars/student3.jpg' },
        { id: 5, name: 'Morgan Lee', avatar: '/images/avatars/student4.jpg' }
    ]);

    // Video grid layout that adjusts based on number of participants
    const videoGridClass =
        participants.length <= 2
            ? 'grid-cols-1'
            : participants.length <= 4
              ? 'grid-cols-2'
              : participants.length <= 9
                ? 'grid-cols-3'
                : 'grid-cols-4';

    return (
        <div className='rounded-lg border border-[#228B22]/30 bg-gray-900/80 backdrop-blur-md'>
            <div className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-[#228B22]'>Live Session</h3>

                {/* Main video display area */}
                <div className={`grid ${videoGridClass} gap-2`}>
                    {participants.map((participant) => (
                        <div
                            key={participant.id}
                            className={`relative aspect-video overflow-hidden rounded-md border-2 ${
                                participant.isTeacher ? 'border-[#228B22]' : 'border-gray-700'
                            } bg-gray-800`}>
                            {/* Placeholder for actual video feed */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                {/* This would be replaced by actual video element */}
                                <div className='h-20 w-20 overflow-hidden rounded-full bg-gray-700'>
                                    <div className='flex h-full items-center justify-center text-2xl font-bold text-gray-300'>
                                        {participant.name.charAt(0)}
                                    </div>
                                </div>
                            </div>

                            {/* Participant name overlay */}
                            <div className='absolute right-0 bottom-0 left-0 bg-black/50 p-1 text-center text-xs text-white'>
                                {participant.name}
                                {participant.isTeacher && <span className='ml-1 text-[#228B22]'>(Teacher)</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video controls */}
                <div className='mt-4 flex flex-wrap items-center justify-center gap-3 rounded-md bg-gray-800 p-2'>
                    <button
                        onClick={() => setIsCameraOn(!isCameraOn)}
                        className={`rounded-full ${isCameraOn ? 'bg-[#228B22]' : 'bg-red-600'} p-3 text-white transition-all hover:opacity-80`}>
                        <span className='inline-block h-5 w-5 text-center leading-5'>{isCameraOn ? '📹' : '🚫'}</span>
                    </button>

                    <button
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`rounded-full ${isMicOn ? 'bg-[#228B22]' : 'bg-red-600'} p-3 text-white transition-all hover:opacity-80`}>
                        <span className='inline-block h-5 w-5 text-center leading-5'>{isMicOn ? '🎙️' : '🔇'}</span>
                    </button>

                    <button
                        onClick={() => setIsHandRaised(!isHandRaised)}
                        className={`rounded-full ${isHandRaised ? 'bg-yellow-500' : 'bg-gray-600'} p-3 text-white transition-all hover:opacity-80`}>
                        <span className='inline-block h-5 w-5 text-center leading-5'>✋</span>
                    </button>

                    <button className='rounded-full bg-gray-600 p-3 text-white transition-all hover:bg-[#228B22]'>
                        <span className='inline-block h-5 w-5 text-center leading-5'>👥</span>
                    </button>

                    <button
                        onClick={() => setIsScreenSharing(!isScreenSharing)}
                        className={`rounded-full ${isScreenSharing ? 'bg-[#228B22]' : 'bg-gray-600'} p-3 text-white transition-all hover:opacity-80`}>
                        <span className='inline-block h-5 w-5 text-center leading-5'>🖥️</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Interactive whiteboard component
const Whiteboard = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen'); // pen, eraser, text, shapes
    const [color, setColor] = useState('#ffffff');
    const [brushSize, setBrushSize] = useState(3);

    // This would be replaced by actual drawing functionality in a real implementation
    return (
        <div className='rounded-lg border border-[#228B22]/30 bg-gray-900/80 backdrop-blur-md'>
            <div className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-[#228B22]'>Interactive Whiteboard</h3>

                {/* Tool selection */}
                <div className='mb-3 flex flex-wrap gap-2'>
                    <button
                        className={`rounded px-3 py-1 text-sm ${tool === 'pen' ? 'bg-[#228B22] text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setTool('pen')}>
                        Pen
                    </button>
                    <button
                        className={`rounded px-3 py-1 text-sm ${tool === 'eraser' ? 'bg-[#228B22] text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setTool('eraser')}>
                        Eraser
                    </button>
                    <button
                        className={`rounded px-3 py-1 text-sm ${tool === 'text' ? 'bg-[#228B22] text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setTool('text')}>
                        Text
                    </button>
                    <button
                        className={`rounded px-3 py-1 text-sm ${tool === 'shapes' ? 'bg-[#228B22] text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setTool('shapes')}>
                        Shapes
                    </button>
                </div>

                {/* Color selection */}
                <div className='mb-3 flex flex-wrap gap-2'>
                    {['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((c) => (
                        <button
                            key={c}
                            className={`h-6 w-6 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>

                {/* Whiteboard canvas area */}
                <div className='relative h-[300px] w-full overflow-hidden rounded-md border border-gray-700 bg-slate-800'>
                    <canvas ref={canvasRef} className='absolute inset-0 h-full w-full cursor-crosshair' />
                    <div className='absolute inset-0 flex items-center justify-center text-gray-400'>
                        <p className='text-center italic'>Whiteboard functionality would be implemented here</p>
                    </div>
                </div>

                {/* Additional controls */}
                <div className='mt-3 flex justify-between'>
                    <button className='rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700'>
                        Clear All
                    </button>
                    <button className='rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700'>Save</button>
                </div>
            </div>
        </div>
    );
};

// Chat component
const ClassChat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'Ms. Johnson',
            text: "Welcome to today's class on Photosynthesis!",
            time: '10:00 AM',
            isTeacher: true
        },
        { id: 2, sender: 'Alex Chen', text: 'Hi everyone!', time: '10:01 AM' },
        { id: 3, sender: 'Jordan Smith', text: "Looking forward to today's lesson.", time: '10:02 AM' },
        {
            id: 4,
            sender: 'Ms. Johnson',
            text: "We'll be discussing how plants convert light energy into chemical energy.",
            time: '10:03 AM',
            isTeacher: true
        }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    sender: 'You',
                    text: newMessage,
                    time,
                    isYou: true
                }
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className='rounded-lg border border-[#228B22]/30 bg-gray-900/80 backdrop-blur-md'>
            <div className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-[#228B22]'>Class Chat</h3>

                {/* Messages area */}
                <div className='custom-scrollbar mb-3 h-[300px] overflow-y-auto rounded-md border border-gray-700 bg-gray-800 p-2'>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`mb-2 flex ${message.isYou ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] rounded-lg p-2 ${
                                    message.isTeacher
                                        ? 'bg-[#228B22]/40 text-white'
                                        : message.isYou
                                          ? 'bg-blue-700/40 text-white'
                                          : 'bg-gray-700 text-gray-200'
                                }`}>
                                <div className='flex items-baseline justify-between'>
                                    <span className='mr-2 text-xs font-bold'>
                                        {message.sender}
                                        {message.isTeacher && <span className='ml-1 text-[#AAFFAA]'>(Teacher)</span>}
                                    </span>
                                    <span className='text-xs opacity-70'>{message.time}</span>
                                </div>
                                <p className='mt-1'>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message input */}
                <form onSubmit={handleSendMessage} className='flex'>
                    <input
                        type='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='flex-1 rounded-l-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-[#228B22] focus:outline-none'
                        placeholder='Type a message...'
                    />
                    <button type='submit' className='rounded-r-md bg-[#228B22] px-4 py-2 text-white hover:bg-[#1a6a1a]'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

// Course materials and resources component
const LearningMaterials = () => {
    const [activeTab, setActiveTab] = useState('materials');
    const [quizActive, setQuizActive] = useState(false);

    const materials = [
        { id: 1, title: 'Photosynthesis Basics', type: 'pdf', size: '2.3 MB' },
        { id: 2, title: 'Chloroplast Structure', type: 'image', size: '1.5 MB' },
        { id: 3, title: 'Light Reaction Animation', type: 'video', size: '15.8 MB' },
        { id: 4, title: 'Carbon Cycle Diagram', type: 'image', size: '0.8 MB' }
    ];

    const assignments = [
        { id: 1, title: 'Photosynthesis Lab Report', dueDate: '2023-11-20', status: 'Not Started' },
        { id: 2, title: 'Plant Cell vs. Animal Cell Comparison', dueDate: '2023-11-15', status: 'In Progress' },
        { id: 3, title: 'Research: Effects of Light Intensity', dueDate: '2023-11-30', status: 'Not Started' }
    ];

    const quiz = {
        title: 'Photosynthesis Quick Quiz',
        questions: [
            {
                id: 1,
                text: 'Which organelle is responsible for photosynthesis?',
                options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'],
                correctAnswer: 'Chloroplast'
            },
            {
                id: 2,
                text: 'What are the primary inputs for photosynthesis?',
                options: ['Carbon dioxide and water', 'Oxygen and glucose', 'Nitrogen and phosphorus', 'ATP and NADPH'],
                correctAnswer: 'Carbon dioxide and water'
            },
            {
                id: 3,
                text: 'Which of the following is NOT a product of photosynthesis?',
                options: ['Oxygen', 'Glucose', 'Carbon dioxide', 'ATP'],
                correctAnswer: 'Carbon dioxide'
            }
        ]
    };

    return (
        <div className='rounded-lg border border-[#228B22]/30 bg-gray-900/80 backdrop-blur-md'>
            <div className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-[#228B22]'>Learning Resources</h3>

                {/* Tabs */}
                <div className='mb-4 flex border-b border-gray-700'>
                    <button
                        className={`mr-2 border-b-2 px-4 py-2 ${activeTab === 'materials' ? 'border-[#228B22] text-[#228B22]' : 'border-transparent text-gray-400'}`}
                        onClick={() => setActiveTab('materials')}>
                        Materials
                    </button>
                    <button
                        className={`mr-2 border-b-2 px-4 py-2 ${activeTab === 'assignments' ? 'border-[#228B22] text-[#228B22]' : 'border-transparent text-gray-400'}`}
                        onClick={() => setActiveTab('assignments')}>
                        Assignments
                    </button>
                    <button
                        className={`border-b-2 px-4 py-2 ${activeTab === 'quiz' ? 'border-[#228B22] text-[#228B22]' : 'border-transparent text-gray-400'}`}
                        onClick={() => setActiveTab('quiz')}>
                        Quiz
                    </button>
                </div>

                {/* Tab content */}
                <div className='custom-scrollbar h-[300px] overflow-y-auto rounded bg-gray-800 p-4'>
                    {activeTab === 'materials' && (
                        <div>
                            <h4 className='mb-3 text-lg font-medium text-white'>Course Materials</h4>
                            <ul className='space-y-3'>
                                {materials.map((material) => (
                                    <li
                                        key={material.id}
                                        className='flex items-center justify-between rounded-md border border-gray-700 bg-gray-700/50 p-3'>
                                        <div className='flex items-center'>
                                            <span className='mr-3 inline-block text-xl text-[#228B22]'>
                                                {material.type === 'pdf'
                                                    ? '📄'
                                                    : material.type === 'video'
                                                      ? '🎬'
                                                      : '📎'}
                                            </span>
                                            <div>
                                                <h5 className='font-medium text-white'>{material.title}</h5>
                                                <p className='text-xs text-gray-400'>
                                                    {material.type.toUpperCase()} • {material.size}
                                                </p>
                                            </div>
                                        </div>
                                        <button className='rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-[#228B22]'>
                                            Download
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'assignments' && (
                        <div>
                            <h4 className='mb-3 text-lg font-medium text-white'>Assignments</h4>
                            <ul className='space-y-3'>
                                {assignments.map((assignment) => (
                                    <li
                                        key={assignment.id}
                                        className='rounded-md border border-gray-700 bg-gray-700/50 p-3'>
                                        <div className='flex items-center justify-between'>
                                            <h5 className='font-medium text-white'>{assignment.title}</h5>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    assignment.status === 'Not Started'
                                                        ? 'bg-red-900/50 text-red-300'
                                                        : assignment.status === 'In Progress'
                                                          ? 'bg-yellow-900/50 text-yellow-300'
                                                          : 'bg-green-900/50 text-green-300'
                                                }`}>
                                                {assignment.status}
                                            </span>
                                        </div>
                                        <div className='mt-2 flex items-center justify-between'>
                                            <p className='text-sm text-gray-400'>
                                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </p>
                                            <button className='rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-[#228B22]'>
                                                {assignment.status === 'Not Started' ? 'Start' : 'Continue'}
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'quiz' && (
                        <div>
                            <h4 className='mb-3 text-lg font-medium text-white'>{quiz.title}</h4>

                            {!quizActive ? (
                                <div className='rounded-md border border-gray-700 bg-gray-700/50 p-4 text-center'>
                                    <p className='mb-4 text-gray-300'>
                                        Test your knowledge with a quick 3-question quiz.
                                    </p>
                                    <button
                                        className='rounded-md bg-[#228B22] px-6 py-2 text-white hover:bg-[#1a6a1a]'
                                        onClick={() => setQuizActive(true)}>
                                        Start Quiz
                                    </button>
                                </div>
                            ) : (
                                <div className='space-y-4'>
                                    {quiz.questions.map((question, index) => (
                                        <div
                                            key={question.id}
                                            className='rounded-md border border-gray-700 bg-gray-700/50 p-4'>
                                            <h5 className='mb-3 font-medium text-white'>
                                                Q{index + 1}: {question.text}
                                            </h5>
                                            <div className='space-y-2'>
                                                {question.options.map((option, idx) => (
                                                    <div
                                                        key={idx}
                                                        className='flex cursor-pointer items-center rounded-md border border-gray-600 p-2 hover:bg-gray-600'>
                                                        <input
                                                            type='radio'
                                                            name={`question-${question.id}`}
                                                            id={`q${question.id}-option${idx}`}
                                                            className='mr-2'
                                                        />
                                                        <label
                                                            htmlFor={`q${question.id}-option${idx}`}
                                                            className='cursor-pointer text-gray-300'>
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex justify-between'>
                                        <button
                                            className='rounded-md border border-gray-600 bg-transparent px-4 py-2 text-gray-300 hover:bg-gray-700'
                                            onClick={() => setQuizActive(false)}>
                                            Cancel
                                        </button>
                                        <button className='rounded-md bg-[#228B22] px-4 py-2 text-white hover:bg-[#1a6a1a]'>
                                            Submit Answers
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main classroom page component
export default function ClassroomPage() {
    const [activeSection, setActiveSection] = useState('all');
    const [fullscreenMode, setFullscreenMode] = useState(false);

    // For a real application, you'd load the classroom data from an API
    const classInfo = {
        id: 'BIO101',
        title: 'Introduction to Biology',
        teacher: 'Ms. Johnson',
        time: 'Mondays & Wednesdays, 10:00 AM - 11:30 AM',
        topic: 'Photosynthesis: The Process and Importance',
        inSession: true
    };

    useEffect(() => {
        // Simulate loading classroom data
        // In a real app, you'd fetch from an API
        document.title = `${classInfo.title} - Summit Learning`;

        // Clean up
        return () => {
            document.title = 'Summit Learning';
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 bg-[url('/images/classroom-bg.jpg')] bg-cover bg-fixed bg-center text-white">
            <div className='container mx-auto px-4 py-8'>
                {/* Class header */}
                <div className='mb-6 rounded-lg border border-[#228B22]/30 bg-black/70 p-4 backdrop-blur-lg'>
                    <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
                        <div>
                            <h1 className='text-2xl font-bold text-[#228B22] md:text-3xl'>{classInfo.title}</h1>
                            <p className='mb-1 text-gray-300'>
                                {classInfo.teacher} • {classInfo.time}
                            </p>
                            <p className='font-medium'>Current Topic: {classInfo.topic}</p>
                        </div>

                        <div className='flex gap-2'>
                            {classInfo.inSession && (
                                <span className='flex items-center rounded-full bg-green-900/50 px-3 py-1 text-sm text-green-300'>
                                    <span className='mr-2 h-2 w-2 rounded-full bg-green-400'></span>
                                    Live Session
                                </span>
                            )}
                            <button
                                className='rounded-md bg-[#228B22] px-4 py-2 text-white hover:bg-[#1a6a1a]'
                                onClick={() => setFullscreenMode(!fullscreenMode)}>
                                <span className='mr-2 inline-block'>{fullscreenMode ? '⏹️' : '⏫'}</span>
                                {fullscreenMode ? 'Exit Fullscreen' : 'Fullscreen Mode'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section selectors (mobile only) */}
                <div className='mb-4 flex md:hidden'>
                    <button
                        className={`flex-1 rounded-tl-md rounded-bl-md border border-r-0 border-[#228B22]/30 py-2 ${activeSection === 'all' ? 'bg-[#228B22]/30 text-white' : 'bg-black/50 text-gray-400'}`}
                        onClick={() => setActiveSection('all')}>
                        All
                    </button>
                    <button
                        className={`flex-1 border border-r-0 border-[#228B22]/30 py-2 ${activeSection === 'video' ? 'bg-[#228B22]/30 text-white' : 'bg-black/50 text-gray-400'}`}
                        onClick={() => setActiveSection('video')}>
                        Video
                    </button>
                    <button
                        className={`flex-1 border border-r-0 border-[#228B22]/30 py-2 ${activeSection === 'chat' ? 'bg-[#228B22]/30 text-white' : 'bg-black/50 text-gray-400'}`}
                        onClick={() => setActiveSection('chat')}>
                        Chat
                    </button>
                    <button
                        className={`flex-1 border border-[#228B22]/30 py-2 ${activeSection === 'resources' ? 'bg-[#228B22]/30 text-white' : 'bg-black/50 text-gray-400'}`}
                        onClick={() => setActiveSection('resources')}>
                        Resources
                    </button>
                </div>

                {/* Main classroom layout */}
                {fullscreenMode ? (
                    // Fullscreen mode layout
                    <div className='fixed inset-0 z-50 flex flex-col bg-black'>
                        <div className='flex items-center justify-between bg-[#228B22]/20 p-2'>
                            <h2 className='font-bold text-[#228B22]'>{classInfo.title}</h2>
                            <button
                                onClick={() => setFullscreenMode(false)}
                                className='rounded-full bg-gray-800 p-2 hover:bg-gray-700'>
                                <span>❌</span>
                            </button>
                        </div>
                        <div className='flex-grow overflow-hidden'>
                            <VideoConference />
                        </div>
                    </div>
                ) : (
                    // Regular layout
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        {(activeSection === 'all' || activeSection === 'video') && (
                            <div className='md:col-span-2'>
                                <VideoConference />
                            </div>
                        )}

                        {(activeSection === 'all' || activeSection === 'whiteboard') && (
                            <div>
                                <Whiteboard />
                            </div>
                        )}

                        {(activeSection === 'all' || activeSection === 'chat') && (
                            <div>
                                <ClassChat />
                            </div>
                        )}

                        {(activeSection === 'all' || activeSection === 'resources') && (
                            <div className='md:col-span-2'>
                                <LearningMaterials />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
