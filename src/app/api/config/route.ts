import { NextResponse } from 'next/server';
import { BioData } from '@/lib/types';

import { config } from '@/theme/config';


// Cast config to BioData or any to bypass type check if structures differ slightly between themes
const fallbackData = config as unknown as BioData;

export async function GET() {
  try {
    // In development environment, only return fallback data
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('Development mode: returning fallback data');
    //   return NextResponse.json(fallbackData);
    // }

    // In production, try to fetch from Edge Config
    if (process.env.EDGE_CONFIG) {
      try {
        const { get } = await import('@vercel/edge-config');
        const allBioData = await get('bioData') || {};
        const domain = process.env.DOMAIN || 'default';

        console.log(`Fetching bioData for domain: ${domain}`);
        const bioData = allBioData[domain] as BioData;

        console.log('bioData from Edge Config:', bioData);
        if (bioData) {
          return NextResponse.json(bioData);
        }
      } catch (edgeConfigError) {
        console.error('Edge Config error:', edgeConfigError);
        // Fallback to local data if Edge Config fails
      }
    }

    // If no data in Edge Config or no config, return fallback data
    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error('Error fetching config:', error);
    // If error, return fallback data
    return NextResponse.json(fallbackData);
  }
}
