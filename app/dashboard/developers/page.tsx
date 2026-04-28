'use client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function Page() {
  const title = 'developers'.charAt(0).toUpperCase() + 'developers'.slice(1)
  return (
    <DashboardLayout title={title}>
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
        <div className="text-4xl mb-4">📂</div>
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
        <p style={{ color: 'var(--muted)' }}>Your {title.toLowerCase()} will appear here once available.</p>
      </div>
    </DashboardLayout>
  )
}
