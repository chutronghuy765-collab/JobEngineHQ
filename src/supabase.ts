import { createClient, SupabaseClientOptions } from '@supabase/supabase-js'

// Use environment variables for production.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Configure Supabase client with better options for CORS handling
const supabaseOptions: SupabaseClientOptions<'public'> = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey || 'placeholder_key',
      'Content-Type': 'application/json'
    },
    fetch: (url, options = {}) => {
      // Add CORS-friendly headers to requests
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'apikey': supabaseAnonKey || 'placeholder_key',
          'Authorization': options.headers?.Authorization || `Bearer ${supabaseAnonKey || 'placeholder_key'}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        mode: 'cors',
        credentials: 'omit'
      }).catch((error) => {
        // Better error handling for CORS issues
        if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
          console.error('❌ CORS Error: Please configure CORS on Supabase Dashboard:', {
            message: 'Add your domain to Supabase allowed origins',
            domain: window.location.origin,
            supabaseUrl: supabaseUrl,
            help: 'See NETLIFY_ENV_SETUP.md for instructions'
          })
        }
        throw error
      })
    }
  }
}

// Create client with fallback values to prevent app crash
// In production, these should be set via Netlify environment variables
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_key',
  supabaseOptions
)

// Log warning in development if env vars are missing
if (process.env.NODE_ENV === 'development' && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('⚠️ Supabase environment variables are missing. Please check your .env file.')
}

// Log warning in production if using placeholder values
if (process.env.NODE_ENV === 'production' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('❌ Supabase URL and Anon Key are required in production. Please set environment variables on Netlify.')
}

export type WorkModel = 'on-site' | 'remote' | 'hybrid'

// Database types
export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  work_model?: WorkModel
  is_verified?: boolean
  salary_min?: number
  salary_max?: number
  description: string
  requirements: string[]
  benefits: string[]
  created_at: string
  updated_at: string
  is_active: boolean
  employer_id: string
}

export interface User {
  id: string
  email: string
  full_name: string
  role: 'employer' | 'jobseeker' | 'admin'
  company?: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  user_id: string
  name: string
  email: string
  cover_letter: string
  linkedin_profile?: string
  resume_url?: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

