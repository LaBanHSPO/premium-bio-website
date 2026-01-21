# R2 Media Storage

This directory contains helpers for managing media uploads to Cloudflare R2.

## Bucket Structure

```
bio-media/
├── profiles/
│   ├── {profile-id}/
│   │   ├── avatar.jpg
│   │   └── cover.jpg
├── products/
│   └── {product-id}/
│       └── image.jpg
├── carousel/
│   └── {item-id}/
│       └── logo.png
└── tmp/
    └── {upload-id}/
        └── pending.jpg
```

## Public URL Patterns

### Current (Phase 1)
External URLs from third-party services (keep as-is):
- Unsplash: `https://images.unsplash.com/...`
- Cloudinary: `https://res.cloudinary.com/...`

### Future (Phase 2 - Media Uploads)
R2 hosted images with custom domain:
- Custom domain: `https://media.yourdomain.com/profiles/{id}/avatar.jpg`
- R2.dev fallback: `https://bio-media.r2.cloudflarestorage.com/...`

## Usage

```typescript
import { MediaStorage } from '@/lib/r2/storage';

// Initialize with R2 bucket binding
const storage = new MediaStorage(env.MEDIA);

// Upload profile avatar
const avatarUrl = await storage.uploadProfileAvatar(
  'user-123',
  fileBuffer,
  'image/jpeg'
);

// Upload product image
const productUrl = await storage.uploadProductImage(
  'product-456',
  fileBuffer,
  'image/png'
);

// Delete image
await storage.delete('profiles/user-123/avatar.jpg');
```

## Configuration

Set `R2_PUBLIC_DOMAIN` environment variable for custom domain URLs:

**.dev.vars** (local development):
```env
R2_PUBLIC_DOMAIN=localhost:8788
```

**Cloudflare Dashboard** (production):
```
R2_PUBLIC_DOMAIN=media.yourdomain.com
```

## Supported Formats

- JPEG (`.jpg`)
- PNG (`.png`)
- WebP (`.webp`)
- GIF (`.gif`)

Max file size: 10MB per image

## Security

- Public read access for all images
- Write access only via Pages Functions (server-side)
- File validation required before upload (MIME type, size)
- Path sanitization to prevent directory traversal

## Next Steps

1. Phase 05: Integrate MediaStorage into API routes
2. Phase 06: Add upload UI in admin panel
3. Future: Image optimization (resize, WebP conversion)
4. Future: Lifecycle policies for tmp/ folder cleanup
