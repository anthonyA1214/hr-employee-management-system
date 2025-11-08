import { useState } from "react";
import { PenSquare, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import AddNewEmployeeDialog from "@/components/AddNewEmployeeDialog";
import DataTable from "@/components/DataTable";
import DeleteEmployeeDialog from "@/components/DeleteEmployeeDialog";
import EditEmployeeDialog from "@/components/EditEmployeeDialog";
import Layout from "@/layouts/Layout";
import { router } from "@inertiajs/react";
import PaginationNav from "@/components/PaginationNav";

const employeeColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact_number", label: "Contact Number" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "hired_at", label: "Hired At" },
    { key: "address", label: "Address" },
    { key: "status", label: "Status" },
];

export default function EmployeesPage({ employees }) {
    const [query, setQuery] = useState(employees?.search || "");

    const handleSearch = () => {
        router.get("/hr/employees", { query }, { preserveState: true, replace: true });
    };

    const [editEmployee, setEditEmployee] = useState(null);
    const [deleteEmployee, setDeleteEmployee] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const openEditDialog = (employee) => {
        setEditEmployee(employee);
        setIsEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditEmployee(null);
        setIsEditDialogOpen(false);
    };

    const openDeleteDialog = (employee) => {
        setDeleteEmployee(employee);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteEmployee(null);
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Employee Management</h1>
                    <AddNewEmployeeDialog />
                </div>

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
                                    handleSearch();
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
                    columns={employeeColumns}
                    data={employees.data}
                    actions={(row) => (
                        <>
                            <Button
                                onClick={() => openEditDialog(row)}
                                className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"
                            >
                                <PenSquare />
                            </Button>
                            <Button
                                onClick={() => openDeleteDialog(row)}
                                className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"
                            >
                                <Trash2 />
                            </Button>
                        </>
                    )}
                />

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-sm opacity-50">
                            Showing {employees.from} to {employees.to} of {employees.total} employees
                        </span>
                    </div>

                    <div className="select-none">
                        <PaginationNav data={employees} />
                    </div>
                </div>

                {editEmployee && (
                    <EditEmployeeDialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                        employee={editEmployee}
                        onClose={closeEditDialog}
                    />
                )}

                {deleteEmployee && (
                    <DeleteEmployeeDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        employee={deleteEmployee}
                        onClose={closeDeleteDialog}
                    />
                )}
            </div>
        </>
    );
}

EmployeesPage.layout = (page) => <Layout>{page}</Layout>;
