import { getPagesBySection } from '@/lib/markdown'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const pagesBySection = getPagesBySection()

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Header />
      <Sidebar pagesBySection={pagesBySection} />
      <main
        style={{
          marginLeft: '232px',
          paddingTop: '48px',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  )
}
