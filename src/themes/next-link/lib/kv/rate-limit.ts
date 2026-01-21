export interface RateLimitResult {
  allowed: boolean;
  attempts: number;
  resetAt?: Date;
}

const ATTEMPT_TTL_SECONDS = 300; // 5 minutes
const LOCKOUT_MINUTES = 15;

/**
 * Rate limiter using Cloudflare KV to prevent brute force attacks
 */
export class RateLimiter {
  constructor(private kv: KVNamespace) {}

  private key(identifier: string): string {
    return `auth_attempt:${identifier}`;
  }

  /** Check if allowed and increment counter. Default max: 5 attempts */
  async checkAndIncrement(identifier: string, maxAttempts = 5): Promise<RateLimitResult> {
    const current = await this.kv.get(this.key(identifier));
    const attempts = current ? parseInt(current) : 0;

    if (attempts >= maxAttempts) {
      return {
        allowed: false,
        attempts,
        resetAt: new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
      };
    }

    await this.kv.put(this.key(identifier), String(attempts + 1), {
      expirationTtl: ATTEMPT_TTL_SECONDS
    });

    return { allowed: true, attempts: attempts + 1 };
  }

  /** Reset counter after successful auth */
  async reset(identifier: string): Promise<void> {
    await this.kv.delete(this.key(identifier));
  }
}
