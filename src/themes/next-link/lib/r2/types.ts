/**
 * R2 Storage Types
 * Type definitions for R2 upload results and image metadata
 */

/**
 * Upload operation result
 */
export interface UploadResult {
  /** R2 object key (path in bucket) */
  key: string;
  /** Public URL for accessing the uploaded file */
  url: string;
  /** File size in bytes */
  size: number;
  /** MIME type (e.g., 'image/jpeg', 'image/png') */
  contentType: string;
}

/**
 * Image metadata (optional, for future optimization features)
 */
export interface ImageMetadata {
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Image format (jpeg, png, webp, gif) */
  format?: string;
  /** File size in bytes */
  size?: number;
  /** Upload timestamp */
  uploadedAt?: string;
}

/**
 * Upload options for R2 operations
 */
export interface UploadOptions {
  /** Content type override */
  contentType?: string;
  /** Custom metadata key-value pairs */
  metadata?: Record<string, string>;
  /** Cache control header */
  cacheControl?: string;
}
