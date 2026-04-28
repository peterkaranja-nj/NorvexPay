'use client'

const certs = ['PCI DSS', 'ISO 27001', 'SOC 2 Type II', 'FCA', 'GDPR']
const partners = ['Visa', 'Mastercard', 'SWIFT', 'SEPA', 'M-Pesa', 'Apple Pay', 'Google Pay', 'Stripe', 'Plaid']

function MarqueeRow({ items, reverse = false }: { items: string[], reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden relative" style={{
      maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    }}>
      <div
        className="flex gap-8 w-max"
        style={{ animation: `${reverse ? 'marqueeReverse' : 'marquee'} 30s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center px-6 py-3 rounded-xl text-sm font-semibold flex-shrink-0 whitespace-nowrap"
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
              Regulated &amp; certified by
            </p>
            <MarqueeRow items={certs} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
              Integrated with
            </p>
            <MarqueeRow items={partners} reverse />
          </div>
        </div>
      </div>
    </section>
  )
}
