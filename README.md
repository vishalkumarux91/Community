# RPS Design Community

A community platform for designers — curated AI tools, courses, tutorials, and conversation. Inspired by the [Figma design](https://www.figma.com/design/zxAgbnLG8vNFtjkYdoQH0N/RPS-ACADEMY-FLOW).

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-first config in `globals.css`)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
src/
  app/
    layout.tsx          # root layout, fonts, metadata
    page.tsx            # homepage — composes all sections
    globals.css         # Tailwind v4 + design tokens
  components/
    site/               # full-width page sections
    ui/                 # reusable primitives (Button, Card, etc.)
references/             # competitive study + presentation (source material)
```

## Design tokens

Tokens are sourced from the Figma file's variables and defined as CSS custom properties in `src/app/globals.css`. Tailwind utilities (`bg-bg-sunken`, `text-text-strong`, etc.) read directly from those tokens via the `@theme` block, so updating a token updates everything.
