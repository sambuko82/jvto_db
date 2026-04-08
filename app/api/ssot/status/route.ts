export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSSSTStatus } from '@/lib/ssot';
import { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: getSSSTStatus(), timestamp: new Date().toISOString() } as ApiResponse);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed', timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
