# SEO Implementation Guide

**Last Updated**: 2026-01-23

## Overview
SEO in this project is **config-driven** and **static**. It is designed to automatically generate optimized metadata, OpenGraph tags, and JSON-LD structured data based on your configuration file (`config.ts`).

## Configuration

All SEO settings are managed in `src/themes/[theme]/config.ts`.

### Basic Metadata
You can customize the global title, description, and keywords:

```typescript
export const config = {
    seo: {
        title: {
            default: "Your Name | Your Title",
            template: "%s | Your Name",
        },
        description: "Your meta description here.",
        url: "https://your-domain.com",
        keywords: ["keyword1", "keyword2"],
    }
}
```

### OpenGraph & Twitter
Social media cards are automatically configured based on your profiles:

```typescript
    seo: {
        twitter: {
            creator: "@yourhandle",
            card: "summary_large_image",
        },
        openGraph: {
            type: "website",
            siteName: "Your Name",
            locale: "en_US",
        },
    }
```

### Sitemap
The sitemap is generated automatically during the build process if configured in `src/app/sitemap.ts` (or the theme equivalent).

## Implementation Details

### Metadata Generation
The application uses the Next.js App Router Metadata API. 
The root layout (`src/app/layout.tsx`) dynamically imports the active theme's layout, which in turn generates metadata from `config.ts`.

### JSON-LD Structured Data
For rich search results (like Product snippets), JSON-LD is injected into relevant pages (e.g., Product Details). This allows Google to understand your products and potentially show price/availability in search results.

### Robots.txt
A `public/robots.txt` file controls crawler access. By default, it allows all agents.

## Best Practices for Users

1.  **Unique Titles**: Ensure your `default` title is descriptive.
2.  **High-Quality Images**: For OpenGraph, use a 1200x630px image. You can define a specific OG image in your `public` folder and reference it in the config or standard Next.js file conventions (`opengraph-image.tsx`).
3.  **Keywords**: Update the keywords array to match your niche.

## Verification

To verify your SEO tags:
1.  **Build** the app: `npm run pages:build`.
2.  **Inspect** the output HTML in `.vercel/output/static`.
3.  **Use Tools**:
    - [local-meta-tags](https://metatags.io/) (requires deployment)
    - Browser DevTools: Inspect `<head>` elements.
