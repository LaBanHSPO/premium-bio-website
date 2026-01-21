import { Env, BioData, SocialLink } from '@/lib/types';
import { ProfileRow, SocialLinkRow, BioLinkRow, ProductRow, CarouselItemRow } from './schema';
import { ConfigCache } from '@/lib/kv/cache';
import type { D1PreparedStatement } from '@cloudflare/workers-types';

/**
 * BioData queries for D1 database with KV caching
 * Handles all profile data operations with automatic cache management
 */
export class BioDataQueries {
  private cache: ConfigCache;

  constructor(private env: Env) {
    this.cache = new ConfigCache(env.CONFIG_CACHE);
  }

  /**
   * Get profile by username with KV cache layer
   */
  async getByUsername(username: string): Promise<BioData | null> {
    // Try cache first
    const cached = await this.cache.get(username);
    if (cached) {
      console.log(`Cache HIT for username: ${username}`);
      return cached;
    }

    console.log(`Cache MISS for username: ${username}, querying D1`);

    // Query D1
    const profile = await this.env.DB.prepare(`
      SELECT * FROM profiles WHERE username = ?
    `).bind(username).first<ProfileRow>();

    if (!profile) {
      return null;
    }

    // Fetch related data in parallel
    const [socialLinks, bioLinks, products, carouselItems] = await Promise.all([
      this.getSocialLinks(profile.id),
      this.getBioLinks(profile.id),
      this.getProducts(profile.id),
      this.getCarouselItems(profile.id)
    ]);

    // Transform to BioData format (matching existing API structure)
    const bioData: BioData = {
      profile: {
        name: profile.display_name,
        tagline: profile.tagline || '',
        avatar: profile.avatar_url || '',
        coverImage: profile.cover_url || '',
        socialLinks: socialLinks.map(sl => ({
          name: sl.platform,
          url: sl.url,
          icon: sl.icon || ''
        }))
      },
      links: bioLinks.map((l, i) => ({
        id: i + 1,
        name: l.name,
        url: l.url,
        description: l.description || '',
        backgroundImage: l.background_image || ''
      })),
      products: products.map((p, i) => ({
        id: i + 1,
        name: p.name,
        image: p.image_url || '',
        price: p.price,
        url: p.url
      })),
      aiTools: carouselItems.map((t, i) => ({
        id: i + 1,
        name: t.name,
        logo: t.logo_url || '',
        url: t.url
      }))
    };

    // Cache for 1 hour
    await this.cache.set(username, bioData, 3600);
    return bioData;
  }

  /**
   * Update profile with full bio data (atomic transaction)
   */
  async updateProfile(username: string, bioData: BioData): Promise<void> {
    // Get or create profile
    let profile = await this.env.DB.prepare(`
      SELECT id FROM profiles WHERE username = ?
    `).bind(username).first<{ id: string }>();

    let profileId: string;

    if (!profile) {
      // Create new profile
      profileId = crypto.randomUUID();
      await this.env.DB.prepare(`
        INSERT INTO profiles (id, username, display_name, tagline, avatar_url, cover_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        profileId,
        username,
        bioData.profile.name,
        bioData.profile.tagline,
        bioData.profile.avatar,
        bioData.profile.coverImage
      ).run();
    } else {
      // Update existing profile
      profileId = profile.id;
      await this.env.DB.prepare(`
        UPDATE profiles
        SET display_name = ?, tagline = ?, avatar_url = ?, cover_url = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        bioData.profile.name,
        bioData.profile.tagline,
        bioData.profile.avatar,
        bioData.profile.coverImage,
        profileId
      ).run();
    }

    // Delete existing related data
    await Promise.all([
      this.env.DB.prepare(`DELETE FROM social_links WHERE profile_id = ?`).bind(profileId).run(),
      this.env.DB.prepare(`DELETE FROM bio_links WHERE profile_id = ?`).bind(profileId).run(),
      this.env.DB.prepare(`DELETE FROM products WHERE profile_id = ?`).bind(profileId).run(),
      this.env.DB.prepare(`DELETE FROM carousel_items WHERE profile_id = ?`).bind(profileId).run()
    ]);

    // Build batch insert statements
    const statements: D1PreparedStatement[] = [];

    // Insert social links
    bioData.profile.socialLinks.forEach((sl: SocialLink, i: number) => {
      statements.push(
        this.env.DB.prepare(`
          INSERT INTO social_links (id, profile_id, platform, url, icon, order_index)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(crypto.randomUUID(), profileId, sl.name, sl.url, sl.icon, i)
      );
    });

    // Insert bio links
    bioData.links.forEach((l, i) => {
      statements.push(
        this.env.DB.prepare(`
          INSERT INTO bio_links (id, profile_id, name, url, description, background_image, order_index)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(crypto.randomUUID(), profileId, l.name, l.url, l.description, l.backgroundImage, i)
      );
    });

    // Insert products
    bioData.products.forEach((p, i) => {
      statements.push(
        this.env.DB.prepare(`
          INSERT INTO products (id, profile_id, name, image_url, price, url, order_index)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(crypto.randomUUID(), profileId, p.name, p.image, p.price, p.url, i)
      );
    });

    // Insert carousel items (AI tools)
    bioData.aiTools.forEach((t, i) => {
      statements.push(
        this.env.DB.prepare(`
          INSERT INTO carousel_items (id, profile_id, name, logo_url, url, order_index)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(crypto.randomUUID(), profileId, t.name, t.logo, t.url, i)
      );
    });

    // Execute all inserts atomically
    if (statements.length > 0) {
      await this.env.DB.batch(statements);
    }

    // Invalidate cache
    await this.cache.invalidate(username);
    console.log(`Profile updated and cache invalidated for username: ${username}`);
  }

  /**
   * Get social links for a profile
   */
  private async getSocialLinks(profileId: string): Promise<SocialLinkRow[]> {
    const { results } = await this.env.DB.prepare(`
      SELECT * FROM social_links WHERE profile_id = ? ORDER BY order_index
    `).bind(profileId).all<SocialLinkRow>();
    return results || [];
  }

  /**
   * Get bio links for a profile
   */
  private async getBioLinks(profileId: string): Promise<BioLinkRow[]> {
    const { results } = await this.env.DB.prepare(`
      SELECT * FROM bio_links WHERE profile_id = ? ORDER BY order_index
    `).bind(profileId).all<BioLinkRow>();
    return results || [];
  }

  /**
   * Get products for a profile
   */
  private async getProducts(profileId: string): Promise<ProductRow[]> {
    const { results } = await this.env.DB.prepare(`
      SELECT * FROM products WHERE profile_id = ? ORDER BY order_index
    `).bind(profileId).all<ProductRow>();
    return results || [];
  }

  /**
   * Get carousel items for a profile
   */
  private async getCarouselItems(profileId: string): Promise<CarouselItemRow[]> {
    const { results } = await this.env.DB.prepare(`
      SELECT * FROM carousel_items WHERE profile_id = ? ORDER BY order_index
    `).bind(profileId).all<CarouselItemRow>();
    return results || [];
  }
}
