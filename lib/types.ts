/**
 * Shared TypeScript Types for API Responses
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface DatabaseStats {
  totalTables: number;
  totalRecords: number;
  tables: Array<{
    name: string;
    records: number;
  }>;
}

export interface BackofficeStats {
  activeBookings: number;
  totalPayments: number;
  totalUsers: number;       // contacts/users in legacy MySQL (mix of customers + staff)
  error?: string;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  postgres: {
    connected: boolean;
    latency?: number;
    error?: string;
  };
  mysql: {
    connected: boolean;
    latency?: number;
    error?: string;
  };
  ssot: {
    loaded: boolean;
    lastSync?: string;
    error?: string;
  };
  timestamp: string;
}

export interface TableData {
  table: string;
  columns: string[];
  data: any[];
  count: number;
}

export interface Booking {
  id: string | number;
  booking_number: string;
  customer_id: string | number;
  tour_date: string;
  total_price: number;
  status: string;
  created_at: string;
}

export interface Payment {
  id: string | number;
  booking_id: string | number;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface SSOT {
  version: string;
  lastUpdated: string;
  categories: any;
  destinations: any;
  tours: any;
  [key: string]: any;
}
