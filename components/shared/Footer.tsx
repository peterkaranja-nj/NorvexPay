'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, Github, Youtube, Globe, Moon, Sun } from 'lucide-react'

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [dark, setDark] = useState(true)

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const toggleTheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('light')
  }

  return (
    <footer className="relative" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6Z" fill="#000" opacity="0.8" />
                  <circle cx="9" cy="9" r="2.5" fill="#000" />
                </svg>
              </div>
              <span className="font-black text-lg" style={{ color: 'var(--text)' }}>
                Norvex<span style={{ color: 'var(--accent)' }}>Pay</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Global payment infrastructure. Move money everywhere.
            </p>
            <div className="flex gap-2 flex-wrap mb-4">
              {['PCI DSS', 'ISO 27001', 'SOC 2'].map(cert => (
                <span key={cert} className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'var(--bg-raised)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  {cert}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--bg-raised)', color: 'var(--muted)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)' }}>
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Products</h4>
            {['Payment Gateway', 'Card Issuing', 'Open Banking', 'Acquiring', 'Mass Payouts', 'Fraud & Risk'].map(item => (
              <Link key={item} href="#" className="block text-sm py-1.5 transition-colors" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {item}
              </Link>
            ))}
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Developers</h4>
            {['API Reference', 'SDKs', 'Webhooks', 'Sandbox', 'Status Page', 'Changelog'].map(item => (
              <Link key={item} href="#" className="block text-sm py-1.5 transition-colors" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Company</h4>
            {['About', 'Blog', 'Careers', 'Partners', 'Press', 'Contact'].map(item => (
              <Link key={item} href="#" className="block text-sm py-1.5 transition-colors" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {item}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Stay in the loop</h4>
            <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Product updates, fintech insights, no spam.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none min-w-0"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={handleSubscribe}
                className="px-3 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition-all"
                style={{ background: subscribed ? 'var(--success)' : 'var(--accent)', color: '#000' }}
              >
                {subscribed ? '✓' : '→'}
              </button>
            </div>
            {subscribed && <p className="text-xs mt-2" style={{ color: 'var(--success)' }}>✓ Subscribed!</p>}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>© 2026 NorvexPay Technologies Ltd.</span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>🔒 All transactions encrypted · PCI DSS Level 1</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-raised)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              <Globe size={12} /> English
            </button>
            <button onClick={toggleTheme} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all" style={{ background: 'var(--bg-raised)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {dark ? <Sun size={12} /> : <Moon size={12} />}
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
