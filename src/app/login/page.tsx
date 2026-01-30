"use client"
import React, { useState } from 'react'
import { createBrowserSupabase } from '../../lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const supabase = createBrowserSupabase()

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !supabase) return
    const next = (typeof window !== 'undefined') ? new URL(window.location.href).searchParams.get('next') || '/' : '/'
    const { data, error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=${encodeURIComponent(next)}` } })
    if (error) console.error('OTP error', error)
    else alert('Magic link sent to ' + email)
  }

  if (!supabase) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Configuration Error</h2>
        <p>Supabase environment variables are missing. Please check your Vercel settings.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign in with Magic Link</h2>
      <form onSubmit={sendOtp}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Send login link</button>
      </form>
    </div>
  )
}
