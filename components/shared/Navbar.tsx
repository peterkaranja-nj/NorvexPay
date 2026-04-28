'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Zap, Shield, Globe, CreditCard, ArrowRight, BarChart3, Webhook, Code2, FileText, Activity, Layers } from 'lucide-react'

const productItems = [
  { icon: CreditCard, title: 'Payment Gateway', desc: 'Accept payments globally' },
  { icon: Layers, title: 'Card Issuing', desc: 'Issue virtual & physical cards' },
  { icon: Globe, title: 'Open Banking', desc: 'Connect bank accounts directly' },
  { icon: Zap, title: 'Mass Payouts', desc: 'Send money at scale' },
  { icon: Shield, title: 'Fraud & Risk', desc: 'AI-powered protection' },
  { icon: BarChart3, title: 'BaaS', desc: 'Banking as a service' },
]

const devItems = {
  col1: [
    { icon: Code2, label: 'API Reference' },
    { icon: FileText, label: 'SDKs' },
    { icon: Webhook, label: 'Webhooks' },
  ],
  col2: [
    { icon: Activity, label: 'Changelog' },
    { icon: Globe, label: 'Status Page' },
    { icon: Shield, label: 'Sandbox' },
  ],
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = (name: string) => {
    if (menuTimer.current) clearTimeout(menuTimer.current)
    menuTimer.current = setTimeout(() => setActiveMenu(name), 150)
  }

  const closeMenu = () => {
    if (menuTimer.current) clearTimeout(menuTimer.current)
    menuTimer.current = setTimeout(() => setActiveMenu(null), 150)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[999] h-[72px] flex items-center px-6 lg:px-10 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,10,15,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-12 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 6V12L9 16L3 12V6Z" fill="#000" opacity="0.8" />
              <circle cx="9" cy="9" r="2.5" fill="#000" />
            </svg>
          </div>
          <span className="font-display font-black text-lg tracking-tight" style={{ color: 'var(--text)' }}>
            Norvex<span style={{ color: 'var(--accent)' }}>Pay</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          {['Products', 'Solutions', 'Developers', 'Pricing'].map(item => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => openMenu(item)}
              onMouseLeave={closeMenu}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: activeMenu === item ? 'var(--text)' : 'var(--muted)' }}
              >
                {item}
                <ChevronDown size={14} className={`transition-transform ${activeMenu === item ? 'rotate-180' : ''}`} />
              </button>

              {/* Products dropdown */}
              {item === 'Products' && activeMenu === 'Products' && (
                <div
                  className="absolute top-full left-0 mt-2 p-4 rounded-2xl w-[480px]"
                  style={{
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border-bright)',
                    backdropFilter: 'blur(20px)',
                    animation: 'fadeDown 0.2s ease',
                  }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {productItems.map(({ icon: Icon, title, desc }) => (
                      <Link
                        key={title}
                        href="#"
                        className="flex items-start gap-3 p-3 rounded-xl transition-all group"
                        style={{ color: 'var(--text)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-float)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)' }}>
                          <Icon size={15} style={{ color: 'var(--accent)' }} />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{title}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions dropdown */}
              {item === 'Solutions' && activeMenu === 'Solutions' && (
                <div
                  className="absolute top-full left-0 mt-2 p-3 rounded-2xl w-48"
                  style={{
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border-bright)',
                    backdropFilter: 'blur(20px)',
                    animation: 'fadeDown 0.2s ease',
                  }}
                >
                  {['Fintechs', 'Enterprises', 'Marketplaces', 'Banks', 'Crypto'].map(s => (
                    <Link
                      key={s}
                      href="#"
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all"
                      style={{ color: 'var(--muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-float)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)' }}
                    >
                      {s} <ArrowRight size={12} />
                    </Link>
                  ))}
                </div>
              )}

              {/* Developers dropdown */}
              {item === 'Developers' && activeMenu === 'Developers' && (
                <div
                  className="absolute top-full left-0 mt-2 p-4 rounded-2xl w-[400px]"
                  style={{
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border-bright)',
                    backdropFilter: 'blur(20px)',
                    animation: 'fadeDown 0.2s ease',
                  }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      {devItems.col1.map(({ icon: Icon, label }) => (
                        <Link key={label} href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all" style={{ color: 'var(--muted)' }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg-float)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}>
                          <Icon size={13} /> {label}
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {devItems.col2.map(({ icon: Icon, label }) => (
                        <Link key={label} href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all" style={{ color: 'var(--muted)' }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg-float)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}>
                          <Icon size={13} /> {label}
                        </Link>
                      ))}
                    </div>
                    <div
                      className="p-3 rounded-xl text-xs"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-bright)' }}
                    >
                      <div className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>New</div>
                      <div className="font-medium text-xs mb-1" style={{ color: 'var(--text)' }}>Instant Payouts API</div>
                      <div style={{ color: 'var(--muted)' }}>Real-time settlement now live</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right section */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <div className="status-dot" />
            All systems operational
          </div>
          <Link
            href="/signin"
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'var(--accent)', color: '#000' }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 rounded-lg"
          style={{ color: 'var(--text)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[72px] z-[998]"
          style={{
            background: 'rgba(8,10,15,0.97)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div className="p-6 space-y-2" onClick={e => e.stopPropagation()}>
            {['Products', 'Solutions', 'Developers', 'Pricing'].map((item, i) => (
              <Link
                key={item}
                href="#"
                className="block py-3 border-b font-serif italic text-2xl transition-colors"
                style={{
                  color: 'var(--text)',
                  borderColor: 'var(--border)',
                  animationDelay: `${i * 50}ms`,
                  animation: 'fadeUp 0.4s ease forwards',
                  opacity: 0,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-6 space-y-3">
              <Link href="/signin" className="block w-full text-center py-3 rounded-xl border text-sm font-medium" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
                Sign in
              </Link>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--accent)', color: '#000' }}>
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
