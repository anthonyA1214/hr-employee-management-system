import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import HRLayout from "@/layouts/HRLayout";
import { Check, X } from "lucide-react";

const leaveRequestColumns = [
    { key: "name", label: "Name" },
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
                <h1 className="text-3xl font-bold">Leave Request Management</h1>

                <DataTable columns={leaveRequestColumns} data={leaveRequestData} actions={(row) => (
                    <>
                        <Button onClick={() => editEmployee(row.id)} className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"> 
                            <Check /> 
                        </Button> 
                        <Button onClick={() => deleteEmployee(row.id)} className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"> 
                            <X /> 
                        </Button>
                    </>
                )}/>
            </div>
        </>
    )
}

LeaveRequestsPage.layout = page => <HRLayout>{page}</HRLayout>