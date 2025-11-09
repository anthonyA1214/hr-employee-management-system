import { useState } from "react";
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
import EditEmployeeDialog from "@/components/EditEmployeeDialog";
import DeleteEmployeeDialog from "@/components/DeleteEmployeeDialog";
import SendPayrollRecordDialog from "@/components/SendPayrollRecordDialog";
import DeletePayrollRecordDialog from "@/components/DeletePayrollRecordDialog";
import ApproveLeaveRequestDialog from "@/components/ApproveLeaveRequestDialog";
import RejectLeaveRequestDialog from "@/components/RejectLeaveRequestDialog";

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

export default function DashboardPage({ counts, employeesData, payrollData, leaveRequestData }) {
    // Employee Dialog States
    const [editEmployee, setEditEmployee] = useState(null);
    const [deleteEmployee, setDeleteEmployee] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const openEditDialog = (employee) => {
        setEditEmployee(employee);
        setIsEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditEmployee(null);
        setIsEditDialogOpen(false);
    };

    const openDeleteDialog = (employee) => {
        setDeleteEmployee(employee);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteEmployee(null);
        setIsDeleteDialogOpen(false);
    };

    // Payroll Dialog States
    const [sendPayrollEmployee, setSendPayrollEmployee] = useState(null);
    const [deletePayrollEmployee, setDeletePayrollEmployee] = useState(null);
    const [isSendPayrollDialogOpen, setIsSendPayrollDialogOpen] = useState(false);
    const [isDeletePayrollDialogOpen, setIsDeletePayrollDialogOpen] = useState(false);

    const openSendPayrollDialog = (payroll) => {
        setSendPayrollEmployee(payroll);
        setIsSendPayrollDialogOpen(true);
    };

    const closeSendPayrollDialog = () => {
        setSendPayrollEmployee(null);
        setIsSendPayrollDialogOpen(false);
    };

    const openDeletePayrollDialog = (payroll) => {
        setDeletePayrollEmployee(payroll);
        setIsDeletePayrollDialogOpen(true);
    };

    const closeDeletePayrollDialog = () => {
        setDeletePayrollEmployee(null);
        setIsDeletePayrollDialogOpen(false);
    };

    // Leave Request Dialog States
    const [approveLeaveRequest, setApproveLeaveRequest] = useState(null);
    const [rejectLeaveRequest, setRejectLeaveRequest] = useState(null);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

    const openApproveDialog = (leaveRequest) => {
        setApproveLeaveRequest(leaveRequest);
        setIsApproveDialogOpen(true);
    }

    const closeApproveDialog = () => {
        setApproveLeaveRequest(null);
        setIsApproveDialogOpen(false);
    }

    const openRejectDialog = (leaveRequest) => {
        setRejectLeaveRequest(leaveRequest);
        setIsRejectDialogOpen(true);
    }

    const closeRejectDialog = () => {
        setRejectLeaveRequest(null);
        setIsRejectDialogOpen(false);
    }

    return (
        <>
            <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
                    <DashboardCard
                        icon={UsersRound}
                        value={counts.totalEmployees}
                        label="Total Employees"
                    />
                    <DashboardCard
                        icon={UserCheck2}
                        value={counts.activeEmployees}
                        label="Active Users"
                    />
                    <DashboardCard
                        icon={CalendarCheck2}
                        value={counts.pendingLeaves}
                        label="Pending Leave Request"
                    />
                    <DashboardCard
                        icon={FileText}
                        value={counts.totalMemos}
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
                                data={employeesData}
                                actions={(row) => (
                                    <>
                                        <Button
                                            onClick={() => openEditDialog(row)}
                                            className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                                        >
                                            <PenSquare />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                openDeleteDialog(row)
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
                                            onClick={() => openSendPayrollDialog(row)}
                                            className="bg-transparent text-[#41D56D] hover:bg-[#E6F9F0] hover:text-[#1B5E34] active:bg-[#C8F2D9]"
                                        >
                                            <CircleCheckBig />
                                        </Button>
                                        <Button
                                            onClick={() => openDeletePayrollDialog(row)}
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
                                            onClick={() => openApproveDialog(row)}
                                            className="bg-transparent text-[#41D56D] hover:bg-[#E6F9F0] hover:text-[#1B5E34] active:bg-[#C8F2D9]"
                                        >
                                            <Check />
                                        </Button>
                                        <Button
                                            onClick={() => openRejectDialog(row)}
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
                {/* Employee Dialogs */}
                {editEmployee && (
                    <EditEmployeeDialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                        employee={editEmployee}
                        onClose={closeEditDialog}
                    />
                )}

                {deleteEmployee && (
                    <DeleteEmployeeDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        employee={deleteEmployee}
                        onClose={closeDeleteDialog}
                    />
                )}

                {/* Payroll Dialogs */}
                {sendPayrollEmployee && (
                    <SendPayrollRecordDialog
                        open={isSendPayrollDialogOpen}
                        onOpenChange={setIsSendPayrollDialogOpen}
                        payroll={sendPayrollEmployee}
                        onClose={closeSendPayrollDialog}
                    />
                )}

                {deletePayrollEmployee && (
                    <DeletePayrollRecordDialog
                        open={isDeletePayrollDialogOpen}
                        onOpenChange={setIsDeletePayrollDialogOpen}
                        payroll={deletePayrollEmployee}
                        onClose={closeDeletePayrollDialog}
                    />
                )}

                {/* Leave Requests Dialogs */}
                {approveLeaveRequest && (
                    <ApproveLeaveRequestDialog
                        open={isApproveDialogOpen}
                        onOpenChange={setIsApproveDialogOpen}
                        leaveRequest={approveLeaveRequest}
                        onClose={closeApproveDialog}
                    />
                )}
                {rejectLeaveRequest && (
                    <RejectLeaveRequestDialog
                        open={isRejectDialogOpen}
                        onOpenChange={setIsRejectDialogOpen}
                        leaveRequest={rejectLeaveRequest}
                        onClose={closeRejectDialog}
                    />
                )}
            </div>
        </>
    );
}

DashboardPage.layout = (page) => <Layout>{page}</Layout>;
