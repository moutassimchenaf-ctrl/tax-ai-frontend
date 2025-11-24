// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3001';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || process.env.WS_URL || 'ws://localhost:3001';

// Supabase
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Feature flags
export const FEATURES = {
    ENABLE_3D: true,
    ENABLE_AI_AGENT: true,
    ENABLE_ANALYTICS: false,
};
