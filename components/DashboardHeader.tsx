import { Database, Server, Zap } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="border-b border-slate-700/50 backdrop-blur-xl bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                JVTO Unified Dashboard
              </h1>
            </div>
            <p className="text-slate-400">Database Mirror, Backoffice & SSOT Integration</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-400 font-semibold">
                <Zap className="w-4 h-4" />
                Live
              </div>
              <p className="text-sm text-slate-400">Production Ready</p>
            </div>
            <div className="w-px bg-slate-700"></div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-400 font-semibold">
                <Server className="w-4 h-4" />
                95+ Tables
              </div>
              <p className="text-sm text-slate-400">1.2K Records</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {[
            { label: 'Customers', value: '442', color: 'from-blue-500 to-blue-600' },
            { label: 'Bookings', value: '415', color: 'from-purple-500 to-purple-600' },
            { label: 'Packages', value: '28', color: 'from-pink-500 to-pink-600' },
            { label: 'Destinations', value: '10', color: 'from-green-500 to-green-600' },
            { label: 'Team Members', value: '23', color: 'from-amber-500 to-amber-600' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 text-white`}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
