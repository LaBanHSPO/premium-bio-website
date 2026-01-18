import { Env, PagesFunction } from '@/lib/types';
import { RateLimiter } from '@/lib/kv/rate-limit';
import { SessionManager } from '@/lib/kv/sessions';
import { verifyPasswordPBKDF2 } from '@/lib/auth/password';

/**
 * POST /api/admin/login
 * Authenticates admin user with username/password
 * Creates session in KV and returns token
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return Response.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    // Check rate limit
    const rateLimiter = new RateLimiter(env.RATE_LIMIT);
    const rateCheck = await rateLimiter.checkAndIncrement(username, 5);

    if (!rateCheck.allowed) {
      return Response.json(
        {
          error: 'Too many login attempts',
          resetAt: rateCheck.resetAt?.toISOString()
        },
        { status: 429 }
      );
    }

    // Query admin user
    const user = await env.DB.prepare(`
      SELECT id, username, password_hash FROM admin_users WHERE username = ?
    `).bind(username).first<{ id: string; username: string; password_hash: string }>();

    if (!user) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPasswordPBKDF2(password, user.password_hash);

    if (!valid) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const sessionManager = new SessionManager(env.SESSIONS);
    const token = await sessionManager.create(username, 86400); // 24h

    // Update last login
    await env.DB.prepare(`
      UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(user.id).run();

    // Reset rate limit on success
    await rateLimiter.reset(username);

    return Response.json({
      success: true,
      token,
      username,
      expiresIn: 86400
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
