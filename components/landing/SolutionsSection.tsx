'use client'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const solutions = [
  {
    title: 'Fintechs',
    description: 'Launch financial products faster with embedded payments, card issuing, and BaaS infrastructure built for modern fintech teams.',
    benefits: ['Card issuing in minutes', 'Embedded payments SDK', 'Compliance-ready infrastructure'],
    stat: { company: 'Luminary Finance', metric: '4× faster time to market' },
    gradient: 'from-amber-500/10 to-orange-500/5',
  },
  {
    title: 'Enterprises',
    description: 'Route payments intelligently across global networks. Optimize authorization rates and reduce fees at billions in volume.',
    benefits: ['Smart payment routing', 'Volume-based pricing', 'Dedicated infrastructure'],
    stat: { company: 'Meridian Corp', metric: '$2.4M saved annually in fees' },
    gradient: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    title: 'Marketplaces',
    description: 'Collect from buyers and split payments to sellers instantly. Handle escrow, refunds, and seller onboarding at scale.',
    benefits: ['Instant split payments', 'Seller KYC automation', 'Escrow management'],
    stat: { company: 'SwiftCart', metric: '92% reduction in payout disputes' },
    gradient: 'from-green-500/10 to-emerald-500/5',
  },
  {
    title: 'Banks',
    description: 'Modernize your payment rails with NorvexPay infrastructure. Offer real-time settlement and open banking to your customers.',
    benefits: ['Real-time payment rails', 'Open banking API layer', 'Regulatory compliance'],
    stat: { company: 'Global Trust Bank', metric: '99.99% uptime for 5M customers' },
    gradient: 'from-purple-500/10 to-violet-500/5',
  },
  {
    title: 'Crypto Platforms',
    description: 'Bridge crypto and fiat seamlessly. Accept card payments, enable off-ramps, and manage multi-chain treasury operations.',
    benefits: ['Fiat on/off ramps', 'Multi-chain treasury', 'Instant card acceptance'],
    stat: { company: 'VaultPay', metric: '180+ fiat currencies supported' },
    gradient: 'from-cyan-500/10 to-teal-500/5',
  },
]

export default function SolutionsSection() {
  const [active, setActive] = useState(0)

  const current = solutions[active]

  return (
    <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Solutions</p>
          <h2
            className="text-3xl lg:text-5xl font-black"
            style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Built for every segment
          </h2>
        </div>

        <div
          className="grid lg:grid-cols-[35fr_65fr] gap-0 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {/* Left — Accordion */}
          <div style={{ background: 'var(--bg-raised)', borderRight: '1px solid var(--border)' }}>
            {solutions.map((sol, i) => (
              <button
                key={sol.title}
                onClick={() => setActive(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-all border-b last:border-b-0"
                style={{
                  borderColor: 'var(--border)',
                  borderLeft: i === active ? '4px solid var(--accent)' : '4px solid transparent',
                  background: i === active ? 'var(--bg-float)' : 'transparent',
                  color: i === active ? 'var(--text)' : 'var(--muted)',
                }}
              >
                <span className="font-semibold text-sm">{sol.title}</span>
                <ChevronRight
                  size={16}
                  style={{
                    transform: i === active ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: i === active ? 'var(--accent)' : 'var(--muted)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right — Preview */}
          <div
            className="p-10 relative overflow-hidden"
            style={{ background: 'var(--bg-surface)' }}
            key={active}
          >
            {/* Background illustration */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-40`}
            />

            <div className="relative" style={{ animation: 'fadeUp 0.3s ease' }}>
              <h3
                className="text-3xl mb-6"
                style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}
              >
                {current.title}
              </h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>
                {current.description}
              </p>

              <ul className="space-y-3 mb-8">
                {current.benefits.map(b => (
                  <li key={b} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent)' }}>→</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Case study */}
              <div
                className="p-4 rounded-xl mb-6"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
              >
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{current.stat.company}</div>
                <div className="font-bold" style={{ color: 'var(--success)' }}>{current.stat.metric}</div>
              </div>

              <button
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ background: 'var(--accent)', color: '#000' }}
              >
                Explore {current.title} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
