import DataTable from "@/components/DataTable";
import SendMemoDialog from "@/components/SendMemoDialog";
import Layout from "@/layouts/Layout";

const memosColumns = [
    { key: "name", label: "Name" },
    { key: "subject", label: "Subject" },
    { key: "date_sent", label: "Date Sent" },
    { key: "content", label: "Content" },
];

const memosData = [];

export default function MemosPage() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Memo Management</h1>
                    <SendMemoDialog />
                </div>

                <DataTable columns={memosColumns} data={memosData} />
            </div>
        </>
    );
}

MemosPage.layout = (page) => <Layout>{page}</Layout>;
