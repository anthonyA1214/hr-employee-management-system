import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserRoundPlus } from "lucide-react";
import { Form } from "@inertiajs/react"

export default function AddNewEmployeeDialog() {
    return (
        <Dialog>
            <Form>
                <DialogTrigger asChild>
                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <UserRoundPlus />
                        Add Employee
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Add New Employee</DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" type="text" placeholder="e.g. John" required />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" type="text" placeholder="e.g. Doe" required />
                        </div>
                            
                        {/* Email */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>

                        {/* Contact number */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="contact_number">Contact number</Label>
                            <Input id="contact_number" type="tel" placeholder="09123456789" required />
                        </div>

                        {/* Position */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="position">Position</Label>
                            <Input id="position" type="text" placeholder="Admin" required />
                        </div>

                        {/* Department */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" type="text" placeholder="HR Department" required />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input id="password_confirmation" type="password" required />
                        </div>
                    </div>
                    {/* Address */}
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" type="text" placeholder="Caloocan City, Philippines" required />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Form>
        </Dialog>
    )
}
