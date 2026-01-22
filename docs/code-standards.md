# Code Standards & Architecture

**Last Updated**: 2026-01-23 | **Version**: 2.0

## Architecture Overview

This project is a **static, theme-based Next.js application**. It is designed to be purely frontend, with no server-side API routes or database dependencies.

**Key Principles:**
- **Static Export**: The app is built using `output: 'export'` (defined in `next.config.js`).
- **Theme-Based**: All visual and functional logic is encapsulated within `src/themes`.
- **Config-Driven**: Content is managed via TypeScript configuration files (`config.ts`), not a database.
- ** Edge-Ready**: Deploys to any static host (Cloudflare Pages, Vercel, Netlify).

## Codebase Structure

```
premium-bio-website/
├── src/
│   ├── app/                          # Main App Router (Platform Shell)
│   │   ├── layout.tsx                # Global layout (loads theme styles)
│   │   ├── page.tsx                  # Dynamic theme loader
│   │   └── not-found.tsx             # 404 page
│   ├── themes/                       # Theme Definitions
│   │   ├── next-star/                # "Next Star" Theme
│   │   │   ├── components/           # Theme-specific components
│   │   │   ├── i18n/                 # Translation files
│   │   │   ├── lib/                  # Helper functions
│   │   │   └── config.ts             # Theme usage configuration (User Data)
│   │   └── next-link/                # "Next Link" Theme
│   │       └── ...
│   └── globals.css                   # Base Tailwind utilities
├── public/                           # Static assets
├── next.config.js                    # Static export config
├── tailwind.config.ts                # Tailwind config
└── package.json                      # Scripts & dependencies
```

## Theme Architecture

Each theme in `src/themes/[theme-name]` should be self-contained.

### Required Structure for Themes
- **`config.ts`**: Must export a strongly-typed configuration object containing profile, links, and products.
- **`components/MainPage.tsx`**: The entry point for the theme's UI.
- **`i18n/translations.ts`**: A dictionary of translations keyed by locale (e.g., 'en', 'vi').

### Example `config.ts`
```typescript
export const config = {
  profile: {
    name: "User Name",
    avatar: "/path/to/image.jpg",
  },
  links: [
    { title: "My Blog", url: "https://..." }
  ]
}
```

## Code Style Guidelines

### TypeScript
- **Strict Typing**: Avoid `any`. Define interfaces for all config objects.
- **Configuration**: Use `const` assertions for config objects where possible to preserve literal types.
- **Imports**: Use relative imports within a theme, or path aliases if configured (e.g., `@/theme/*`).

### Styling (Tailwind CSS)
- **Utility-First**: Use Tailwind classes directly in JSX.
- **Theme Isolation**: Unique styles should be scoped or prefixed if they risk leaking (though CSS modules are also an option, Tailwind is preferred).
- **Dark Mode**: Support `dark:` variants for all color classes.

### Internationalization (i18n)
- **Client-Side Only**: Since this is a static export, use a React Context or simple hook for translation.
- **No Middleware**: Do not use Next.js Middleware for locale detection (it requires a server/edge runtime). Use client-side detection in `useEffect`.

## Performance Standards

For a static site, performance is paramount.

1. **Images**:
   - Use standard `<img>` tags if `next/image` optimization isn't available on the host (Cloudflare Pages free tier does not optimize Next.js Image component at runtime).
   - Or use a standardized external image loader (Cloudinary, Unsplash).
2. **Bundle Size**:
   - Avoid heavy libraries (moment.js, heavy charting libs) unless necessary.
   - Use dynamic imports `next/dynamic` for heavy components below the fold.
3. **Fonts**:
   - Use `next/font/google` for optimal loading strategy.

## Deployment & Build

### Build Command
```bash
npm run pages:build
# Runs: node scripts/update-tsconfig.js && npx @cloudflare/next-on-pages
```
- **`update-tsconfig.js`**: A script that updates path aliases based on the selected `THEME` environment variable.

### Environment Variables
- `THEME`: Selects which theme to build (e.g., `next-star`).
- `NODE_ENV`: `production` for build.

## Contribution Workflow

1. **Fork & Branch**: Create a feature branch.
2. **Develop**:
   - Run `npm run dev` locally.
   - Ensure you are editing the correct theme in `src/themes`.
3. **Test**:
   - Verify visually on both Desktop and Mobile.
   - Check Console for hydration errors.
4. **Pull Request**: Submit PR to `main`.
