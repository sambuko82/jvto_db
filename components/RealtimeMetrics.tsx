'use client';

import { Activity, Zap } from 'lucide-react';

export default function RealtimeMetrics() {
  return (
    <div className="card bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-600/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cyan-400">Live Metrics</h3>
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="font-semibold">Real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Database Connections', value: '12', unit: 'active', color: 'from-blue-500' },
          { label: 'API Requests/min', value: '234', unit: 'req/min', color: 'from-green-500' },
          { label: 'Backoffice Users', value: '3', unit: 'online', color: 'from-purple-500' },
          { label: 'System Health', value: '99.9', unit: '%', color: 'from-green-500' },
        ].map((metric, i) => (
          <div key={i} className={`bg-gradient-to-br ${metric.color} to-slate-700 rounded-lg p-4 text-white`}>
            <div className="text-3xl font-bold">{metric.value}</div>
            <div className="text-sm opacity-80 mt-1">{metric.label}</div>
            <div className="text-xs opacity-60 mt-2">{metric.unit}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="font-bold mb-3 text-slate-300">Recent Activity</h4>
        <div className="space-y-2 text-sm text-slate-400">
          {[
            '✓ Dashboard loaded - 2.3s',
            '✓ Database synced - 1.5s ago',
            '✓ Backoffice connected - 3s ago',
            '✓ SSOT updated - 5s ago',
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
