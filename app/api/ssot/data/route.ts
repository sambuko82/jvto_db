export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { loadSSOT, getSSSTSection, reloadSSO } from '@/lib/ssot';
import { ApiResponse, SSOT } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const section = request.nextUrl.searchParams.get('section') || '';
    const reload = request.nextUrl.searchParams.get('reload') === 'true';

    if (reload) await reloadSSO();

    const data = section ? await getSSSTSection(section) : await loadSSOT();

    if (section && !data) {
      return NextResponse.json({ success: false, error: `Section '${section}' not found`, timestamp: new Date().toISOString() } as ApiResponse, { status: 404 });
    }

    return NextResponse.json({ success: true, data, timestamp: new Date().toISOString() } as ApiResponse<SSOT>);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed', timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
