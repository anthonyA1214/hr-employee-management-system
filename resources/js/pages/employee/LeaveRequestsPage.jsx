import Layout from "@/layouts/Layout";
import SubmitLeaveRequestDialog from "@/components/SubmitLeaveRequestDialog";
import DataTable from "@/components/DataTable";

const leaveRequestColumns = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
];

const leaveRequestData = [];

export default function LeaveRequestsPage() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Leave Requests</h1>
                    <SubmitLeaveRequestDialog />
                </div>

                <DataTable columns={leaveRequestColumns} data={leaveRequestData} />
            </div>
        </>
    );
}

LeaveRequestsPage.layout = (page) => <Layout>{page}</Layout>;
