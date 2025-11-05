import DataTable from "@/components/DataTable";
import SubmitLeaveRequestDialog from "@/components/SubmitLeaveRequestDialog";
import Layout from "@/layouts/Layout";

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

                <DataTable columns={leaveRequestsColumns} data={leaveRequestsData} />
            </div>
        </>
    );
}

LeaveRequestsPage.layout = (page) => <Layout>{page}</Layout>;
