import { NextResponse } from 'next/server';
import { BioData } from '@/lib/types';
import { config } from '@/theme/config';

export const runtime = 'edge';

// Cast config to BioData or any to bypass type check if structures differ slightly between themes
const staticData = config as unknown as BioData;

export async function GET() {
  return NextResponse.json(staticData);
}
