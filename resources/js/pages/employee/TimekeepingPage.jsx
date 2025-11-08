import { useState, useEffect } from "react";
import Layout from "@/layouts/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import DataTable from "@/components/DataTable";
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner";
import PaginationNav from "@/components/PaginationNav";

const timekeepingColumns = [
    { key: "date", label: "Date" },
    { key: "time_in", label: "Time In" },
    { key: "time_out", label: "Time Out" },
    { key: "late_minutes", label: "Late Minutes" },
    { key: "overtime_minutes", label: "Overtime Minutes" },
    { key: "total_hours", label: "Total Hours Worked" },
];

const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(`1970-01-01T${timeString}`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};

export default function TimekeepingPage({ timekeeping, timekeepingData }) {
    const [now, setNow] = useState(new Date());
    const [hasTimedIn, setHasTimedIn] = useState(!!timekeeping?.time_in);
    const [hasTimedOut, setHasTimedOut] = useState(!!timekeeping?.time_out);

    const [timeInProcessing, setTimeInProcessing] = useState(false);
    const [timeOutProcessing, setTimeOutProcessing] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000); // Update every second
        return () => clearInterval(timer);
    }, []); 
    
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];

    const handleTimeIn = (e) => {
        e.preventDefault();
        setTimeInProcessing(true);
        
        router.post("/employee/timekeeping/time-in", 
            { date: currentDate, time: currentTime }, // <- send plain JSON
            {
                onSuccess: () => {
                    toast.success("Successfully timed in!");
                    setHasTimedIn(true);
                },
                onError: (errors) => toast.error(errors.message || "Failed to time in."),
                onFinish: () => setTimeInProcessing(false),
            }
        );
    };

    const handleTimeOut = (e) => {
        e.preventDefault();
        setTimeOutProcessing(true);

        router.post("/employee/timekeeping/time-out", 
            { date: currentDate, time: currentTime }, // <- send plain JSON
            {
                onSuccess: () => {
                    toast.success("Successfully timed out!");
                    setHasTimedOut(true);
                },
                onError: (errors) => toast.error(errors.message || "Failed to time out."),
                onFinish: () => setTimeOutProcessing(false),
            }
        );
    };

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
                                    <span>Date: {currentDate}</span>
                                    <span>Time: { hasTimedIn ? formatTime(timekeeping?.time_in) : formatTime(currentTime) }</span>
                                </div>
                                <Button className="bg-[#052743] hover:bg-[#365065] active:bg-[#647888]" onClick={handleTimeIn} disabled={timeInProcessing || hasTimedIn}>
                                    {timeInProcessing ? (
                                        <>
                                            <Spinner /> Processing...
                                        </>
                                    ) : (
                                        hasTimedIn ? "Already Timed In" : "Time In"
                                    )}
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
                                    <span>Date: {currentDate}</span>
                                    <span>Time: { hasTimedOut ? formatTime(timekeeping?.time_out) : formatTime(currentTime) }</span>
                                </div>
                                <Button className="bg-[#052743] hover:bg-[#365065] active:bg-[#647888]" onClick={handleTimeOut} disabled={timeOutProcessing || !hasTimedIn || hasTimedOut}>
                                    {timeOutProcessing ? (
                                        <>
                                            <Spinner /> Processing...
                                        </>
                                    ) : (
                                        hasTimedOut ? "Already Timed Out" : "Time Out"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DataTable columns={timekeepingColumns} data={timekeepingData.data} />
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-sm opacity-50">
                            Showing {timekeepingData.from} to {timekeepingData.to} of {timekeepingData.total} timekeeping records
                        </span>
                    </div>

                    <div className="select-none">
                        <PaginationNav data={timekeepingData} />
                    </div>
                </div>
            </div>
        </>
    );
}

TimekeepingPage.layout = (page) => <Layout>{page}</Layout>;
