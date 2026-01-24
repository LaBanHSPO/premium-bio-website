import { MetadataRoute } from "next";
// @ts-ignore - Config alias is dynamic based on theme
import { config } from "@/theme/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the URL from config, or fallback to a default if not set
  const baseUrl = config.seo?.url || "https://sitehub.bio";
  const currentDate = new Date();

  // Root page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Helper to add product routes (only for next-star theme which uses query params)
  const addProductRoutes = (
    items: any[],
    priority: number
  ) => {
    if (!items || !Array.isArray(items)) return;

    items.forEach((item) => {
      // If it's an external link, we don't need a sitemap entry for it
      if (item.externalLink) return;

      // Create a route for the product view
      routes.push({
        url: `${baseUrl}/?product=${item.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: priority,
      });
    });
  };

  // Check if we are in next-star theme (config.products is an object with categories)
  if (config.products && !Array.isArray(config.products) && typeof config.products === 'object') {
    // next-star theme logic
    const { products, services, consulting } = config.products;
    if (products) addProductRoutes(products, 0.9);
    if (services) addProductRoutes(services, 0.8);
    if (consulting) addProductRoutes(consulting, 0.8);
  }
  // next-link theme uses config.products as an array, but they are typically external links
  // or displayed on the home page, so no extra routes needed (handled by root route).

  return routes;
}
