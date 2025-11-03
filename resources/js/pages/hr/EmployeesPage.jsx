import HRLayout from "@/layouts/HRLayout";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import EditEmployeeDialog from "@/components/EditEmployeeDialog";
import AddNewEmployeeDialog from "@/components/AddNewEmployeeDialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PenSquare, Search, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable"

const employeeColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact_number", label: "Contact Number" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "hired_at", label: "Hired At" },
    { key: "address", label: "Address" },
    { key: "status", label: "Status" },
]

export default function EmployeesPage() {
    const { employees } = usePage().props;
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const openEditDialog = (employee) => {
        setSelectedEmployee(employee);
        setIsEditDialogOpen(true);
    }

    const closeEditDialog = () => {
        setSelectedEmployee(null);
        setIsEditDialogOpen(false);
    }
    
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Employee Management</h1>
                    <AddNewEmployeeDialog />
                </div>

                <div className="flex bg-[#F2F2F2] w-full p-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm gap-4">
                    <InputGroup>
                        <InputGroupInput id="query" name="query" type="text" placeholder="Search by name, email, or department..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <Select>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter by</SelectLabel>
                                <SelectItem value="apple">All</SelectItem>
                                <SelectItem value="banana">Name</SelectItem>
                                <SelectItem value="blueberry">Email</SelectItem>
                                <SelectItem value="grapes">Department</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button type="submit" className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">Search</Button>
                </div>

                <DataTable columns={employeeColumns} data={employees} actions={(row) => (
                    <>
                        <Button onClick={() => openEditDialog(row)} className="bg-transparent text-[#008DEE] hover:bg-[#E3F2FD] hover:text-[#006BBF] active:bg-[#BBDEFB]"> 
                            <PenSquare /> 
                        </Button> 
                        <Button onClick={() => deleteEmployee(row.id)} className="bg-transparent text-[#FF0000] hover:bg-[#FFEBEE] hover:text-[#B71C1C] active:bg-[#FFCDD2]"> 
                            <Trash2 /> 
                        </Button>
                    </>
                )}/>

                {selectedEmployee && (
                    <EditEmployeeDialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                        employee={selectedEmployee}
                        onClose={closeEditDialog}
                    />
                )}
            </div>      
        </>
    )
}

EmployeesPage.layout = page => <HRLayout>{page}</HRLayout>