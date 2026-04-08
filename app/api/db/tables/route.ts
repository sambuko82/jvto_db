/**
 * Database Tables List Route
 * GET /api/db/tables
 * Query params: ?limit=20&offset=0&search=users
 */
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseTables, getTableData } from '@/lib/db/postgres';
import { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';
    const tableName = searchParams.get('table') || '';

    if (tableName) {
      const data = await getTableData(tableName, limit);
      const response: ApiResponse = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response);
    }

    let tables = await getDatabaseTables();

    if (search) {
      tables = tables.filter((table) =>
        table.toLowerCase().includes(search.toLowerCase())
      );
    }

    const paginatedTables = tables.slice(offset, offset + limit);

    const response: ApiResponse = {
      success: true,
      data: {
        tables: paginatedTables,
        total: tables.length,
        limit,
        offset,
        hasMore: offset + limit < tables.length,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch database tables';
    return NextResponse.json({ success: false, error: errorMessage, timestamp: new Date().toISOString() } as ApiResponse, { status: 500 });
  }
}
