'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const tableData = [
  { name: 'customers', records: 442, type: 'core', category: 'Customer Data' },
  { name: 'bookings', records: 415, type: 'operations', category: 'Operations' },
  { name: 'packages', records: 28, type: 'product', category: 'Products' },
  { name: 'reviews', records: 217, type: 'content', category: 'Content' },
  { name: 'package_faqs', records: 985, type: 'product', category: 'Products' },
  { name: 'destinations', records: 10, type: 'product', category: 'Products' },
  { name: 'hotels', records: 23, type: 'product', category: 'Products' },
  { name: 'crew_members', records: 23, type: 'core', category: 'Operations' },
  { name: 'assets', records: 154, type: 'content', category: 'Content' },
  { name: 'content_pages', records: 60, type: 'content', category: 'Content' },
  { name: 'package_prices', records: 180, type: 'product', category: 'Products' },
  { name: 'knowledge_bases', records: 38, type: 'content', category: 'Content' },
];

export default function TableInventory() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'records'>('records');

  const filtered = tableData
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'records') return b.records - a.records;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="records">Sort by Records</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-600">
              <tr className="text-slate-300 text-sm font-semibold">
                <th className="text-left py-3 px-4">Table Name</th>
                <th className="text-right py-3 px-4">Records</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((table, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-blue-300">{table.name}</td>
                  <td className="py-3 px-4 text-right font-bold text-amber-300">
                    {table.records.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded text-xs">
                      {table.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{table.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-slate-400">
          Showing {filtered.length} of {tableData.length} tables
        </div>
      </div>
    </div>
  );
}
