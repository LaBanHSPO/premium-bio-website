import { z } from 'zod';

// Social Link Schema
export const socialLinkSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    url: z.string().url('Must be a valid URL'),
    icon: z.string().min(1, 'Icon is required'),
});

// Profile Schema
export const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    avatar: z.string().min(1, 'Must be a valid URL'),
    coverImage: z.string().url('Must be a valid URL'),
    socialLinks: z.array(socialLinkSchema),
});

// Link Schema
export const linkSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name is required'),
    url: z.string().min(1, 'URL is required'),
    description: z.string().min(1, 'Description is required'),
    backgroundImage: z.string().url('Must be a valid URL'),
    detailContent: z.object({
        subtitle: z.string().optional(),
        content: z.string(),
        ctaText: z.string(),
        ctaUrl: z.string().optional(),
    }).optional(),
});

// Product Schema
export const productSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name is required'),
    image: z.string().url('Must be a valid URL'),
    price: z.string().min(1, 'Price is required'),
    url: z.string().min(1, 'URL is required'),
});

// AI Tool Schema
export const aiToolSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name is required'),
    logo: z.string().url('Must be a valid URL'),
    url: z.string().min(1, 'URL is required'),
});

// About Section Schema
export const aboutSectionSchema = z.object({
    image: z.string().url(),
    paragraphs: z.array(z.string()),
});

// Gallery Section Schema
export const gallerySectionSchema = z.object({
    title: z.string(),
    images: z.array(z.object({
        url: z.string().url(),
        alt: z.string().optional(),
    })),
});

// Brand Partnership Schema
export const brandPartnershipSchema = z.object({
    title: z.string(),
    brands: z.array(z.object({
        name: z.string(),
        logo: z.string().optional(),
    })),
});

// Video Section Schema
export const videoSectionSchema = z.object({
    thumbnailUrl: z.string().url(),
    videoUrl: z.string().url(),
});

// Contact Section Schema
export const contactSectionSchema = z.object({
    heading: z.string(),
    email: z.string(),
    backgroundImage: z.string().url(),
    profileImage: z.string().url(),
    buttons: z.array(z.object({
        label: z.string(),
        url: z.string(),
        variant: z.enum(['primary', 'secondary']).default('primary'),
    })),
});

// Settings Schema
export const settingsSchema = z.object({
    defaultCollapsed: z.boolean().default(false),
    showSegmentTabs: z.boolean().default(true),
    showAiTools: z.boolean().default(true),
});

// Complete Bio Data Schema
export const bioDataSchema = z.object({
    profile: profileSchema,
    links: z.array(linkSchema),
    products: z.array(productSchema),
    aiTools: z.array(aiToolSchema),
    about: aboutSectionSchema.optional(),
    gallery: gallerySectionSchema.optional(),
    brandPartnerships: brandPartnershipSchema.optional(),
    video: videoSectionSchema.optional(),
    contact: contactSectionSchema.optional(),
    settings: settingsSchema.optional(),
});

// Types
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Product = z.infer<typeof productSchema>;
export type AITool = z.infer<typeof aiToolSchema>;
export type AboutSection = z.infer<typeof aboutSectionSchema>;
export type GallerySection = z.infer<typeof gallerySectionSchema>;
export type BrandPartnership = z.infer<typeof brandPartnershipSchema>;
export type VideoSection = z.infer<typeof videoSectionSchema>;
export type ContactSection = z.infer<typeof contactSectionSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type BioData = z.infer<typeof bioDataSchema>;
