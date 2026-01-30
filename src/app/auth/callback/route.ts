// src/app/auth/callback/route.ts
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

function safeNext(nextParam: string | null): string {
  if (!nextParam) return '/'
  if (nextParam.startsWith('/') && !nextParam.startsWith('//')) return nextParam
  return '/'
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const nextPath = safeNext(req.nextUrl.searchParams.get('next'))

  if (!code) {
    console.error('[auth/callback] Missing code')
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  }

  const supabase = createServerSupabase()
  if (!supabase) {
    return NextResponse.redirect(new URL('/login?error=config_error', req.nextUrl.origin))
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.nextUrl.origin))
  }

  return NextResponse.redirect(new URL(nextPath, req.nextUrl.origin))
}
