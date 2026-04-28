'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const transactions = [
  { flag: '🇳🇬', city: 'Lagos', card: '•••• 4821', amount: '$2,400.00', currency: 'USD' },
  { flag: '🇬🇧', city: 'London', card: '•••• 7293', amount: '£1,850.00', currency: 'GBP' },
  { flag: '🇺🇸', city: 'New York', card: '•••• 5571', amount: '$890.00', currency: 'USD' },
  { flag: '🇩🇪', city: 'Berlin', card: '•••• 3394', amount: '€1,200.00', currency: 'EUR' },
  { flag: '🇯🇵', city: 'Tokyo', card: '•••• 8823', amount: '¥145,000', currency: 'JPY' },
  { flag: '🇿🇦', city: 'Cape Town', card: '•••• 2210', amount: 'R18,500', currency: 'ZAR' },
  { flag: '🇸🇬', city: 'Singapore', card: '•••• 9943', amount: 'S$3,200', currency: 'SGD' },
  { flag: '🇦🇪', city: 'Dubai', card: '•••• 6617', amount: 'AED 8,400', currency: 'AED' },
  { flag: '🇧🇷', city: 'São Paulo', card: '•••• 1134', amount: 'R$4,750', currency: 'BRL' },
  { flag: '🇰🇪', city: 'Nairobi', card: '•••• 7782', amount: 'KES 58,000', currency: 'KES' },
  { flag: '🇨🇦', city: 'Toronto', card: '•••• 4419', amount: 'C$1,990', currency: 'CAD' },
  { flag: '🇫🇷', city: 'Paris', card: '•••• 3387', amount: '€950.00', currency: 'EUR' },
  { flag: '🇦🇺', city: 'Sydney', card: '•••• 2256', amount: 'A$2,100', currency: 'AUD' },
  { flag: '🇮🇳', city: 'Mumbai', card: '•••• 8891', amount: '₹84,000', currency: 'INR' },
  { flag: '🇲🇽', city: 'Mexico City', card: '•••• 5543', amount: 'MX$9,200', currency: 'MXN' },
]

const statsBar = [
  { value: '$42B+', label: 'Annual volume' },
  { value: '180+', label: 'Countries' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<100ms', label: 'API response' },
  { value: '500+', label: 'Enterprise clients' },
]

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [feed, setFeed] = useState(transactions.slice(0, 8))
  const [processed, setProcessed] = useState(2100000)
  const [txCount, setTxCount] = useState(14302)
  const [typed, setTyped] = useState('')
  const fullText = 'The infrastructure layer for modern finance'

  // Typing effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [])

  // Live feed
  useEffect(() => {
    const interval = setInterval(() => {
      const next = transactions[Math.floor(Math.random() * transactions.length)]
      setFeed(prev => [next, ...prev.slice(0, 7)])
      setProcessed(p => p + Math.floor(Math.random() * 5000 + 1000))
      setTxCount(c => c + Math.floor(Math.random() * 3 + 1))
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let visible = true

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }))

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(232,160,32,0.4)'
        ctx.fill()

        particles.forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(232,160,32,${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onVis = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const formatProcessed = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    return `$${(n / 1000).toFixed(0)}K`
  }

  return (
    <section className="relative min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Amber glow */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,160,32,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main hero */}
      <div className="relative flex-1 flex items-center pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-[58fr_42fr] gap-12 items-center py-20">
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-8"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-bright)',
                color: 'var(--accent)',
              }}
            >
              <span className="text-xs opacity-60">▸</span>
              {typed}
              <span className="animate-pulse">|</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6">
              <div
                className="block text-5xl lg:text-7xl font-black leading-none tracking-tight mb-2"
                style={{
                  color: 'var(--text)',
                  animation: 'fadeUp 0.6s ease forwards',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                Move money without limits.
              </div>
              <div
                className="block text-5xl lg:text-7xl leading-none italic"
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  color: 'var(--accent)',
                  animation: 'fadeUp 0.6s ease 0.2s forwards',
                  opacity: 0,
                }}
              >
               
              </div>
            </h1>

            {/* Body */}
            <p
              className="text-lg mb-8 max-w-xl"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.75,
                fontWeight: 300,
                animation: 'fadeUp 0.6s ease 0.4s forwards',
                opacity: 0,
              }}
            >
              One API. 180+ countries. Enterprise-grade security. Settlement in seconds.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 mb-10"
              style={{ animation: 'fadeUp 0.6s ease 0.6s forwards', opacity: 0 }}
            >
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: 'var(--accent)', color: '#000', minWidth: '200px', textAlign: 'center' }}
              >
                Open your account
              </Link>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all border"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                ▶ Watch 2-min demo
              </button>
            </div>

            {/* Trust signals */}
            <div
              className="flex flex-wrap gap-6"
              style={{ animation: 'fadeUp 0.6s ease 0.8s forwards', opacity: 0 }}
            >
              {[
                { icon: '🔒', text: 'Bank-grade encryption' },
                { icon: '⚡', text: 'Sub-100ms settlement' },
                { icon: '🌍', text: '180+ countries' },
                { icon: '✅', text: 'Zero setup fees' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--muted)' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Live Feed */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden scanlines"
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-bright)',
                boxShadow: '0 0 40px rgba(232,160,32,0.15), 0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                  <span className="text-xs font-mono ml-2" style={{ color: 'var(--muted)' }}>NorvexPay Live · Transaction Monitor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-dot" />
                  <span className="text-xs font-mono" style={{ color: 'var(--success)' }}>Live</span>
                </div>
              </div>

              {/* Feed */}
              <div className="overflow-hidden" style={{ height: '320px' }}>
                <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                  {feed.map((tx, i) => (
                    <div
                      key={`${i}-${tx.city}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm transition-all"
                      style={{
                        animation: i === 0 ? 'slideUpFade 0.4s ease forwards' : 'none',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{tx.flag}</span>
                        <div>
                          <div className="font-medium text-xs" style={{ color: 'var(--text)' }}>{tx.city}</div>
                          <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{tx.card}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text)' }}>{tx.amount}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(34,197,94,0.12)', color: 'var(--success)' }}>✓</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer metrics */}
              <div className="flex border-t" style={{ borderColor: 'var(--border)' }}>
                {[
                  { value: formatProcessed(processed), label: 'processed in last hour' },
                  { value: txCount.toLocaleString(), label: 'transactions today' },
                  { value: '99.99%', label: 'uptime' },
                ].map((m, i) => (
                  <div key={i} className="flex-1 px-3 py-3 text-center border-r last:border-r-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="font-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>{m.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap justify-center divide-x" style={{ borderColor: 'var(--border)' }}>
            {statsBar.map(({ value, label }) => (
              <div key={label} className="px-8 py-6 text-center flex-1 min-w-[140px]">
                <div className="font-mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>{value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
