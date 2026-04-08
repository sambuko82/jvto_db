export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getBackofficeStats } from '@/lib/db/mysql';
import { ApiResponse, BackofficeStats } from '@/lib/types';

export async function GET() {
  try {
    const stats = await getBackofficeStats();
    return NextResponse.json({ success: true, data: stats, timestamp: new Date().toISOString() } as ApiResponse<BackofficeStats>);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed', timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
