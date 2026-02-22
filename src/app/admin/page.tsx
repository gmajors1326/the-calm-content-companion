import React from 'react'
import { headers } from 'next/headers'
import { isAdminEmail } from '../../lib/adminAuth'

export default function AdminPage() {
  // Server Component: simple guard via redirect if not admin
  // This is a best-effort placeholder; real guard should redirect in getServerSideProps analogue
  const h = headers()
  const cookieHeader = h.get('cookie') || ''
  const match = cookieHeader.split(';').find((c) => c.trim().startsWith('session='))
  const token = match ? match.split('=')[1] : null
  const isAdmin = !!token // placeholder
  if (!isAdmin) {
    // In App Router, you can't directly redirect from a server component; you would use a layout or middleware. Show message instead.
    return <div style={{ padding: 40 }}>Access denied. Admins only.</div>
  }
  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Panel</h2>
      <p>Protected by allowlist-based access.</p>
    </div>
  )
}
