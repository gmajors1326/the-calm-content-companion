import { NextResponse } from 'next/server'

export const ADMIN_EMAILS_ENV = process.env.ADMIN_EMAILS || ''

function getAdminEmails(): string[] {
  const env = process.env.ADMIN_EMAILS || ''
  // Support comma-separated or JSON array
  try {
    if (env.trim().startsWith('[')) {
      const arr = JSON.parse(env)
      return Array.isArray(arr) ? arr : []
    }
  } catch {
    // ignore
  }
  if (env.includes(',')) {
    return env.split(',').map((s) => s.trim())
  }
  return env ? [env.trim()] : []
}

export function isAdminEmail(email?: string) {
  if (!email) return false
  const list = getAdminEmails()
  return list.includes(email)
}

export function getUserOrRedirect(nextPath: string) {
  // This is a placeholder to illustrate usage in server components/routes
  // In real implementation, read session cookie and verify admin status.
  return { ok: true, nextPath }
}

export function requireAdminOrRedirect(nextPath: string) {
  // Lightweight wrapper
  const ok = isAdminEmail((global as any).__currentUser?.email)
  if (!ok) {
    const red = '/'
    return red
  }
  return null
}
