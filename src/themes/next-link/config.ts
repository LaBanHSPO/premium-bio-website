import { BioData } from "@/lib/types";

// This file replaces src/data/*
export const config: BioData & { seo: any } = {
    profile: {
        name: "John Doe",
        tagline: "Digital Creator | Tech Enthusiast | Building the future",
        avatar: "https://github.com/shadcn.png",
        coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop",
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
            id: 0,
            name: "Sample Link 1",
            url: "https://example.com/link1",
            description: "Description for your first link or resource.",
            backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop",
        },
    ],
    products: [
        {
            id: 1,
            name: "Sample Product",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
            price: "$49",
            url: "https://example.com/product",
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
        }
    ],
    seo: {
        title: "John Doe | Digital Creator",
        description: "Digital Creator | Tech Enthusiast | Building the future",
        url: "https://johndoe.com",
        keywords: ["Creator", "Developer", "Designer"],
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://johndoe.com",
            siteName: "John Doe",
        },
        twitter: {
            creator: "@johndoe",
            card: "summary_large_image",
        }
    }
};
