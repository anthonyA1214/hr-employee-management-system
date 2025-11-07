import { CircleCheckBig, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import AddPayrollDialog from "@/components/AddPayrollDialog";
import DataTable from "@/components/DataTable";
import Layout from "@/layouts/Layout";
import SendPayrollRecordDialog from "@/components/SendPayrollRecordDialog";
import DeletePayrollRecordDialog from "@/components/DeletePayrollRecordDialog";
import { useState } from "react";

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

export default function PayrollPage({ employees, payrollData }) {
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

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Payroll Management</h1>
                    <AddPayrollDialog employees={employees} />
                </div>

                <div className="flex bg-[#F2F2F2] w-full p-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm gap-4">
                    <InputGroup>
                        <InputGroupInput
                            id="query"
                            name="query"
                            type="text"
                            placeholder="Search by name..."
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button
                        type="submit"
                        className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                    >
                        Search
                    </Button>
                </div>

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
            </div>
        </>
    );
}

PayrollPage.layout = (page) => <Layout>{page}</Layout>;
