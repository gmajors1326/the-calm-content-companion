import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { isAdminEmail } from '../lib/adminAuth'

export default async function HomePage() {
  // Simple server-side check for login state using SSR cookies if available
  // In App Router, you can access cookies on server components
  const cookieHeader = cookies().toString()
  // naive extraction for demonstration
  const session = (cookieHeader.match(/session=([^;]+)/) || [])[1]
  const isAdmin = false
  return (
    <div style={{ padding: 40 }}>
      <h1>The Calm Content Companion</h1>
      <nav style={{ marginTop: 20 }}>
        <Link href="/login">Login</Link>
        {'  '}
        <Link href="/admin">Admin</Link>
      </nav>
      <div style={{ marginTop: 20 }}>
        {session ? <span>Logged in via SSR cookie</span> : <span>Not logged in</span>}
      </div>
    </div>
  )
}
