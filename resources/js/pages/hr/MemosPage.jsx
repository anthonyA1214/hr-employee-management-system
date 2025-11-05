import { useState } from "react";
<<<<<<< HEAD
import { StickyNote } from "lucide-react";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import SendMemoDialog from "@/components/SendMemoDialog";
import ViewMemoDialog from "@/components/ViewMemoDialog";
import Layout from "@/layouts/Layout";
=======
import DataTable from "@/components/DataTable";
import SendMemoDialog from "@/components/SendMemoDialog";
import Layout from "@/layouts/Layout";
import { Button } from "@/components/ui/button";
import { StickyNote } from "lucide-react";
import ViewMemoDialog from "@/components/ViewMemoDialog";
>>>>>>> main

const memosColumns = [
    { key: "name", label: "Name" },
    { key: "subject", label: "Subject" },
    { key: "sent_at", label: "Date Sent" },
    { key: "body", label: "Content" },
];

export default function MemosPage({ employees, memosData }) {
    const [viewMemo, setViewMemo] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const openViewDialog = (memo) => {
        setViewMemo(memo);
        setIsViewDialogOpen(true);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Memo Management</h1>
                    <SendMemoDialog employees={employees} />
                </div>

                <DataTable 
                    columns={memosColumns} 
                    data={memosData} 
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

<<<<<<< HEAD
MemosPage.layout = (page) => <Layout>{page}</Layout>;
=======
MemosPage.layout = (page) => <Layout>{page}</Layout>;
>>>>>>> main
