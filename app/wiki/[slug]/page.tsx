import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPageBySlug, getAllSlugs } from '@/lib/markdown'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)
  if (!page) return { title: 'Não encontrado' }
  return {
    title: `${page.title} — UX Wiki`,
  }
}

export default async function WikiPage({ params }: Props) {
  const page = await getPageBySlug(params.slug)

  if (!page || page.published === false) {
    notFound()
  }

  return (
    <div style={{ padding: '3.5rem 3.5rem 6rem' }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <Link
          href="/wiki"
          className="hover-link"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#333',
            textDecoration: 'none',
            letterSpacing: '0.06em',
          }}
        >
          Wiki
        </Link>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#222',
          }}
        >
          /
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#444',
          }}
        >
          {page.title}
        </span>
      </div>

      {/* Article */}
      <article>
        {/* Page title */}
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '42px',
            fontWeight: 900,
            color: '#f0ede8',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}
        >
          {page.title}
        </h1>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '0.5px solid #1a1a1a',
          }}
        >
          <MetaItem label="Autor" value={page.owner} />
          <MetaSep />
          <MetaItem label="Atualizado" value={page.updatedAt} />
          <MetaSep />
          <MetaItem label="Seção" value={page.section} />
        </div>

        {/* Content */}
        <div
          className="prose-wiki"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />
      </article>
    </div>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9px',
          color: '#333',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '2px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#666',
        }}
      >
        {value}
      </p>
    </div>
  )
}

function MetaSep() {
  return (
    <div
      style={{
        width: '0.5px',
        height: '28px',
        background: '#1a1a1a',
      }}
    />
  )
}
