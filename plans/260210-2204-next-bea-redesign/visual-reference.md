# Next-Bea Redesign: Visual Reference Guide

## Color Palette Reference

### Primary Colors
```
Rich Black       #18181B    HSL(0, 0%, 9%)     ███████████
Clean White      #FAFAFA    HSL(0, 0%, 98%)    ░░░░░░░░░░░
Charcoal         #3F3F46    HSL(0, 0%, 25%)    █████░░░░░░
Royal Blue       #2563EB    HSL(217, 91%, 60%) █████████░░
Deep Black       #09090B    HSL(0, 0%, 4%)     ███████████
```

### Usage Guidelines

**Background Colors:**
- Light mode: `#FAFAFA` (Clean White)
- Dark mode: `#09090B` (Deep Black)
- Card backgrounds: `#FFFFFF` (Pure White)

**Text Colors:**
- Primary text: `#09090B` (Deep Black)
- Secondary text: `#3F3F46` (Charcoal)
- Muted text: `rgba(0, 0, 0, 0.45)`

**Accent Colors:**
- Primary CTA: `#2563EB` (Royal Blue)
- Hover state: `#1E40AF` (Darker Blue)
- Focus ring: `#2563EB` with opacity

**Glass Effects:**
- Light glass: `rgba(255, 255, 255, 0.1)`
- Dark glass: `rgba(0, 0, 0, 0.2)`
- Glass border: `rgba(255, 255, 255, 0.18)`

---

## Typography Reference

### Font Families

**Playfair Display** (Headings)
```
400 Regular   - Body serif text
500 Medium    - Subheadings
600 SemiBold  - Section titles
700 Bold      - Hero name, major headings
```

**Inter** (Body Text)
```
300 Light     - Taglines, captions
400 Regular   - Body paragraphs
500 Medium    - Button text, labels
600 SemiBold  - Card titles
700 Bold      - Emphasis text
```

### Typography Scale

```
Hero Name (Desktop)
font-size: clamp(3rem, 8vw, 7rem)     /* 48px - 112px */
font-weight: 700
line-height: 0.95
letter-spacing: -0.03em
font-family: Playfair Display

Section Heading
font-size: clamp(2rem, 4vw, 3.5rem)   /* 32px - 56px */
font-weight: 600
line-height: 1.1
font-family: Playfair Display

Body Text
font-size: clamp(1rem, 1.5vw, 1.125rem)  /* 16px - 18px */
font-weight: 400
line-height: 1.7
font-family: Inter

Tagline/Subtitle
font-size: clamp(0.875rem, 1.2vw, 1.25rem)  /* 14px - 20px */
font-weight: 300
letter-spacing: 0.05em
text-transform: uppercase
font-family: Inter
```

### Text Hierarchy Examples

```
H1 (Hero)      - 112px / 700 / Playfair Display
H2 (Section)   - 56px / 600 / Playfair Display
H3 (Card)      - 28px / 600 / Playfair Display
Body           - 18px / 400 / Inter
Caption        - 14px / 300 / Inter
Button         - 16px / 500 / Inter
```

---

## Spacing System

### Base Unit: 4px

```
Space Scale (Tailwind)
0.5  = 2px
1    = 4px
2    = 8px
3    = 12px
4    = 16px
6    = 24px
8    = 32px
12   = 48px
16   = 64px
24   = 96px
```

### Component Spacing

**Section Padding:**
- Mobile: `py-16 px-6` (64px vertical, 24px horizontal)
- Desktop: `py-24 px-16` (96px vertical, 64px horizontal)

**Card Padding:**
- Small: `p-4` (16px)
- Medium: `p-6` (24px)
- Large: `p-8` (32px)
- Extra Large: `p-12` (48px)

**Element Spacing:**
- Tight: `gap-2` (8px)
- Normal: `gap-4` (16px)
- Loose: `gap-6` (24px)
- Extra Loose: `gap-8` (32px)

**Touch Targets:**
- Minimum: `44px × 44px` (iOS guideline)
- Spacing between: `8px minimum`

---

## Border Radius System

```
Tight    - 0.5rem (8px)   - Small buttons, badges
Normal   - 1rem (16px)    - Cards, inputs, images
Loose    - 1.5rem (24px)  - Large cards, modals
Full     - 9999px         - Pills, circular elements
```

**Component Examples:**
- Buttons: `rounded-xl` (12px)
- Cards: `rounded-2xl` (16px)
- Images: `rounded-2xl` (16px)
- Social Icons: `rounded-full` (circular)
- Form Inputs: `rounded-xl` (12px)

---

## Shadow System

### Elevation Levels

**Level 1: Subtle**
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);
```
Use for: Cards at rest, subtle elevation

**Level 2: Medium**
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
            0 2px 4px rgba(0, 0, 0, 0.06);
```
Use for: Dropdown menus, popovers

**Level 3: High**
```css
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
```
Use for: Modals, important CTAs

**Level 4: Lifted**
```css
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1),
            0 10px 10px rgba(0, 0, 0, 0.04);
```
Use for: Floating elements, hover states

**Glass Effect Shadow:**
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```
Use for: Liquid glass components

---

## Animation Reference

### Duration Standards

```
Micro (150-200ms)    - Hover states, color changes
Short (200-300ms)    - Button clicks, small movements
Medium (300-500ms)   - Card animations, overlays
Long (500-800ms)     - Page transitions, large elements
```

### Easing Functions

```css
/* Entering (ease-out) */
cubic-bezier(0.4, 0, 0.2, 1)

/* Exiting (ease-in) */
cubic-bezier(0.4, 0, 1, 1)

/* Interactive (ease-in-out) */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bouncy (spring) */
cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Common Animations

**Fade In Up:**
```tsx
initial={{ opacity: 0, y: 60 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
```

**Scale Hover:**
```tsx
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.2 }}
```

**Stagger Children:**
```tsx
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}}
```

**Float Animation:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
animation: float 3s ease-in-out infinite;
```

---

## Layout Grid System

### Breakpoints

```
Mobile Small    375px
Mobile Large    640px   (sm:)
Tablet          768px   (md:)
Desktop Small   1024px  (lg:)
Desktop Large   1280px  (xl:)
Desktop XL      1536px  (2xl:)
```

### Container Max Widths

```
max-w-sm     640px   - Narrow content
max-w-2xl    672px   - Single column
max-w-4xl    896px   - Two column
max-w-5xl    1024px  - Gallery grid
max-w-6xl    1152px  - Main content
max-w-7xl    1280px  - Full width
```

### Grid Columns

```
Mobile    - 1 column    (default)
Tablet    - 2 columns   (md:grid-cols-2)
Desktop   - 3 columns   (lg:grid-cols-3)
Desktop   - 4 columns   (lg:grid-cols-4)
```

---

## Component Patterns

### Glass Card
```tsx
<div className="liquid-glass p-6 rounded-xl">
  {/* Content */}
</div>
```

### Image with Overlay
```tsx
<div className="portfolio-image-wrapper">
  <img className="portfolio-image" src={url} />
  <div className="portfolio-overlay">
    <div className="text-white">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </div>
</div>
```

### Social Icon Button
```tsx
<a className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-accent transition-colors">
  <Icon className="w-5 h-5" />
</a>
```

### Section Container
```tsx
<section className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Animated Section Title
```tsx
<motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="text-3xl md:text-5xl font-serif font-semibold text-center mb-12"
>
  {title}
</motion.h2>
```

---

## Accessibility Guidelines

### Color Contrast Ratios

```
Normal Text (< 18px)
- Minimum: 4.5:1
- Enhanced: 7:1

Large Text (≥ 18px or ≥ 14px bold)
- Minimum: 3:1
- Enhanced: 4.5:1

UI Components
- Minimum: 3:1
```

### Focus Indicators

```css
/* Default focus ring */
focus:ring-2 focus:ring-accent focus:outline-none

/* Custom focus ring */
.custom-focus:focus {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}
```

### ARIA Labels

```tsx
/* Icon buttons */
<button aria-label="Close menu">
  <X />
</button>

/* Links */
<a href={url} aria-label={`Visit ${name} profile`}>
  <Icon />
</a>

/* Images */
<img src={url} alt="Descriptive text" />
```

### Keyboard Navigation

```
Tab          - Next focusable element
Shift+Tab    - Previous focusable element
Enter/Space  - Activate button/link
Escape       - Close modal/overlay
Arrow keys   - Navigate lists/menus
```

---

## Performance Guidelines

### Image Optimization

```tsx
/* Use WebP with fallback */
<picture>
  <source srcSet={imageWebP} type="image/webp" />
  <img src={imageJPG} alt="Description" />
</picture>

/* Lazy loading */
<img loading="lazy" src={url} alt="Description" />

/* Responsive images */
<img
  srcSet={`
    ${image400} 400w,
    ${image800} 800w,
    ${image1200} 1200w
  `}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src={image800}
  alt="Description"
/>
```

### Animation Performance

```css
/* Good (GPU-accelerated) */
transform: translateY(-4px);
opacity: 0.8;

/* Avoid (causes reflow) */
top: -4px;
width: 100%;
height: 100%;
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icon Usage

### Lucide React Icons

```tsx
import {
  Instagram,
  Youtube,
  Mail,
  Download,
  Send,
  X,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

/* Standard size */
<Icon className="w-5 h-5" />

/* Large size */
<Icon className="w-6 h-6" />

/* Extra large size */
<Icon className="w-8 h-8" />
```

### Icon Colors

```tsx
/* Default foreground */
<Icon className="text-foreground" />

/* Accent color */
<Icon className="text-accent" />

/* White */
<Icon className="text-white" />

/* With opacity */
<Icon className="text-white/70" />
```

---

## Responsive Images

### Aspect Ratios

```
Portrait      3:4    (Gallery images)
Landscape     16:9   (Hero images)
Square        1:1    (Avatars, logos)
Wide          21:9   (Banners)
```

### Implementation

```tsx
/* Portrait 3:4 */
<img className="aspect-[3/4] object-cover" />

/* Landscape 16:9 */
<img className="aspect-video object-cover" />

/* Square 1:1 */
<img className="aspect-square object-cover" />
```

---

## Z-Index Scale

```css
z-0    Base content
z-10   Floating elements (social icons)
z-20   Dropdowns, popovers
z-30   Fixed navigation
z-40   Overlays
z-50   Modals, lightbox
z-9999 Tooltips
```

---

## Print Styles

```css
@media print {
  /* Hide interactive elements */
  .liquid-glass,
  button,
  nav {
    display: none;
  }

  /* Optimize colors */
  * {
    color: #000 !important;
    background: #fff !important;
  }

  /* Page breaks */
  section {
    page-break-inside: avoid;
  }
}
```

---

## Browser Support

### Minimum Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Progressive Enhancement
- Backdrop filter: 90%+ support (fallback: solid background)
- CSS Grid: 95%+ support
- Flexbox: 98%+ support
- Custom properties: 96%+ support

---

## Quick Reference Cheat Sheet

```
Colors:        Black/White + Royal Blue accent
Fonts:         Playfair Display + Inter
Touch:         44px × 44px minimum
Spacing:       8px minimum between elements
Animations:    150-300ms micro, 400-600ms major
Contrast:      4.5:1 minimum
Shadows:       Subtle to dramatic (4 levels)
Breakpoints:   375, 640, 768, 1024, 1280, 1536
Grid:          Masonry for gallery, standard for others
Effects:       Liquid glass, parallax, overlays
Icons:         Lucide React (w-5 h-5 standard)
```

---

**Document Version:** 1.0
**Last Updated:** 2026-02-10
**Status:** 🟢 Complete Reference
