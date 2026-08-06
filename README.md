# ClikLink Internet — Frontend Next.js

## Stack
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + design system próprio
- **React Hook Form** + **Zod** (validação)
- **Framer Motion** (animações)
- **Lucide React** (ícones)

---

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx                    ← Home (/)
│   ├── layout.tsx                  ← Layout raiz (Navbar + Footer)
│   ├── globals.css                 ← Design tokens + Tailwind
│   ├── planos/
│   │   └── page.tsx                ← Listagem de planos (/planos)
│   ├── assinar/
│   │   └── [slug]/
│   │       └── page.tsx            ← Formulário único por plano (/assinar/300-mega-esaude-yplay)
│   ├── suporte/
│   │   └── page.tsx                ← Central de suporte (/suporte)
│   ├── minha-conta/
│   │   └── page.tsx                ← Redireciona para portal do assinante
│   ├── segunda-via/
│   │   └── page.tsx                ← Redireciona para portal do assinante
│   └── api/
│       ├── assinatura/route.ts     ← POST /api/assinatura
│       └── contato/route.ts        ← POST /api/contato
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── index.tsx               ← PlanCard, Badge, Breadcrumb, WhatsAppFloat...
│   │   ├── Logo.tsx                ← ⚠️ Substituir pelo logo real
│   │   └── WhatsAppFloat.tsx
│   └── sections/
│       ├── index.tsx               ← Hero, Coverage, FAQ, Contact, Testimonials
│       └── *.tsx                   ← Barrel exports
│
├── lib/
│   ├── planos.ts                   ← ✅ FONTE ÚNICA de dados dos planos
│   ├── validations.ts              ← Schemas Zod
│   └── utils.ts                    ← Helpers + constantes globais
│
└── types/
    └── index.ts                    ← Tipos TypeScript
```

---

## URLs do projeto

| Página | URL | Descrição |
|--------|-----|-----------|
| Home | `/` | Landing page completa |
| Planos | `/planos` | Listagem de todos os planos |
| Assinar 100 Mega | `/assinar/100-mega` | Form para plano 100M |
| Assinar 300M + eSaúde | `/assinar/300-mega-esaude` | Form para plano 300M |
| Assinar 300M + eSaúde + YPlay | `/assinar/300-mega-esaude-yplay` | Form para plano 300M completo |
| Assinar 600M + eSaúde | `/assinar/600-mega-esaude` | Form para plano 600M |
| Assinar 600M + eSaúde + YPlay | `/assinar/600-mega-esaude-yplay` | Form para plano 600M completo |
| Assinar 1 GB | `/assinar/1-gb` | Form para plano 1GB |
| Assinar TV Start | `/assinar/tv-start` | Form para TV 63 canais |
| Assinar TV Premium | `/assinar/tv-premium` | Form para TV 74 canais |
| Assinar Condomínio | `/assinar/condominio` | Form para condomínios |
| Suporte | `/suporte` | Central de suporte + FAQ |
| Minha conta | `/minha-conta` | Redirect → portal assinante |
| 2ª via | `/segunda-via` | Redirect → portal assinante |

---

## Como cada plano tem sua própria página

Cada botão "Assinar" aponta para `/assinar/[slug]` com o slug único do plano.  
A página lê o slug da URL e busca o plano em `src/lib/planos.ts`.  
O sidebar mostra os dados específicos do plano selecionado.  
O formulário inclui `planoId`, `planoNome` e `planoPreco` como campos ocultos.

Para **adicionar ou alterar um plano**, edite apenas `src/lib/planos.ts` — todas as páginas atualizam automaticamente.

---

## Portal do assinante (links externos)

Todos os links de "Minha conta", "2ª via de boleto" e "Central do assinante" apontam para:
```
https://cliklink.sgp.tsmx.com.br/centralweb/login
```
Configurado em `src/lib/utils.ts` na constante `PORTAL_URL`.

---

## Setup

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build && npm start
```

---

## Logo

O logo atual é um placeholder SVG em `src/components/ui/Logo.tsx`.

Para substituir pelo logo real:
1. Coloque o arquivo em `public/logo.png` (ou `.svg`)
2. Em `Logo.tsx`, substitua o `<svg>` por:
```tsx
import Image from "next/image";
<Image src="/logo.png" alt="ClikLink Internet" width={140} height={40} priority />
```

---

## Integração backend (Node.js / Express)

As rotas de API estão em:
- `POST /api/assinatura` — recebe dados do formulário de assinatura
- `POST /api/contato` — recebe dados do formulário de contato

Para conectar ao seu backend Express, substitua os comentários em cada `route.ts` pela chamada à sua API:

```ts
const res = await fetch("http://seu-backend.com/assinatura", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

---

## Variáveis de ambiente

Crie `.env.local`:

```env
# URL do backend Express
NEXT_PUBLIC_API_URL=http://localhost:3001

# E-mail de destino das solicitações (se usar nodemailer)
CONTACT_EMAIL=atendimento@cliklink.com.br

# Chave API para envio de e-mail (Resend, SendGrid, etc.)
EMAIL_API_KEY=sua_chave_aqui
```
