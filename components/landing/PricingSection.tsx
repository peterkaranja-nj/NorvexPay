'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '2.9% + $0.30',
    volume: 'Up to $50K/month',
    features: [
      'Payment Gateway',
      'Basic fraud protection',
      '3-day settlement',
      'Email support',
      'API access',
      'Dashboard',
    ],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Growth',
    price: '2.2% + $0.25',
    volume: '$50K–$2M/month',
    features: [
      'Everything in Starter',
      'Same-day settlement',
      'AI fraud engine',
      'Card issuing',
      'Multi-currency FX',
      'Priority support',
      'Webhooks & events',
      'Analytics dashboard',
      'Team accounts',
      'Custom checkout',
    ],
    cta: 'Get started',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom pricing',
    volume: 'Unlimited volume',
    features: [
      'Everything in Growth',
      'Dedicated account manager',
      'Custom SLA (99.99%)',
      'On-premise deployment',
      'Custom risk rules',
      'White-label options',
    ],
    cta: 'Talk to sales',
    featured: false,
  },
]

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [volume, setVolume] = useState(100000)

  const monthlyFee = volume * 0.022 + Math.floor(volume / 50) * 0.25
  const legacyFee = volume * 0.035 + Math.floor(volume / 50) * 0.40
  const savings = legacyFee - monthlyFee
  const savingsPct = Math.round((savings / legacyFee) * 100)

  const fmt = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
    return `$${n}`
  }

  return (
    <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Pricing</p>
          <h2 className="text-3xl lg:text-5xl font-black mb-4" style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-sm" style={{ color: annual ? 'var(--muted)' : 'var(--text)' }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-all"
              style={{ background: annual ? 'var(--accent)' : 'var(--bg-float)', border: '1px solid var(--border)' }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
                style={{
                  background: '#fff',
                  left: annual ? 'calc(100% - 22px)' : '2px',
                }}
              />
            </button>
            <span className="text-sm" style={{ color: annual ? 'var(--text)' : 'var(--muted)' }}>Annual</span>
            {annual && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(34,197,94,0.15)', color: 'var(--success)' }}>
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="pricing-card rounded-2xl p-6 relative"
              style={{
                background: plan.featured ? 'var(--bg-raised)' : 'var(--bg-raised)',
                border: plan.featured ? '1px solid var(--border-bright)' : '1px solid var(--border)',
                boxShadow: plan.featured ? '0 0 40px rgba(232,160,32,0.1)' : 'none',
              }}
            >
              {plan.featured && (
                <>
                  <div
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
                    style={{ background: 'var(--accent)' }}
                  />
                  <div
                    className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'var(--accent)', color: '#000' }}
                  >
                    {plan.badge}
                  </div>
                </>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{plan.name}</h3>
                <div className="font-mono text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{plan.price}</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{plan.volume}</div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--muted)' }}>
                    <Check size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: plan.featured ? 'var(--accent)' : 'transparent',
                  color: plan.featured ? '#000' : 'var(--text)',
                  border: plan.featured ? 'none' : '1px solid var(--border)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Fee Calculator */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>Calculate your fees</h3>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>Estimate your monthly cost on the Growth plan</p>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>Monthly volume</label>
              <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>{fmt(volume)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={10000000}
              step={1000}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--accent) ${((volume - 1000) / 9999000) * 100}%, var(--bg-float) 0)`,
                outline: 'none',
              }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--muted)' }}>
              <span>$1K</span>
              <span>$10M</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Your estimated monthly fee', value: `$${monthlyFee.toLocaleString('en', { maximumFractionDigits: 0 })}`, color: 'var(--text)' },
              { label: 'Legacy processor average', value: `$${legacyFee.toLocaleString('en', { maximumFractionDigits: 0 })}`, color: 'var(--muted)' },
              { label: `Your savings with NorvexPay`, value: `$${savings.toLocaleString('en', { maximumFractionDigits: 0 })} (${savingsPct}%)`, color: 'var(--success)' },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl" style={{ background: 'var(--bg-float)' }}>
                <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{item.label}</div>
                <div className="font-mono font-bold text-xl" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>

          <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>
            * Estimates only. Final rates based on business profile.
          </p>
        </div>
      </div>
    </section>
  )
}
