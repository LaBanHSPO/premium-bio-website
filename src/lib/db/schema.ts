/**
 * Premium Bio Website - D1 Database Schema Types
 *
 * TypeScript interfaces matching the D1 database schema.
 * These types represent the raw database rows.
 */

/**
 * Profile table row
 * Core entity representing a user profile
 */
export interface ProfileRow {
  id: string;
  username: string;
  display_name: string;
  tagline: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Social links table row
 * Links to social media profiles
 */
export interface SocialLinkRow {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  icon: string | null;
  order_index: number;
}

/**
 * Bio links table row
 * Custom links displayed on profile
 */
export interface BioLinkRow {
  id: string;
  profile_id: string;
  name: string;
  url: string;
  description: string | null;
  background_image: string | null;
  order_index: number;
}

/**
 * Products table row
 * Products/services offered by the profile
 */
export interface ProductRow {
  id: string;
  profile_id: string;
  name: string;
  image_url: string | null;
  price: string;
  url: string;
  order_index: number;
}

/**
 * Carousel items table row
 * AI tools or featured items in carousel
 */
export interface CarouselItemRow {
  id: string;
  profile_id: string;
  name: string;
  logo_url: string | null;
  url: string;
  order_index: number;
}

/**
 * Complete profile data with all related entities
 * Used for fetching and assembling full profile information
 */
export interface FullProfile {
  profile: ProfileRow;
  socialLinks: SocialLinkRow[];
  bioLinks: BioLinkRow[];
  products: ProductRow[];
  carouselItems: CarouselItemRow[];
}
