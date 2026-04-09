'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        background: '#0a0a0a',
        borderBottom: '0.5px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link
        href="/wiki"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 900,
            color: '#f0ede8',
            letterSpacing: '-0.02em',
          }}
        >
          UX Wiki
        </span>
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            fontWeight: 700,
            color: '#333',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: '#111',
            border: '0.5px solid #1a1a1a',
            padding: '2px 6px',
            borderRadius: '2px',
          }}
        >
          RESTRITO
        </span>
      </Link>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            color: '#333',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Rede D&apos;Or · Design Team
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            color: '#333',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.color = '#666'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.color = '#333'
          }}
        >
          Sair
        </button>
      </div>
    </header>
  )
}
