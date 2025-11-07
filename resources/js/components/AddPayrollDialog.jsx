import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function AddPayrollDialog({ employees }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: "",
        period_start: "",
        basic_salary: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/hr/payroll/add", {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast.success("Payroll record added successfully!");
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                    <Plus />
                    Add Payroll
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Add Payroll Record
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="employee_name">Employee Name</Label>
                        <Select value={data.employee_id} onValueChange={(value) => setData("employee_id", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Employees</SelectLabel>
                                    {employees.map((employee) => (
                                        <SelectItem key={employee.id} value={String(employee.id)}>
                                            {employee.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Period start */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="period_start">Period Start</Label>
                            <Input id="period_start" type="date" required value={data.period_start} onChange={(e) => setData("period_start", e.target.value)} />
                            {errors.period_start && (
                                <span className="text-sm text-red-500">
                                    {errors.period_start}
                                </span>
                            )}
                        </div>

                        {/* Basic Salary */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="basic_salary">Basic Salary</Label>
                            <Input
                                id="basic_salary"
                                type="number"
                                placeholder="0"
                                value={data.basic_salary}
                                onChange={(e) => setData("basic_salary", e.target.value)}
                                required
                            />
                            {errors.basic_salary && (
                                <span className="text-sm text-red-500">
                                    {errors.basic_salary}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
