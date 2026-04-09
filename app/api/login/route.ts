import { NextRequest, NextResponse } from 'next/server'
import { computeToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  const envPassword = process.env.WIKI_PASSWORD

  if (!envPassword) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  if (password !== envPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = computeToken(envPassword)

  const response = NextResponse.json({ ok: true })

  response.cookies.set('wiki-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}
