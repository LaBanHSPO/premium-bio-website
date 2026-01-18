import { Env, PagesFunction } from '@/lib/types';
import { BioDataQueries } from '@/lib/db/queries';
import { bioDataSchema } from '@/lib/types';
import { ZodError } from 'zod';

/**
 * POST /api/admin/update
 * Updates profile configuration in D1 and invalidates cache
 * Requires session authentication (validated in middleware)
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as { bioData: unknown };

    if (!body.bioData) {
      return Response.json(
        { error: 'Bio data is required' },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validatedData = bioDataSchema.parse(body.bioData);

    // Update database
    const queries = new BioDataQueries(env);
    const domain = env.DOMAIN || 'default';
    await queries.updateProfile(domain, validatedData);

    return Response.json({
      success: true,
      message: 'Configuration updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error);

    if (error instanceof ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
};
