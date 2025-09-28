# HomePass - Guia de Desenvolvimento

## 🚀 Estrutura do Projeto

```
app/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── HowItWorks.tsx
├── constants/           # Constantes da aplicação
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
├── globals.css         # Estilos globais
├── layout.tsx          # Layout raiz
└── page.tsx            # Página principal

components/              # Componentes legados (migrar gradualmente)
├── I18nProvider.tsx
└── ItemsData.ts

i18n/                   # Internacionalização
├── index.ts
└── locales/
    ├── pt/
    └── en/

public/
├── icons/              # Ícones SVG otimizados
└── ...

utils/                  # Utilitários
└── supabaseClient.ts
```

## 🛠️ Melhorias Implementadas

### ✅ Performance
- **Otimização de imagens**: Configuração Next.js para WebP/AVIF
- **Fontes otimizadas**: Carregamento via Next.js Fonts com `display: swap`
- **Code splitting**: Componentes modulares
- **Bundle optimization**: Configuração experimental para otimizar imports

### ✅ SEO
- **Metadata completa**: OpenGraph, Twitter Cards, robots.txt
- **metadataBase**: Resolvido warning de social images
- **Estrutura semântica**: HTML5 semântico com acessibilidade

### ✅ Estrutura
- **Componentes modulares**: Header, Hero, HowItWorks separados
- **TypeScript**: Tipos definidos em `/app/types`
- **Constantes**: Configurações centralizadas em `/app/constants`
- **Assets organizados**: Ícones SVG em `/public/icons`

### ✅ Segurança
- **Headers de segurança**: X-Frame-Options, X-Content-Type-Options
- **Referrer Policy**: Configuração adequada

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```
# isto e do pedrinho 
## 📝 Próximos Passos~


1. **Migrar componentes restantes** para `/app/components`
2. **Implementar error boundaries** para tratamento de erros
3. **Adicionar testes** com Playwright
4. **Configurar CI/CD** para deploy automático
5. **Implementar PWA** com service workers
6. **Adicionar analytics** (Google Analytics, PostHog)

## 🔧 Configurações Importantes

### Next.js Config
- `outputFileTracingRoot`: Resolve warning de múltiplos lockfiles
- `optimizePackageImports`: Otimiza imports de bibliotecas
- `images.formats`: Suporte a WebP e AVIF
- `headers`: Headers de segurança

### TypeScript
- Configuração otimizada para Next.js 15
- Path mapping configurado (`@/*`)
- Strict mode ativado

### Tailwind CSS
- Configuração v4 com tema inline
- Variáveis CSS para fontes
- Suporte a dark mode

## 🌐 Internacionalização

O projeto usa `react-i18next` com:
- Detecção automática de idioma
- Fallback para português
- Namespaces organizados (common, home)
- Cache no localStorage

## 🎨 Design System

### Cores
- **Primary**: Sky (azul) e Emerald (verde)
- **Neutral**: Slate para textos
- **Background**: #f6fafb

### Tipografia
- **Headings**: Quicksand (700)
- **Body**: Geist Sans
- **Mono**: Geist Mono

### Componentes
- Cards com shadow e border radius
- Botões com hover states
- Badges com cores temáticas
- Accordion para FAQ
