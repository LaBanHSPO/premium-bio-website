import type { BioData } from '@/lib/types';

export const bioConfig = {
    profile: {
        name: "Hana Sato",
        tagline: "International Model | Actress",
        avatar: "/next-bea/avatar.png",
        coverImage: "/next-bea/cover.png",
        socialLinks: [
            {
                name: "Instagram",
                url: "https://instagram.com/hanasato_official",
                icon: "Instagram",
            },
            {
                name: "YouTube",
                url: "https://youtube.com/@hanasato_vylogs",
                icon: "Youtube",
            },
        ],
    },
    about: {
        image: "/next-bea/about.png",
        paragraphs: [
            "Based in Tokyo and expanding globally, Hana Sato has rapidly become a defining face in modern high fashion. Her unique ability to blend traditional elegance with avant-garde aesthetics has graced the covers of Vogue Japan, Harper's Bazaar, and Elle.",
            "From the runways of Paris to the streets of Seoul, Hana brings a magnetic presence to every campaign. Her portfolio spans luxury commercial work, editorial high fashion, and cinematic roles that highlight her versatility and depth.",
            "Beyond her modeling career, Hana is an advocate for sustainable fashion and mental wellness in the creative industry, bringing authenticity and purpose to her collaborative partnerships."
        ],
    },
    gallery: {
        title: "Portfolio | Latest Campaigns",
        images: [
            { url: "/next-bea/gallery_1.png", alt: "Editorial Street Style" },
            { url: "/next-bea/gallery_2.png", alt: "Couture Evening Wear" },
            { url: "/next-bea/gallery_3.png", alt: "Avant-Garde Portrait" },
        ],
    },
    brandPartnerships: {
        title: "Past Brand Partnerships",
        brands: [
            { name: "VOGUE Japan" },
            { name: "CHANEL" },
            { name: "SHISEIDO" },
            { name: "UNIQLO" },
        ],
    },
    video: {
        thumbnailUrl: "/next-bea/cover.png",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    contact: {
        heading: "Bookings & Inquiries",
        email: "contact@hanasato.com",
        backgroundImage: "/next-bea/contact_bg.png",
        profileImage: "/next-bea/avatar.png",
        buttons: [
            { label: "Contact Management", url: "mailto:mgmt@hanasato.com", variant: "primary" },
            { label: "Download Portfolio", url: "#", variant: "secondary" },
        ],
    },
    links: [
        {
            id: 1,
            name: "Digital Portfolio",
            url: "#",
            description: "View full collection of works",
            backgroundImage: "/next-bea/gallery_1.png",
            detailContent: {
                subtitle: "Selected Works 2024-2025",
                content: "A curated selection of my most significant projects across fashion and film.",
                ctaText: "View Gallery",
            },
        },
    ],
    products: [],
    aiTools: [],
    settings: {
        defaultCollapsed: true,
        showSegmentTabs: false,
        showAiTools: false,
    },
};

// Also export 'config' as alias to bioConfig to match what sitemap.ts might expect if it imports 'config'
export const config = bioConfig;
export default bioConfig;
