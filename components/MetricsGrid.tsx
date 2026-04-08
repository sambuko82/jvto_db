'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Package, MapPin, Calendar, Zap } from 'lucide-react';
import { fetchDatabaseStats, fetchBackofficeStats } from '@/lib/api-client';

export default function MetricsGrid() {
  const [stats, setStats] = useState({
    totalCustomers: '—',
    activeBookings: '—',
    destinations: '—',
    tourPackages: '—',
    databaseTables: '—',
    totalRecords: '—',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [dbStats, boStats] = await Promise.all([
          fetchDatabaseStats(),
          fetchBackofficeStats(),
        ]);

        setStats({
          totalCustomers: boStats?.totalCustomers?.toLocaleString() || '—',
          activeBookings: boStats?.activeBookings?.toLocaleString() || '—',
          destinations: dbStats?.tables?.find(t => t.name === 'destinations')?.records?.toString() || '—',
          tourPackages: dbStats?.tables?.find(t => t.name === 'packages')?.records?.toString() || '—',
          databaseTables: dbStats?.totalTables ? `${dbStats.totalTables}` : '—',
          totalRecords: dbStats?.totalRecords ? (dbStats.totalRecords >= 1000 ? `${(dbStats.totalRecords / 1000).toFixed(1)}K` : `${dbStats.totalRecords}`) : '—',
        });
      } catch (err) {
        console.error('MetricsGrid load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const metrics = [
    { icon: Users,      label: 'Total Customers',  value: stats.totalCustomers,  color: 'from-blue-500',   trend: '+12%' },
    { icon: Package,    label: 'Active Bookings',  value: stats.activeBookings,  color: 'from-purple-500', trend: '+8%'  },
    { icon: MapPin,     label: 'Destinations',     value: stats.destinations,    color: 'from-green-500',  trend: 'Full' },
    { icon: Calendar,   label: 'Tour Packages',    value: stats.tourPackages,    color: 'from-pink-500',   trend: 'Ready'},
    { icon: Zap,        label: 'Database Tables',  value: stats.databaseTables,  color: 'from-amber-500',  trend: 'Live' },
    { icon: TrendingUp, label: 'Data Records',     value: stats.totalRecords,    color: 'from-cyan-500',   trend: '+5%'  },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <div key={i} className="card-hover group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${metric.color} to-slate-600 rounded-lg text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-green-400">{metric.trend}</span>
            </div>
            <div className="text-slate-400 text-sm mb-2">{metric.label}</div>
            <div className={`text-3xl font-bold text-white ${loading ? 'animate-pulse' : ''}`}>
              {metric.value}
            </div>
            <div className="h-1 w-full bg-slate-700 rounded-full mt-4">
              <div className={`h-1 bg-gradient-to-r ${metric.color} rounded-full transition-all duration-700`} style={{ width: loading ? '30%' : '100%' }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
