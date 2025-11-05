import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import DataTable from "@/components/DataTable";
import Layout from "@/layouts/Layout";


const timekeepingColumns = [
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "time_in", label: "Time In" },
    { key: "time_out", label: "Time Out" },
    { key: "late_minutes", label: "Late Minutes" },
    { key: "overtime_minutes", label: "Overtime Minutes" },
    { key: "total_hours", label: "Total Hours Worked" },
];

export default function TimekeepingPage({ timekeepingData }) {
    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Timekeeping Management</h1>

                <div className="flex bg-[#F2F2F2] w-full p-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm gap-4">
                    <InputGroup>
                        <InputGroupInput
                            id="query"
                            name="query"
                            type="text"
                            placeholder="Search by name..."
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button
                        type="submit"
                        className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                    >
                        Search
                    </Button>
                </div>

                <DataTable
                    columns={timekeepingColumns}
                    data={timekeepingData}
                />
            </div>
        </>
    );
}

TimekeepingPage.layout = (page) => <Layout>{page}</Layout>;
