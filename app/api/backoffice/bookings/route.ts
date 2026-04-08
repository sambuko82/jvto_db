/**
 * Recent Bookings Route
 * GET /api/backoffice/bookings
 * Query params: ?limit=10
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecentBookings } from '@/lib/db/mysql';
import { ApiResponse, Booking } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const bookings = await getRecentBookings(Math.min(limit, 100)); // Max 100

    const response: ApiResponse<Booking[]> = {
      success: true,
      data: bookings as Booking[],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch bookings';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
