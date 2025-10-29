import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { 
    Card, 
    CardContent, 
    CardHeader, 
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { SquarePen } from 'lucide-react'

import HRLayout from "@/layouts/HRLayout";

export default function SettingsPage() {
    return (
        <>
            <div className="grid gap-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Settings</h1>

                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <SquarePen />
                        Edit
                    </Button>
                </div>
                
                {/* User Information Card */}
                <Card>
                    <CardHeader>
                        <h3 className="text-2xl">User Information</h3>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-4">
                            {/* avatar */}
                            <div>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* textboxes */}
                            <div className="flex flex-col gap-y-4">
                                <div>
                                    <Label className="text-lg">Full name</Label>
                                    <div className="grid grid-cols-2 gap-x-8">
                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" type="text" placeholder="e.g. John" required />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" type="text" placeholder="e.g. Doe" required />
                                        </div>
                                    </div>
                                </div>                            

                                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
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

                                    {/* Address */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" type="text" placeholder="Caloocan City, Philippines" required />
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
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Change Password Card */}
                <Card>
                    <CardHeader>
                        <h3 className="text-2xl">Change Password</h3>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-x-8">
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="oldpassword">Old password</Label>
                                <Input id="oldpassword" type="password" required />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="newpassword">New password</Label>
                                <Input id="newpassword" type="password" required />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="newpassword_confirmation">Confirm new password</Label>
                                <Input id="newpassword_confirmation" type="password" required />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Project Information Card */}
                <Card>
                    <CardHeader>
                        <h3 className="text-2xl">Project Information</h3>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-3 gap-y-8">
                                {/* Project Name */}
                                <div>
                                    <h3 className="text-lg font-medium">Project name</h3>
                                    <span className="opacity-50 ms-3">HR Employee Management System</span>
                                </div>

                                {/* Contact Email */}
                                <div>
                                    <h3 className="text-lg font-medium">Contact email</h3>
                                    <span className="opacity-50 ms-3">felicesmarvin12@gmail.com</span>
                                </div>

                                {/* Date Completed */}
                                <div>
                                    <h3 className="text-lg font-medium">Date completed</h3>
                                    <span className="opacity-50 ms-3">November XX, 2025</span>
                                </div>

                                {/* Developers */}
                                <div>
                                    <h3 className="text-lg font-medium">Developers</h3>
                                    <div className="flex flex-col lg:flex-row lg:gap-16">
                                        <div className="flex flex-col ms-3">
                                            <span className="opacity-50">Amiluddin, Anthony P.</span>
                                            <span className="opacity-50">Oredeña, Rich Mae S.</span>
                                        </div>
                                        <div className="flex flex-col ms-3">
                                            <span className="opacity-50">Felices, Marvin N.</span>
                                            <span className="opacity-50">Reyel, Raheim Lebh</span>
                                        </div>                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

SettingsPage.layout = page => <HRLayout>{page}</HRLayout>