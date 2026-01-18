-- Premium Bio Website Database Schema
-- Migration: 0001_initial_schema
-- Date: 2026-01-18
-- Description: Initial schema with profiles, social links, bio links, products, and carousel items

-- Profiles (core entity)
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE social_links (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Bio Links
CREATE TABLE bio_links (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  background_image TEXT,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  price TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Carousel Items (AI Tools)
CREATE TABLE carousel_items (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_profile_username ON profiles(username);
CREATE INDEX idx_social_profile ON social_links(profile_id);
CREATE INDEX idx_bio_links_profile ON bio_links(profile_id);
CREATE INDEX idx_products_profile ON products(profile_id);
CREATE INDEX idx_carousel_profile ON carousel_items(profile_id);
