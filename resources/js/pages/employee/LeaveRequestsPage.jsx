import DataTable from "@/components/DataTable";
import SubmitLeaveRequestDialog from "@/components/SubmitLeaveRequestDialog";
import Layout from "@/layouts/Layout";
import PaginationNav from "@/components/PaginationNav";

const leaveRequestsColumns = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
];

export default function LeaveRequestsPage({ leaveRequestsData }) {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Leave Requests</h1>
                    <SubmitLeaveRequestDialog />
                </div>

                <DataTable columns={leaveRequestsColumns} data={leaveRequestsData.data} />

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
            </div>
        </>
    );
}

LeaveRequestsPage.layout = (page) => <Layout>{page}</Layout>;
