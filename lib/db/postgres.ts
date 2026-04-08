/**
 * PostgreSQL Database Mirror Connection
 * Connects to: 31.97.223.43:5432 (jvto_dev)
 */

import { Pool, QueryResult, QueryResultRow } from 'pg';

let pool: Pool | null = null;

export function getPostgresPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: process.env.DB_SSL === 'require' ? { rejectUnauthorized: false } : false,
    });

    pool.on('error', (err) => {
      console.error('PostgreSQL Pool Error:', err);
    });
  }

  return pool;
}

export async function queryPostgres<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = getPostgresPool();
  try {
    return await pool.query<T>(sql, params);
  } catch (error) {
    console.error('PostgreSQL Query Error:', error);
    throw error;
  }
}

export async function getDatabaseTables(): Promise<string[]> {
  const result = await queryPostgres(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public'
     ORDER BY table_name`
  );
  return result.rows.map((row) => row.table_name);
}

export async function getTableStats(): Promise<any[]> {
  const result = await queryPostgres(
    `SELECT
       schemaname,
       relname AS tablename,
       n_live_tup AS row_count
     FROM pg_stat_user_tables
     ORDER BY n_live_tup DESC`
  );
  return result.rows;
}

export async function getTableData(tableName: string, limit: number = 100) {
  // Sanitize table name to prevent SQL injection
  if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
    throw new Error('Invalid table name');
  }

  const result = await queryPostgres(
    `SELECT * FROM "${tableName}" LIMIT $1`,
    [limit]
  );

  return {
    table: tableName,
    columns: result.fields.map((f) => f.name),
    data: result.rows,
    count: result.rows.length,
  };
}

export async function getDatabaseStats() {
  const [tables, stats] = await Promise.all([
    getDatabaseTables(),
    getTableStats(),
  ]);

  const totalRecords = stats.reduce((sum, row) => sum + (row.row_count || 0), 0);

  return {
    totalTables: tables.length,
    totalRecords,
    tables: stats.slice(0, 20).map((s) => ({
      name: s.tablename,
      records: s.row_count,
    })),
  };
}

export async function closePostgresPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
