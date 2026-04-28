'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Copy, Check, Link2, QrCode, ToggleLeft, ToggleRight } from 'lucide-react'

const existingLinks = [
  { name: 'Product Launch Sale', amount: '$49.00', uses: '12 / ∞', expires: 'May 15, 2026', status: 'Active' },
  { name: 'Consulting Session', amount: 'Custom', uses: '1 / 1', expires: 'Apr 30, 2026', status: 'Active' },
  { name: 'Annual Subscription', amount: '$299.00', uses: '45 / ∞', expires: 'Dec 31, 2026', status: 'Active' },
  { name: 'Flash Sale', amount: '$19.99', uses: '100 / 100', expires: 'Apr 20, 2026', status: 'Expired' },
]

export default function PaymentLinksPage() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState(false)
  const [description, setDescription] = useState('')
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const generatedUrl = 'https://pay.norvexpay.io/l/abc123xyz'

  const generate = () => {
    if (customAmount || amount) setGenerated(true)
  }

  const copy = () => {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout title="Payment Links">
      <div className="grid lg:grid-cols-[400px_1fr] gap-6">
        {/* Create form */}
        <div className="p-6 rounded-2xl h-fit" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-5" style={{ color: 'var(--text)' }}>Create Payment Link</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--muted)' }}>Amount</label>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setCustomAmount(!customAmount)}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: 'var(--accent)' }}
                >
                  {customAmount ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  {customAmount ? 'Customer sets amount' : 'Fixed amount'}
                </button>
              </div>
              {!customAmount && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2.5 rounded-l-xl text-sm" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)', borderRight: 'none' }}>$</span>
                  <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="flex-1 px-3 py-2.5 rounded-r-xl text-sm outline-none" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--muted)' }}>Description</label>
              <input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Consulting Session" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
            </div>

            <button onClick={generate} className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: 'var(--accent)', color: '#000' }}>
              <Link2 size={15} /> Generate link
            </button>
          </div>

          {generated && (
            <div className="mt-5 p-4 rounded-xl" style={{ background: 'var(--bg-float)', border: '1px solid var(--border-bright)', animation: 'fadeUp 0.3s ease' }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>Link generated!</p>
              <div className="flex items-center gap-2 mb-3">
                <code className="flex-1 text-xs truncate" style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>{generatedUrl}</code>
                <button onClick={copy} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg flex-shrink-0" style={{ background: copied ? 'var(--success)' : 'var(--bg-raised)', color: copied ? '#000' : 'var(--muted)' }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {/* QR code visual */}
              <div className="flex items-center justify-center h-20 rounded-lg" style={{ background: '#fff' }}>
                <div className="grid grid-cols-6 gap-0.5">
                  {Array.from({ length: 36 }, (_, i) => (
                    <div key={i} className="w-2.5 h-2.5" style={{ background: Math.random() > 0.5 ? '#000' : '#fff' }} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                {[{ v: '0', l: 'views' }, { v: '0', l: 'clicks' }, { v: '0', l: 'conversions' }].map(m => (
                  <div key={m.l} className="p-2 rounded-lg" style={{ background: 'var(--bg-raised)' }}>
                    <div className="font-mono font-bold" style={{ color: 'var(--accent)' }}>{m.v}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Links table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Active Links</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Name', 'Amount', 'Uses', 'Expires', 'Status', 'Actions'].map(col => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: 'var(--muted)' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {existingLinks.map((link, i) => (
                <tr key={i} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--text)' }}>{link.name}</td>
                  <td className="px-5 py-3 font-mono text-sm" style={{ color: 'var(--accent)' }}>{link.amount}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: 'var(--muted)' }}>{link.uses}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: 'var(--muted)' }}>{link.expires}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-full text-xs" style={{ background: link.status === 'Active' ? 'rgba(34,197,94,0.12)' : 'rgba(107,122,153,0.15)', color: link.status === 'Active' ? 'var(--success)' : 'var(--muted)' }}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs" style={{ color: 'var(--accent)' }}>Copy</button>
                      <button className="text-xs" style={{ color: 'var(--muted)' }}>Analytics</button>
                      <button className="text-xs" style={{ color: 'var(--danger)' }}>Deactivate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
