export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getRecentBookings } from '@/lib/db/mysql';
import { ApiResponse, Booking } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const bookings = await getRecentBookings(Math.min(limit, 100));
    return NextResponse.json({ success: true, data: bookings, timestamp: new Date().toISOString() } as ApiResponse<Booking[]>);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed', timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
