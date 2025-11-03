import Layout from "@/layouts/Layout";
import DataTable from "@/components/DataTable";

const payrollColumns = [
    { key: "period_start", label: "Period Start" },
    { key: "period_end", label: "Period End" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "overtime_pay", label: "Overtime Pay" },
    { key: "deductions", label: "Deductions" },
    { key: "tax_percentage", label: "Tax Percentage" },
    { key: "net_pay", label: "Net Pay" },
];

const payrollData = [];

export default function PayrollPage() {
    return (
        <>
            <div className="flex flex-col gap-y-8">
                <h1 className="text-3xl font-bold">Payroll</h1>

                <DataTable columns={payrollColumns} data={payrollData} />
            </div>
        </>
    );
}

PayrollPage.layout = (page) => <Layout>{page}</Layout>;
