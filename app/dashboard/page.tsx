'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { TrendingUp, Users, DollarSign, Wallet, ChevronRight, X, Copy, ExternalLink, AlertTriangle, Info } from 'lucide-react'

const mockTransactions = [
  { id: 'pay_3xK9pLm2', customer: 'Amara Kofi', amount: '$2,400.00', method: 'Visa •••• 4821', status: 'succeeded', date: 'Apr 28, 2026', country: '🇳🇬', email: 'amara@luminary.io', risk: 14 },
  { id: 'pay_7mL2qRn4', customer: 'Sofia Reyes', amount: '$1,850.00', method: 'MC •••• 7293', status: 'succeeded', date: 'Apr 28, 2026', country: '🇬🇧', email: 'sofia@meridian.bank', risk: 8 },
  { id: 'pay_2nR8vPk1', customer: 'James Thornton', amount: '$890.00', method: 'Amex •••• 3394', status: 'failed', date: 'Apr 27, 2026', country: '🇺🇸', email: 'james@swiftcart.io', risk: 72 },
  { id: 'pay_5kP3mQw7', customer: 'Priya Nair', amount: '$3,200.00', method: 'Visa •••• 9943', status: 'succeeded', date: 'Apr 27, 2026', country: '🇸🇬', email: 'priya@vaultpay.co', risk: 5 },
  { id: 'pay_9qW4rBt3', customer: 'Chen Wei', amount: '$560.00', method: 'MC •••• 2256', status: 'pending', date: 'Apr 27, 2026', country: '🇸🇬', email: 'chen@techco.sg', risk: 31 },
  { id: 'pay_1hJ6nFv8', customer: 'Elena Vasquez', amount: '$1,200.00', method: 'Bank Transfer', status: 'succeeded', date: 'Apr 26, 2026', country: '🇲🇽', email: 'elena@shop.mx', risk: 3 },
  { id: 'ref_4mP1nLk9', customer: 'David Okafor', amount: '-$120.00', method: 'Visa •••• 5571', status: 'refunded', date: 'Apr 26, 2026', country: '🇳🇬', email: 'david@co.ng', risk: 0 },
  { id: 'pay_6xT2wDs5', customer: 'Aisha Patel', amount: '$4,750.00', method: 'MC •••• 8891', status: 'succeeded', date: 'Apr 25, 2026', country: '🇮🇳', email: 'aisha@fintech.in', risk: 9 },
]

const statusConfig = {
  succeeded: { color: 'var(--success)', bg: 'rgba(34,197,94,0.12)', label: 'Succeeded' },
  failed: { color: 'var(--danger)', bg: 'rgba(239,68,68,0.12)', label: 'Failed' },
  pending: { color: 'var(--warning)', bg: 'rgba(245,158,11,0.12)', label: 'Pending' },
  refunded: { color: 'var(--muted)', bg: 'rgba(107,122,153,0.15)', label: 'Refunded' },
}

// Simple sparkline
function Sparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 80, h = 32
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Mini area chart
function RevenueChart({ period }: { period: string }) {
  const data = {
    '1W': [8200, 9400, 7800, 11200, 10500, 12400, 13800],
    '1M': Array.from({ length: 30 }, () => Math.floor(6000 + Math.random() * 8000)),
    '3M': Array.from({ length: 90 }, () => Math.floor(5000 + Math.random() * 10000)),
    '1Y': Array.from({ length: 12 }, () => Math.floor(50000 + Math.random() * 80000)),
  }[period] || []

  const max = Math.max(...data)
  const w = 800, h = 200
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - (v / max) * h * 0.85 - 10
    return `${x},${y}`
  })

  const path = `M ${pts.join(' L ')}`
  const area = `M 0,${h} L ${pts.join(' L ')} L ${w},${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height: '200px' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function TransactionDrawer({ tx, onClose }: { tx: typeof mockTransactions[0] | null, onClose: () => void }) {
  if (!tx) return null
  return (
    <>
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div
        className="fixed right-0 top-0 bottom-0 z-50 overflow-y-auto"
        style={{ width: '400px', background: 'var(--bg-raised)', borderLeft: '1px solid var(--border-bright)', animation: 'slideInRight 0.3s ease' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Transaction Details</h3>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}><X size={20} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount */}
          <div className="text-center py-4">
            <div className="font-mono text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>{tx.amount}</div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: statusConfig[tx.status as keyof typeof statusConfig]?.bg, color: statusConfig[tx.status as keyof typeof statusConfig]?.color }}
            >
              {statusConfig[tx.status as keyof typeof statusConfig]?.label}
            </span>
          </div>

          {/* ID */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-float)' }}>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{tx.id}</span>
            <button onClick={() => navigator.clipboard.writeText(tx.id)} style={{ color: 'var(--accent)' }}><Copy size={14} /></button>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>Timeline</p>
            {['Created', 'Authorized', 'Captured', 'Settled'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: i <= 3 ? 'var(--success)' : 'var(--bg-float)', border: '1px solid var(--border)' }}>
                  {i <= 3 && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1 flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text)' }}>{step}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>Apr 28, 2026</span>
                </div>
              </div>
            ))}
          </div>

          {/* Customer */}
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>Customer</p>
            <div className="space-y-2 text-sm" style={{ color: 'var(--text)' }}>
              <div className="flex justify-between"><span style={{ color: 'var(--muted)' }}>Name</span><span>{tx.customer}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted)' }}>Email</span><span className="font-mono text-xs">{tx.email}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted)' }}>Country</span><span>{tx.country}</span></div>
            </div>
          </div>

          {/* Risk score */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>Risk Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-float)' }}>
                <div className="h-full rounded-full" style={{
                  width: `${tx.risk}%`,
                  background: tx.risk > 60 ? 'var(--danger)' : tx.risk > 30 ? 'var(--warning)' : 'var(--success)',
                }} />
              </div>
              <span className="font-mono text-sm font-bold" style={{ color: tx.risk > 60 ? 'var(--danger)' : tx.risk > 30 ? 'var(--warning)' : 'var(--success)' }}>
                {tx.risk}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)' }}>
              Refund
            </button>
            <button className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              Flag for review
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function DashboardOverview() {
  const [period, setPeriod] = useState('1W')
  const [selectedTx, setSelectedTx] = useState<typeof mockTransactions[0] | null>(null)
  const [alerts, setAlerts] = useState([
    { type: 'warning', text: '1 webhook endpoint failing — Fix now →' },
    { type: 'info', text: 'KYC verification pending — Complete now →' },
  ])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const kpiData = [
    { title: 'Total Revenue', value: '$84,320', change: '+12.4%', up: true, icon: DollarSign, spark: [6000, 7200, 6800, 8400, 7900, 9200, 10800] },
    { title: 'Transactions', value: '1,842', change: '+8.1%', up: true, icon: TrendingUp, spark: [120, 145, 132, 168, 155, 178, 192] },
    { title: 'Active Customers', value: '3,201', change: '+5.3%', up: true, icon: Users, spark: [2800, 2900, 2950, 3000, 3050, 3150, 3201] },
    { title: 'Payout Balance', value: '$12,400', change: 'Next: Tomorrow 9AM', up: null, icon: Wallet, spark: [9000, 10200, 11400, 10800, 12000, 11600, 12400] },
  ]

  return (
    <DashboardLayout title="Overview">
      {/* Alerts */}
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 rounded-xl mb-4 text-sm"
          style={{
            background: alert.type === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)',
            border: `1px solid ${alert.type === 'warning' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'}`,
            color: alert.type === 'warning' ? 'var(--warning)' : '#60A5FA',
          }}
        >
          <div className="flex items-center gap-2">
            {alert.type === 'warning' ? <AlertTriangle size={15} /> : <Info size={15} />}
            {alert.text}
          </div>
          <button onClick={() => setAlerts(prev => prev.filter((_, j) => j !== i))} style={{ color: 'inherit', opacity: 0.6 }}>
            <X size={15} />
          </button>
        </div>
      ))}

      {/* Greeting + date range */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{greeting}, James.</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Here&apos;s your NorvexPay overview — last updated just now</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          {['Today', '7 days', '30 days', 'Custom'].map(p => (
            <button
              key={p}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: period === p ? 'var(--bg-float)' : 'transparent', color: period === p ? 'var(--text)' : 'var(--muted)' }}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiData.map(card => (
          <div
            key={card.title}
            className="p-5 rounded-2xl"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{card.title}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-dim)' }}>
                <card.icon size={16} style={{ color: 'var(--accent)' }} />
              </div>
            </div>
            <div className="font-mono text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>{card.value}</div>
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-medium"
                style={{ color: card.up === true ? 'var(--success)' : card.up === false ? 'var(--danger)' : 'var(--muted)' }}
              >
                {card.up === true && '↑ '}{card.up === false && '↓ '}{card.change}
              </span>
              <Sparkline data={card.spark} color="var(--accent)" />
            </div>
            {card.title === 'Payout Balance' && (
              <button className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--border-bright)' }}>
                Withdraw now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Revenue</h3>
          <div className="flex gap-1">
            {['1W', '1M', '3M', '1Y'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1 rounded-lg text-xs transition-all"
                style={{ background: period === p ? 'var(--accent-dim)' : 'transparent', color: period === p ? 'var(--accent)' : 'var(--muted)', border: period === p ? '1px solid var(--border-bright)' : '1px solid transparent' }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
          <RevenueChart period={period} />
        </div>
      </div>

      {/* Transactions Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Recent Transactions</h3>
          <button className="text-xs flex items-center gap-1" style={{ color: 'var(--accent)' }}>
            View all <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['TXN ID', 'Customer', 'Amount', 'Method', 'Status', 'Date'].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-semibold" style={{ color: 'var(--muted)' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map(tx => (
                <tr
                  key={tx.id}
                  className="border-b cursor-pointer transition-all"
                  style={{ borderColor: 'var(--border)' }}
                  onClick={() => setSelectedTx(tx)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-float)'
                    ;(e.currentTarget as HTMLElement).style.borderLeft = '3px solid var(--accent)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.borderLeft = 'none'
                  }}
                >
                  <td className="px-6 py-3">
                    <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{tx.id}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span>{tx.country}</span>
                      <span className="text-sm" style={{ color: 'var(--text)' }}>{tx.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-mono text-sm font-semibold" style={{ color: 'var(--text)' }}>{tx.amount}</td>
                  <td className="px-6 py-3 text-xs" style={{ color: 'var(--muted)' }}>{tx.method}</td>
                  <td className="px-6 py-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: statusConfig[tx.status as keyof typeof statusConfig]?.bg, color: statusConfig[tx.status as keyof typeof statusConfig]?.color }}
                    >
                      {statusConfig[tx.status as keyof typeof statusConfig]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs" style={{ color: 'var(--muted)' }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {[
          { title: 'Create Payment Link', desc: 'Share a link to collect payments' },
          { title: 'Issue Refund', desc: 'Refund a completed transaction' },
          { title: 'Add Webhook', desc: 'Configure event notifications' },
        ].map(action => (
          <button
            key={action.title}
            className="flex items-center justify-between p-4 rounded-xl text-left transition-all"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
          >
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{action.title}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{action.desc}</div>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--muted)' }} />
          </button>
        ))}
      </div>

      <TransactionDrawer tx={selectedTx} onClose={() => setSelectedTx(null)} />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </DashboardLayout>
  )
}
