// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    // This will show in the browser console if env is missing
    console.error('[supabase/client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    throw new Error('Missing Supabase env vars')
  }

  return createBrowserClient(url, anon)
}
