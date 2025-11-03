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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function AddNewEmployeeDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        contact_number: "",
        position: "",
        department: "",
        hired_at: "",
        address: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/hr/employees/add", {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                    <UserRoundPlus />
                    Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Add New Employee
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Password */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="password_confirmation">
                                Confirm password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            {errors.password_confirmation && (
                                <span className="text-sm text-red-500">
                                    {errors.password_confirmation}
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
                                    <Spinner /> Creating...
                                </>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
