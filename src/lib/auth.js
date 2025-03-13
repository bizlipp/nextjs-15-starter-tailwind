import { supabase } from './supabase';

export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error('🚨 Signup Error:', error.message);
        return { success: false, message: error.message };
    }

    return { success: true, user: data.user };
};

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error('🚨 Login Error:', error.message);
        return { success: false, message: error.message };
    }

    return { success: true, user: data.user };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('🚨 Logout Error:', error.message);
        return { success: false, message: error.message };
    }

    console.log('✅ User logged out successfully.');
    return { success: true };
};
