// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient as createSSRClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const url = process.env.SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY

  if (!url || !anon) {
    console.error('[middleware] Missing Supabase env vars')
    return res
  }

  const supabase = createSSRClient(url, anon, {
    cookies: {
      get: (name) => req.cookies.get(name)?.value,
      set: (name, value, options) => res.cookies.set({ name, value, ...options }),
      remove: (name, options) => res.cookies.set({ name, value: '', ...options, maxAge: 0 }),
    },
  })

  // 🔑 THIS is what refreshes the session cookie
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (req.nextUrl.pathname.startsWith('/admin') && !user) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
}
