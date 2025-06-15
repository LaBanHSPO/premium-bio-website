import { NextRequest, NextResponse } from 'next/server';
import { bioDataSchema } from '@/lib/types';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Kiểm tra admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || body.adminSecret !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 401 }
      );
    }

    // Kiểm tra dữ liệu import
    if (!body.bioData) {
      return NextResponse.json(
        { error: 'Bio data is required for import' },
        { status: 400 }
      );
    }

    // Validate dữ liệu import với schema
    const validatedBioData = bioDataSchema.parse(body.bioData);
    
    // Kiểm tra Edge Config token
    const edgeConfigToken = process.env.EDGE_CONFIG_TOKEN;
    if (!edgeConfigToken) {
      return NextResponse.json(
        { error: 'Edge Config token not configured' },
        { status: 500 }
      );
    }
    
    // Cập nhật Edge Config (logic tương tự /api/admin/update)
    const edgeConfigId = process.env.EDGE_CONFIG_ID;
    if (!edgeConfigId) {
      return NextResponse.json(
        { error: 'Edge Config ID not configured' },
        { status: 500 }
      );
    }
    
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
              value: validatedBioData,
            },
          ],
        }),
      }
    );
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Edge Config update failed during import:', errorText);
      return NextResponse.json(
        { error: 'Failed to import configuration' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Bio data imported successfully' 
    });
    
  } catch (error) {
    console.error('Import error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format in import file', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
