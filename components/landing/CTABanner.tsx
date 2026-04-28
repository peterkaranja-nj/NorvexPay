'use client'
import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div
          className="relative rounded-3xl p-12 lg:p-16 overflow-hidden text-center"
          style={{
            background: 'linear-gradient(120deg, var(--accent-dim) 0%, rgba(59,130,246,0.06) 100%)',
            border: '1px solid var(--border-bright)',
          }}
        >
          {/* Amber glow top right */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(232,160,32,0.2) 0%, transparent 70%)',
            }}
          />

          {/* Animated mesh gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 80%, rgba(232,160,32,0.04) 0%, transparent 60%)',
              animation: 'meshShift 8s ease-in-out infinite alternate',
            }}
          />

          <div className="relative">
            <h2
              className="text-3xl lg:text-5xl font-black mb-4 leading-tight"
              style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Ready to power your<br />payment infrastructure?
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--muted)', fontWeight: 300 }}>
              Join 500+ companies processing billions globally. No setup fees. Go live in days.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: 'var(--accent)', color: '#000', minWidth: '200px', textAlign: 'center' }}
              >
                Create free account →
              </Link>
              <Link
                href="#"
                className="px-8 py-4 rounded-xl font-semibold text-sm border transition-all"
                style={{ border: '1px solid var(--border-bright)', color: 'var(--text)' }}
              >
                Talk to Us today
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes meshShift {
          from { opacity: 0.5; transform: scale(1); }
          to { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}
