-- Migration 0003: Admin Users Table
-- Created: 2026-01-18
-- Purpose: Create admin_users table for session-based authentication

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);

-- Insert default admin user
-- Username: admin
-- Password: changeme123
-- Note: This is a PBKDF2 hash (salt.hash format in base64)
-- TODO: User should change this password after first login
INSERT INTO admin_users (id, username, password_hash)
VALUES (
  'admin-default-id',
  'admin',
  'Y4e1+hWvzbJoEmk0unZqJw==.B6q4iyBccfqMOvz/DPWf6LGvCodiBGCfiLiETljkDSE='
);
