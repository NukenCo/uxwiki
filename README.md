# UX Wiki — Rede D'Or

Wiki interna da equipe de design da Rede D'Or. Construída com Next.js 14, App Router e Tailwind CSS. Hospedada na Vercel.

---

## Rodando localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
cp .env.example .env.local
# Edite .env.local e defina WIKI_PASSWORD=sua-senha

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`. Você será redirecionado para `/login`.

---

## Deploy na Vercel

### Primeiro deploy

```bash
# Instale a CLI da Vercel se ainda não tiver
npm i -g vercel

# Deploy
vercel
```

### Variáveis de ambiente na Vercel

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `WIKI_PASSWORD` | Sua senha de acesso |

> Sem essa variável configurada, **ninguém consegue fazer login**.

### Deploy contínuo

Conecte o repositório GitHub ao projeto Vercel. Todo push para `main` fará deploy automático.

---

## Adicionando uma nova página

### 1. Crie o arquivo Markdown

Crie um arquivo `.md` em `/content/wiki/` com o seguinte frontmatter:

```markdown
---
title: Título da Página
slug: slug-da-pagina
section: mvp
order: 7
owner: Seu Nome
updatedAt: Abr 2025
published: true
---

# Conteúdo aqui

...
```

### 2. Convenções

| Campo | Descrição |
|-------|-----------|
| `title` | Título exibido na UI |
| `slug` | Deve ser igual ao nome do arquivo (sem `.md`) |
| `section` | Grupo na sidebar. Valores: `mvp`, `produto`, `processo`, `ferramentas`, `cultura`, `geral` |
| `order` | Ordem de exibição dentro da seção (número inteiro) |
| `owner` | Responsável pela página |
| `updatedAt` | Data de atualização (formato livre, ex: `Abr 2025`) |
| `published` | `true` para publicar, `false` para ocultar |

### 3. Visualize localmente

Rode `npm run dev` e acesse `/wiki/slug-da-pagina`.

### 4. Publique

Commit + push para `main`. A Vercel fará o deploy automaticamente.

```bash
git add content/wiki/nova-pagina.md
git commit -m "docs: adiciona página nova-pagina"
git push
```

---

## Estrutura do projeto

```
/
├── app/
│   ├── layout.tsx          # Layout raiz (HTML, fonts)
│   ├── page.tsx            # Redirect para /wiki
│   ├── globals.css         # Estilos globais e prose-wiki
│   ├── login/
│   │   └── page.tsx        # Tela de login
│   ├── api/
│   │   ├── login/route.ts  # POST — valida senha, seta cookie
│   │   └── logout/route.ts # POST — limpa cookie
│   └── wiki/
│       ├── layout.tsx      # Layout com Header + Sidebar
│       ├── page.tsx        # Home da wiki (cards)
│       └── [slug]/
│           └── page.tsx    # Página dinâmica de conteúdo
├── components/
│   ├── Header.tsx          # Header fixo com logo e logout
│   └── Sidebar.tsx         # Sidebar com navegação por seção
├── content/
│   └── wiki/               # Arquivos .md com o conteúdo
├── lib/
│   ├── auth.ts             # Utilitário de hash para autenticação
│   └── markdown.ts         # Leitura e parsing dos arquivos .md
├── middleware.ts            # Proteção de rotas /wiki/*
└── vercel.json             # Configuração de deploy
```

---

## Alterando a senha

1. Na Vercel: **Settings > Environment Variables > WIKI_PASSWORD**
2. Faça um redeploy (ou o próximo deploy automático já pega o novo valor)
3. Usuários logados com a senha antiga serão deslogados automaticamente na próxima requisição

---

## Adicionando uma nova seção

Em `components/Sidebar.tsx` e `app/wiki/page.tsx`, adicione a nova seção ao objeto `SECTION_LABELS`:

```typescript
const SECTION_LABELS: Record<string, string> = {
  mvp: 'Fundamentos',
  produto: 'Produto',
  // adicione aqui:
  legal: 'Jurídico',
}
```

Depois, use `section: legal` no frontmatter dos arquivos `.md` da seção.
