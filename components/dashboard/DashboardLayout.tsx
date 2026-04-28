'use client'
import { useState, ReactNode } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

interface DashboardLayoutProps {
  children: ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [env, setEnv] = useState<'TEST' | 'LIVE'>('LIVE')

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar env={env} onEnvChange={setEnv} />
      <div style={{ marginLeft: '240px' }}>
        <DashboardHeader title={title} />
        <main className="pt-16 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
