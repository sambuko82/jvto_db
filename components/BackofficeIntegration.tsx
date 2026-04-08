'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Calendar, RefreshCw } from 'lucide-react';
import { fetchBackofficeStats, fetchRecentBookings, fetchRecentPayments } from '@/lib/api-client';

function formatRupiah(amount: number) {
  if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000)     return `Rp ${(amount / 1_000).toFixed(0)}K`;
  return `Rp ${amount}`;
}

function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60)   return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function BackofficeIntegration() {
  const [stats, setStats]       = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [s, b, p] = await Promise.all([
        fetchBackofficeStats(),
        fetchRecentBookings(5),
        fetchRecentPayments(5),
      ]);
      setStats(s);
      setBookings(b || []);
      setPayments(p || []);
      setLastRefresh(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to load backoffice data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // Auto-refresh every 60s
    const interval = setInterval(loadData, 60_000);
    return () => clearInterval(interval);
  }, []);

  const topMetrics = [
    { icon: Calendar,   label: 'Dashboard Status',  value: error ? 'Error' : loading ? '...' : 'Connected',   status: error ? 'error' : 'success' },
    { icon: Users,      label: 'Active Bookings',   value: loading ? '...' : stats?.activeBookings?.toLocaleString() || '—', status: 'info' },
    { icon: DollarSign, label: 'Total Terbayar',    value: loading ? '...' : (stats?.totalPayments ? formatRupiah(stats.totalPayments) : '—'), status: 'success' },
    { icon: TrendingUp, label: 'Kontak (Legacy)',  value: loading ? '...' : stats?.totalUsers?.toLocaleString() || '—', status: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="card border-blue-600/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-blue-400">Backoffice Integration Status</h3>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1 text-sm text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-600 rounded-lg text-red-300 text-sm">
            ⚠ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">{metric.label}</div>
                      <div className={`text-xl font-bold text-white ${loading ? 'animate-pulse' : ''}`}>
                        {metric.value}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    metric.status === 'success' ? 'bg-green-500/20 text-green-400' :
                    metric.status === 'error'   ? 'bg-red-500/20 text-red-400' :
                                                  'bg-blue-500/20 text-blue-400'
                  }`}>
                    {metric.status === 'success' ? '✓' : metric.status === 'error' ? '✗' : '●'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-purple-400">Recent Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-slate-400 text-sm">{loading ? 'Loading...' : 'No bookings found'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-600">
                  <th className="text-left py-2 px-3">Booking #</th>
                  <th className="text-left py-2 px-3">Tour Date</th>
                  <th className="text-right py-2 px-3">Price</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-2 px-3 font-mono text-blue-300">{b.booking_number || b.id}</td>
                    <td className="py-2 px-3 text-slate-300">{b.tour_date ? new Date(b.tour_date).toLocaleDateString() : '—'}</td>
                    <td className="py-2 px-3 text-right text-amber-300">{b.total_price ? formatRupiah(b.total_price) : '—'}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        b.status === 'pending'   ? 'bg-yellow-500/20 text-yellow-400' :
                                                   'bg-slate-500/20 text-slate-400'
                      }`}>{b.status || '—'}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-400">{b.created_at ? timeAgo(b.created_at) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Payments */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-green-400">Recent Payments</h3>
        {payments.length === 0 ? (
          <p className="text-slate-400 text-sm">{loading ? 'Loading...' : 'No payments found'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-600">
                  <th className="text-left py-2 px-3">ID</th>
                  <th className="text-right py-2 px-3">Amount</th>
                  <th className="text-left py-2 px-3">Method</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p: any, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-2 px-3 font-mono text-blue-300">#{p.id}</td>
                    <td className="py-2 px-3 text-right font-bold text-green-300">{p.amount ? formatRupiah(p.amount) : '—'}</td>
                    <td className="py-2 px-3 text-slate-300">{p.payment_method || '—'}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        p.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        p.status === 'pending'   ? 'bg-yellow-500/20 text-yellow-400' :
                                                   'bg-slate-500/20 text-slate-400'
                      }`}>{p.status || '—'}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-400">{p.created_at ? timeAgo(p.created_at) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="card bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-600/50">
        <h3 className="font-bold mb-4 text-blue-400">Connected Systems</h3>
        <div className="space-y-3">
          {[
            { name: 'Backoffice MySQL',  endpoint: '153.92.9.37:3306', status: !error && !loading },
            { name: 'Database Mirror',   endpoint: '31.97.223.43:5432', status: !error && !loading },
            { name: 'SSOT Repository',   endpoint: 'JVTO_SSOT_v4_0_CLEAN.json', status: true },
          ].map((sys, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
              <div>
                <div className="font-bold text-white text-sm">{sys.name}</div>
                <div className="text-xs text-slate-400 font-mono">{sys.endpoint}</div>
              </div>
              <span className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold ${
                sys.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${sys.status ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                {sys.status ? 'Online' : 'Offline'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-400">
          Last refreshed: {lastRefresh.toLocaleTimeString()} · Auto-refresh: 60s
        </div>
      </div>
    </div>
  );
}
