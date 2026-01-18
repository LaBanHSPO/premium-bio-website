import { Env, PagesMiddleware } from '@/lib/types';
import { SessionManager } from '@/lib/kv/sessions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function addCorsHeaders(response: Response): Response {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}

/**
 * Cloudflare Pages Middleware
 * Handles CORS and session-based admin authentication for API routes
 */
export const onRequest: PagesMiddleware<Env>[] = [
  async (context) => {
    const { request, env, next } = context;
    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Require auth for protected admin routes (exclude login)
    const requiresAuth = pathname.includes('/admin/') && pathname !== '/api/admin/login';

    if (requiresAuth) {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return jsonError('No token provided', 401);
      }

      const session = await new SessionManager(env.SESSIONS).verify(token);

      if (!session) {
        return jsonError('Invalid or expired token', 401);
      }

      context.data = { session };
    }

    return addCorsHeaders(await next());
  }
];
