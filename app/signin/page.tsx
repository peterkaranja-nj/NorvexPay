'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

const quotes = [
  { text: '"NorvexPay transformed our payment infrastructure overnight. API clarity is unmatched."', author: 'Claire Mimo, CTO at Luminary Finance' },
  { text: '"We expanded to 14 markets in a month. NorvexPay handled every edge case."', author: 'Sofia Rodriguez, VP Payments at Meridian Bank' },
  { text: '"Fraud dropped 87% in Q1. The AI engine just works."', author: 'James Thornton, COO at SwiftCart' },
]

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [failures, setFailures] = useState(0)
  const [remember, setRemember] = useState(false)
  const [quoteIdx] = useState(0)

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1000))

    // Simulate: any credentials work
    if (password.length >= 1) {
      router.push('/dashboard')
    } else {
      setFailures(f => f + 1)
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left brand panel */}
      <div
        className="hidden lg:flex flex-col w-[40%] relative overflow-hidden p-10"
        style={{ background: 'var(--bg-raised)', borderRight: '1px solid var(--border)' }}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(232,160,32,0.2) 0%, transparent 70%)' }} />

        {/* Particles background */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'var(--accent)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 6V12L9 16L3 12V6Z" fill="#000" opacity="0.8" />
              <circle cx="9" cy="9" r="2.5" fill="#000" />
            </svg>
          </div>
          <span className="font-black text-xl" style={{ color: 'var(--text)' }}>
            Norvex<span style={{ color: 'var(--accent)' }}>Pay</span>
          </span>
        </Link>

        {/* Center quote */}
        <div className="flex-1 flex items-center relative z-10">
          <div>
            <div className="text-5xl mb-4 leading-none" style={{ color: 'var(--accent)', fontFamily: 'Instrument Serif, serif', opacity: 0.4 }}>"</div>
            <blockquote
              className="text-lg italic leading-relaxed mb-4"
              style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}
            >
              {quotes[quoteIdx].text}
            </blockquote>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>{quotes[quoteIdx].author}</div>
          </div>
        </div>

        {/* Certs */}
        <div className="flex gap-2 flex-wrap relative z-10">
          {['PCI DSS', 'ISO 27001', 'SOC 2'].map(c => (
            <span key={c} className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 6V12L9 16L3 12V6Z" fill="#000" opacity="0.8" />
                <circle cx="9" cy="9" r="2.5" fill="#000" />
              </svg>
            </div>
            <span className="font-black text-lg" style={{ color: 'var(--text)' }}>Norvex<span style={{ color: 'var(--accent)' }}>Pay</span></span>
          </Link>

          <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>Sign in to your merchant dashboard</p>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-8" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
            <div className="flex-1 py-2 rounded-lg text-center text-sm font-medium" style={{ background: 'var(--bg-float)', color: 'var(--text)' }}>
              Sign in
            </div>
            <Link href="/signup" className="flex-1 py-2 rounded-lg text-center text-sm" style={{ color: 'var(--muted)' }}>
              Create account
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', animation: 'shake 0.4s ease' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--muted)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--muted)' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                Remember this device
              </label>
              <Link href="#" className="text-xs" style={{ color: 'var(--accent)' }}>Forgot password?</Link>
            </div>

            {failures >= 3 && (
              <div className="p-3 rounded-xl text-xs text-center" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                🤖 Please verify you&apos;re human (CAPTCHA placeholder)
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{ background: 'var(--accent)', color: '#000', opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                'Sign in to dashboard'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Google', icon: '🔵' },
              { label: 'GitHub', icon: '⚫' },
            ].map(p => (
              <button
                key={p.label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-bright)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
            No account?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)' }}>Create one free →</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
