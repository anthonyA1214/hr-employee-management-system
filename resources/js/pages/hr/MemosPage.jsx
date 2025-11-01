import DataTable from "@/components/DataTable";
import SendMemoDialog from "@/components/SendMemoDialog";
import HRLayout from "@/layouts/HRLayout";

const memoColumns = [
    { key: "name", label: "Name" },
    { key: "subject", label: "Subject" },
    { key: "date_sent", label: "Date Sent" },
    { key: "content", label: "Content" },
];

const memoData = [];

export default function MemosPage() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Memo Management</h1>
                    <SendMemoDialog />
                </div>

                <DataTable columns={memoColumns} data={memoData} />
            </div>
        </>
    )
}

MemosPage.layout = page => <HRLayout>{page}</HRLayout>