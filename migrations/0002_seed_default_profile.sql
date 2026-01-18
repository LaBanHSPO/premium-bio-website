-- Premium Bio Website Database Seed
-- Migration: 0002_seed_default_profile
-- Date: 2026-01-18
-- Description: Seed default profile for testing and development

-- Insert default profile
INSERT INTO profiles (id, username, display_name, tagline, avatar_url, cover_url)
VALUES (
  'default-profile-id',
  'default',
  'Default Profile',
  'Premium Bio Website',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'
);
