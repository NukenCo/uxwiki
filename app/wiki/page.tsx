import Link from 'next/link'
import { getAllPages, getPagesBySection } from '@/lib/markdown'
import type { PageMeta } from '@/lib/markdown'

const SECTION_LABELS: Record<string, string> = {
  mvp: 'Fundamentos',
  produto: 'Produto',
  processo: 'Processo',
  ferramentas: 'Ferramentas',
  cultura: 'Cultura',
  geral: 'Geral',
}

function PageCard({ page }: { page: PageMeta }) {
  return (
    <Link
      href={`/wiki/${page.slug}`}
      className="hover-card"
      style={{
        display: 'block',
        background: '#0d0d0d',
        border: '0.5px solid #1a1a1a',
        padding: '1.25rem',
        textDecoration: 'none',
        borderRadius: '2px',
      }}
    >
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          color: '#f0ede8',
          marginBottom: '0.375rem',
          letterSpacing: '-0.01em',
        }}
      >
        {page.title}
      </h3>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.06em',
          }}
        >
          {page.owner}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            color: '#222',
            letterSpacing: '0.04em',
          }}
        >
          {page.updatedAt}
        </span>
      </div>
    </Link>
  )
}

export default function WikiHomePage() {
  const pages = getAllPages()
  const pagesBySection = getPagesBySection()
  const totalPages = pages.length

  return (
    <div style={{ padding: '4rem 3.5rem', maxWidth: '900px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            color: '#333',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Wiki · Restrito
        </p>
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '52px',
            fontWeight: 900,
            color: '#f0ede8',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '1.5rem',
          }}
        >
          Design Team
          <br />
          Knowledge Base
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#555',
            lineHeight: 1.6,
            maxWidth: '480px',
          }}
        >
          Documentação interna da equipe de UX/UI da Rede D&apos;Or.
          Processos, rituais, ferramentas e tudo o que você precisa para trabalhar com a gente.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          marginBottom: '3.5rem',
          borderTop: '0.5px solid #1a1a1a',
          borderBottom: '0.5px solid #1a1a1a',
          padding: '1.25rem 0',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 900,
              color: '#f0ede8',
              letterSpacing: '-0.03em',
            }}
          >
            {totalPages}
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: '#333',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Páginas
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 900,
              color: '#f0ede8',
              letterSpacing: '-0.03em',
            }}
          >
            {Object.keys(pagesBySection).length}
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: '#333',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Seções
          </p>
        </div>
      </div>

      {/* Sections */}
      {Object.entries(pagesBySection).map(([section, sectionPages]) => (
        <div key={section} style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                color: '#333',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {SECTION_LABELS[section] ?? section}
            </h2>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                color: '#222',
              }}
            >
              {sectionPages.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '0.5px',
              border: '0.5px solid #1a1a1a',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            {sectionPages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
