import HRLayout from '@/layouts/HRLayout'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>
      <p>Welcome to the HR dashboard!</p>
    </div>
  )
}

DashboardPage.layout = page => <HRLayout>{page}</HRLayout>