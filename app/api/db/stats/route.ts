/**
 * Database Statistics Route
 * GET /api/db/stats
 */

import { NextResponse } from 'next/server';
import { getDatabaseStats } from '@/lib/db/postgres';
import { ApiResponse, DatabaseStats } from '@/lib/types';

export async function GET() {
  try {
    const stats = await getDatabaseStats();

    const response: ApiResponse<DatabaseStats> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch database statistics';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
