'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "NorvexPay's API is the most thoughtfully designed payments infrastructure I've ever integrated with. We went from zero to processing live payments in under four hours. The documentation is exceptional.",
    author: 'Claire Mimo',
    role: 'CTO, Luminary Finance',
    initials: 'AK',
    color: '#E8A020',
    metrics: [
      { label: 'Integration time', before: '3 weeks', after: '4 hours' },
      { label: 'Approval rate', before: '78%', after: '96.2%' },
      { label: 'API uptime', before: '99.1%', after: '99.99%' },
    ],
  },
  {
    quote: "Expanding into 14 new markets took us less than a month. NorvexPay handles all the local payment methods, regulatory compliance, and currency conversion automatically. It feels like magic.",
    author: 'Sofia Rodriguez',
    role: 'VP Payments, Meridian Bank',
    initials: 'SR',
    color: '#3B82F6',
    metrics: [
      { label: 'Markets live', before: '3', after: '17' },
      { label: 'Settlement speed', before: '3-5 days', after: '94ms' },
      { label: 'Operational cost', before: 'Baseline', after: '-42%' },
    ],
  },
  {
    quote: "Fraud losses dropped by 87% in the first quarter after switching to NorvexPay. Their AI risk engine catches things no rule-based system could. Our customers barely notice the security checks.",
    author: 'James Thornton',
    role: 'COO, SwiftCart',
    initials: 'JT',
    color: '#22C55E',
    metrics: [
      { label: 'Fraud losses', before: '$120K/mo', after: '$15K/mo' },
      { label: 'False positive rate', before: '4.2%', after: '0.3%' },
      { label: 'Checkout conversion', before: '71%', after: '89%' },
    ],
  },
  {
    quote: "I've evaluated every major payments API on the market. NorvexPay is in a different category entirely. The DX is unmatched — idempotency keys, predictable versioning, human errors. Finally, an API built by engineers, for engineers.",
    author: 'Priya Nair',
    role: 'CEO, VaultPay',
    initials: 'PN',
    color: '#A855F7',
    metrics: [
      { label: 'Dev onboarding', before: '2 days', after: '45 min' },
      { label: 'Support tickets', before: '120/mo', after: '8/mo' },
      { label: 'Time to market', before: '6 weeks', after: '1 week' },
    ],
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((next: number) => {
    setTransitioning(true)
    setTimeout(() => {
      setIdx((next + testimonials.length) % testimonials.length)
      setTransitioning(false)
    }, 250)
  }, [])

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 6000)
    return () => clearInterval(t)
  }, [idx, go])

  const t = testimonials[idx]

  return (
    <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-12" style={{ color: 'var(--accent)' }}>What our customers say</p>

        <div
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
            transition: 'all 0.25s ease',
          }}
        >
          {/* Quote mark */}
          <div
            className="font-serif text-[120px] leading-none mb-4 select-none"
            style={{ color: t.color, opacity: 0.3, fontFamily: 'Instrument Serif, serif', lineHeight: 0.8 }}
          >
            "
          </div>

          {/* Quote */}
          <blockquote
            className="text-xl lg:text-2xl italic mb-10 leading-relaxed"
            style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}
          >
            {t.quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: `${t.color}20`, border: `2px solid ${t.color}40`, color: t.color }}
            >
              {t.initials}
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{t.author}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{t.role}</div>
            </div>
          </div>

          {/* Metrics */}
          <div
            className="flex justify-center gap-6 flex-wrap"
          >
            {t.metrics.map(m => (
              <div
                key={m.label}
                className="px-5 py-3 rounded-xl text-center"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
              >
                <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{m.label}</div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-xs line-through" style={{ color: 'var(--muted)' }}>{m.before}</span>
                  <span className="text-xs">→</span>
                  <span className="text-sm font-bold font-mono" style={{ color: 'var(--success)' }}>{m.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => go(idx - 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? '24px' : '8px',
                  height: '8px',
                  background: i === idx ? 'var(--accent)' : 'var(--bg-float)',
                  border: '1px solid var(--border)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(idx + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
