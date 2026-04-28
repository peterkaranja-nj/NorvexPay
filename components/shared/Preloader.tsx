'use client'
import { useEffect, useState } from 'react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = Date.now()
    const duration = 1800

    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(Math.floor(pct))
      if (pct < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 400)
        }, 200)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  const skip = () => {
    setVisible(false)
    setTimeout(onComplete, 400)
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Logo SVG */}
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-8">
        <path
          d="M30 5 L50 20 L50 40 L30 55 L10 40 L10 20 Z"
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset="0"
          style={{ animation: 'drawPath 1.5s ease forwards' }}
        />
        <path
          d="M30 15 L40 22 L40 38 L30 45 L20 38 L20 22 Z"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="rgba(232,160,32,0.1)"
          strokeDasharray="150"
          strokeDashoffset="0"
          style={{ animation: 'drawPath 1.5s ease 0.3s forwards' }}
        />
        <circle cx="30" cy="30" r="5" fill="var(--accent)" />
      </svg>

      <div
        className="font-mono text-2xl mb-1 tabular-nums"
        style={{ color: 'var(--accent)' }}
      >
        {progress}%
      </div>
      <div className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
        Initializing NorvexPay
      </div>

      {/* Progress bar */}
      <div
        className="w-48 h-0.5 rounded-full overflow-hidden"
        style={{ background: 'var(--bg-float)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{ width: `${progress}%`, background: 'var(--accent)' }}
        />
      </div>

      {/* Skip */}
      <button
        onClick={skip}
        className="absolute bottom-8 right-8 text-xs transition-colors"
        style={{ color: 'var(--muted)', opacity: progress > 25 ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        Skip →
      </button>

      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
