'use client'
import { useEffect, useRef, useState } from 'react'

// FX Ticker Cell
function FXTicker() {
  const [pairs, setPairs] = useState([
    { pair: 'USD/EUR', rate: 0.9214, up: true },
    { pair: 'GBP/KES', rate: 165.40, up: false },
    { pair: 'USD/NGN', rate: 1580, up: true },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs(prev => prev.map(p => {
        const change = (Math.random() - 0.5) * 0.02
        return { ...p, rate: +(p.rate * (1 + change)).toFixed(p.rate > 100 ? 1 : 4), up: change > 0 }
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      {pairs.map(p => (
        <div key={p.pair} className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text)' }}>{p.pair}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm" style={{ color: 'var(--text)' }}>{p.rate.toLocaleString()}</span>
            <span className="text-xs" style={{ color: p.up ? 'var(--success)' : 'var(--danger)' }}>
              {p.up ? '↑' : '↓'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Fraud Gauge Cell
function FraudGauge() {
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'rising' | 'dropping'>('rising')

  useEffect(() => {
    const cycle = () => {
      setPhase('rising')
      let s = 0
      const up = setInterval(() => {
        s += 3
        setScore(s)
        if (s >= 87) {
          clearInterval(up)
          setTimeout(() => {
            setPhase('dropping')
            let d = 87
            const down = setInterval(() => {
              d -= 5
              setScore(d)
              if (d <= 12) { clearInterval(down); setTimeout(cycle, 2000) }
            }, 50)
          }, 1000)
        }
      }, 40)
    }
    cycle()
  }, [])

  const danger = score > 50
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const arc = circumference * (score / 100)

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-float)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={danger ? 'var(--danger)' : 'var(--success)'}
          strokeWidth="8"
          strokeDasharray={`${arc} ${circumference - arc}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.1s, stroke 0.5s' }}
        />
        <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill={danger ? 'var(--danger)' : 'var(--success)'} fontFamily="JetBrains Mono">{score}</text>
        <text x="50" y="62" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="Plus Jakarta Sans">Risk Score</text>
      </svg>
      <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
        {phase === 'rising' ? '⚠ Analyzing threat...' : '✓ Rule fired — safe'}
      </div>
    </div>
  )
}

// Webhook Stream Cell
function WebhookStream() {
  const events = [
    { type: 'payment.succeeded', id: 'pay_3xK9p', amount: '$240.00', color: 'var(--success)', delay: '12ms' },
    { type: 'payout.completed', id: 'pyt_7mL2q', amount: '$1,200', color: 'var(--accent)', delay: '8ms' },
    { type: 'dispute.opened', id: 'dsp_1nR8v', amount: '$89.99', color: 'var(--danger)', delay: '3ms' },
    { type: 'payment.succeeded', id: 'pay_9kR2m', amount: '$560.00', color: 'var(--success)', delay: '5ms' },
    { type: 'refund.created', id: 'ref_4mP1n', amount: '$120.00', color: '#6B7A99', delay: '19ms' },
  ]
  const [visible, setVisible] = useState<number[]>([0])

  useEffect(() => {
    let i = 1
    const t = setInterval(() => {
      setVisible(prev => [...prev, i % events.length])
      i++
    }, 1500)
    return () => clearInterval(t)
  }, [events.length])

  return (
    <div className="terminal p-3 h-32 overflow-hidden">
      <div className="space-y-1">
        {events.map((e, i) => (
          visible.includes(i) && (
            <div key={i} className="text-xs flex gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span style={{ color: 'var(--muted)' }}>→</span>
              <span style={{ color: e.color }}>{e.type}</span>
              <span style={{ color: 'var(--muted)' }}>{e.id}</span>
              <span style={{ color: 'var(--text)' }}>{e.amount}</span>
              <span style={{ color: 'var(--muted)' }}>{e.delay} ago</span>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

// Uptime Cell
function UptimeMonitor() {
  const days = Array.from({ length: 90 }, (_, i) => i === 67)

  return (
    <div>
      <div className="flex gap-0.5 flex-wrap mb-3">
        {days.map((incident, i) => (
          <div
            key={i}
            className="uptime-bar"
            style={{
              height: '24px',
              background: incident ? 'var(--muted)' : 'var(--success)',
              opacity: incident ? 0.5 : 0.8,
            }}
          />
        ))}
      </div>
      <div className="text-xs" style={{ color: 'var(--muted)' }}>Last incident: <span style={{ color: 'var(--text)' }}>94 days ago</span></div>
    </div>
  )
}

// World Map Cell
function WorldMap() {
  const cities = [
    { x: '15%', y: '35%' }, { x: '30%', y: '30%' }, { x: '48%', y: '28%' },
    { x: '55%', y: '40%' }, { x: '70%', y: '35%' }, { x: '80%', y: '55%' },
    { x: '22%', y: '60%' }, { x: '85%', y: '25%' },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % cities.length), 2000)
    return () => clearInterval(t)
  }, [cities.length])

  return (
    <div className="relative w-full h-48">
      {/* Simplified world outline */}
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-20">
        <rect x="40" y="40" width="60" height="100" rx="8" fill="var(--muted)" />
        <rect x="120" y="20" width="80" height="120" rx="8" fill="var(--muted)" />
        <rect x="210" y="30" width="70" height="110" rx="8" fill="var(--muted)" />
        <rect x="290" y="25" width="80" height="80" rx="8" fill="var(--muted)" />
        <rect x="50" y="120" width="80" height="60" rx="8" fill="var(--muted)" />
        <rect x="300" y="110" width="60" height="70" rx="8" fill="var(--muted)" />
      </svg>
      {cities.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: c.x, top: c.y, transform: 'translate(-50%,-50%)' }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: i === active ? 'var(--accent)' : 'var(--muted)',
              boxShadow: i === active ? '0 0 0 6px rgba(232,160,32,0.2), 0 0 0 12px rgba(232,160,32,0.05)' : 'none',
              transition: 'all 0.5s ease',
            }}
          />
        </div>
      ))}
      <div className="absolute bottom-2 left-2 font-mono text-xs" style={{ color: 'var(--accent)' }}>180+ countries</div>
    </div>
  )
}

// Card Issuing Cell
function CardIssuing() {
  const [physical, setPhysical] = useState(true)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top) / rect.height - 0.5
    const y = (e.clientX - rect.left) / rect.width - 0.5
    setTilt({ x: x * 20, y: y * 20 })
  }

  return (
    <div>
      <div
        className="relative cursor-pointer"
        style={{ perspective: '600px' }}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div
          className="w-full rounded-2xl p-4 h-28 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #1a1f2e 0%, #2d3545 100%)`,
            border: '1px solid rgba(255,255,255,0.1)',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.1s ease',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)' }} />
          <div className="flex justify-between items-start">
            <span className="font-black text-sm" style={{ color: 'var(--accent)' }}>NX</span>
            <div className="w-7 h-5 rounded" style={{ background: 'rgba(232,160,32,0.4)', border: '1px solid var(--accent)' }} />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="font-mono text-xs tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              •••• •••• •••• {physical ? '4821' : '7293'}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>JAMES THORNTON</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        {['Physical', 'Virtual'].map(type => (
          <button
            key={type}
            onClick={() => setPhysical(type === 'Physical')}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: (physical ? type === 'Physical' : type === 'Virtual') ? 'var(--accent-dim)' : 'transparent',
              border: '1px solid var(--border)',
              color: (physical ? type === 'Physical' : type === 'Virtual') ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}

// Settlement Speed Cell
function SettlementSpeed() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const processors = [
    { name: 'NorvexPay', ms: 94, max: 3100, accent: true },
    { name: 'Legacy Processor A', ms: 2400, max: 3100, accent: false },
    { name: 'Legacy Processor B', ms: 3100, max: 3100, accent: false },
  ]

  return (
    <div ref={ref} className="space-y-4">
      {processors.map(p => (
        <div key={p.name}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm" style={{ color: p.accent ? 'var(--text)' : 'var(--muted)' }}>{p.name}</span>
            <span className="font-mono text-sm font-bold" style={{ color: p.accent ? 'var(--accent)' : 'var(--muted)' }}>
              {p.ms}ms
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-float)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: visible ? `${(p.ms / p.max) * 100}%` : '0%',
                background: p.accent ? 'var(--accent)' : 'var(--muted)',
                opacity: p.accent ? 1 : 0.4,
                transitionDelay: p.accent ? '0ms' : '200ms',
              }}
            />
          </div>
        </div>
      ))}
      <div
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
        style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}
      >
        ⚡ 3.2× faster than industry average
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Infrastructure</p>
          <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-4" style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Every building block your<br />
            <span className="italic font-serif" style={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, color: 'var(--accent)' }}>
              financial product needs
            </span>
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--muted)', fontWeight: 300 }}>
            Modular infrastructure that lets you build, launch, and scale — without limits.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Cell 1 - World Map (large) */}
          <div className="bento-card col-span-12 lg:col-span-8 row-span-2">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>Global Payment Coverage</h3>
            <WorldMap />
            <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>Real-time coverage across 180+ countries and territories</p>
          </div>

          {/* Cell 2 - Fraud */}
          <div className="bento-card col-span-12 lg:col-span-4">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>AI Fraud Detection</h3>
            <FraudGauge />
          </div>

          {/* Cell 3 - FX */}
          <div className="bento-card col-span-12 lg:col-span-4">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>Multi-Currency FX</h3>
            <FXTicker />
          </div>

          {/* Cell 4 - Webhooks */}
          <div className="bento-card col-span-12 lg:col-span-5">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>Real-Time Webhooks</h3>
            <WebhookStream />
          </div>

          {/* Cell 5 - Card Issuing */}
          <div className="bento-card col-span-12 lg:col-span-4">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>Instant Card Issuing</h3>
            <CardIssuing />
          </div>

          {/* Cell 6 - Uptime */}
          <div className="bento-card col-span-12 lg:col-span-3">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>99.99% Uptime SLA</h3>
            <UptimeMonitor />
          </div>

          {/* Cell 7 - Settlement Speed (full width) */}
          <div className="bento-card col-span-12">
            <h3 className="text-sm font-semibold mb-6" style={{ color: 'var(--accent)' }}>Settlement in under 100ms</h3>
            <SettlementSpeed />
          </div>
        </div>
      </div>
    </section>
  )
}
