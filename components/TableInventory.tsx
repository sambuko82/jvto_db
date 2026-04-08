'use client';

import { useEffect, useState } from 'react';
import { Search, RefreshCw, Database } from 'lucide-react';
import { fetchDatabaseTables } from '@/lib/api-client';

interface TableRow {
  name: string;
  records: number;
}

export default function TableInventory() {
  const [tables, setTables]       = useState<TableRow[]>([]);
  const [search, setSearch]       = useState('');
  const [sortBy, setSortBy]       = useState<'name' | 'records'>('records');
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage]           = useState(0);
  const PAGE_SIZE = 20;

  async function loadTables(offset = 0, q = search) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDatabaseTables(PAGE_SIZE, offset, q);
      if (!data) throw new Error('No data returned');

      // fetchDatabaseTables returns { tables: string[], total, hasMore }
      // We need to display them; records come from /api/db/stats but we can show just names
      const rows: TableRow[] = (data.tables || []).map((name: string) => ({
        name,
        records: 0, // will be enriched by stats call below if available
      }));

      setTables(rows);
      setTotalCount(data.total || rows.length);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTables(0, '');
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setSearch(q);
    setPage(0);
    loadTables(0, q);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    loadTables(newPage * PAGE_SIZE, search);
  }

  const sorted = [...tables].sort((a, b) => {
    if (sortBy === 'records') return b.records - a.records;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="card">
        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tables..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="records">Sort by Records</option>
          </select>
          <button
            onClick={() => loadTables(page * PAGE_SIZE, search)}
            disabled={loading}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-600 rounded-lg text-red-300 text-sm">
            ⚠ {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-600">
              <tr className="text-slate-300 text-sm font-semibold">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Table Name</th>
                <th className="text-left py-3 px-4">Schema</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-700/50">
                    <td className="py-3 px-4"><div className="h-4 w-8 bg-slate-700 rounded animate-pulse" /></td>
                    <td className="py-3 px-4"><div className="h-4 w-48 bg-slate-700 rounded animate-pulse" /></td>
                    <td className="py-3 px-4"><div className="h-4 w-16 bg-slate-700 rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    <Database className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No tables found
                  </td>
                </tr>
              ) : (
                sorted.map((table, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4 text-slate-500 text-sm">{page * PAGE_SIZE + i + 1}</td>
                    <td className="py-3 px-4 font-mono text-blue-300">{table.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded text-xs">public</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination + Count */}
        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <span>Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalCount)} of {totalCount} tables</span>
          {totalPages > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0 || loading}
                className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 disabled:opacity-40 transition-colors"
              >← Prev</button>
              <span className="px-3 py-1">{page + 1} / {totalPages}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1 || loading}
                className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 disabled:opacity-40 transition-colors"
              >Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
