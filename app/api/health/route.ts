/**
 * Health Check Route
 * GET /api/health
 */

import { NextResponse } from 'next/server';
import { getPostgresPool } from '@/lib/db/postgres';
import { getMysqlPool } from '@/lib/db/mysql';
import { getSSSTStatus, loadSSOT } from '@/lib/ssot';
import { HealthStatus } from '@/lib/types';

export async function GET() {
  const healthStatus: HealthStatus = {
    status: 'healthy',
    postgres: { connected: false },
    mysql: { connected: false },
    ssot: { loaded: false },
    timestamp: new Date().toISOString(),
  };

  try {
    // Test PostgreSQL Connection
    const pgStart = Date.now();
    const pgPool = getPostgresPool();
    const pgResult = await pgPool.query('SELECT 1');
    healthStatus.postgres.connected = pgResult.rowCount === 1;
    healthStatus.postgres.latency = Date.now() - pgStart;
  } catch (error) {
    healthStatus.postgres.error = error instanceof Error ? error.message : 'Connection failed';
    healthStatus.status = 'degraded';
  }

  try {
    // Test MySQL Connection
    const mysqlStart = Date.now();
    const mysqlPool = getMysqlPool();
    const connection = await mysqlPool.getConnection();
    await connection.ping();
    connection.release();
    healthStatus.mysql.connected = true;
    healthStatus.mysql.latency = Date.now() - mysqlStart;
  } catch (error) {
    healthStatus.mysql.error = error instanceof Error ? error.message : 'Connection failed';
    healthStatus.status = 'degraded';
  }

  try {
    // Test SSOT Loading
    const ssotStatus = getSSSTStatus();

    if (!ssotStatus.loaded) {
      await loadSSOT();
    }

    healthStatus.ssot.loaded = true;
    healthStatus.ssot.lastSync = ssotStatus.lastSync || new Date().toISOString();
  } catch (error) {
    healthStatus.ssot.error = error instanceof Error ? error.message : 'Failed to load SSOT';
    healthStatus.status = healthStatus.status === 'healthy' ? 'degraded' : healthStatus.status;
  }

  // Overall status
  if (!healthStatus.postgres.connected || !healthStatus.mysql.connected) {
    healthStatus.status = 'unhealthy';
  }

  const statusCode = healthStatus.status === 'healthy' ? 200 : healthStatus.status === 'degraded' ? 206 : 503;

  return NextResponse.json(healthStatus, { status: statusCode });
}
