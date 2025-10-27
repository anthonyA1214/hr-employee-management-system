import HRLayout from "@/layouts/HRLayout";

export default function TimekeepingPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">TimekeepingPage</h1>
        </>
    )
}

TimekeepingPage.layout = page => <HRLayout>{page}</HRLayout>