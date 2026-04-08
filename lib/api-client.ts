/**
 * API Client Utilities
 * Client-side functions for calling API endpoints
 */

import axios, { AxiosError } from 'axios';
import { ApiResponse, DatabaseStats, BackofficeStats, HealthStatus, TableData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/**
 * Health Check
 */
export async function fetchHealth(): Promise<HealthStatus | null> {
  try {
    const response = await apiClient.get<HealthStatus>('/health');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health status:', error);
    return null;
  }
}

/**
 * Database Statistics
 */
export async function fetchDatabaseStats(): Promise<DatabaseStats | null> {
  try {
    const response = await apiClient.get<ApiResponse<DatabaseStats>>('/db/stats');
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch database stats:', error);
    return null;
  }
}

/**
 * Database Tables List
 */
export async function fetchDatabaseTables(
  limit: number = 20,
  offset: number = 0,
  search: string = ''
): Promise<any | null> {
  try {
    const response = await apiClient.get<ApiResponse>('/db/tables', {
      params: { limit, offset, search },
    });
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch database tables:', error);
    return null;
  }
}

/**
 * Table Data
 */
export async function fetchTableData(
  tableName: string,
  limit: number = 100
): Promise<TableData | null> {
  try {
    const response = await apiClient.get<ApiResponse<TableData>>('/db/tables', {
      params: { table: tableName, limit },
    });
    return response.data.data || null;
  } catch (error) {
    console.error(`Failed to fetch data from ${tableName}:`, error);
    return null;
  }
}

/**
 * Backoffice Statistics
 */
export async function fetchBackofficeStats(): Promise<BackofficeStats | null> {
  try {
    const response = await apiClient.get<ApiResponse<BackofficeStats>>('/backoffice/stats');
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch backoffice stats:', error);
    return null;
  }
}

/**
 * Recent Bookings
 */
export async function fetchRecentBookings(limit: number = 10): Promise<any[] | null> {
  try {
    const response = await apiClient.get<ApiResponse>('/backoffice/bookings', {
      params: { limit },
    });
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch recent bookings:', error);
    return null;
  }
}

/**
 * Recent Payments
 */
export async function fetchRecentPayments(limit: number = 10): Promise<any[] | null> {
  try {
    const response = await apiClient.get<ApiResponse>('/backoffice/payments', {
      params: { limit },
    });
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch recent payments:', error);
    return null;
  }
}

/**
 * SSOT Data
 */
export async function fetchSSOTData(section?: string): Promise<any | null> {
  try {
    const response = await apiClient.get<ApiResponse>('/ssot/data', {
      params: section ? { section } : {},
    });
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch SSOT data:', error);
    return null;
  }
}

/**
 * SSOT Status
 */
export async function fetchSSOTStatus(): Promise<any | null> {
  try {
    const response = await apiClient.get<ApiResponse>('/ssot/status');
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch SSOT status:', error);
    return null;
  }
}

export default apiClient;
