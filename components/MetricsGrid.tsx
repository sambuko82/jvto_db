import { TrendingUp, Users, Package, MapPin, Calendar, Zap } from 'lucide-react';

interface MetricsGridProps {
  data: any;
}

export default function MetricsGrid({ data }: MetricsGridProps) {
  const metrics = [
    { icon: Users, label: 'Total Customers', value: '442', color: 'from-blue-500', trend: '+12%' },
    { icon: Package, label: 'Active Bookings', value: '415', color: 'from-purple-500', trend: '+8%' },
    { icon: MapPin, label: 'Destinations', value: '10', color: 'from-green-500', trend: 'Full' },
    { icon: Calendar, label: 'Tour Packages', value: '28', color: 'from-pink-500', trend: 'Ready' },
    { icon: Zap, label: 'Database Tables', value: '95+', color: 'from-amber-500', trend: 'Live' },
    { icon: TrendingUp, label: 'Data Records', value: '1.2K', color: 'from-cyan-500', trend: '+5%' },
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
            <div className="text-3xl font-bold text-white">{metric.value}</div>
            <div className="h-1 w-full bg-slate-700 rounded-full mt-4">
              <div className={`h-1 bg-gradient-to-r ${metric.color} rounded-full`} style={{ width: '100%' }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
