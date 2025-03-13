'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // In a real application, you would call your authentication API here
            // For now, let's simulate a successful login/signup
            console.log(`${isLogin ? 'Logging in' : 'Signing up'} with:`, { email, password });

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to home page after successful auth
            router.push('/');
        } catch (err) {
            setError('Authentication failed. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-md rounded-lg border border-[#00AEEF]/30 bg-black/80 p-8 shadow-lg backdrop-blur-sm'>
            <div className='mb-6 text-center'>
                <h2 className="font-['Orbitron'] text-2xl font-bold tracking-wider text-[#00AEEF]">
                    {isLogin ? 'LOGIN' : 'SIGN UP'}
                </h2>
                <p className='mt-2 text-sm text-gray-400'>{isLogin ? 'Access your account' : 'Create a new account'}</p>
            </div>

            {error && (
                <div className='mb-4 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400'>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='mb-2 block text-sm font-medium text-gray-300' htmlFor='email'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-[#00AEEF] focus:outline-none'
                        placeholder='your@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label className='mb-2 block text-sm font-medium text-gray-300' htmlFor='password'>
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-[#00AEEF] focus:outline-none'
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='group relative w-full rounded-md bg-gradient-to-r from-[#00AEEF]/80 to-[#00AEEF]/60 px-4 py-2 text-center font-medium text-white transition-all hover:from-[#00AEEF] hover:to-[#00AEEF]/80 focus:outline-none disabled:opacity-70'>
                    {isLoading ? (
                        <span className='flex items-center justify-center'>
                            <svg className='mr-2 h-4 w-4 animate-spin' viewBox='0 0 24 24'>
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                    fill='none'></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            Processing...
                        </span>
                    ) : isLogin ? (
                        'Login'
                    ) : (
                        'Sign Up'
                    )}

                    {/* Glow effect */}
                    <span className='absolute inset-0 -z-10 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        <span className='absolute inset-0 rounded-md bg-[#00AEEF]/20 blur-md'></span>
                    </span>
                </button>
            </form>

            <div className='mt-6 text-center text-sm'>
                <span className='text-gray-400'>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-[#00AEEF] hover:text-[#00AEEF]/80 focus:outline-none'>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </div>

            <div className='mt-8 border-t border-gray-800 pt-6'>
                <div className='flex items-center justify-between'>
                    <Link href='/' className='text-xs text-gray-500 hover:text-gray-400'>
                        Home
                    </Link>

                    <Link href='#' className='text-xs text-gray-500 hover:text-gray-400'>
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
