import { Env, PagesFunction } from '@/lib/types';
import { SessionManager } from '@/lib/kv/sessions';

/**
 * POST /api/admin/logout
 * Destroys admin session and logs out user
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return Response.json(
        { error: 'No token provided' },
        { status: 400 }
      );
    }

    const sessionManager = new SessionManager(env.SESSIONS);
    await sessionManager.destroy(token);

    return Response.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
