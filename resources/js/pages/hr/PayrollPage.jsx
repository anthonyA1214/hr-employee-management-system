import HRLayout from "@/layouts/HRLayout";

export default function PayrollPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">PayrollPage</h1>
        </>
    )
}

PayrollPage.layout = page => <HRLayout>{page}</HRLayout>