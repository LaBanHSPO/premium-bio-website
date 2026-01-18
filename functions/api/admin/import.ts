import { Env, PagesFunction } from '@/lib/types';
import { BioDataQueries } from '@/lib/db/queries';
import { bioDataSchema } from '@/lib/types';
import { ZodError } from 'zod';

/**
 * POST /api/admin/import
 * Imports profile configuration from JSON into D1
 * Requires session authentication (validated in middleware)
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as { bioData: unknown };

    if (!body.bioData) {
      return Response.json(
        { error: 'Bio data is required for import' },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validatedData = bioDataSchema.parse(body.bioData);

    // Import to database (same as update)
    const queries = new BioDataQueries(env);
    const domain = env.DOMAIN || 'default';
    await queries.updateProfile(domain, validatedData);

    return Response.json({
      success: true,
      message: 'Bio data imported successfully'
    });
  } catch (error) {
    console.error('Import error:', error);

    if (error instanceof ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to import configuration' },
      { status: 500 }
    );
  }
};
