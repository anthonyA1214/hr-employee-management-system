import HRLayout from "@/layouts/HRLayout";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/DataTable"
import { Search } from "lucide-react";

const timekeepingColumns = [
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "time_in", label: "Time In" },
    { key: "time_out", label: "Time Out" },
    { key: "late_minutes", label: "Late Minutes" },
    { key: "overtime_minutes", label: "Overtime Minutes" },
    { key: "total_hours", label: "Total Hours Worked" },
]

const timekeepingData = []

export default function TimekeepingPage() {
    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Timekeeping Management</h1>

                <div className="flex bg-[#F2F2F2] w-full p-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm gap-4">
                    <InputGroup>
                        <InputGroupInput id="query" name="query" type="text" placeholder="Search by name..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button type="submit" className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">Search</Button>
                </div>

                <DataTable columns={timekeepingColumns} data={timekeepingData} />
            </div>
        </>
    )
}

TimekeepingPage.layout = page => <HRLayout>{page}</HRLayout>