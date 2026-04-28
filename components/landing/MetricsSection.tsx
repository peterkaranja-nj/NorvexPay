'use client'
import { useEffect, useRef, useState } from 'react'

const metrics = [
  { value: 42, suffix: 'B+', prefix: '$', label: 'Annual payment volume' },
  { value: 500, suffix: '+', prefix: '', label: 'Enterprise clients globally' },
  { value: 180, suffix: '+', prefix: '', label: 'Countries & territories' },
  { value: 99.99, suffix: '%', prefix: '', label: 'Uptime SLA', decimal: true },
  { value: 0.01, suffix: '%', prefix: '<', label: 'Fraud rate', decimal: true },
]

function Counter({ value, suffix, prefix, decimal, visible }: {
  value: number
  suffix: string
  prefix: string
  decimal?: boolean
  visible: boolean
}) {
  const [display, setDisplay] = useState(0)
  const [showSuffix, setShowSuffix] = useState(false)

  useEffect(() => {
    if (!visible) return
    const duration = value > 100 ? 2000 : 1500
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(+(value * eased).toFixed(decimal ? 2 : 0))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setDisplay(value)
        setTimeout(() => setShowSuffix(true), 200)
      }
    }
    requestAnimationFrame(tick)
  }, [visible, value, decimal])

  return (
    <div className="text-4xl lg:text-5xl font-black font-mono" style={{ color: 'var(--accent)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.6em' }}>{prefix}</span>
      {decimal ? display.toFixed(display < 1 ? 2 : 2) : display.toLocaleString()}
      <span
        style={{
          opacity: showSuffix ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {suffix}
      </span>
    </div>
  )
}

export default function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Animated gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.04) 0%, transparent 70%)',
          animation: 'gradientPulse 20s ease-in-out infinite',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 divide-x" style={{ borderColor: 'var(--border)' }}>
          {metrics.map((m, i) => (
            <div key={m.label} className="text-center px-4 py-4">
              <Counter
                value={m.value}
                suffix={m.suffix}
                prefix={m.prefix}
                decimal={m.decimal}
                visible={visible}
              />
              <div className="text-xs mt-2" style={{ color: 'var(--muted)' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradientPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}
