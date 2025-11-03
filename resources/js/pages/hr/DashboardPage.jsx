import HRLayout from '@/layouts/HRLayout'

import DashboardCard from '@/components/DashboardCard'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DataTable from "@/components/DataTable"
import { Button } from "@/components/ui/button"

import {
  UsersRound,
  UserCheck2,
  CalendarCheck2,
  FileText,
  PenSquare,
  Trash2,
  CircleCheckBig,
  Check,
  X
} from 'lucide-react'

const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "position", label: "Position" },
  { key: "department", label: "Department" },
  { key: "status", label: "Status" },
]

const payrollColumns = [
  { key: "name", label: "Name" },
  { key: "period_start", label: "Period Start" },
  { key: "period_end", label: "Period End" },
  { key: "basic_salary", label: "Basic Salary" },
  { key: "overtime_pay", label: "Overtime Pay" },
  { key: "deductions", label: "Deductions" },
  { key: "tax_percentage", label: "Tax Percentage" },
  { key: "net_pay", label: "Net Pay" },
]

const leaveRequestColumns = [
  { key: "leave_type", label: "Leave Type" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "days", label: "Days" },
  { key: "reason", label: "Reason" },
]

const data = [
  {
    id: 1,
    first_name: "Rich Mae",
    last_name: "Oredeña",
    email: "oredenarichmae@gmail.com",
    position: "Employee",
    department: "IT Department",
    status: "Active",
  },
  {
    id: 2,
    first_name: "Anthony",
    last_name: "Amiluddin",
    email: "amiluddinanthony@gmail.com",
    position: "Manager",
    department: "IT Department",
    status: "Active",
  },
  {
    id: 3,
    first_name: "Marvin",
    last_name: "Felices",
    email: "felicesmarvin@gmail.com",
    position: "Assistant",
    department: "Finance Department",
    status: "Inactive",
  },
  {
    id: 4,
    first_name: "Rahiem Lebh",
    last_name: "Reyel",
    email: "rahiemreyel@gmail.com",
    position: "Supervisor",
    department: "HR Department",
    status: "Active",
  },
  {
    id: 5,
    first_name: "Louiege",
    last_name: "Tabago",
    email: "tabagolouiege@gmail.com",
    position: "Intern",
    department: "IT Department",
    status: "On Leave",
  },
];

const employeeData = data.map(emp => ({
    ...emp,
    name: `${emp.last_name}, ${emp.first_name}`
}));

const payrollData = []
const leaveRequestData = []

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
        
        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold">Quick Access</h1>
          <Tabs defaultValue="employees">
            <TabsList>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">
              <DataTable columns={employeeColumns} data={employeeData} actions={(row) => (
                <>
                  <Button onClick={() => editEmployee(row.id)} className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"> 
                    <PenSquare /> 
                  </Button> 
                  <Button onClick={() => deleteEmployee(row.id)} className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"> 
                    <Trash2 /> 
                  </Button>
                </>
              )}/>
            </TabsContent>
            <TabsContent value="payroll">
              <DataTable columns={payrollColumns} data={payrollData} actions={(row) => (
                <>
                  <Button onClick={() => editEmployee(row.id)} className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"> 
                    <CircleCheckBig /> 
                  </Button> 
                  <Button onClick={() => deleteEmployee(row.id)} className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"> 
                    <Trash2 /> 
                  </Button>
                </>
              )}/>
            </TabsContent>
            <TabsContent value="leave-requests">
              <DataTable columns={leaveRequestColumns} data={leaveRequestData} actions={(row) => (
                <>
                  <Button onClick={() => editEmployee(row.id)} className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"> 
                    <Check /> 
                  </Button> 
                  <Button onClick={() => deleteEmployee(row.id)} className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"> 
                    <X /> 
                  </Button>
                </>
              )}/>
            </TabsContent>
          </Tabs>
        </div>       
      </div>
    </>
  )
}

DashboardPage.layout = page => <HRLayout>{page}</HRLayout>