import { useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

export default function EditEmployeeDialog({ open, onOpenChange, employee, onClose, }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: employee ? employee.first_name : "",
        last_name: employee ? employee.last_name : "",
        email: employee ? employee.email : "",
        contact_number: employee ? employee.contact_number : "",
        position: employee ? employee.position : "",
        department: employee ? employee.department : "",
        hired_at: employee ? employee.hired_at : "",
        address: employee ? employee.address : "",
    });

    useEffect(() => {
        if (employee) {
            setData({
                first_name: employee.first_name || "",
                last_name: employee.last_name || "",
                email: employee.email || "",
                contact_number: employee.contact_number || "",
                position: employee.position || "",
                department: employee.department || "",
                hired_at: employee.hired_at || "",
                address: employee.address || "",
            });
        }
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/hr/employees/edit/${employee.id}`, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!employee) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Edit Employee
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        {/* First name */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="first_name">First name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="e.g. John"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                            />
                            {errors.first_name && (
                                <span className="text-sm text-red-500">
                                    {errors.first_name}
                                </span>
                            )}
                        </div>

                        {/* Last name */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="e.g. Doe"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                            />
                            {errors.last_name && (
                                <span className="text-sm text-red-500">
                                    {errors.last_name}
                                </span>
                            )}
                        </div>

                        {/* Contact number */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="contact_number">
                                Contact number
                            </Label>
                            <Input
                                id="contact_number"
                                type="tel"
                                placeholder="09123456789"
                                value={data.contact_number}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                                required
                            />
                            {errors.contact_number && (
                                <span className="text-sm text-red-500">
                                    {errors.contact_number}
                                </span>
                            )}
                        </div>

                        {/* Position */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="position">Position</Label>
                            <Input
                                id="position"
                                type="text"
                                placeholder="Admin"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                required
                            />
                            {errors.position && (
                                <span className="text-sm text-red-500">
                                    {errors.position}
                                </span>
                            )}
                        </div>

                        {/* Department */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                                id="department"
                                type="text"
                                placeholder="HR Department"
                                value={data.department}
                                onChange={(e) =>
                                    setData("department", e.target.value)
                                }
                                required
                            />
                            {errors.department && (
                                <span className="text-sm text-red-500">
                                    {errors.department}
                                </span>
                            )}
                        </div>

                        {/* Hired At */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="hired_at">Hired At</Label>
                            <Input
                                id="hired_at"
                                type="date"
                                value={data.hired_at}
                                onChange={(e) =>
                                    setData("hired_at", e.target.value)
                                }
                                required
                            />
                            {errors.hired_at && (
                                <span className="text-sm text-red-500">
                                    {errors.hired_at}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="Caloocan City, Philippines"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            required
                        />
                        {errors.address && (
                            <span className="text-sm text-red-500">
                                {errors.address}
                            </span>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        >
                            {processing ? (
                                <>
                                    <Spinner /> Editing...
                                </>
                            ) : (
                                "Edit"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}