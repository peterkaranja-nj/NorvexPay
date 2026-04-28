'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Download, SlidersHorizontal, ChevronLeft, ChevronRight, Eye, RotateCcw } from 'lucide-react'

const allTransactions = Array.from({ length: 40 }, (_, i) => ({
  id: `pay_${Math.random().toString(36).slice(2, 10)}`,
  customer: ['Amara Kofi', 'Sofia Reyes', 'James T.', 'Priya Nair', 'Chen Wei', 'Elena V.', 'David O.', 'Aisha P.'][i % 8],
  amount: `$${(Math.random() * 5000 + 100).toFixed(2)}`,
  currency: ['USD', 'GBP', 'EUR', 'NGN', 'KES'][i % 5],
  method: ['Visa •••• 4821', 'MC •••• 7293', 'Amex •••• 3394', 'Bank Transfer', 'M-Pesa'][i % 5],
  country: ['🇳🇬', '🇬🇧', '🇺🇸', '🇸🇬', '🇮🇳'][i % 5],
  status: ['succeeded', 'succeeded', 'succeeded', 'failed', 'pending', 'refunded'][i % 6] as string,
  date: `Apr ${28 - Math.floor(i / 3)}, 2026`,
}))

const statusConfig = {
  succeeded: { color: 'var(--success)', bg: 'rgba(34,197,94,0.12)' },
  failed: { color: 'var(--danger)', bg: 'rgba(239,68,68,0.12)' },
  pending: { color: 'var(--warning)', bg: 'rgba(245,158,11,0.12)' },
  refunded: { color: 'var(--muted)', bg: 'rgba(107,122,153,0.15)' },
}

export default function TransactionsPage() {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)

  const perPage = 20
  const filtered = allTransactions.filter(t => statusFilter === 'All' || t.status === statusFilter.toLowerCase())
  const pageData = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  return (
    <DashboardLayout title="Transactions">
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          {['All', 'Succeeded', 'Failed', 'Pending', 'Refunded'].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: statusFilter === s ? 'var(--bg-float)' : 'transparent',
                color: statusFilter === s ? 'var(--text)' : 'var(--muted)',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <SlidersHorizontal size={15} /> Filters
        </button>

        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm ml-auto"
          style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {showFilters && (
        <div className="grid sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <input placeholder="Min amount" className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          <input placeholder="Max amount" className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          <select className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            <option>All currencies</option>
            <option>USD</option><option>GBP</option><option>EUR</option>
          </select>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['TXN ID', 'Customer', 'Amount', 'Currency', 'Method', 'Country', 'Status', 'Date', 'Actions'].map(col => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort(col.toLowerCase())}
                  >
                    {col} {sortCol === col.toLowerCase() && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map(tx => (
                <tr
                  key={tx.id}
                  className="border-b transition-all"
                  style={{ borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-float)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td className="px-4 py-3"><span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{tx.id.slice(0, 12)}...</span></td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--text)' }}>{tx.customer}</td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold" style={{ color: 'var(--text)' }}>{tx.amount}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{tx.currency}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{tx.method}</td>
                  <td className="px-4 py-3 text-center">{tx.country}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusConfig[tx.status as keyof typeof statusConfig]?.bg, color: statusConfig[tx.status as keyof typeof statusConfig]?.color }}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{tx.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-float)', color: 'var(--muted)' }}><Eye size={13} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-float)', color: 'var(--muted)' }}><RotateCcw size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} transactions
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-float)', color: page === 1 ? 'var(--muted)' : 'var(--text)' }}>
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setPage(i + 1)} className="w-8 h-8 rounded-lg text-xs font-medium" style={{ background: page === i + 1 ? 'var(--accent)' : 'var(--bg-float)', color: page === i + 1 ? '#000' : 'var(--muted)' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-float)', color: page === totalPages ? 'var(--muted)' : 'var(--text)' }}>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
