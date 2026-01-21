export interface SessionData {
  username: string;
  admin: boolean;
  createdAt: string;
}

/**
 * Admin session manager using Cloudflare KV
 */
export class SessionManager {
  constructor(private kv: KVNamespace) {}

  /** Create session, returns token (UUID). Default TTL: 24 hours */
  async create(username: string, ttlSeconds = 86400): Promise<string> {
    const token = crypto.randomUUID();
    const sessionData: SessionData = {
      username,
      admin: true,
      createdAt: new Date().toISOString()
    };

    await this.kv.put(`session:${token}`, JSON.stringify(sessionData), {
      expirationTtl: ttlSeconds
    });

    return token;
  }

  /** Verify token and return session data, or null if invalid/expired */
  async verify(token: string): Promise<SessionData | null> {
    return this.kv.get<SessionData>(`session:${token}`, 'json');
  }

  /** Destroy session (logout) */
  async destroy(token: string): Promise<void> {
    await this.kv.delete(`session:${token}`);
  }
}
