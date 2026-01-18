import { Env, PagesFunction } from '@/lib/types';
import { BioDataQueries } from '@/lib/db/queries';

/**
 * Exports current profile configuration from D1 to JSON
 * Requires session authentication (validated in middleware)
 */
const exportHandler: PagesFunction<Env> = async ({ env }) => {
  try {
    const queries = new BioDataQueries(env);
    const domain = env.DOMAIN || 'default';
    const bioData = await queries.getByUsername(domain);

    if (!bioData) {
      return Response.json(
        { error: 'No data found to export' },
        { status: 404 }
      );
    }

    // Return as downloadable JSON
    const jsonString = JSON.stringify(bioData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    return new Response(blob, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="bio-data-export-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return Response.json(
      { error: 'Failed to export configuration' },
      { status: 500 }
    );
  }
};

export const onRequestGet: PagesFunction<Env> = exportHandler;
export const onRequestPost: PagesFunction<Env> = exportHandler;
