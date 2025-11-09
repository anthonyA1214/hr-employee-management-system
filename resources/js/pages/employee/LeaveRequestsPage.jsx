import DataTable from "@/components/DataTable";
import SubmitLeaveRequestDialog from "@/components/SubmitLeaveRequestDialog";
import Layout from "@/layouts/Layout";
import PaginationNav from "@/components/PaginationNav";
import ViewReasonDialog from "@/components/ViewReasonDialog";
import { useState } from "react";
import { StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";

const leaveRequestsColumns = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
];

export default function LeaveRequestsPage({ leaveRequestsData }) {
    const [viewReason, setViewReason] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const openViewDialog = (memo) => {
        setViewReason(memo);
        setIsViewDialogOpen(true);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Leave Requests</h1>
                    <SubmitLeaveRequestDialog />
                </div>

                <DataTable columns={leaveRequestsColumns} data={leaveRequestsData.data} actions={(row) => (
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
                            Showing {leaveRequestsData.from} to {leaveRequestsData.to} of {leaveRequestsData.total} leave requests
                        </span>
                    </div>

                    <div className="select-none">
                        <PaginationNav data={leaveRequestsData} />
                    </div>
                </div>

                {viewReason && (
                    <ViewReasonDialog
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                        leave={viewReason}
                    />
                )}
            </div>
        </>
    );
}

LeaveRequestsPage.layout = (page) => <Layout>{page}</Layout>;
