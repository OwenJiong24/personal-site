-- OrangeKnows 站内真实写入表（Cloudflare D1: ok-comments）
-- 应用：npx wrangler d1 execute ok-comments --remote --file=scripts/comments-schema.sql
-- 隐私：不存 IP 原文，只存 SHA-256 前 16 位（限流用）；email 不对外返回。
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('comment', 'question', 'lead')),
  path TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'zh',
  name TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  reviewed_at TEXT,
  ip_hash TEXT
);
CREATE INDEX IF NOT EXISTS idx_requests_path ON requests (path, status);
CREATE INDEX IF NOT EXISTS idx_requests_created ON requests (created_at);
CREATE INDEX IF NOT EXISTS idx_requests_ip ON requests (ip_hash, created_at);
