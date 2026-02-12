# Next-Bea Redesign: Implementation Guide

## Quick Start Guide for Developers

This guide provides ready-to-use code snippets for implementing the redesign.

---

## Phase 1: Design System Foundation

### Step 1.1: Update globals.css

**File:** `src/themes/next-bea/globals.css`

Replace the font imports (lines 1-3):
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");
```

Update CSS variables in `:root` (replace lines 14-106):
```css
:root {
  /* Base Colors - Monochrome Elegance */
  --background: 0 0% 98%;         /* #FAFAFA */
  --foreground: 0 0% 4%;          /* #09090B */

  --card: 0 0% 100%;              /* #FFFFFF */
  --card-foreground: 0 0% 4%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 4%;

  /* Primary - Rich Black */
  --primary: 0 0% 9%;             /* #18181B */
  --primary-foreground: 0 0% 98%;

  /* Secondary - Charcoal */
  --secondary: 0 0% 25%;          /* #3F3F46 */
  --secondary-foreground: 0 0% 98%;

  /* Accent - Royal Blue (CTA) */
  --accent: 217 91% 60%;          /* #2563EB */
  --accent-foreground: 0 0% 100%;

  /* Muted */
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  /* Borders & Inputs */
  --border: 0 0% 89%;
  --input: 0 0% 89%;
  --ring: 217 91% 60%;

  --radius: 1rem;

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-serif: 'Playfair Display', ui-serif, Georgia, serif;
  --font-mono: 'Source Code Pro', ui-monospace, monospace;

  /* Glass Effects */
  --glass-light: 255 255 255 / 0.1;
  --glass-dark: 0 0 0 / 0.2;
  --glass-border: 255 255 255 / 0.18;
}

.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;

  --card: 0 0% 9%;
  --card-foreground: 0 0% 98%;

  --popover: 0 0% 9%;
  --popover-foreground: 0 0% 98%;

  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;

  --secondary: 0 0% 25%;
  --secondary-foreground: 0 0% 98%;

  --accent: 217 91% 60%;
  --accent-foreground: 0 0% 100%;

  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;

  --border: 0 0% 15%;
  --input: 0 0% 15%;
  --ring: 217 91% 60%;
}
```

### Step 1.2: Add Liquid Glass Utilities

Add to `@layer utilities` section (after line 175):
```css
@layer utilities {
  /* Liquid Glass Effect */
  .liquid-glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .liquid-glass:hover {
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .liquid-glass-dark {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(0, 0, 0, 0.18);
  }

  /* Masonry Grid */
  .masonry-grid {
    column-count: 1;
    column-gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .masonry-grid {
      column-count: 2;
    }
  }

  @media (min-width: 1024px) {
    .masonry-grid {
      column-count: 3;
    }
  }

  .masonry-item {
    break-inside: avoid;
    margin-bottom: 1.5rem;
  }

  /* Image Hover Effects */
  .portfolio-image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    cursor: pointer;
  }

  .portfolio-image {
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    height: auto;
    display: block;
  }

  .portfolio-image-wrapper:hover .portfolio-image {
    transform: scale(1.08);
  }

  .portfolio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.05) 30%,
      rgba(0, 0, 0, 0.7) 100%
    );
    opacity: 0;
    transition: opacity 400ms ease;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
  }

  .portfolio-image-wrapper:hover .portfolio-overlay {
    opacity: 1;
  }

  /* Smooth Scroll */
  .smooth-scroll {
    scroll-behavior: smooth;
  }

  /* Parallax Container */
  .parallax-container {
    overflow: hidden;
    position: relative;
  }
}
```

### Step 1.3: Add Animation Keyframes

Add after the `@keyframes` section:
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(37, 99, 235, 0.6);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

---

## Phase 2: Hero Section Enhancement

### Step 2.1: Update HeroSection.tsx

**File:** `src/themes/next-bea/components/sections/HeroSection.tsx`

Replace the entire component:
```tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Youtube, ChevronDown } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
    profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const nameParts = profile.name.split('\n');

    const getSocialIcon = (iconName: string) => {
        switch (iconName) {
            case 'Instagram':
                return <Instagram className="w-5 h-5" />;
            case 'Youtube':
                return <Youtube className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Parallax Cover Image */}
            <motion.img
                src={profile.coverImage}
                alt={profile.name}
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] object-cover"
                loading="eager"
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Floating Glass Social Icons - Top Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute top-6 right-6 z-10 flex gap-3"
            >
                {profile.socialLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-accent transition-colors cursor-pointer"
                        aria-label={link.name}
                    >
                        {getSocialIcon(link.icon)}
                    </motion.a>
                ))}
            </motion.div>

            {/* Name & Tagline - Bottom Left */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-16 left-8 md:left-16 z-10 max-w-4xl"
            >
                {nameParts.map((part, i) => (
                    <motion.h1
                        key={i}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3 + i * 0.15,
                            duration: 0.8,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.95] tracking-tight"
                    >
                        {part}
                    </motion.h1>
                ))}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg text-white/90 mt-4 font-sans font-light tracking-[0.15em] uppercase"
                >
                    {profile.tagline}
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-white/70 text-xs font-sans tracking-widest uppercase">
                        Scroll
                    </span>
                    <ChevronDown className="w-6 h-6 text-white/70" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
```

---

## Phase 3: Gallery Masonry Layout

### Step 3.1: Update GallerySection.tsx

**File:** `src/themes/next-bea/components/sections/GallerySection.tsx`

```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { GallerySection as GallerySectionType } from '@/lib/types';

interface GallerySectionProps {
    gallery: GallerySectionType;
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <>
            <section className="bg-background py-16 md:py-24 px-6 md:px-16 lg:px-24">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-serif font-semibold text-foreground text-center mb-16"
                >
                    {gallery.title}
                </motion.h2>

                {/* Masonry Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-7xl mx-auto masonry-grid"
                >
                    {gallery.images.map((img, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="masonry-item group"
                            onClick={() => setSelectedImage(i)}
                        >
                            <div className="portfolio-image-wrapper">
                                <img
                                    src={img.url}
                                    alt={img.alt || `Portfolio ${i + 1}`}
                                    className="portfolio-image"
                                    loading="lazy"
                                />
                                <div className="portfolio-overlay">
                                    <div className="text-white">
                                        <p className="font-serif text-xl md:text-2xl font-semibold mb-1">
                                            {img.alt || `Project ${i + 1}`}
                                        </p>
                                        <p className="text-sm md:text-base text-white/80 font-sans">
                                            Editorial | 2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full liquid-glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={gallery.images[selectedImage].url}
                            alt={gallery.images[selectedImage].alt}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GallerySection;
```

---

## Phase 4: About Section Enhancement

### Step 4.1: Update AboutSection.tsx

**File:** `src/themes/next-bea/components/sections/AboutSection.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { AboutSection as AboutSectionType } from '@/lib/types';

interface AboutSectionProps {
    about: AboutSectionType;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
    const stats = [
        { label: 'Years Active', value: '5+' },
        { label: 'Campaigns', value: '100+' },
        { label: 'Awards', value: '12' }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    };

    return (
        <section className="bg-secondary py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Desktop: Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Image */}
                    <motion.div {...fadeInUp}>
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={about.image}
                                alt="About"
                                className="w-full aspect-[3/4] object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.h2
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-serif font-semibold text-secondary-foreground"
                        >
                            About
                        </motion.h2>

                        {/* Paragraphs */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.3 }}
                            className="space-y-4"
                        >
                            {about.paragraphs.map((para, i) => (
                                <p
                                    key={i}
                                    className="text-base md:text-lg text-secondary-foreground/90 font-sans leading-relaxed"
                                >
                                    {para}
                                </p>
                            ))}
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.5 }}
                            className="grid grid-cols-3 gap-4 mt-8"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                    className="liquid-glass p-4 rounded-xl text-center"
                                >
                                    <p className="text-2xl md:text-3xl font-serif font-bold text-secondary-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs md:text-sm text-secondary-foreground/70 font-sans mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
```

---

## Phase 5: Brand Partnerships with Logos

### Step 5.1: Update BrandPartnershipsSection.tsx

**File:** `src/themes/next-bea/components/sections/BrandPartnershipsSection.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Brand {
    name: string;
    logo?: string; // Optional logo URL
}

interface BrandPartnershipsSectionProps {
    data: {
        title: string;
        brands: Brand[];
    };
}

const BrandPartnershipsSection: React.FC<BrandPartnershipsSectionProps> = ({ data }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <section className="bg-background py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-serif font-semibold text-foreground text-center mb-12"
                >
                    {data.title}
                </motion.h2>

                {/* Brand Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {data.brands.map((brand, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="liquid-glass p-8 rounded-xl flex items-center justify-center min-h-[120px] cursor-default"
                        >
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                                />
                            ) : (
                                <p className="text-lg font-serif font-semibold text-foreground/70 text-center">
                                    {brand.name}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandPartnershipsSection;
```

---

## Phase 6: Contact Section Redesign

### Step 6.1: Update ContactSection.tsx

**File:** `src/themes/next-bea/components/sections/ContactSection.tsx`

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Send } from 'lucide-react';

interface ContactSectionProps {
    contact: {
        heading: string;
        email: string;
        backgroundImage: string;
        profileImage: string;
        buttons: Array<{
            label: string;
            url: string;
            variant: 'primary' | 'secondary';
        }>;
    };
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <section className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={contact.backgroundImage}
                    alt="Contact background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="liquid-glass p-8 md:p-12 rounded-2xl"
                >
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-white text-center mb-8">
                        {contact.heading}
                    </h2>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-sans font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                        >
                            <Send className="w-5 h-5" />
                            Send Message
                        </button>
                    </form>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        {contact.buttons.map((button, i) => (
                            <a
                                key={i}
                                href={button.url}
                                className={`flex-1 px-6 py-3 rounded-xl font-sans font-medium text-center transition-all hover:scale-[1.02] cursor-pointer ${
                                    button.variant === 'primary'
                                        ? 'bg-white/20 text-white hover:bg-white/30'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                } flex items-center justify-center gap-2`}
                            >
                                {button.variant === 'secondary' && <Download className="w-4 h-4" />}
                                {button.variant === 'primary' && <Mail className="w-4 h-4" />}
                                {button.label}
                            </a>
                        ))}
                    </div>

                    {/* Email */}
                    <p className="text-center text-white/70 text-sm font-sans mt-6">
                        Or email directly: <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
```

---

## Testing Checklist

### Visual Testing
```bash
# Start dev server
yarn dev

# Test at different breakpoints
# Chrome DevTools: Device Toolbar (Cmd+Shift+M)
✓ 375px (iPhone SE)
✓ 768px (iPad)
✓ 1024px (Desktop)
✓ 1440px (Large Desktop)
```

### Accessibility Testing
```bash
# Install axe DevTools extension
# Run accessibility audit in Chrome DevTools

✓ Color contrast 4.5:1 minimum
✓ Focus indicators visible
✓ Keyboard navigation works
✓ Screen reader labels present
✓ ARIA attributes correct
```

### Performance Testing
```bash
# Run Lighthouse audit
# Chrome DevTools > Lighthouse tab

Target Scores:
✓ Performance: 90+
✓ Accessibility: 100
✓ Best Practices: 95+
✓ SEO: 100
```

---

## Quick Commands

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn start

# Lint code
yarn lint

# Format code
yarn format
```

---

## Troubleshooting

### Issue: Fonts not loading
**Solution:** Clear browser cache and hard reload (Cmd+Shift+R)

### Issue: Animations laggy
**Solution:** Check GPU acceleration in browser settings

### Issue: Images not showing
**Solution:** Verify image paths in `/public/next-bea/` directory

### Issue: Glass effect not working
**Solution:** Ensure browser supports `backdrop-filter` (90%+ support)

---

## Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons
- **Google Fonts:** https://fonts.google.com/

---

**Document Version:** 1.0
**Last Updated:** 2026-02-10
**Status:** 🟢 Ready for Development
