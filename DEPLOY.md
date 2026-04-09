# Deploy

Este projeto é hospedado na Vercel com deploy contínuo a partir da branch `main`.

## Deploy automático

Todo push para `main` dispara um novo deploy automaticamente.

## Deploy manual

```bash
git commit --allow-empty -m "fix: trigger deploy"
git push
```

## Variáveis de ambiente

Configure no painel da Vercel em **Settings > Environment Variables**:

| Variável | Descrição |
|----------|-----------|
| `WIKI_PASSWORD` | Senha de acesso à wiki |
