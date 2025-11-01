import HRLayout from "@/layouts/HRLayout";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import AddPayrollDialog from "@/components/AddPayrollDialog";
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
import DataTable from "@/components/DataTable"

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

const payrollData = []

export default function PayrollPage() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Payroll Management</h1>
                    <AddPayrollDialog />
                </div>

                <div className="flex bg-[#F2F2F2] w-full p-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm gap-4">
                    <InputGroup>
                        <InputGroupInput id="query" name="query" type="text" placeholder="Search by name..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button type="submit" className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">Search</Button>
                </div>

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
            </div>
        </>
    )
}

PayrollPage.layout = page => <HRLayout>{page}</HRLayout>