/**
 * MySQL Backoffice Database Connection
 * Connects to: 153.92.9.37:3306 (u1805424_jvto_clone)
 */

import mysql from 'mysql2/promise';
import { Pool as MySQLPool } from 'mysql2/promise';

let pool: MySQLPool | null = null;

export function getMysqlPool(): MySQLPool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.BACKOFFICE_DB_HOST || '153.92.9.37',
      port: parseInt(process.env.BACKOFFICE_DB_PORT || '3306'),
      database: process.env.BACKOFFICE_DB_NAME || 'u1805424_jvto_clone',
      user: process.env.BACKOFFICE_DB_USER || 'u1805424_jvto_clone',
      password: process.env.BACKOFFICE_DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  return pool;
}

export async function queryMysql<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('MySQL Query Error:', error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getBackofficeStats() {
  try {
    const [bookings, payments, customers] = await Promise.all([
      queryMysql(
        `SELECT COUNT(*) as count FROM bookings WHERE status NOT IN ('cancelled', 'rejected')`
      ),
      queryMysql(
        `SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`
      ),
      queryMysql(`SELECT COUNT(*) as count FROM customers`),
    ]);

    return {
      activeBookings: (bookings[0] as any)?.count || 0,
      totalPayments: (payments[0] as any)?.total || 0,
      totalCustomers: (customers[0] as any)?.count || 0,
    };
  } catch (error) {
    console.error('Error fetching backoffice stats:', error);
    return {
      activeBookings: 0,
      totalPayments: 0,
      totalCustomers: 0,
      error: 'Failed to fetch backoffice statistics',
    };
  }
}

export async function getRecentBookings(limit: number = 10) {
  try {
    const bookings = await queryMysql(
      `SELECT
        id,
        booking_number,
        customer_id,
        tour_date,
        total_price,
        status,
        created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT ?`,
      [limit]
    );

    return bookings;
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    return [];
  }
}

export async function getRecentPayments(limit: number = 10) {
  try {
    const payments = await queryMysql(
      `SELECT
        id,
        booking_id,
        amount,
        payment_method,
        status,
        created_at
      FROM payments
      ORDER BY created_at DESC
      LIMIT ?`,
      [limit]
    );

    return payments;
  } catch (error) {
    console.error('Error fetching recent payments:', error);
    return [];
  }
}

export async function closeMysqlPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
