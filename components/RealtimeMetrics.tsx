'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { fetchHealth } from '@/lib/api-client';
import { HealthStatus } from '@/lib/types';

interface LogEntry {
  text: string;
  ok: boolean;
  time: string;
}

export default function RealtimeMetrics() {
  const [health, setHealth]     = useState<HealthStatus | null>(null);
  const [loading, setLoading]   = useState(true);
  const [log, setLog]           = useState<LogEntry[]>([]);

  function pushLog(text: string, ok: boolean) {
    const time = new Date().toLocaleTimeString();
    setLog(prev => [{ text, ok, time }, ...prev].slice(0, 8));
  }

  async function refresh() {
    try {
      const h = await fetchHealth();
      setHealth(h);

      if (h) {
        pushLog(`Health check: ${h.status}`, h.status !== 'unhealthy');
        if (h.postgres.connected) pushLog(`PostgreSQL: ${h.postgres.latency}ms latency`, true);
        else pushLog(`PostgreSQL: ${h.postgres.error || 'unreachable'}`, false);
        if (h.mysql.connected) pushLog(`MySQL: ${h.mysql.latency}ms latency`, true);
        else pushLog(`MySQL: ${h.mysql.error || 'unreachable'}`, false);
      }
    } catch (err) {
      pushLog('Health check failed', false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30_000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  const liveMetrics = [
    {
      label: 'PostgreSQL',
      value: loading ? '...' : health?.postgres.connected ? `${health.postgres.latency ?? '—'}ms` : 'Down',
      unit: 'latency',
      color: health?.postgres.connected ? 'from-blue-500' : 'from-red-500',
    },
    {
      label: 'MySQL Backoffice',
      value: loading ? '...' : health?.mysql.connected ? `${health.mysql.latency ?? '—'}ms` : 'Down',
      unit: 'latency',
      color: health?.mysql.connected ? 'from-green-500' : 'from-red-500',
    },
    {
      label: 'SSOT Cache',
      value: loading ? '...' : health?.ssot.loaded ? 'Loaded' : 'Not Ready',
      unit: health?.ssot.lastSync ? new Date(health.ssot.lastSync).toLocaleDateString() : '',
      color: health?.ssot.loaded ? 'from-purple-500' : 'from-amber-500',
    },
    {
      label: 'System Health',
      value: loading ? '...' : health?.status === 'healthy' ? '100%' : health?.status === 'degraded' ? '~80%' : 'Critical',
      unit: health?.status || 'checking',
      color: health?.status === 'healthy' ? 'from-green-500' : health?.status === 'degraded' ? 'from-amber-500' : 'from-red-500',
    },
  ];

  const overallOk = !loading && health?.status !== 'unhealthy';

  return (
    <div className="card bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-600/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cyan-400">Live System Health</h3>
        <div className="flex items-center gap-2">
          {!loading && (
            overallOk
              ? <CheckCircle className="w-5 h-5 text-green-400" />
              : <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <Activity className={`w-5 h-5 ${overallOk ? 'text-cyan-400 animate-pulse' : 'text-red-400'}`} />
          <span className={`font-semibold text-sm ${overallOk ? 'text-cyan-400' : 'text-red-400'}`}>
            {loading ? 'Checking...' : health?.status?.toUpperCase() || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {liveMetrics.map((metric, i) => (
          <div key={i} className={`bg-gradient-to-br ${metric.color} to-slate-700 rounded-lg p-4 text-white`}>
            <div className={`text-3xl font-bold ${loading ? 'animate-pulse' : ''}`}>{metric.value}</div>
            <div className="text-sm opacity-80 mt-1">{metric.label}</div>
            <div className="text-xs opacity-60 mt-2 truncate">{metric.unit}</div>
          </div>
        ))}
      </div>

      {/* Activity log */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="font-bold mb-3 text-slate-300">Activity Log</h4>
        {log.length === 0 ? (
          <p className="text-slate-500 text-sm">Waiting for data...</p>
        ) : (
          <div className="space-y-2 text-sm text-slate-400 max-h-36 overflow-y-auto">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                {entry.ok
                  ? <Zap className="w-4 h-4 text-green-400 shrink-0" />
                  : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                }
                <span className={entry.ok ? 'text-slate-300' : 'text-red-300'}>{entry.text}</span>
                <span className="ml-auto text-slate-500 text-xs">{entry.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
