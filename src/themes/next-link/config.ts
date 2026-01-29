import type { BioData } from '@/lib/bio-types';

/**
 * Bio Page Configuration
 * 
 * Edit this file to customize your bio page content.
 * All fields are validated at build time via TypeScript.
 * 
 * Icons available for socialLinks.icon:
 * - Globe, Twitter, Mail, Youtube
 */
export const bioConfig: BioData = {
    profile: {
        name: "John Doe",
        tagline: "Digital Creator | Tech Enthusiast | Building the future",
        avatar: "https://github.com/shadcn.png",
        coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&crop=center",
        socialLinks: [
            {
                name: "Website",
                url: "https://your-website.com",
                icon: "Globe",
            },
            {
                name: "X (Twitter)",
                url: "https://x.com/yourhandle",
                icon: "Twitter",
            },
            {
                name: "Email",
                url: "mailto:contact@yourdomain.com",
                icon: "Mail",
            },
            {
                name: "YouTube",
                url: "https://youtube.com/@yourchannel",
                icon: "Youtube",
            },
        ],
    },
    links: [
        {
            id: 1,
            name: "siteHubTitle",
            url: "https://sitehub.bio",
            description: "siteHubDesc",
            backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
            detailContent: {
                subtitle: "siteHubDesc",
                content: "siteHubDesc",
                ctaText: "getInTouch",
            },
        },
        {
            id: 2,
            name: "zenJournalTitle",
            url: "https://zenjournal.app",
            description: "zenJournalDesc",
            backgroundImage: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=200&h=200&fit=crop",
            detailContent: {
                subtitle: "zenJournalDesc",
                content: "zenJournalDesc",
                ctaText: "viewDemo",
            },
        },
        {
            id: 3,
            name: "Free Resources",
            url: "https://example.com/resources",
            description: "Templates, guides and tools",
            backgroundImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=200&h=200&fit=crop",
        },
    ],
    products: [
        {
            id: 1,
            name: "whiteLabelMentalTitle",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
            price: "$499",
            url: "https://example.com/whitelabel",
        },
        {
            id: 2,
            name: "digitalProductCardTitle",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop",
            price: "$29",
            url: "https://example.com/digital",
        },
        {
            id: 3,
            name: "personalBrandCardTitle",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=500&fit=crop",
            price: "$99",
            url: "https://example.com/brand",
        },
    ],
    aiTools: [
        {
            id: 1,
            name: "ChatGPT",
            logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
            url: "https://chatgpt.com"
        },
        {
            id: 2,
            name: "Midjourney",
            logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
            url: "https://midjourney.com"
        },
        {
            id: 3,
            name: "Claude",
            logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
            url: "https://claude.ai"
        },
        {
            id: 4,
            name: "Perplexity",
            logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
            url: "https://perplexity.ai"
        },
    ],
    /**
     * Display Settings
     * - defaultCollapsed: Start with profile collapsed (true) or expanded (false)
     * - showSegmentTabs: Show Links/Shop segment tabs (true/false)
     * - showAiTools: Show AI Tools carousel section (true/false)
     */
    settings: {
        defaultCollapsed: true,
        showSegmentTabs: false,
        showAiTools: false,
    },
    // Adding SEO config to match next-star structure somewhat, using minimal defaults
    seo: {
        title: {
            default: "John Doe",
            template: "%s | John Doe",
        },
        description: "Digital Creator | Tech Enthusiast",
        url: "https://example.com",
    }
};

// Export config for sitemap and other system files that expect 'config'
export const config = bioConfig;

// Default export for convenience
export default bioConfig;
