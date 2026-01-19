import { NextRequest, NextResponse } from 'next/server';
import { BioData } from '@/lib/types';

export const runtime = 'edge';

// Fallback data từ các file hiện tại
import { profileData } from '@/data/profile';
import { socialLinksData } from '@/data/links';
import { productsData } from '@/data/products';
import { aiToolsData } from '@/data/tools';

const fallbackData: BioData = {
  profile: profileData,
  links: socialLinksData,
  products: productsData,
  aiTools: aiToolsData,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { adminSecret: string };

    // Kiểm tra admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || body.adminSecret !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 401 }
      );
    }

    // Lấy dữ liệu hiện tại (logic tương tự /api/config)
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
        // Sử dụng fallback data nếu Edge Config fails
      }
    }

    // Tạo filename với timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `bio-data-export-${timestamp}.json`;

    // Trả về dữ liệu với headers để download
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
