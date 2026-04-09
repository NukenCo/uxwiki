'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PageMeta } from '@/lib/markdown'

const SECTION_LABELS: Record<string, string> = {
  mvp: 'Fundamentos',
  produto: 'Produto',
  processo: 'Processo',
  ferramentas: 'Ferramentas',
  cultura: 'Cultura',
  geral: 'Geral',
}

interface SidebarProps {
  pagesBySection: Record<string, PageMeta[]>
}

export default function Sidebar({ pagesBySection }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      style={{
        position: 'fixed',
        top: '48px',
        left: 0,
        bottom: 0,
        width: '232px',
        background: '#0a0a0a',
        borderRight: '0.5px solid #1a1a1a',
        overflowY: 'auto',
        padding: '1.5rem 0',
        zIndex: 40,
      }}
    >
      {/* Wiki home link */}
      <div style={{ padding: '0 1.25rem', marginBottom: '1.5rem' }}>
        <Link
          href="/wiki"
          style={{
            display: 'block',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: pathname === '/wiki' ? 700 : 400,
            color: pathname === '/wiki' ? '#f0ede8' : '#444',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.375rem 0',
          }}
        >
          Início
        </Link>
      </div>

      {/* Sections */}
      {Object.entries(pagesBySection).map(([section, pages]) => (
        <div key={section} style={{ marginBottom: '1.75rem' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              fontWeight: 700,
              color: '#333',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0 1.25rem',
              marginBottom: '0.375rem',
            }}
          >
            {SECTION_LABELS[section] ?? section}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pages.map((page) => {
              const href = `/wiki/${page.slug}`
              const isActive = pathname === href

              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? '#f0ede8' : '#555',
                      textDecoration: 'none',
                      padding: '0.375rem 1.25rem',
                      borderLeft: isActive
                        ? '1px solid #f0ede8'
                        : '1px solid transparent',
                      transition: 'color 0.1s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        ;(e.currentTarget as HTMLElement).style.color = '#999'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        ;(e.currentTarget as HTMLElement).style.color = '#555'
                      }
                    }}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {/* Bottom meta */}
      <div
        style={{
          padding: '0 1.25rem',
          marginTop: 'auto',
          borderTop: '0.5px solid #1a1a1a',
          paddingTop: '1.25rem',
          position: 'absolute',
          bottom: '1.5rem',
          left: 0,
          right: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            color: '#222',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1.6,
          }}
        >
          Rede D&apos;Or
          <br />
          Design Team
        </p>
      </div>
    </aside>
  )
}
