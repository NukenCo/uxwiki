'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/wiki'

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        setError('Senha incorreta.')
        setPassword('')
      }
    } catch {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: '#333',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Design Team
        </p>
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '32px',
            fontWeight: 900,
            color: '#f0ede8',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          UX Wiki
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <input
          type="password"
          placeholder="Senha de acesso"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          disabled={loading}
          style={{
            background: '#111',
            border: '0.5px solid #1a1a1a',
            color: '#f0ede8',
            padding: '0.75rem 1rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            outline: 'none',
            borderRadius: '2px',
            width: '100%',
            letterSpacing: '0.15em',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#333'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#1a1a1a'
          }}
        />

        <button
          type="submit"
          disabled={loading || !password}
          style={{
            background: loading || !password ? '#1a1a1a' : '#f0ede8',
            color: loading || !password ? '#333' : '#0a0a0a',
            border: 'none',
            padding: '0.75rem 1rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: loading || !password ? 'not-allowed' : 'pointer',
            borderRadius: '2px',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {error && (
          <p
            style={{
              color: '#666',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'center',
              marginTop: '0.25rem',
            }}
          >
            {error}
          </p>
        )}
      </form>

      {/* Footer */}
      <p
        style={{
          position: 'fixed',
          bottom: '2rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: '#222',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Acesso restrito
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
