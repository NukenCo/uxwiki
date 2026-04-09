import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        border: '#1a1a1a',
        text: {
          primary: '#f0ede8',
          secondary: '#666666',
          muted: '#333333',
        },
        accent: '#f0ede8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['52px', { lineHeight: '1.05', fontWeight: '900' }],
      },
    },
  },
  plugins: [],
}

export default config
