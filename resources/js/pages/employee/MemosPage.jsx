import { useState } from "react";
import { StickyNote } from "lucide-react";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import ViewMemoDialog from "@/components/ViewMemoDialog";
import Layout from "@/layouts/Layout";
import PaginationNav from "@/components/PaginationNav";

const memosColumns = [
    { key: "issued_by", label: "Issued By" },
    { key: "subject", label: "Subject" },
    { key: "sent_at", label: "Date Sent" },
    { key: "body", label: "Content" },
];

export default function MemosPage({ memosData }) {
    const [viewMemo, setViewMemo] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const openViewDialog = (memo) => {
        setViewMemo(memo);
        setIsViewDialogOpen(true);
    };

    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Memos</h1>

                <DataTable 
                    columns={memosColumns} 
                    data={memosData.data} 
                    actions={(row) => (
                        <>
                            <Button
                                onClick={() => openViewDialog(row)}
                                className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                            >
                                <StickyNote />
                            </Button>
                        </>
                    )}   
                />

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-sm opacity-50">
                            Showing {memosData.from} to {memosData.to} of {memosData.total} memos
                        </span>
                    </div>

                    <div className="select-none">
                        <PaginationNav data={memosData} />
                    </div>
                </div>

                {viewMemo && (
                    <ViewMemoDialog
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                        memo={viewMemo}
                    />
                )}
            </div>
        </>
    );
}

MemosPage.layout = (page) => <Layout>{page}</Layout>;
