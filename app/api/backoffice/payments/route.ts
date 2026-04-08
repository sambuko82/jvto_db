export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getRecentPayments } from '@/lib/db/mysql';
import { ApiResponse, Payment } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const payments = await getRecentPayments(Math.min(limit, 100));
    return NextResponse.json({ success: true, data: payments, timestamp: new Date().toISOString() } as ApiResponse<Payment[]>);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed', timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
