export default function DataFlowChart() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-2xl font-bold mb-8 text-green-400">Data Flow Architecture</h3>

        <div className="space-y-6">
          {[
            {
              title: 'SSOT → CMS',
              description: 'Content auto-syncs from SSOT JSON to CMS tables',
              frequency: 'Daily 2 AM',
              icon: '📄',
            },
            {
              title: 'CMS → Ads',
              description: 'Published content auto-generates ad campaign suggestions',
              frequency: 'Real-time',
              icon: '📝',
            },
            {
              title: 'Ads → Attribution',
              description: 'Conversion pixel tracks bookings from ads campaigns',
              frequency: 'Real-time',
              icon: '📊',
            },
            {
              title: 'Attribution → CRM',
              description: 'ROI data feeds back to customer segmentation',
              frequency: 'Daily',
              icon: '👥',
            },
            {
              title: 'CRM → SSOT',
              description: 'Top-performing ad copy exported to SSOT narrative',
              frequency: 'Weekly',
              icon: '⭐',
            },
          ].map((flow, i) => (
            <div key={i} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{flow.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-white mb-2">{flow.title}</h4>
                  <p className="text-slate-300 mb-3">{flow.description}</p>
                  <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-semibold">
                    {flow.frequency}
                  </div>
                </div>
              </div>
              {i < 4 && <div className="mt-6 text-center text-slate-400">↓</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/50">
        <h3 className="font-bold mb-4 text-green-400">Integration Layers</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Data Input', count: 3, color: 'text-blue-400' },
            { label: 'Processing', count: 5, color: 'text-purple-400' },
            { label: 'Output', count: 2, color: 'text-green-400' },
          ].map((layer, i) => (
            <div key={i} className="p-4">
              <div className={`text-3xl font-bold ${layer.color}`}>{layer.count}</div>
              <div className="text-sm text-slate-400 mt-2">{layer.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
