'use client'
import { useState } from 'react'
import { Copy, Check, Play } from 'lucide-react'

const codeSnippets: Record<string, string> = {
  Node: `const norvex = require('@norvexpay/node');
const client = new norvex.NorvexPay('nv_live_...');

const payment = await client.payments.create({
  amount: 50000,
  currency: 'USD',
  payment_method: 'pm_card_visa',
  description: 'Order #ORD-7821',
  idempotency_key: 'idem_a8f3k2',
  metadata: {
    order_id: 'ORD-7821',
    customer_id: 'cus_K9m2p',
  }
});

console.log(payment.id); // pay_3xK9pLm2`,

  Python: `import norvexpay

client = norvexpay.Client(api_key="nv_live_...")

payment = client.payments.create(
    amount=50000,
    currency="USD",
    payment_method="pm_card_visa",
    description="Order #ORD-7821",
    idempotency_key="idem_a8f3k2",
    metadata={
        "order_id": "ORD-7821",
        "customer_id": "cus_K9m2p",
    }
)

print(payment["id"])  # pay_3xK9pLm2`,

  Ruby: `require 'norvexpay'

NorvexPay.api_key = 'nv_live_...'

payment = NorvexPay::Payment.create(
  amount: 50000,
  currency: 'USD',
  payment_method: 'pm_card_visa',
  description: 'Order #ORD-7821',
  idempotency_key: 'idem_a8f3k2',
  metadata: {
    order_id: 'ORD-7821',
    customer_id: 'cus_K9m2p'
  }
)

puts payment.id # pay_3xK9pLm2`,

  Go: `package main

import (
    "fmt"
    norvex "github.com/norvexpay/go"
)

func main() {
    client := norvex.NewClient("nv_live_...")

    payment, err := client.Payments.Create(&norvex.PaymentParams{
        Amount:         50000,
        Currency:       "USD",
        PaymentMethod:  "pm_card_visa",
        Description:    "Order #ORD-7821",
        IdempotencyKey: "idem_a8f3k2",
    })

    fmt.Println(payment.ID) // pay_3xK9pLm2
}`,

  cURL: `curl -X POST https://api.norvexpay.io/v1/payments \\
  -H "Authorization: Bearer nv_live_..." \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: idem_a8f3k2" \\
  -d '{
    "amount": 50000,
    "currency": "USD",
    "payment_method": "pm_card_visa",
    "description": "Order #ORD-7821",
    "metadata": {
      "order_id": "ORD-7821",
      "customer_id": "cus_K9m2p"
    }
  }'`,
}

const responseJSON = `{
  "id": "pay_3xK9pLm2vR",
  "object": "payment",
  "amount": 50000,
  "currency": "USD",
  "status": "succeeded",
  "payment_method": "pm_card_visa",
  "description": "Order #ORD-7821",
  "settled_at": 1714329847,
  "settlement_ms": 94,
  "fee": 1400,
  "net": 48600,
  "metadata": {
    "order_id": "ORD-7821",
    "customer_id": "cus_K9m2p"
  },
  "created": 1714329847
}`

const langColors: Record<string, string> = {
  Node: '#68a063', Python: '#3572A5', Ruby: '#CC342D',
  Go: '#00ADD8', cURL: '#888',
}

export default function DeveloperSection() {
  const [lang, setLang] = useState('Node')
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(codeSnippets[lang])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const run = () => {
    setRunning(true)
    setShowResponse(false)
    setTimeout(() => {
      setRunning(false)
      setShowResponse(true)
      setTimeout(() => setRunning(false), 3000)
    }, 800)
  }

  return (
    <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[40fr_60fr] gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Built for builders</p>
            <h2
              className="text-3xl lg:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}
            >
              The cleanest API in payments.
            </h2>
            <div className="space-y-3 mb-8">
              {[
                'RESTful, predictable, versioned forever',
                'Idempotency keys on every write operation',
                'Human-readable errors with fix suggestions',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {[
                { value: '847', label: 'GitHub stars' },
                { value: '12', label: 'official SDKs' },
                { value: '<2h', label: 'avg support response' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-mono text-xl font-bold" style={{ color: 'var(--accent)' }}>{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <a href="#" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
              Read full docs →
            </a>
          </div>

          {/* Right — Code Playground */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0A0C10', border: '1px solid var(--border)' }}
          >
            {/* Language tabs */}
            <div className="flex items-center gap-1 px-4 py-3 border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
              {Object.keys(codeSnippets).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex-shrink-0 transition-all"
                  style={{
                    background: lang === l ? 'var(--bg-float)' : 'transparent',
                    color: lang === l ? langColors[l] || 'var(--text)' : 'var(--muted)',
                    border: lang === l ? '1px solid var(--border)' : '1px solid transparent',
                  }}
                >
                  {l}
                </button>
              ))}
              <button
                onClick={copy}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs flex-shrink-0"
                style={{ background: 'var(--bg-float)', color: copied ? 'var(--success)' : 'var(--muted)' }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Code */}
            <pre className="p-4 text-xs overflow-x-auto leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#c9d1d9', maxHeight: '260px' }}>
              <code>{codeSnippets[lang]}</code>
            </pre>

            {/* Response */}
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>Response</span>
                <button
                  onClick={run}
                  disabled={running}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: 'var(--accent)',
                    color: '#000',
                    opacity: running ? 0.7 : 1,
                  }}
                >
                  {running ? (
                    <div className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <Play size={11} />
                  )}
                  {running ? 'Running...' : '▶ Run in sandbox'}
                </button>
              </div>

              {showResponse && (
                <pre
                  className="px-4 pb-4 text-xs overflow-x-auto leading-relaxed"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--success)',
                    animation: 'fadeUp 0.3s ease',
                    maxHeight: '160px',
                  }}
                >
                  <code>{responseJSON}</code>
                </pre>
              )}

              {!showResponse && !running && (
                <div className="px-4 pb-4 text-xs" style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  // Click &quot;Run in sandbox&quot; to see the response
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
