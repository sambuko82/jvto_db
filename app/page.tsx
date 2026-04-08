'use client';

import { useEffect, useState } from 'react';
import { Database, BarChart3, Zap, TrendingUp, Users, Package, Calendar, MapPin } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import MetricsGrid from '@/components/MetricsGrid';
import LayerVisualization from '@/components/LayerVisualization';
import DataFlowChart from '@/components/DataFlowChart';
import TableInventory from '@/components/TableInventory';
import BackofficeIntegration from '@/components/BackofficeIntegration';
import RealtimeMetrics from '@/components/RealtimeMetrics';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'tables' | 'backoffice' | 'dataflow'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
      setDashboardData({
        totalTables: 95,
        totalRecords: 1247,
        customers: 442,
        bookings: 415,
        packages: 28,
        destinations: 10,
      });
    }, 500);
  }, []);

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: BarChart3 },
    { id: 'layers', label: '🏗️ Architecture', icon: Database },
    { id: 'tables', label: '📋 Inventory', icon: Package },
    { id: 'backoffice', label: '⚙️ Backoffice', icon: Zap },
    { id: 'dataflow', label: '🔗 Data Flow', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <DashboardHeader />

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon as any;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-slate-400">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-slide-in">
                <MetricsGrid data={dashboardData} />
                <RealtimeMetrics />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card">
                    <h3 className="text-xl font-bold mb-6 text-blue-400">Database Readiness</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Website Layer', progress: 100, status: 'Live' },
                        { label: 'CMS/CRM/Ads Foundation', progress: 75, status: 'Planned' },
                        { label: 'Customer Portal', progress: 50, status: 'Future' },
                        { label: 'Operations Dashboard', progress: 50, status: 'Future' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-2">
                            <span className="text-slate-300">{item.label}</span>
                            <span className={`badge ${item.progress === 100 ? 'badge-success' : item.progress >= 75 ? 'badge-info' : 'badge-warning'}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                item.progress === 100
                                  ? 'bg-green-500'
                                  : item.progress >= 75
                                  ? 'bg-blue-500'
                                  : 'bg-yellow-500'
                              }`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <h3 className="text-xl font-bold mb-6 text-purple-400">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="metric-card">
                        <div className="text-sm text-slate-400 mb-1">Database Tables</div>
                        <div className="stat-value">95+</div>
                      </div>
                      <div className="metric-card">
                        <div className="text-sm text-slate-400 mb-1">Total Records</div>
                        <div className="stat-value">1.2K</div>
                      </div>
                      <div className="metric-card">
                        <div className="text-sm text-slate-400 mb-1">Bookings</div>
                        <div className="stat-value">415</div>
                      </div>
                      <div className="metric-card">
                        <div className="text-sm text-slate-400 mb-1">Customers</div>
                        <div className="stat-value">442</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Architecture Tab */}
            {activeTab === 'layers' && (
              <div className="animate-slide-in">
                <LayerVisualization />
              </div>
            )}

            {/* Tables Tab */}
            {activeTab === 'tables' && (
              <div className="animate-slide-in">
                <TableInventory />
              </div>
            )}

            {/* Backoffice Tab */}
            {activeTab === 'backoffice' && (
              <div className="animate-slide-in">
                <BackofficeIntegration />
              </div>
            )}

            {/* Data Flow Tab */}
            {activeTab === 'dataflow' && (
              <div className="animate-slide-in">
                <DataFlowChart />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>JVTO Unified Dashboard | Database Mirror + Backoffice + SSOT Integration</p>
          <p className="mt-2">Status: Production Ready | Deployment: Vercel</p>
        </div>
      </footer>
    </div>
  );
}
