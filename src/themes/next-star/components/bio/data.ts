import type { BadgeType } from "./ProductCard";

export type Product = {
  id: string;
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  price?: string;
  buttonTextKey: string;
  externalLink?: string;
  detailType?: "whiteLabel" | "personalBrand" | "digitalProducts";
  badge?: BadgeType;
  imageStyle?: "default" | "raw";
};

export const profileData = {
  name: "Ban Nguyen",
  bio: "I help people worldwide find peace through my app. Building one-person global tech company without funding",
  avatarUrl: "https://assets.sitehub.bio/pandev00/avtarpan.png",
  socials: {
    // instagram: "https://instagram.com",
    // tiktok: "https://tiktok.com",
    youtube: "https://www.youtube.com/@pandev00",
    link: "https://pandev00.com",
    // linkedin: "https://linkedin.com",
    twitter: "https://x.com/pandev00",
    email: "pandev00@sagozen.digital",
  },
};

export const products: Record<string, Product[]> = {
  products: [
    {
      id: "zen-journal",
      imageUrl: "/zen-journal.webp",
      titleKey: "zenJournalTitle",
      descriptionKey: "zenJournalDesc",
      buttonTextKey: "joinWaitlist",
      externalLink: "https://sagozen.digital/p/zen-journal",
      badge: "new",
      imageStyle: "raw",
    },
    {
      id: "sitehub",
      imageUrl: "/lovable.png",
      titleKey: "siteHubTitle",
      descriptionKey: "siteHubDesc",
      buttonTextKey: "freeOpenSource",
      externalLink: "https://sitehub.bio",
      badge: "hot",
      imageStyle: "raw",
    },
  ],
  services: [
    {
      id: "white-label-mental-health",
      imageUrl: "/whitelabel-customize-app-square-min.png",
      titleKey: "whiteLabelMentalTitle",
      descriptionKey: "whiteLabelMentalDesc",
      buttonTextKey: "detail",
      detailType: "whiteLabel",
      badge: "limited",
    },
    {
      id: "white-label-pet",
      imageUrl: "/pet-care-pro.png",
      titleKey: "whiteLabelPetTitle",
      descriptionKey: "whiteLabelPetDesc",
      buttonTextKey: "viewDemo",
      externalLink: "https://sagozen.digital/pet-care-pro",
      badge: "new",
    },
  ],
  consulting: [
    {
      id: "personal-brand",
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
      titleKey: "personalBrandCardTitle",
      descriptionKey: "personalBrandCardDesc",
      buttonTextKey: "watchForFree",
      detailType: "personalBrand",
      badge: "hot",
    },
    {
      id: "digital-products",
      imageUrl:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=200&h=200&fit=crop",
      titleKey: "digitalProductCardTitle",
      descriptionKey: "digitalProductCardDesc",
      buttonTextKey: "watchForFree",
      detailType: "digitalProducts",
    },
  ],
};

// Helper to find product by ID
export const findProductById = (id: string): Product | undefined => {
  for (const category of Object.values(products)) {
    const found = category.find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
};
