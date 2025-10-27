import HRLayout from "@/layouts/HRLayout";

export default function EmployeesPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">EmployeesPage</h1>
        </>
    )
}

EmployeesPage.layout = page => <HRLayout>{page}</HRLayout>