'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ArrowUpDown, SendHorizonal, Users, Link2,
  FileText, BarChart3, Code2, Settings, LogOut, ChevronLeft, ChevronRight,
  Layers
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ArrowUpDown, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: SendHorizonal, label: 'Payouts', href: '/dashboard/payouts' },
  { icon: Users, label: 'Customers', href: '/dashboard/customers' },
  { icon: Link2, label: 'Payment Links', href: '/dashboard/payment-links' },
  { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Code2, label: 'Developers', href: '/dashboard/developers' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

interface SidebarProps {
  env: 'TEST' | 'LIVE'
  onEnvChange: (env: 'TEST' | 'LIVE') => void
}

export default function Sidebar({ env, onEnvChange }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '64px' : '240px',
        background: 'var(--bg-raised)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
          <Layers size={16} color="#000" />
        </div>
        {!collapsed && (
          <span className="font-black text-base" style={{ color: 'var(--text)' }}>
            Norvex<span style={{ color: 'var(--accent)' }}>Pay</span>
          </span>
        )}
      </div>

      {/* Env toggle */}
      {!collapsed && (
        <div className="px-4 py-3 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex rounded-lg p-0.5 gap-0.5" style={{ background: 'var(--bg-float)' }}>
            {(['TEST', 'LIVE'] as const).map(e => (
              <button
                key={e}
                onClick={() => onEnvChange(e)}
                className="flex-1 py-1.5 rounded-md text-xs font-bold transition-all"
                style={{
                  background: env === e ? (e === 'LIVE' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)') : 'transparent',
                  color: env === e ? (e === 'LIVE' ? 'var(--success)' : '#60A5FA') : 'var(--muted)',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all group relative"
              style={{
                borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                background: active ? 'var(--bg-float)' : 'transparent',
                color: active ? 'var(--text)' : 'var(--muted)',
                marginBottom: '2px',
              }}
              title={collapsed ? label : ''}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {collapsed && (
                <div
                  className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'var(--bg-float)', color: 'var(--text)', border: '1px solid var(--border)', zIndex: 100 }}
                >
                  {label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        {!collapsed && (
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #F5C842 100%)', color: '#000' }}>
              JT
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>James Thornton</div>
              <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>Owner</div>
            </div>
          </div>
        )}
        <button
          onClick={() => router.push('/')}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
          title={collapsed ? 'Sign out' : ''}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-all"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
