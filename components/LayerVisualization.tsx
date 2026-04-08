'use client';

import { useState } from 'react';

interface Layer {
  name: string;
  emoji: string;
  status: 'live' | 'planned' | 'future';
  description: string;
  tables: string[];
  color: string;
}

const layers: Layer[] = [
  {
    name: 'Website',
    emoji: '🌐',
    status: 'live',
    description: 'Public-facing tour operator website',
    tables: ['packages', 'destinations', 'routes', 'hotels', 'reviews', 'assets', 'content_pages'],
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'CMS System',
    emoji: '📝',
    status: 'planned',
    description: 'Content management for editors',
    tables: ['content_pages', 'blogs', 'knowledge_bases', 'documents', 'assets'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'CRM System',
    emoji: '👥',
    status: 'planned',
    description: 'Customer relationship management',
    tables: ['customers', 'bookings', 'booking_payment_histories', 'booking_whatsapp_logs'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Ads & Marketing',
    emoji: '📊',
    status: 'planned',
    description: 'Ad campaign management and tracking',
    tables: ['ad_campaigns', 'ad_groups', 'ad_creatives', 'conversion_events'],
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: 'Customer Portal',
    emoji: '🔐',
    status: 'future',
    description: 'Post-booking customer experience',
    tables: ['customers', 'bookings', 'booking_itineraries', 'booking_hotels'],
    color: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Operations',
    emoji: '⚙️',
    status: 'future',
    description: 'Internal operations management',
    tables: ['bookings', 'crew_members', 'booking_logistics', 'booking_hotels'],
    color: 'from-red-500 to-red-600',
  },
];

export default function LayerVisualization() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {layers.map((layer) => (
          <div
            key={layer.name}
            className={`bg-gradient-to-br ${layer.color} rounded-lg p-6 text-white cursor-pointer transition-all hover:shadow-lg hover:shadow-slate-900/50`}
            onClick={() => setExpandedLayer(expandedLayer === layer.name ? null : layer.name)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{layer.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">{layer.name}</h3>
                  <p className="text-sm opacity-90">{layer.description}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                layer.status === 'live'
                  ? 'bg-green-900 text-green-200'
                  : layer.status === 'planned'
                  ? 'bg-blue-900 text-blue-200'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {layer.status === 'live' ? '✓ Live' : layer.status === 'planned' ? '🔄 Planned' : '📋 Future'}
              </span>
            </div>

            {expandedLayer === layer.name && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-bold mb-3">Tables:</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.tables.map((table) => (
                    <span
                      key={table}
                      className="px-3 py-1 bg-white/20 rounded text-sm font-mono"
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

      {/* Architecture Stack */}
      <div className="card mt-8">
        <h3 className="text-2xl font-bold mb-8 text-blue-400">System Stack (Top to Bottom)</h3>
        <div className="space-y-4">
          {layers.map((layer, index) => (
            <div key={layer.name} className="relative">
              <div className={`bg-gradient-to-r ${layer.color} rounded-lg p-4 text-white`}>
                <div className="font-bold">{index + 1}. {layer.emoji} {layer.name}</div>
                <div className="text-sm opacity-90">{layer.description}</div>
              </div>
              {index < layers.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-slate-500">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
