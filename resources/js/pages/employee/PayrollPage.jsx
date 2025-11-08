import Layout from "@/layouts/Layout";
import DataTable from "@/components/DataTable";
import PaginationNav from "@/components/PaginationNav";

const payrollColumns = [
    { key: "period_start", label: "Period Start" },
    { key: "period_end", label: "Period End" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "overtime_pay", label: "Overtime Pay" },
    { key: "deductions", label: "Deductions" },
    { key: "tax_percentage", label: "Tax Percentage" },
    { key: "net_pay", label: "Net Pay" },
];

export default function PayrollPage({ payrollData }) {
    return (
        <>
            <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl font-bold">Payroll</h1>

                <DataTable columns={payrollColumns} data={payrollData.data} />

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-sm opacity-50">
                            Showing {payrollData.from} to {payrollData.to} of {payrollData.total} payroll records
                        </span>
                    </div>

                    <div className="select-none">
                        <PaginationNav data={payrollData} />
                    </div>
                </div>
            </div>
        </>
    );
}

PayrollPage.layout = (page) => <Layout>{page}</Layout>;
