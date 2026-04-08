import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area, AreaChart
} from 'recharts';

interface Layer {
  id: string;
  name: string;
  description: string;
  tables: string[];
  status: 'live' | 'planned' | 'future';
  priority: 'P0' | 'P1' | 'P2';
}

interface TableInfo {
  name: string;
  records: number;
  type: 'core' | 'product' | 'operations' | 'content' | 'crm' | 'marketing' | 'config';
  layer: string;
  description: string;
}

const DBMirrorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'tables' | 'architecture'>('overview');
  const [selectedLayer, setSelectedLayer] = useState<string>('');

  const layers: Layer[] = [
    {
      id: 'website',
      name: '🌐 Website',
      description: 'Public tour operator website',
      tables: ['packages', 'package_prices', 'destinations', 'routes', 'hotels', 'reviews', 'assets', 'content_pages'],
      status: 'live',
      priority: 'P0',
    },
    {
      id: 'cms',
      name: '📝 CMS System',
      description: 'Content management for editors',
      tables: ['content_pages', 'blogs', 'knowledge_bases', 'documents', 'assets', 'web_metadata'],
      status: 'planned',
      priority: 'P1',
    },
    {
      id: 'crm',
      name: '👥 CRM System',
      description: 'Customer relationship management',
      tables: ['customers', 'bookings', 'booking_payment_histories', 'booking_whatsapp_logs', 'reviews'],
      status: 'planned',
      priority: 'P1',
    },
    {
      id: 'ads',
      name: '📊 Ads & Marketing',
      description: 'Ad campaign management & tracking',
      tables: ['packages', 'customers', 'bookings', 'reviews', 'order_channels', 'discounts'],
      status: 'planned',
      priority: 'P1',
    },
    {
      id: 'portal',
      name: '🔐 Customer Portal',
      description: 'Post-booking customer experience',
      tables: ['customers', 'bookings', 'booking_itineraries', 'booking_hotels', 'booking_logistics', 'crew_members'],
      status: 'future',
      priority: 'P2',
    },
    {
      id: 'operations',
      name: '⚙️ Operations Dashboard',
      description: 'Internal ops management',
      tables: ['bookings', 'crew_members', 'booking_logistics', 'booking_hotels', 'booking_finances'],
      status: 'future',
      priority: 'P2',
    },
  ];

  const tableInventory: TableInfo[] = [
    { name: 'customers', records: 442, type: 'core', layer: 'all', description: 'Customer data' },
    { name: 'bookings', records: 415, type: 'operations', layer: 'crm', description: 'Booking records' },
    { name: 'reviews', records: 217, type: 'content', layer: 'website', description: 'Customer reviews' },
    { name: 'package_faqs', records: 985, type: 'product', layer: 'website', description: 'Package FAQs' },
    { name: 'package_includes', records: 306, type: 'product', layer: 'website', description: 'Package inclusions' },
    { name: 'package_prices', records: 180, type: 'product', layer: 'website', description: 'Pricing tiers' },
    { name: 'package_itinerary_days', records: 99, type: 'product', layer: 'website', description: 'Day-by-day itineraries' },
    { name: 'faqs', records: 95, type: 'content', layer: 'cms', description: 'General FAQs' },
    { name: 'knowledge_bases', records: 38, type: 'content', layer: 'cms', description: 'Knowledge base articles' },
    { name: 'assets', records: 154, type: 'content', layer: 'cms', description: 'Media files' },
    { name: 'content_pages', records: 60, type: 'content', layer: 'cms', description: 'Website pages' },
    { name: 'destinations', records: 10, type: 'product', layer: 'website', description: 'Travel destinations' },
    { name: 'routes', records: 43, type: 'product', layer: 'website', description: 'Travel routes' },
    { name: 'hotels', records: 23, type: 'product', layer: 'website', description: 'Hotel options' },
    { name: 'crew_members', records: 23, type: 'core', layer: 'operations', description: 'Team members' },
    { name: 'documents', records: 29, type: 'content', layer: 'cms', description: 'Downloadable docs' },
    { name: 'packages', records: 28, type: 'product', layer: 'website', description: 'Tour packages' },
    { name: 'organization_profile', records: 1, type: 'config', layer: 'all', description: 'Company info' },
  ];

  const layerStats = [
    { name: 'Website', tables: 8, status: 'Live', color: '#10b981' },
    { name: 'CMS', tables: 6, status: 'Planned', color: '#3b82f6' },
    { name: 'CRM', tables: 5, status: 'Planned', color: '#8b5cf6' },
    { name: 'Ads', tables: 6, status: 'Planned', color: '#f59e0b' },
    { name: 'Portal', tables: 6, status: 'Future', color: '#6366f1' },
    { name: 'Operations', tables: 5, status: 'Future', color: '#ec4899' },
  ];

  const recordDistribution = [
    { name: 'Package FAQs', value: 985, color: '#f59e0b' },
    { name: 'Inclusions', value: 306, color: '#10b981' },
    { name: 'Prices', value: 180, color: '#3b82f6' },
    { name: 'Itinerary Days', value: 99, color: '#8b5cf6' },
    { name: 'FAQs', value: 95, color: '#ec4899' },
    { name: 'Other', value: 335, color: '#6b7280' },
  ];

  const typeDistribution = tableInventory.reduce((acc, table) => {
    const existing = acc.find(t => t.name === table.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: table.type, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            JVTO Database Mirror Dashboard
          </h1>
          <p className="text-xl text-slate-300">
            Complete analysis of 95+ tables | 1000+ records | 6 architectural layers
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-400">95+</div>
            <div className="text-slate-300">Total Tables</div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-400">442</div>
            <div className="text-slate-300">Customers</div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-400">415</div>
            <div className="text-slate-300">Bookings</div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-3xl font-bold text-amber-400">28</div>
            <div className="text-slate-300">Packages</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'layers', label: '🏗️ Layers' },
            { id: 'tables', label: '📋 Tables' },
            { id: 'architecture', label: '🔗 Architecture' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Layer Status */}
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-400">Layer Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={layerStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar dataKey="tables" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Record Distribution */}
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-purple-400">Top Tables by Record Count</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={recordDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {recordDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2 text-sm">
                  {recordDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-300">{item.name}: {item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Database Readiness</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Website Layer</div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Live Production</p>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">CMS/CRM/Ads Foundation</div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-blue-400 font-bold">75%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Schema ready, UI needed</p>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Customer Portal</div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-purple-400 font-bold">50%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Tables exist, UI TBD</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="space-y-6">
            {layers.map(layer => (
              <div
                key={layer.id}
                className={`bg-slate-700/50 border rounded-lg p-6 cursor-pointer transition-all hover:border-blue-500/50 ${
                  selectedLayer === layer.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-600'
                }`}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? '' : layer.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{layer.name}</h3>
                    <p className="text-slate-300">{layer.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      layer.status === 'live'
                        ? 'bg-green-500/20 text-green-400'
                        : layer.status === 'planned'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-500/20 text-slate-300'
                    }`}>
                      {layer.status === 'live' ? '✅ Live' : layer.status === 'planned' ? '🔄 Planned' : '📋 Future'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-600 text-slate-200">
                      {layer.priority}
                    </span>
                  </div>
                </div>

                {selectedLayer === layer.id && (
                  <div className="mt-6 pt-6 border-t border-slate-600">
                    <h4 className="font-bold text-slate-300 mb-3">Tables:</h4>
                    <div className="flex flex-wrap gap-2">
                      {layer.tables.map(table => (
                        <span
                          key={table}
                          className="px-3 py-1 bg-slate-600/50 text-slate-200 rounded text-sm border border-slate-500"
                        >
                          {table}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-slate-300 font-semibold">Table Name</th>
                    <th className="px-6 py-4 text-right text-slate-300 font-semibold">Records</th>
                    <th className="px-6 py-4 text-left text-slate-300 font-semibold">Type</th>
                    <th className="px-6 py-4 text-left text-slate-300 font-semibold">Layer</th>
                    <th className="px-6 py-4 text-left text-slate-300 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {tableInventory
                    .sort((a, b) => b.records - a.records)
                    .map((table, i) => (
                      <tr
                        key={i}
                        className={`border-b border-slate-600 hover:bg-slate-600/30 transition ${
                          i % 2 === 0 ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        <td className="px-6 py-4 font-mono text-blue-300">{table.name}</td>
                        <td className="px-6 py-4 text-right font-bold text-amber-300">
                          {table.records.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-slate-600/50 text-slate-200 rounded text-xs">
                            {table.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{table.layer}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{table.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8">
            {/* Architecture Diagram */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-8 text-pink-400">System Architecture</h2>
              <div className="space-y-8">
                {/* Layer Stack */}
                <div className="space-y-4">
                  {[
                    { name: 'Customer Portal & Operations', color: 'from-pink-500 to-rose-500', tables: 'Booking, Crew, Hotels, Payment, Logistics' },
                    { name: 'Marketing Layer (Ads, Analytics, Campaigns)', color: 'from-amber-500 to-orange-500', tables: 'Ads, Audience, Conversions, Performance' },
                    { name: 'CRM Layer (Customers, Leads, Sales)', color: 'from-purple-500 to-violet-500', tables: 'Customers, Bookings, Communications' },
                    { name: 'CMS Layer (Content, Media, Documentation)', color: 'from-blue-500 to-cyan-500', tables: 'Pages, Blogs, Assets, Knowledge Base' },
                    { name: 'Website Layer (Products, Destinations, Reviews)', color: 'from-green-500 to-emerald-500', tables: 'Packages, Reviews, Assets, Content' },
                    { name: 'Foundation Layer (Database Core)', color: 'from-slate-500 to-slate-600', tables: 'PostgreSQL, 95+ Tables, Indexes' },
                  ].map((layer, i) => (
                    <div key={i} className={`bg-gradient-to-r ${layer.color} rounded-lg p-6 text-white shadow-lg`}>
                      <h3 className="font-bold text-lg mb-2">{layer.name}</h3>
                      <p className="text-sm opacity-90">{layer.tables}</p>
                    </div>
                  ))}
                </div>

                {/* Data Flow */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6 text-cyan-400">Key Data Flows</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-sm"><span className="font-bold text-blue-400">SSOT JSON</span> → Auto-syncs to <span className="font-bold text-purple-400">CMS</span> (content, assets, narrative)</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-sm"><span className="font-bold text-purple-400">CMS</span> publishes content → <span className="font-bold text-amber-400">Website</span> displays + <span className="font-bold text-orange-400">Ads</span> suggests campaigns</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-sm"><span className="font-bold text-orange-400">Ads</span> pixel tracks conversions → <span className="font-bold text-purple-400">CRM</span> links to bookings → <span className="font-bold text-pink-400">Attribution</span> calculates ROI</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-sm"><span className="font-bold text-amber-400">Top Ad Copy</span> exported → <span className="font-bold text-blue-400">SSOT</span> updated → <span className="font-bold text-purple-400">CMS</span> uses for future content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Relationships */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Core Relationships</h2>
              <div className="font-mono text-sm text-slate-300 space-y-4">
                <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
                  <p><span className="text-blue-400">Customers (442)</span> → <span className="text-amber-400">Bookings (415)</span></p>
                  <p className="text-xs text-slate-400 mt-1">Each customer can have multiple bookings</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
                  <p><span className="text-amber-400">Bookings (415)</span> → <span className="text-purple-400">Packages (28)</span></p>
                  <p className="text-xs text-slate-400 mt-1">Each booking is for one package</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
                  <p><span className="text-purple-400">Packages (28)</span> → <span className="text-green-400">Destinations (10)</span>, <span className="text-orange-400">Prices (180)</span>, <span className="text-pink-400">Itineraries (99)</span></p>
                  <p className="text-xs text-slate-400 mt-1">Package has many pricing tiers, itinerary days, and destinations</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-600">
                  <p><span className="text-blue-400">Content (60)</span> → <span className="text-cyan-400">Assets (154)</span></p>
                  <p className="text-xs text-slate-400 mt-1">Content pages reference asset images</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-600 text-center text-slate-400 text-sm">
          <p>JVTO Database Mirror Analysis | Generated 2026-04-08</p>
          <p className="mt-2">Total Tables: 95+ | Records: 1000+ | Layers: 6 | Status: Production Ready</p>
        </div>
      </div>
    </div>
  );
};

export default DBMirrorDashboard;
