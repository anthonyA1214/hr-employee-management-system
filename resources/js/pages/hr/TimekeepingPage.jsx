import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import DataTable from "@/components/DataTable";
import Layout from "@/layouts/Layout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import PaginationNav from "@/components/PaginationNav";

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
    const [query, setQuery] = useState(timekeepingData?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/hr/timekeeping", { query }, { preserveState: true, replace: true });
    };

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
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(e);
                                }
                            }}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button
                        className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>

                <DataTable
                    columns={timekeepingColumns}
                    data={timekeepingData.data}
                />

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
