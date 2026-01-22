import { NextRequest, NextResponse } from 'next/server';
import { BioData } from '@/lib/types';

export const runtime = 'edge';

// Fallback data from theme config
import { config } from '@/theme/config';

const fallbackData = config as unknown as BioData;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { adminSecret: string };

    // Check admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || body.adminSecret !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 401 }
      );
    }

    // Get current data (logic similar to /api/config)
    let bioData: BioData = fallbackData;

    if (process.env.EDGE_CONFIG) {
      try {
        const domain = process.env.DOMAIN || 'default';
        const { get } = await import('@vercel/edge-config');
        const edgeConfigData = await get<BioData>('bioData');
        if (edgeConfigData) {
          bioData = edgeConfigData[domain];
        }
      } catch (edgeConfigError) {
        console.error('Edge Config error during export:', edgeConfigError);
        // Use fallback data if Edge Config fails
      }
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `bio-data-export-${timestamp}.json`;

    // Return data with headers for download
    return new NextResponse(JSON.stringify(bioData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
