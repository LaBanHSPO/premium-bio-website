/**
 * R2 Media Storage Helper
 * Handles upload/download operations for profile images, product images, and carousel items
 */

export class MediaStorage {
  constructor(private bucket: R2Bucket) {}

  /**
   * Upload profile avatar image
   * @param profileId - Unique profile identifier
   * @param file - Image file buffer
   * @param contentType - MIME type (image/jpeg, image/png, etc.)
   * @returns Public URL of uploaded image
   */
  async uploadProfileAvatar(
    profileId: string,
    file: ArrayBuffer,
    contentType: string
  ): Promise<string> {
    const key = `profiles/${profileId}/avatar.${this.getExtension(contentType)}`;
    await this.bucket.put(key, file, {
      httpMetadata: { contentType }
    });
    return this.getPublicUrl(key);
  }

  /**
   * Upload profile cover image
   * @param profileId - Unique profile identifier
   * @param file - Image file buffer
   * @param contentType - MIME type
   * @returns Public URL of uploaded image
   */
  async uploadProfileCover(
    profileId: string,
    file: ArrayBuffer,
    contentType: string
  ): Promise<string> {
    const key = `profiles/${profileId}/cover.${this.getExtension(contentType)}`;
    await this.bucket.put(key, file, {
      httpMetadata: { contentType }
    });
    return this.getPublicUrl(key);
  }

  /**
   * Upload product image
   * @param productId - Unique product identifier
   * @param file - Image file buffer
   * @param contentType - MIME type
   * @returns Public URL of uploaded image
   */
  async uploadProductImage(
    productId: string,
    file: ArrayBuffer,
    contentType: string
  ): Promise<string> {
    const key = `products/${productId}/image.${this.getExtension(contentType)}`;
    await this.bucket.put(key, file, {
      httpMetadata: { contentType }
    });
    return this.getPublicUrl(key);
  }

  /**
   * Upload carousel item logo
   * @param itemId - Unique carousel item identifier
   * @param file - Image file buffer
   * @param contentType - MIME type
   * @returns Public URL of uploaded image
   */
  async uploadCarouselLogo(
    itemId: string,
    file: ArrayBuffer,
    contentType: string
  ): Promise<string> {
    const key = `carousel/${itemId}/logo.${this.getExtension(contentType)}`;
    await this.bucket.put(key, file, {
      httpMetadata: { contentType }
    });
    return this.getPublicUrl(key);
  }

  /**
   * Delete object from R2 bucket
   * @param key - Object key to delete
   */
  async delete(key: string): Promise<void> {
    await this.bucket.delete(key);
  }

  /**
   * Get object from R2 bucket
   * @param key - Object key to retrieve
   * @returns R2 object body or null if not found
   */
  async get(key: string): Promise<R2ObjectBody | null> {
    return await this.bucket.get(key);
  }

  /**
   * List objects in a folder
   * @param prefix - Folder prefix (e.g., 'profiles/', 'products/')
   * @param limit - Maximum number of results (default 1000)
   * @returns List of object keys
   */
  async list(prefix: string, limit = 1000): Promise<string[]> {
    const result = await this.bucket.list({ prefix, limit });
    return result.objects.map(obj => obj.key);
  }

  /**
   * Get file extension from content type
   * @param contentType - MIME type
   * @returns File extension (jpg, png, webp, gif)
   */
  private getExtension(contentType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif'
    };
    return map[contentType] || 'jpg';
  }

  /**
   * Get public URL for R2 object
   * @param key - Object key
   * @returns Public URL (custom domain or R2.dev)
   */
  private getPublicUrl(key: string): string {
    // Option 1: Custom domain (if R2_PUBLIC_DOMAIN env var is set)
    // Option 2: R2.dev public URL (fallback)
    const domain = process.env.R2_PUBLIC_DOMAIN;
    if (domain) {
      return `https://${domain}/${key}`;
    }
    // R2.dev URL format: https://<bucket-name>.<account-id>.r2.cloudflarestorage.com/<key>
    // For now, return relative path - will be configured with custom domain later
    return `/${key}`;
  }
}
