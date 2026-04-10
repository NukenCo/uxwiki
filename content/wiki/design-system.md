---
title: Design System
slug: design-system
section: mvp
order: 4
owner: Time de Design
updatedAt: Abr 2025
published: true
---

# Design System

O Design System — internamente chamado de **DS-RD** — é a fonte única de verdade para componentes, tokens e padrões de interface de todos os produtos digitais do grupo.

---

## Princípios

**Consistência como acessibilidade.** Quando o comportamento é previsível, o usuário gasta menos energia cognitiva — algo crítico em contextos de saúde.

**Componentes agnósticos de domínio.** O DS não é construído para um produto específico. Ele serve como base para qualquer squad que constrói interface digital.

**Documentação é parte do componente.** Um componente sem documentação não está pronto. Spec, estados, acessibilidade e exemplos são obrigatórios.

---

## Estrutura

### Tokens

Os tokens são as menores unidades do sistema. Definem os valores de cor, tipografia, espaçamento, sombra e bordas.

**Tipos de tokens:**

- **Primitivos:** valores brutos (`color-blue-500`, `space-4`)
- **Semânticos:** significado de uso (`color-surface-primary`, `space-component-gap`)
- **Compostos:** combinações de tokens semânticos usados em componentes específicos

---

### Componentes

Os componentes estão organizados em 4 categorias:

| Categoria | Exemplos |
|-----------|---------|
| **Primitivos** | Button, Input, Badge, Tag, Icon |
| **Compostos** | Card, Modal, Toast, Dropdown |
| **Layouts** | Header, Sidebar, Page Shell, Grid |
| **Domínio** | AppointmentCard, ExamResult, PatientBanner |

Cada componente documenta:
- Variantes e estados
- Props e comportamento
- Regras de uso (do/don't)
- Acessibilidade (WCAG 2.1 AA)
- Token map

---

### Padrões

Os padrões descrevem como combinar componentes para resolver problemas recorrentes.

**Exemplos de padrões documentados:**
- Formulários de cadastro
- Fluxos de confirmação de ação
- Feedback de carregamento e erro
- Navegação mobile
- Estados vazios

---

## Como usar

### No Figma

1. Abra o arquivo `[DS-RD] Biblioteca` na organização do Figma
2. Enable a biblioteca no seu projeto via `Assets > Libraries`
3. Consulte a documentação de cada componente no arquivo de referência
4. Em caso de dúvida, pergunte no canal `#design-system` no Slack

### No código

O DS-RD é implementado como biblioteca de componentes React. A documentação técnica está no Storybook.

```bash
npm install @rdor/design-system
```

```tsx
import { Button, Card } from '@rdor/design-system'
```

---

## Contribuindo com o DS

O DS é mantido pela squad de Design Systems, mas contribuições são bem-vindas.

**Para propor um novo componente:**
1. Abra uma issue no repositório com o template `New Component Proposal`
2. Discuta na reunião mensal de DS Review
3. Desenvolva seguindo o checklist de contribuição
4. PR no Figma + PR no código — ambos devem ser aprovados

**Regra:** Não crie componentes locais sem antes verificar se o DS já resolve. Duplicação é dívida técnica de design.

---

## Versioning

O DS segue Semantic Versioning. Toda breaking change é comunicada com antecedência mínima de 2 sprints via `#design-system`.

Versão atual: **DS-RD v3.2.1**
