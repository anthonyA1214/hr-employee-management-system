import HRLayout from "@/layouts/HRLayout";

export default function MemosPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">MemosPage</h1>
        </>
    )
}

MemosPage.layout = page => <HRLayout>{page}</HRLayout>