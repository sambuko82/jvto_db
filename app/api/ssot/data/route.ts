/**
 * SSOT Data Route
 * GET /api/ssot/data
 * Query params: ?section=destinations&reload=false
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadSSOT, getSSSTSection, reloadSSO } from '@/lib/ssot';
import { ApiResponse, SSOT } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const section = searchParams.get('section') || '';
    const reload = searchParams.get('reload') === 'true';

    if (reload) {
      await reloadSSO();
    }

    let data: any;

    if (section) {
      // Get specific section
      data = await getSSSTSection(section);
      if (!data) {
        return NextResponse.json(
          {
            success: false,
            error: `Section '${section}' not found in SSOT`,
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }
    } else {
      // Get entire SSOT
      data = await loadSSOT();
    }

    const response: ApiResponse<SSOT> = {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load SSOT data';

    const response: ApiResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
