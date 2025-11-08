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
import { Link, router } from "@inertiajs/react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

const getVisiblePages = (current, last) => {
  const delta = 2; // pages before and after current
  let start = Math.max(1, current - delta);
  let end = Math.min(last, current + delta);

  // Adjust for edges
  if (current <= delta) end = Math.min(last, 5);
  if (current + delta > last) start = Math.max(1, last - 4);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
};

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
                        <Pagination>
                            <PaginationContent>
                                {/* Previous */}
                                <PaginationItem>
                                    {employees.prev_page_url ? (
                                        <Link href={employees.prev_page_url}>
                                            <PaginationPrevious className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]" />
                                        </Link>
                                    ) : (
                                        <PaginationPrevious disabled className="opacity-50 hover:bg-transparent"/>
                                    )}
                                </PaginationItem>

                                {/* First page + ellipsis */}
                                {employees.current_page > 3 && (
                                <>
                                    <PaginationItem>
                                        <Link href={`?page=1`}>
                                            <PaginationLink>1</PaginationLink>
                                        </Link>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                </>
                                )}

                                {/* Visible pages */}
                                {getVisiblePages(employees.current_page, employees.last_page).map((page) => (
                                <PaginationItem key={page}>
                                    {page === employees.current_page ? (
                                    <PaginationLink className="bg-[#018CEF] text-[#F2F2F2] hover:bg-[#018CEF] hover:text-[#F2F2F2] active:bg-[#018CEF] active:text-[#F2F2F2]">
                                        {page}
                                    </PaginationLink>
                                    ) : (
                                    <Link href={`?page=${page}`}>
                                        <PaginationLink className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]">
                                            {page}
                                        </PaginationLink>
                                    </Link>
                                    )}
                                </PaginationItem>
                                ))}

                                {/* Last page + ellipsis */}
                                {employees.current_page < employees.last_page - 2 && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Link href={`?page=${employees.last_page}`}>
                                            <PaginationLink>{employees.last_page}</PaginationLink>
                                        </Link>
                                    </PaginationItem>
                                </>
                                )}

                                {/* Next */}
                                <PaginationItem>
                                    {employees.next_page_url ? (
                                        <Link href={employees.next_page_url}>
                                            <PaginationNext className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]" />
                                        </Link>
                                    ) : (
                                        <PaginationNext disabled className="opacity-50 hover:bg-transparent"/>
                                    )}
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
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
