import { NextResponse } from 'next/server';
import { BioData } from '@/lib/types';

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

export async function GET() {
  try {
    // Trong môi trường development, chỉ trả về fallback data
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('Development mode: returning fallback data');
    //   return NextResponse.json(fallbackData);
    // }

    // Trong production, thử lấy từ Edge Config
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

    // Nếu không có dữ liệu trong Edge Config hoặc không có cấu hình, trả về fallback data
    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error('Error fetching config:', error);
    // Nếu có lỗi, trả về fallback data
    return NextResponse.json(fallbackData);
  }
}
