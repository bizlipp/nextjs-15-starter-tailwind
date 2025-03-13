'use client';

import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { signIn, signUp } from '../lib/auth';

export default function AuthForm() {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mx-auto max-w-md rounded-lg bg-gray-900 p-6 text-white'>
            {user ? (
                <p>Welcome, {user.email}! You are logged in.</p>
            ) : (
                <form onSubmit={handleAuth}>
                    <h2 className='text-2xl font-bold'>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
                    {error && <p className='text-red-500'>{error}</p>}
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='mt-2 w-full rounded bg-gray-800 p-2'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='mt-2 w-full rounded bg-gray-800 p-2'
                    />
                    <button
                        type='submit'
                        className='mt-4 w-full rounded bg-purple-600 p-2 hover:bg-purple-500'
                        disabled={loading}>
                        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
                    </button>
                    <p className='mt-3 text-sm'>
                        {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
                        <span className='cursor-pointer text-blue-400' onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? 'Log In' : 'Sign Up'}
                        </span>
                    </p>
                </form>
            )}
        </div>
    );
}
