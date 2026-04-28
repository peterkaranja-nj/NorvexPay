'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Eye, EyeOff, RefreshCw, Check, Plus, X } from 'lucide-react'

const tabs = ['Business Profile', 'Payment Methods', 'Team & Roles', 'Security', 'Notifications']

const teamMembers = [
  { name: 'James Thornton', email: 'james@swiftcart.io', role: 'Owner', status: 'Active', initials: 'JT', color: 'var(--accent)' },
  { name: 'Sofia Reyes', email: 'sofia@swiftcart.io', role: 'Admin', status: 'Active', initials: 'SR', color: '#3B82F6' },
  { name: 'Kai Nakamura', email: 'kai@swiftcart.io', role: 'Developer', status: 'Active', initials: 'KN', color: '#A855F7' },
  { name: 'Invited User', email: 'new@team.io', role: 'Finance', status: 'Pending', initials: '?', color: 'var(--muted)' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Business Profile')
  const [saved, setSaved] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Developer')
  const [members, setMembers] = useState(teamMembers)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleInvite = () => {
    if (inviteEmail) {
      setMembers(prev => [...prev, { name: 'Invited User', email: inviteEmail, role: inviteRole, status: 'Pending', initials: inviteEmail[0].toUpperCase(), color: 'var(--muted)' }])
      setInviteEmail('')
      setInviteOpen(false)
    }
  }

  const sessions = [
    { device: 'Chrome on macOS', location: 'Lagos, NG', last: 'Now (current)', current: true },
    { device: 'Safari on iPhone', location: 'London, UK', last: '2 hours ago', current: false },
    { device: 'Firefox on Windows', location: 'New York, US', last: '1 day ago', current: false },
  ]

  const inputStyle = { background: 'var(--bg-float)', border: '1px solid var(--border)', color: 'var(--text)' }

  return (
    <DashboardLayout title="Settings">
      <div className="flex gap-6">
        {/* Sub-nav */}
        <div className="w-48 flex-shrink-0">
          <div className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: activeTab === tab ? 'var(--bg-float)' : 'transparent',
                  color: activeTab === tab ? 'var(--text)' : 'var(--muted)',
                  borderLeft: activeTab === tab ? '3px solid var(--accent)' : '3px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Business Profile */}
          {activeTab === 'Business Profile' && (
            <div className="p-6 rounded-2xl space-y-5" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
              <h2 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>Business Profile</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Business name', value: 'SwiftCart Technologies' },
                  { label: 'Support email', value: 'support@swiftcart.io' },
                  { label: 'Website', value: 'https://swiftcart.io' },
                  { label: 'Country', value: 'United States' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--muted)' }}>{f.label}</label>
                    <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--muted)' }}>Company logo</label>
                <div
                  className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed text-sm cursor-pointer transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span>Drag & drop or click to upload</span>
                  <span className="text-xs mt-1" style={{ color: 'var(--muted)' }}>PNG, JPG, SVG up to 2MB</span>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: saved ? 'var(--success)' : 'var(--accent)', color: '#000' }}
              >
                {saved ? <><Check size={15} /> Saved!</> : 'Save changes'}
              </button>
            </div>
          )}

          {/* Team & Roles */}
          {activeTab === 'Team & Roles' && (
            <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>Team & Roles</h2>
                <button
                  onClick={() => setInviteOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}
                >
                  <Plus size={15} /> Invite member
                </button>
              </div>

              {inviteOpen && (
                <div className="mb-4 p-4 rounded-xl" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)' }}>
                  <div className="flex gap-3">
                    <input placeholder="Email address" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
                    <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle}>
                      {['Owner', 'Admin', 'Developer', 'Finance', 'Read-Only'].map(r => <option key={r}>{r}</option>)}
                    </select>
                    <button onClick={handleInvite} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent)', color: '#000' }}>Invite</button>
                    <button onClick={() => setInviteOpen(false)} style={{ color: 'var(--muted)' }}><X size={18} /></button>
                  </div>
                </div>
              )}

              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Member', 'Role', 'Status', 'Actions'].map(col => (
                      <th key={col} className="pb-3 text-left text-xs font-semibold" style={{ color: 'var(--muted)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: 'var(--border)' }}>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${m.color}20`, color: m.color }}>
                            {m.initials}
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{m.name}</div>
                            <div className="text-xs" style={{ color: 'var(--muted)' }}>{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm" style={{ color: 'var(--muted)' }}>{m.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full text-xs" style={{ background: m.status === 'Active' ? 'rgba(34,197,94,0.12)' : 'rgba(107,122,153,0.15)', color: m.status === 'Active' ? 'var(--success)' : 'var(--muted)' }}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {m.role !== 'Owner' && (
                          <button className="text-xs" style={{ color: 'var(--danger)' }}>Remove</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Security */}
          {activeTab === 'Security' && (
            <div className="space-y-4">
              {/* 2FA */}
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Two-Factor Authentication</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Add an extra layer of security to your account</p>
                  </div>
                  <button onClick={() => setTwoFAEnabled(!twoFAEnabled)} className="relative w-12 h-6 rounded-full" style={{ background: twoFAEnabled ? 'var(--accent)' : 'var(--bg-float)', border: '1px solid var(--border)' }}>
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: twoFAEnabled ? 'calc(100% - 22px)' : '2px' }} />
                  </button>
                </div>
                {twoFAEnabled && (
                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-float)', border: '1px solid var(--border)' }}>
                    <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>Scan with Google Authenticator</p>
                    <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-3" style={{ background: '#fff' }}>
                      <div className="grid grid-cols-4 gap-0.5">
                        {Array.from({ length: 16 }, (_, i) => (
                          <div key={i} className="w-4 h-4 rounded-sm" style={{ background: Math.random() > 0.5 ? '#000' : '#fff' }} />
                        ))}
                      </div>
                    </div>
                    <input placeholder="Enter 6-digit code" className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} maxLength={6} />
                  </div>
                )}
              </div>

              {/* API Keys */}
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>API Keys</h3>
                {[
                  { label: 'Test key', key: 'nv_test_sk_••••••••••••••••••••••••••••••••••••••••' },
                  { label: 'Live key', key: 'nv_live_sk_••••••••••••••••••••••••••••••••••••••••' },
                ].map((k, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <span className="text-xs w-20 flex-shrink-0" style={{ color: 'var(--muted)' }}>{k.label}</span>
                    <code className="flex-1 px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--bg-float)', color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {showApiKey ? k.key.replace(/•+/, `sk_live_xyz${i === 0 ? '_test' : ''}_realkey`) : k.key}
                    </code>
                    <button onClick={() => setShowApiKey(!showApiKey)} style={{ color: 'var(--muted)' }}>
                      {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: 'var(--bg-float)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      <RefreshCw size={12} /> Regen
                    </button>
                  </div>
                ))}
              </div>

              {/* Sessions */}
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Active Sessions</h3>
                <div className="space-y-3">
                  {sessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-float)' }}>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{s.device}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.location} · {s.last}</div>
                      </div>
                      {s.current ? (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: 'var(--success)' }}>Current</span>
                      ) : (
                        <button className="text-xs" style={{ color: 'var(--danger)' }}>Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {!['Business Profile', 'Team & Roles', 'Security'].includes(activeTab) && (
            <div className="p-12 rounded-2xl text-center" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{activeTab}</h3>
              <p style={{ color: 'var(--muted)' }}>Settings for {activeTab.toLowerCase()} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
