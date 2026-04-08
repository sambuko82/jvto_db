/**
 * Backoffice Statistics Route
 * GET /api/backoffice/stats
 */

import { NextResponse } from 'next/server';
import { getBackofficeStats } from '@/lib/db/mysql';
import { ApiResponse, BackofficeStats } from '@/lib/types';

export async function GET() {
  try {
    const stats = await getBackofficeStats();

    const response: ApiResponse<BackofficeStats> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch backoffice statistics';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
