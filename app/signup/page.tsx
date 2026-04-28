'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Eye, EyeOff, ChevronLeft } from 'lucide-react'

const steps = ['Account Type', 'Personal Info', 'Business Info', 'Verify Email', 'Success']

function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    if (!password) return 0
    if (password.length < 8) return 1
    if (password.length >= 8 && !/[0-9!@#$%^&*]/.test(password)) return 2
    if (password.length >= 8) return 3
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9!@#$%^&*]/.test(password)) return 4
    return 3
  }
  const s = getStrength()
  const labels = ['', 'Too short', 'Weak', 'Fair', 'Strong ✓']
  const colors = ['', 'var(--danger)', '#F97316', '#F59E0B', 'var(--success)']
  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
            background: i <= s ? colors[s] : 'var(--bg-float)'
          }} />
        ))}
      </div>
      {password && <div className="text-xs" style={{ color: colors[s] }}>{labels[s]}</div>}
    </div>
  )
}

function OTPInput({ onComplete }: { onComplete: (code: string) => void }) {
  const [values, setValues] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...values]
    next[i] = val.slice(-1)
    setValues(next)
    if (val && i < 5) refs.current[i + 1]?.focus()
    if (next.every(v => v) && next.join('').length === 6) onComplete(next.join(''))
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setValues(pasted.split(''))
      onComplete(pasted)
    }
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) refs.current[i - 1]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {values.map((v, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text"
          maxLength={1}
          value={v}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all"
          style={{
            background: 'var(--bg-raised)',
            border: v ? '2px solid var(--accent)' : '2px solid var(--border)',
            color: 'var(--text)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        />
      ))}
    </div>
  )
}

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [accountType, setAccountType] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [country, setCountry] = useState('')
  const [bizType, setBizType] = useState('')
  const [website, setWebsite] = useState('')
  const [volume, setVolume] = useState('')
  const [otpDone, setOtpDone] = useState(false)
  const [resendTimer, setResendTimer] = useState(45)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (step === 3 && resendTimer > 0) {
      const t = setInterval(() => setResendTimer(r => r - 1), 1000)
      return () => clearInterval(t)
    }
  }, [step, resendTimer])

  useEffect(() => {
    if (step === 4) {
      const t = setInterval(() => setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(() => router.push('/dashboard'), 500); return 100 }
        return p + 2
      }), 50)
      return () => clearInterval(t)
    }
  }, [step, router])

  const next = () => setStep(s => Math.min(s + 1, 4))
  const prev = () => setStep(s => Math.max(s - 1, 0))
  const skipBiz = accountType === 'individual'

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left brand */}
      <div className="hidden lg:flex flex-col w-[40%] relative overflow-hidden p-10" style={{ background: 'var(--bg-raised)', borderRight: '1px solid var(--border)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(232,160,32,0.2) 0%, transparent 70%)' }} />
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 6V12L9 16L3 12V6Z" fill="#000" opacity="0.8" />
              <circle cx="9" cy="9" r="2.5" fill="#000" />
            </svg>
          </div>
          <span className="font-black text-xl" style={{ color: 'var(--text)' }}>Norvex<span style={{ color: 'var(--accent)' }}>Pay</span></span>
        </Link>
        <div className="flex-1 flex items-center relative z-10">
          <div>
            <h2 className="text-3xl mb-4 italic" style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}>
              Join the global payment revolution.
            </h2>
            <ul className="space-y-3">
              {['No credit card required', 'Go live in under 4 hours', 'Support in 180+ countries'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap relative z-10">
          {['PCI DSS', 'ISO 27001', 'SOC 2'].map(c => (
            <span key={c} className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Progress indicator */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                {steps.slice(0, -1).map((s, i) => {
                  const realStep = skipBiz && i >= 2 ? (i === 2 ? 999 : i - 1) : i
                  const display = skipBiz && i === 2 ? null : i
                  if (skipBiz && i === 2) return null
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: step > i ? 'var(--success)' : step === i ? 'var(--accent)' : 'var(--bg-float)',
                          color: step > i || step === i ? '#000' : 'var(--muted)',
                        }}
                      >
                        {step > i ? <Check size={12} /> : (i + 1)}
                      </div>
                      {i < (skipBiz ? 2 : 3) && (
                        <div className="flex-1 h-0.5" style={{ background: step > i ? 'var(--accent)' : 'var(--bg-float)' }} />
                      )}
                    </div>
                  )
                })}
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Step {step + 1} of {skipBiz ? 3 : 4}: {steps[step]}</p>
            </div>
          )}

          {/* Step 0: Account Type */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>Create your account</h1>
              <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>What describes you best?</p>
              <div className="space-y-3 mb-8">
                {[
                  { id: 'individual', icon: '🧑', title: 'Individual / Freelancer', desc: 'Accept payments personally' },
                  { id: 'business', icon: '🏢', title: 'Business / Startup', desc: 'Register a business account' },
                  { id: 'enterprise', icon: '🏦', title: 'Enterprise', desc: 'High-volume, custom solutions' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setAccountType(opt.id)}
                    className="w-full flex items-start gap-4 p-4 rounded-xl text-left relative transition-all"
                    style={{
                      background: accountType === opt.id ? 'var(--accent-dim)' : 'var(--bg-raised)',
                      border: accountType === opt.id ? '2px solid var(--accent)' : '2px solid var(--border)',
                    }}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{opt.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{opt.desc}</div>
                    </div>
                    {accountType === opt.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                        <Check size={11} color="#000" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                disabled={!accountType}
                onClick={next}
                className="w-full py-4 rounded-xl font-semibold text-sm transition-all"
                style={{ background: 'var(--accent)', color: '#000', opacity: accountType ? 1 : 0.4 }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>Personal information</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Tell us a bit about yourself</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} className="px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} className="px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 pr-10 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                {password && <PasswordStrength password={password} />}
                <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)', borderColor: confirm && confirm !== password ? 'var(--danger)' : undefined }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={prev} className="flex items-center gap-1 px-4 py-3 rounded-xl text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button onClick={next} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--accent)', color: '#000' }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && !skipBiz && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>Business details</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Tell us about your business</p>
              <div className="space-y-4">
                <input placeholder="Business name" value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: country ? 'var(--text)' : 'var(--muted)' }}>
                  <option value="" disabled>Country of incorporation</option>
                  {['United States', 'United Kingdom', 'Nigeria', 'Kenya', 'Germany', 'Singapore', 'Canada', 'Australia'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select value={bizType} onChange={e => setBizType(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: bizType ? 'var(--text)' : 'var(--muted)' }}>
                  <option value="" disabled>Business type</option>
                  {['SaaS', 'E-commerce', 'Marketplace', 'Lending', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input placeholder="Website URL" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text)' }} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                <div>
                  <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Monthly volume estimate</p>
                  <div className="grid grid-cols-4 gap-2">
                    {['<$10K', '$10K–$100K', '$100K–$1M', '$1M+'].map(v => (
                      <button key={v} onClick={() => setVolume(v)} className="py-2 rounded-lg text-xs font-medium" style={{ background: volume === v ? 'var(--accent-dim)' : 'var(--bg-raised)', border: `1px solid ${volume === v ? 'var(--accent)' : 'var(--border)'}`, color: volume === v ? 'var(--accent)' : 'var(--muted)' }}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={prev} className="flex items-center gap-1 px-4 py-3 rounded-xl text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button onClick={next} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--accent)', color: '#000' }}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 (or 2 if individual): Verify Email */}
          {((step === 2 && skipBiz) || (step === 3 && !skipBiz)) && (
            <div style={{ animation: 'fadeUp 0.4s ease' }} className="text-center">
              <div className="mb-6">
                <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto">
                  <rect x="5" y="15" width="70" height="42" rx="4" stroke="var(--accent)" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="1s" fill="freeze" />
                  </rect>
                  <path d="M5 19 L40 38 L75 19" stroke="var(--accent)" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" from="0 200" to="200 0" dur="1s" begin="0.5s" fill="freeze" />
                  </path>
                </svg>
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ color: 'var(--text)' }}>Check your inbox</h1>
              <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
                We sent a 6-digit code to <strong style={{ color: 'var(--text)' }}>{email || 'james@example.com'}</strong>
              </p>
              <OTPInput onComplete={() => { setOtpDone(true); setTimeout(next, 500) }} />
              <div className="mt-6">
                {resendTimer > 0 ? (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    Resend in <span className="font-mono" style={{ color: 'var(--text)' }}>00:{String(resendTimer).padStart(2, '0')}</span>
                  </p>
                ) : (
                  <button onClick={() => setResendTimer(45)} className="text-sm" style={{ color: 'var(--accent)' }}>Resend code</button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }} className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-dim)', border: '2px solid var(--accent)' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <polyline points="8,20 16,28 32,12" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <animate attributeName="stroke-dasharray" from="0 80" to="80 0" dur="0.6s" fill="freeze" />
                    </polyline>
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--text)' }}>
                Welcome to NorvexPay, {firstName || 'James'}!
              </h1>
              <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
                Your account is ready. Taking you to your dashboard...
              </p>
              <div className="w-full h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg-raised)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--accent)' }} />
              </div>
              <button onClick={() => router.push('/dashboard')} className="text-sm" style={{ color: 'var(--accent)' }}>
                Go now →
              </button>
              {/* Confetti dots */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['var(--accent)', '#fff', '#F5C842', '#E8A020'][i % 4],
                      left: `${Math.random() * 100}%`,
                      top: `-20px`,
                      animation: `confettiFall ${1 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {step < 4 && step > 0 && (
            <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
              Already have an account? <Link href="/signin" style={{ color: 'var(--accent)' }}>Sign in</Link>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
