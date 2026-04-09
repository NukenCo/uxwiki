import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SALT = 'uxwiki-rd'

async function computeToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + SALT)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bypass API login route
  if (pathname.startsWith('/api/login') || pathname.startsWith('/api/logout')) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get('wiki-session')?.value
  const password = process.env.WIKI_PASSWORD

  if (!password) {
    // No password configured → block all access
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const expectedToken = await computeToken(password)

  if (sessionCookie === expectedToken) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/wiki/:path*'],
}
