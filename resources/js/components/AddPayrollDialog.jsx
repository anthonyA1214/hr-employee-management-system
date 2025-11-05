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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Form } from "@inertiajs/react";

export default function AddPayrollDialog({ employees }) {
    return (
        <Dialog>
            <Form>
                <DialogTrigger asChild>
                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <Plus />
                        Add Payroll
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Add Payroll Record
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="employee_name">Employee Name</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Employees</SelectLabel>
                                    {employees.map((employee) => (
                                        <SelectItem key={employee.id} value={employee.id}>
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
                            <Input id="period_start" type="date" required />
                        </div>

                        {/* Basic Salary */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="basic_salary">Basic Salary</Label>
                            <Input
                                id="basic_salary"
                                type="number"
                                placeholder="0"
                                required
                            />
                        </div>

                        {/* Overtime Pay */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="overtime_pay">Overtime Pay</Label>
                            <Input
                                id="overtime_pay"
                                type="number"
                                placeholder="0"
                                required
                            />
                        </div>

                        {/* Deductions */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="deductions">Deductions</Label>
                            <Input
                                id="deductions"
                                type="number"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Tax Percentage */}
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="tax_percentage">
                            Tax Percentage
                        </Label>
                        <Input
                            id="tax_percentage"
                            type="number"
                            placeholder="0"
                            required
                        />
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
                </DialogContent>
            </Form>
        </Dialog>
    );
}
