import {
    CalendarDays,
    Check,
    CircleCheck,
    FileText,
    Hourglass,
    PenSquare,
    Trash2,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/DashboardCard";
import DataTable from "@/components/DataTable";
import Layout from "@/layouts/Layout";

const payrollColumns = [
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

const memosColumns = [
    { key: "issued_by", label: "Issued By" },
    { key: "subject", label: "Subject" },
    { key: "date_sent", label: "Date Sent" },
    { key: "content", label: "Content" },
];

const payrollData = [];
const leaveRequestData = [];
const memosData = [];

export default function DashboardPage() {
    return (
        <>
            <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
                    <DashboardCard
                        icon={CalendarDays}
                        value="15"
                        label="Leave Balance"
                    />
                    <DashboardCard
                        icon={Hourglass}
                        value="2"
                        label="Pending Leave Request"
                    />
                    <DashboardCard
                        icon={CircleCheck}
                        value="4"
                        label="Approve Leaves"
                    />
                    <DashboardCard
                        icon={FileText}
                        value="1"
                        label="Total Memos"
                    />
                </div>

                <div className="flex flex-col gap-y-4">
                    <h1 className="text-3xl font-bold">Quick Access</h1>
                    <Tabs defaultValue="payroll">
                        <TabsList>
                            <TabsTrigger value="payroll">Payroll</TabsTrigger>
                            <TabsTrigger value="leave-requests">
                                Leave Requests
                            </TabsTrigger>
                            <TabsTrigger value="memos">Memos</TabsTrigger>
                        </TabsList>
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
                        <TabsContent value="memos">
                            <DataTable
                                columns={memosColumns}
                                data={memosData}
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
