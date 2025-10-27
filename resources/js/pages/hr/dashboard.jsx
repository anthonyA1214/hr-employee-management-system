import HRLayout from '@/layouts/HRLayout'
import { Camera } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>
      <p>Welcome to the HR dashboard!</p>
      <Camera className="h-6 w-6 text-gray-500" />
    </div>
  )
}

Dashboard.layout = page => <HRLayout>{page}</HRLayout>