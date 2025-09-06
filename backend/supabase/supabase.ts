import { createClient } from "@supabase/supabase-js"
import env from 'dotenv'

env.config()

export default function createSupaClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY


  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL is required')
  }

  if (!supabaseKey) {
    throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY is required')
  }

  return createClient(supabaseUrl, supabaseKey)
}