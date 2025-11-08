import { useState } from "react";
import { Check, StickyNote, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import ApproveLeaveRequestDialog from "@/components/ApproveLeaveRequestDialog";
import RejectLeaveRequestDialog from "@/components/RejectLeaveRequestDialog";
import Layout from "@/layouts/Layout";
import PaginationNav from "@/components/PaginationNav";
import ViewReasonDialog from "@/components/ViewReasonDialog";

const leaveRequestsColumns = [
    { key: "name", label: "Name" },
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
];

export default function LeaveRequestsPage({ leaveRequestsData }) {
    const [approveLeaveRequest, setApproveLeaveRequest] = useState(null);
    const [rejectLeaveRequest, setRejectLeaveRequest] = useState(null);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [viewReason, setViewReason] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const openViewDialog = (memo) => {
        setViewReason(memo);
        setIsViewDialogOpen(true);
    };

    const openApproveDialog = (leaveRequest) => {
        setApproveLeaveRequest(leaveRequest);
        setIsApproveDialogOpen(true);
    }

    const closeApproveDialog = () => {
        setApproveLeaveRequest(null);
        setIsApproveDialogOpen(false);
    }

    const openRejectDialog = (leaveRequest) => {
        setRejectLeaveRequest(leaveRequest);
        setIsRejectDialogOpen(true);
    }

    const closeRejectDialog = () => {
        setRejectLeaveRequest(null);
        setIsRejectDialogOpen(false);
    }

    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Leave Request Management</h1>

                <DataTable
                    columns={leaveRequestsColumns}
                    data={leaveRequestsData.data}
                    actions={(row) => (
                        <>
                            <Button
                                onClick={() => openViewDialog(row)}
                                className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                            >
                                <StickyNote />
                            </Button>
                            <Button
                                onClick={() => openApproveDialog(row)}
                                className="bg-transparent text-[#41D56D] hover:bg-[#E6F9F0] hover:text-[#1B5E34] active:bg-[#C8F2D9]"
                            >
                                <Check />
                            </Button>
                            <Button
                                onClick={() => openRejectDialog(row)}
                                className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"
                            >
                                <X />
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

                {approveLeaveRequest && (
                    <ApproveLeaveRequestDialog
                        open={isApproveDialogOpen}
                        onOpenChange={setIsApproveDialogOpen}
                        leaveRequest={approveLeaveRequest}
                        onClose={closeApproveDialog}
                    />
                )}
                {rejectLeaveRequest && (
                    <RejectLeaveRequestDialog
                        open={isRejectDialogOpen}
                        onOpenChange={setIsRejectDialogOpen}
                        leaveRequest={rejectLeaveRequest}
                        onClose={closeRejectDialog}
                    />
                )}
            </div>
        </>
    );
}

LeaveRequestsPage.layout = (page) => <Layout>{page}</Layout>;
