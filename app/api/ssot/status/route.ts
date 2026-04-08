/**
 * SSOT Status Route
 * GET /api/ssot/status
 */

import { NextResponse } from 'next/server';
import { getSSSTStatus } from '@/lib/ssot';
import { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    const status = getSSSTStatus();

    const response: ApiResponse = {
      success: true,
      data: status,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get SSOT status';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
