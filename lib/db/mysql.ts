/**
 * MySQL Backoffice Database Connection
 * Connects to: 153.92.9.37:3306 (u1805424_jvto_clone)
 *
 * NOTE: This is the LEGACY internal backoffice database.
 * Primary (customer-facing) data source is PostgreSQL DB Mirror.
 * MySQL is used for internal operational data only.
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

/**
 * Internal backoffice stats — from legacy MySQL
 * NOTE: These are historical/operational numbers.
 * For customer-facing metrics, use PostgreSQL DB Mirror.
 */
export async function getBackofficeStats() {
  try {
    const [bookings, payments, users] = await Promise.all([
      // Active bookings (exclude cancelled/rejected/draft)
      queryMysql(
        `SELECT COUNT(*) AS count FROM bookings
         WHERE status NOT IN ('cancelled', 'rejected', 'draft')`
      ),
      // Total paid amount from booking_payments
      queryMysql(
        `SELECT COALESCE(SUM(nominal), 0) AS total FROM booking_payments WHERE is_paid = 1`
      ),
      // Total users (internal team/agents)
      queryMysql(`SELECT COUNT(*) AS count FROM users`),
    ]);

    return {
      activeBookings: Number((bookings[0] as any)?.count) || 0,
      totalPayments:  Number((payments[0] as any)?.total) || 0,
      totalUsers:     Number((users[0] as any)?.count) || 0,
    };
  } catch (error) {
    console.error('Error fetching backoffice stats:', error);
    return {
      activeBookings: 0,
      totalPayments: 0,
      totalUsers: 0,
      error: 'Failed to fetch backoffice statistics',
    };
  }
}

/**
 * Recent bookings from legacy MySQL backoffice
 */
export async function getRecentBookings(limit: number = 10) {
  try {
    return await queryMysql(
      `SELECT
        id,
        COALESCE(booking_numb, booking_code, CONCAT('#', id)) AS booking_number,
        user_id,
        travel_date_start AS tour_date,
        grand_total        AS total_price,
        status,
        payment_status,
        created_at
       FROM bookings
       ORDER BY created_at DESC
       LIMIT ?`,
      [limit]
    );
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    return [];
  }
}

/**
 * Recent payments from legacy MySQL backoffice (booking_payments table)
 */
export async function getRecentPayments(limit: number = 10) {
  try {
    return await queryMysql(
      `SELECT
        bp.id,
        bp.booking_id,
        bp.nominal      AS amount,
        pm.name         AS payment_method,
        IF(bp.is_paid = 1, 'completed', 'pending') AS status,
        bp.created_at
       FROM booking_payments bp
       LEFT JOIN payment_methods pm ON pm.id = bp.payment_method_id
       ORDER BY bp.created_at DESC
       LIMIT ?`,
      [limit]
    );
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
