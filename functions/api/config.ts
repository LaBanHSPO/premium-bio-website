import { Env, PagesFunction } from '@/lib/types';
import { BioDataQueries } from '@/lib/db/queries';

/**
 * GET /api/config
 * Returns profile configuration data from D1 with KV caching
 */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const queries = new BioDataQueries(env);
    const domain = env.DOMAIN || 'default';
    const bioData = await queries.getByUsername(domain);

    if (!bioData) {
      // Fallback to default data if no profile found
      const fallbackData = {
        profile: {
          name: 'Default Profile',
          tagline: 'Premium Bio Website',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
          coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
          socialLinks: []
        },
        links: [],
        products: [],
        aiTools: []
      };
      return Response.json(fallbackData);
    }

    return Response.json(bioData);
  } catch (error) {
    console.error('Error fetching config:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
