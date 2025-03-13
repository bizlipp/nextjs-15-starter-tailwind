import { createClient } from '@supabase/supabase-js';

// Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🚀 Supabase URL:', supabaseUrl);
console.log('🚀 Supabase Key:', supabaseAnonKey ? 'Loaded ✅' : 'Missing ❌');

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
