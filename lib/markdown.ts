import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'wiki')

export interface PageMeta {
  title: string
  slug: string
  section: string
  order: number
  owner: string
  updatedAt: string
  published: boolean
}

export interface WikiPage extends PageMeta {
  contentHtml: string
}

export function getAllPages(): PageMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

  const pages = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      const { data } = matter(raw)
      return data as PageMeta
    })
    .filter((p) => p.published !== false)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return pages
}

export function getPagesBySection(): Record<string, PageMeta[]> {
  const pages = getAllPages()
  return pages.reduce<Record<string, PageMeta[]>>((acc, page) => {
    const section = page.section ?? 'geral'
    if (!acc[section]) acc[section] = []
    acc[section].push(page)
    return acc
  }, {})
}

export async function getPageBySlug(slug: string): Promise<WikiPage | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    ...(data as PageMeta),
    contentHtml: processed.toString(),
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
