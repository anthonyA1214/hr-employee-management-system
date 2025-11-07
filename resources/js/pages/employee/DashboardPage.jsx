import { useState } from "react";

import {
    CalendarDays,
    CircleCheck,
    FileText,
    Hourglass,
    StickyNote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/DashboardCard";
import DataTable from "@/components/DataTable";
import Layout from "@/layouts/Layout";
import ViewMemoDialog from "@/components/ViewMemoDialog";

const payrollColumns = [
    { key: "period_start", label: "Period Start" },
    { key: "period_end", label: "Period End" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "overtime_pay", label: "Overtime Pay" },
    { key: "deductions", label: "Deductions" },
    { key: "tax_percentage", label: "Tax Percentage" },
    { key: "net_pay", label: "Net Pay" },
];

const leaveRequestsColumns = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
];

const memosColumns = [
    { key: "issued_by", label: "Issued By" },
    { key: "subject", label: "Subject" },
    { key: "sent_at", label: "Date Sent" },
    { key: "body", label: "Content" },
];

export default function DashboardPage({ counts, payrollData, leaveRequestsData, memosData }) {
    // Memo Dialog State
    const [viewMemo, setViewMemo] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const openViewDialog = (memo) => {
        setViewMemo(memo);
        setIsViewDialogOpen(true);
    };

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
                        value={counts.pendingLeaves}
                        label="Pending Leave Request"
                    />
                    <DashboardCard
                        icon={CircleCheck}
                        value={counts.approvedLeaves}
                        label="Approve Leaves"
                    />
                    <DashboardCard
                        icon={FileText}
                        value={counts.totalMemos}
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
                            />
                        </TabsContent>
                        <TabsContent value="leave-requests">
                            <DataTable
                                columns={leaveRequestsColumns}
                                data={leaveRequestsData}
                            />
                        </TabsContent>
                        <TabsContent value="memos">
                            <DataTable
                                columns={memosColumns}
                                data={memosData}
                                actions={(row) => (
                                    <>
                                        <Button
                                            onClick={() => openViewDialog(row)}
                                            className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                                        >
                                            <StickyNote />
                                        </Button>
                                    </>
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
                {viewMemo && (
                    <ViewMemoDialog
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                        memo={viewMemo}
                    />
                )}
            </div>
        </>
    );
}

DashboardPage.layout = (page) => <Layout>{page}</Layout>;
