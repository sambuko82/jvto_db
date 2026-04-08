/**
 * Recent Payments Route
 * GET /api/backoffice/payments
 * Query params: ?limit=10
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecentPayments } from '@/lib/db/mysql';
import { ApiResponse, Payment } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const payments = await getRecentPayments(Math.min(limit, 100)); // Max 100

    const response: ApiResponse<Payment[]> = {
      success: true,
      data: payments as Payment[],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payments';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
