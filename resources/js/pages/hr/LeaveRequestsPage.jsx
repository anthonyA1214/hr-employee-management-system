import HRLayout from "@/layouts/HRLayout";

export default function LeaveRequestsPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">LeaveRequestsPage</h1>
        </>
    )
}

LeaveRequestsPage.layout = page => <HRLayout>{page}</HRLayout>