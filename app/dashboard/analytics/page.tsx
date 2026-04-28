'use client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function DonutChart({ data, size = 120 }: { data: { label: string, value: number, color: string }[], size?: number }) {
  const total = data.reduce((a, b) => a + b.value, 0)
  let cumulative = 0
  const radius = 45
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {data.map((d, i) => {
          const fraction = d.value / total
          const dash = fraction * circumference
          const offset = cumulative * circumference
          cumulative += fraction
          return (
            <circle
              key={i}
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth="10"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={circumference / 4 - offset}
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          )
        })}
      </svg>
      <div className="space-y-1.5">
        {data.map(d => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span style={{ color: 'var(--muted)' }}>{d.label}</span>
            <span className="font-mono font-semibold ml-2" style={{ color: 'var(--text)' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BarChart({ data }: { data: { day: string, value: number }[] }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t transition-all duration-700"
            style={{ height: `${(d.value / max) * 100}%`, background: 'var(--accent)', opacity: 0.8 }}
          />
          <span className="text-xs" style={{ color: 'var(--muted)', fontSize: '9px' }}>{d.day.slice(0, 2)}</span>
        </div>
      ))}
    </div>
  )
}

function HeatmapGrid() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const data = days.map(() => hours.map(() => Math.random()))

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex gap-0.5">
          <div className="w-8" />
          {hours.filter((_, i) => i % 3 === 0).map(h => (
            <div key={h} className="flex-1 text-center text-xs pb-1" style={{ color: 'var(--muted)', width: '12px', minWidth: '12px', fontSize: '9px' }}>{h}h</div>
          ))}
        </div>
        {days.map((day, di) => (
          <div key={day} className="flex items-center gap-0.5 mb-0.5">
            <div className="w-8 text-xs" style={{ color: 'var(--muted)', fontSize: '9px' }}>{day}</div>
            {hours.map((h, hi) => (
              <div
                key={hi}
                className="rounded-sm"
                style={{
                  width: '12px',
                  height: '12px',
                  background: `rgba(232,160,32,${data[di][hi] * 0.9})`,
                }}
                title={`${day} ${h}:00 — ${Math.floor(data[di][hi] * 200)} txns`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const paymentMethods = [
    { label: 'Card', value: 45, color: 'var(--accent)' },
    { label: 'Bank Transfer', value: 28, color: '#3B82F6' },
    { label: 'Mobile Money', value: 18, color: 'var(--success)' },
    { label: 'Other', value: 9, color: 'var(--muted)' },
  ]

  const volumeData = Array.from({ length: 30 }, (_, i) => ({
    day: `Apr ${i + 1}`,
    value: Math.floor(100 + Math.random() * 200),
  }))

  const funnel = [
    { label: 'Initiated', value: 10000, pct: 100 },
    { label: 'Authorized', value: 9420, pct: 94.2 },
    { label: 'Captured', value: 9200, pct: 92.0 },
    { label: 'Settled', value: 9108, pct: 91.1 },
  ]

  const declines = [
    { label: 'Insufficient funds', value: 38, color: 'var(--danger)' },
    { label: 'Card expired', value: 24, color: 'var(--warning)' },
    { label: 'Suspected fraud', value: 18, color: '#F97316' },
    { label: 'Limit exceeded', value: 13, color: '#A855F7' },
    { label: 'Other', value: 7, color: 'var(--muted)' },
  ]

  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Method */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Revenue by Payment Method</h3>
          <DonutChart data={paymentMethods} />
        </div>

        {/* Volume by Day */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Transaction Volume (30 days)</h3>
          <BarChart data={volumeData} />
        </div>

        {/* Conversion Funnel */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Conversion Funnel</h3>
          <div className="space-y-3">
            {funnel.map((stage, i) => (
              <div key={stage.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm" style={{ color: 'var(--text)' }}>{stage.label}</span>
                  <span className="font-mono text-sm" style={{ color: 'var(--accent)' }}>{stage.pct}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-float)' }}>
                  <div className="h-full rounded-full" style={{ width: `${stage.pct}%`, background: `rgba(232,160,32,${1 - i * 0.15})` }} />
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{stage.value.toLocaleString()} transactions</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decline Reasons */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Decline Reasons</h3>
          <DonutChart data={declines} />
        </div>

        {/* Peak Hours Heatmap */}
        <div className="p-6 rounded-2xl col-span-full" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Peak Hours Heatmap</h3>
          <HeatmapGrid />
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Low</span>
            <div className="flex gap-0.5">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
                <div key={o} className="w-4 h-3 rounded-sm" style={{ background: `rgba(232,160,32,${o})` }} />
              ))}
            </div>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>High</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
