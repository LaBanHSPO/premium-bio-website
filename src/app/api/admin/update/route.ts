import { NextRequest, NextResponse } from 'next/server';
import { adminFormSchema } from '@/lib/types';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate dữ liệu đầu vào
    const validatedData = adminFormSchema.parse(body);
    
    // Kiểm tra admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || validatedData.adminSecret !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 401 }
      );
    }
    
    // Kiểm tra Edge Config token
    const edgeConfigToken = process.env.EDGE_CONFIG_TOKEN;
    if (!edgeConfigToken) {
      return NextResponse.json(
        { error: 'Edge Config token not configured' },
        { status: 500 }
      );
    }
    
    // Cập nhật Edge Config
    const edgeConfigId = process.env.EDGE_CONFIG_ID;
    if (!edgeConfigId) {
      return NextResponse.json(
        { error: 'Edge Config ID not configured' },
        { status: 500 }
      );
    }

    // Lấy dữ liệu hiện tại
    const { get } = await import('@vercel/edge-config');
    const allBioData = await get('bioData') || {};
    const domain = process.env.DOMAIN || 'default';
                
    // Cập nhật dữ liệu cho domain hiện tại
    const updatedData =  {
      ...allBioData,
      [domain]: validatedData.bioData
    };
    
    const updateResponse = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${edgeConfigToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: 'bioData',
              value: updatedData,
            },
          ],
        }),
      }
    );
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Edge Config update failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to update configuration' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Bio data updated successfully' 
    });
    
  } catch (error) {
    console.error('Update error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
