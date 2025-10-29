import HRLayout from '@/layouts/HRLayout'
import DashboardCard from '@/components/DashboardCard'

import {
  UsersRound,
  UserCheck2,
  CalendarCheck2,
  FileText
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-y-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
          <DashboardCard icon={UsersRound} value="172" label="Total Employees"/>
          <DashboardCard icon={UserCheck2} value="128" label="Active Users"/>
          <DashboardCard icon={CalendarCheck2} value="12" label="Pending Leave Request"/>
          <DashboardCard icon={FileText} value="17" label="Total Memos"/>
        </div>

        <h1 className="text-3xl font-bold">Quick Access</h1>
      </div>
    </>
  )
}

DashboardPage.layout = page => <HRLayout>{page}</HRLayout>