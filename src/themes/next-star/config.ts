import type { Metadata } from "next";
import type { TranslationKey } from "./i18n/translations";

export type BadgeType = "new" | "hot" | "limited";

export type Product = {
    id: string;
    imageUrl: string;
    titleKey: TranslationKey;
    descriptionKey: TranslationKey;
    price?: string;
    buttonTextKey: TranslationKey;
    externalLink?: string;
    detailType?: "whiteLabel" | "personalBrand" | "digitalProducts";
    badge?: BadgeType;
    imageStyle?: "default" | "raw";
};

export const config = {
    profile: {
        name: "John Doe",
        bio: "Digital Creator | Tech Enthusiast | Building the future",
        avatarUrl: "https://github.com/shadcn.png", // Generic avatar
        socials: {
            link: "https://your-website.com",
            twitter: "https://x.com/yourhandle",
            instagram: "https://instagram.com/yourhandle",
            youtube: "https://youtube.com/@yourchannel",
            linkedin: "https://linkedin.com/in/yourprofile",
            email: "contact@yourdomain.com",
        },
    },

    seo: {
        title: {
            default: "John Doe | (@johndoe)",
            template: "%s | (@johndoe)",
        },
        description: "Welcome to my personal portfolio and digital store.",
        url: "https://johndoe.sitehub.bio",
        keywords: [
            "content creator",
            "digital products",
            "portfolio",
            "John Doe",
            "developer",
            "designer",
        ],
        twitter: {
            creator: "@johndoe",
            card: "summary_large_image" as const,
        },
        openGraph: {
            type: "website",
            siteName: "John Doe",
            locale: "en_US",
        },
    },

    products: {
        products: [
            {
                id: "sample-product-1",
                imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
                titleKey: "product1Title",
                descriptionKey: "product1Desc",
                buttonTextKey: "viewDetails",
                externalLink: "https://example.com/product1",
                badge: "new",
                imageStyle: "default",
            },
            {
                id: "sample-product-2",
                imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=500&fit=crop",
                titleKey: "product2Title",
                descriptionKey: "product2Desc",
                buttonTextKey: "freeDownload",
                externalLink: "https://example.com/product2",
                badge: "hot",
            },
        ] as Product[],
        services: [
            {
                id: "sample-service-1",
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
                titleKey: "service1Title",
                descriptionKey: "service1Desc",
                buttonTextKey: "bookNow",
                detailType: "whiteLabel",
                badge: "limited",
            },
            {
                id: "sample-service-2",
                imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&h=500&fit=crop",
                titleKey: "service2Title",
                descriptionKey: "service2Desc",
                buttonTextKey: "learnMore",
                externalLink: "https://example.com/service2",
            },
        ] as Product[],
        consulting: [
            {
                id: "sample-consulting-1",
                imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=500&fit=crop",
                titleKey: "consulting1Title",
                descriptionKey: "consulting1Desc",
                buttonTextKey: "startNow",
                detailType: "personalBrand",
                badge: "hot",
            },
            {
                id: "sample-consulting-2",
                imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop",
                titleKey: "consulting2Title",
                descriptionKey: "consulting2Desc",
                buttonTextKey: "joinCommunity",
                detailType: "digitalProducts",
            },
        ] as Product[],
    },
};

// Helper to find product by ID
export const findProductById = (id: string): Product | undefined => {
    for (const category of Object.values(config.products)) {
        const found = category.find((p) => p.id === id);
        if (found) return found;
    }
    return undefined;
};
