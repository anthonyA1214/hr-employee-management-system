import { useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import ApproveLeaveRequestDialog from "@/components/ApproveLeaveRequestDialog";
import RejectLeaveRequestDialog from "@/components/RejectLeaveRequestDialog";
import Layout from "@/layouts/Layout";

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
                    data={leaveRequestsData}
                    actions={(row) => (
                        <>
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
