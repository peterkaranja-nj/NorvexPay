'use client'
import { useState } from 'react'
import { Bell, Search, X, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const notifications = [
  { icon: '⚡', message: 'Payout of $3,400 completed', time: '2 min ago', read: false },
  { icon: '⚠️', message: 'Webhook endpoint failing — 3 retries', time: '14 min ago', read: false },
  { icon: '🔒', message: 'New login from Nairobi, KE', time: '1 hour ago', read: true },
]

export default function DashboardHeader({ title }: { title: string }) {
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [notifs, setNotifs] = useState(notifications)

  const unread = notifs.filter(n => !n.read).length

  return (
    <header
      className="fixed right-0 top-0 z-40 h-16 flex items-center px-6 gap-4 transition-all"
      style={{
        left: '240px',
        background: 'rgba(13,16,24,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Title */}
      <h1 className="font-black text-lg flex-shrink-0" style={{ color: 'var(--text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {title}
      </h1>

      {/* Search */}
      <div
        className="flex-1 max-w-md flex items-center gap-3 px-4 py-2 rounded-xl cursor-text"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        <Search size={15} style={{ color: 'var(--muted)' }} />
        <span className="text-sm flex-1" style={{ color: 'var(--muted)' }}>Search...</span>
        <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: notifOpen ? 'var(--bg-float)' : 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            <Bell size={18} />
            {unread > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold" style={{ background: 'var(--accent)', color: '#000' }}>
                {unread}
              </div>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-bright)' }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Notifications</span>
                <button
                  onClick={() => setNotifs(prev => prev.map(n => ({ ...n, read: true })))}
                  className="text-xs"
                  style={{ color: 'var(--accent)' }}
                >
                  Mark all read
                </button>
              </div>
              {notifs.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 border-b transition-all cursor-pointer"
                  style={{
                    borderColor: 'var(--border)',
                    background: n.read ? 'transparent' : 'var(--accent-dim)',
                  }}
                  onClick={() => setNotifs(prev => prev.map((nn, j) => j === i ? { ...nn, read: true } : nn))}
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{n.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: 'var(--text)' }}>{n.message}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: 'var(--accent)' }} />}
                </div>
              ))}
              <div className="px-4 py-2">
                <button className="text-xs w-full text-center" style={{ color: 'var(--accent)' }}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
            style={{ background: userOpen ? 'var(--bg-float)' : 'transparent', border: '1px solid var(--border)' }}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #F5C842 100%)', color: '#000' }}>
              JT
            </div>
            <ChevronDown size={14} style={{ color: 'var(--muted)' }} />
          </button>

          {userOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-bright)' }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>James Thornton</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>james@swiftcart.io</div>
              </div>
              {[
                { icon: User, label: 'Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: HelpCircle, label: 'Help' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all" style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-float)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}>
                  <Icon size={15} /> {label}
                </button>
              ))}
              <div className="border-t" style={{ borderColor: 'var(--border)' }}>
                <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm" style={{ color: 'var(--danger)' }}>
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
