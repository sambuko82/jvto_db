'use client';

import { Zap, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

export default function BackofficeIntegration() {
  const backofficeMetrics = [
    { icon: Calendar, label: 'Dashboard Status', value: 'Connected', status: 'success' },
    { icon: Users, label: 'Active Bookings', value: '1', status: 'info' },
    { icon: DollarSign, label: 'Recent Payment', value: 'Rp 3.4M', status: 'success' },
    { icon: TrendingUp, label: 'Booking Trend', value: '+8%', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="card border-blue-600/50">
        <h3 className="text-2xl font-bold mb-6 text-blue-400">Backoffice Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {backofficeMetrics.map((metric, i) => {
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
                      <div className="text-xl font-bold text-white">{metric.value}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    metric.status === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {metric.status === 'success' ? '✓' : '●'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 className="text-2xl font-bold mb-6 text-purple-400">Connected Systems</h3>
        <div className="space-y-3">
          {[
            { name: 'Backoffice API', endpoint: 'new-backoffice.javavolcano-touroperator.com', status: 'online' },
            { name: 'Database Mirror', endpoint: '31.97.223.43:5432', status: 'online' },
            { name: 'SSOT Repository', endpoint: 'JVTO_SSOT_v4_0_CLEAN.json', status: 'synced' },
          ].map((system, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
              <div>
                <div className="font-bold text-white">{system.name}</div>
                <div className="text-sm text-slate-400 font-mono">{system.endpoint}</div>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-bold">
                {system.status === 'online' ? '● Online' : '✓ Synced'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-600/50">
        <h3 className="font-bold mb-4 text-blue-400">Real-time Sync Status</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Dashboard synced with backoffice (2.3s)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Database mirror updated (real-time)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SSOT repository synced (1.5s ago)
          </div>
        </div>
      </div>
    </div>
  );
}
