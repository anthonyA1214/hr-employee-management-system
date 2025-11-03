import Layout from "@/layouts/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";

const timekeepingColumns = [
    { key: "date", label: "Date" },
    { key: "time_in", label: "Time In" },
    { key: "time_out", label: "Time Out" },
    { key: "late_minutes", label: "Late Minutes" },
    { key: "overtime_minutes", label: "Overtime Minutes" },
    { key: "total_hours", label: "Total Hours Worked" },
];

const timekeepingData = [];

export default function TimekeepingPage() {
    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Timekeeping</h1>
                <div className="grid grid-cols-2 gap-4">
                    {/* Time in */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-2xl">Time In</h3>
                            <div className="border-b-2 border-[#8EC5EE]"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4">
                                <div className="grid grid-cols-2 gap-4 text-center font-bold text-xl">
                                    <span>Date: 2025-01-02</span>
                                    <span>Time: 09:00 AM</span>
                                </div>
                                <Button className="bg-[#052743] hover:bg-[#365065] active:bg-[#647888]">
                                    Time In
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time out */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-2xl">Time Out</h3>
                            <div className="border-b-2 border-[#8EC5EE]"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4">
                                <div className="grid grid-cols-2 gap-4 text-center font-bold text-xl">
                                    <span>Date: 2025-01-02</span>
                                    <span>Time: 09:00 AM</span>
                                </div>
                                <Button className="bg-[#052743] hover:bg-[#365065] active:bg-[#647888]">
                                    Time Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DataTable columns={timekeepingColumns} data={timekeepingData} />
            </div>
        </>
    );
}

TimekeepingPage.layout = (page) => <Layout>{page}</Layout>;
