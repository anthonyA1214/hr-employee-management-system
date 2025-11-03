import Layout from "@/layouts/Layout";
import DataTable from "@/components/DataTable";

const memosColumns = [
    { key: "issued_by", label: "Issued By" },
    { key: "subject", label: "Subject" },
    { key: "date_sent", label: "Date Sent" },
    { key: "content", label: "Content" },
];

const memosData = [];

export default function MemosPage() {
    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Memos</h1>

                <DataTable columns={memosColumns} data={memosData} />
            </div>
        </>
    );
}

MemosPage.layout = (page) => <Layout>{page}</Layout>;
