import { BioData } from '@/lib/types';

/**
 * Config cache manager using Cloudflare KV
 * Caches profile data to reduce D1 database queries
 */
export class ConfigCache {
  constructor(private kv: KVNamespace) {}

  /**
   * Get cached profile data by username
   */
  async get(username: string): Promise<BioData | null> {
    const key = `profile:${username}`;
    return await this.kv.get<BioData>(key, 'json');
  }

  /**
   * Cache profile data with TTL
   * @param username - Profile username/domain
   * @param data - Bio configuration data
   * @param ttlSeconds - Time to live (default: 1 hour)
   */
  async set(username: string, data: BioData, ttlSeconds = 3600): Promise<void> {
    const key = `profile:${username}`;
    await this.kv.put(key, JSON.stringify(data), {
      expirationTtl: ttlSeconds
    });
  }

  /**
   * Invalidate cached profile data
   */
  async invalidate(username: string): Promise<void> {
    const key = `profile:${username}`;
    await this.kv.delete(key);
  }

  /**
   * Invalidate all cached profiles
   * Note: KV doesn't support bulk delete, relies on TTL expiry
   */
  async invalidateAll(): Promise<void> {
    console.warn('Cache invalidation relies on TTL expiry - no bulk delete available');
  }
}
