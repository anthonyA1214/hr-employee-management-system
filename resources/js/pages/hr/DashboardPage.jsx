import {
    CalendarCheck2,
    Check,
    CircleCheckBig,
    FileText,
    PenSquare,
    Trash2,
    UserCheck2,
    UsersRound,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import DashboardCard from "@/components/DashboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layouts/Layout";


const employeeColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status" },
];

const payrollColumns = [
    { key: "name", label: "Name" },
    { key: "period_start", label: "Period Start" },
    { key: "period_end", label: "Period End" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "overtime_pay", label: "Overtime Pay" },
    { key: "deductions", label: "Deductions" },
    { key: "tax_percentage", label: "Tax Percentage" },
    { key: "net_pay", label: "Net Pay" },
];

const leaveRequestColumns = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
];

const employeeData = [];
const payrollData = [];
const leaveRequestData = [];

export default function DashboardPage() {
    return (
        <>
            <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
                    <DashboardCard
                        icon={UsersRound}
                        value="172"
                        label="Total Employees"
                    />
                    <DashboardCard
                        icon={UserCheck2}
                        value="128"
                        label="Active Users"
                    />
                    <DashboardCard
                        icon={CalendarCheck2}
                        value="12"
                        label="Pending Leave Request"
                    />
                    <DashboardCard
                        icon={FileText}
                        value="17"
                        label="Total Memos"
                    />
                </div>

                <div className="flex flex-col gap-y-4">
                    <h1 className="text-3xl font-bold">Quick Access</h1>
                    <Tabs defaultValue="employees">
                        <TabsList>
                            <TabsTrigger value="employees">
                                Employees
                            </TabsTrigger>
                            <TabsTrigger value="payroll">Payroll</TabsTrigger>
                            <TabsTrigger value="leave-requests">
                                Leave Requests
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="employees">
                            <DataTable
                                columns={employeeColumns}
                                data={employeeData}
                                actions={(row) => (
                                    <>
                                        <Button
                                            onClick={() => editEmployee(row.id)}
                                            className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                                        >
                                            <PenSquare />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                deleteEmployee(row.id)
                                            }
                                            className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </>
                                )}
                            />
                        </TabsContent>
                        <TabsContent value="payroll">
                            <DataTable
                                columns={payrollColumns}
                                data={payrollData}
                                actions={(row) => (
                                    <>
                                        <Button
                                            onClick={() => editEmployee(row.id)}
                                            className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                                        >
                                            <CircleCheckBig />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                deleteEmployee(row.id)
                                            }
                                            className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </>
                                )}
                            />
                        </TabsContent>
                        <TabsContent value="leave-requests">
                            <DataTable
                                columns={leaveRequestColumns}
                                data={leaveRequestData}
                                actions={(row) => (
                                    <>
                                        <Button
                                            onClick={() => editEmployee(row.id)}
                                            className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                                        >
                                            <Check />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                deleteEmployee(row.id)
                                            }
                                            className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"
                                        >
                                            <X />
                                        </Button>
                                    </>
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

DashboardPage.layout = (page) => <Layout>{page}</Layout>;
