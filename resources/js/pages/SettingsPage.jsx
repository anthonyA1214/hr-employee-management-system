import { useState } from "react";
import { SquarePen, Save } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import Layout from "@/layouts/Layout";

export default function SettingsPage({ user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact_number: user.contact_number,
        address: user.address,
        position: user.position,
        department: user.department,
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`settings/edit/${user.id}`, {
            data,
            onSuccess: () => {
                setData({
                    ...data,
                    old_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
                reset("old_password", "new_password", "new_password_confirmation");
                setIsEditing(false);
                toast.success("Your settings have been saved!");
            },
        });
    };

    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <div className="grid gap-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Settings</h1>

                    {isEditing ? (
                        <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]" onClick={handleSubmit} disabled={processing}>
                            {processing ? (
                                <>
                                    <Spinner /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]" onClick={() => setIsEditing(true)}>
                            <SquarePen />
                            Edit
                        </Button>
                    )}
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
                                <div className="grid grid-cols-2 gap-x-8">
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="first_name">
                                            First name
                                        </Label>
                                        <Input
                                            id="first_name"
                                            type="text"
                                            placeholder="e.g. John"
                                            disabled={!isEditing}
                                            value={data.first_name}
                                            onChange={(e) => setData("first_name", e.target.value)}
                                            required
                                        />
                                        {errors.first_name && (
                                            <span className="text-sm text-red-500">
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="last_name">
                                            Last name
                                        </Label>
                                        <Input
                                            id="last_name"
                                            type="text"
                                            placeholder="e.g. Doe"             
                                            disabled={!isEditing}
                                            value={data.last_name}
                                            onChange={(e) => setData("last_name", e.target.value)}
                                            required
                                        />
                                        {errors.last_name && (
                                            <span className="text-sm text-red-500">
                                                {errors.last_name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                                    {/* Email */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            disabled={!isEditing}
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

                                    {/* Contact number */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="contact_number">
                                            Contact number
                                        </Label>
                                        <Input
                                            id="contact_number"
                                            type="tel"
                                            placeholder="09123456789"
                                            disabled={!isEditing}
                                            value={data.contact_number}
                                            onChange={(e) => setData("contact_number", e.target.value)}
                                            required
                                        />
                                        {errors.contact_number && (
                                            <span className="text-sm text-red-500">
                                                {errors.contact_number}
                                            </span>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="Caloocan City, Philippines"
                                            disabled={!isEditing}
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

                                    {/* Position */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="position">
                                            Position
                                        </Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            placeholder="Admin"
                                            disabled={!isEditing}
                                            value={data.position}
                                            onChange={(e) => setData("position", e.target.value)}
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
                                        <Label htmlFor="department">
                                            Department
                                        </Label>
                                        <Input
                                            id="department"
                                            type="text"
                                            placeholder="HR Department"
                                            disabled={!isEditing}
                                            value={data.department}
                                            onChange={(e) => setData("department", e.target.value)}
                                            required
                                        />
                                        {errors.department && (
                                            <span className="text-sm text-red-500">
                                                {errors.department}
                                            </span>
                                        )}
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
                                <Label htmlFor="old_password">
                                    Old password
                                </Label>
                                <Input
                                    id="old_password"
                                    type="password"
                                    disabled={!isEditing}
                                    value={data.old_password}
                                    onChange={(e) => setData("old_password", e.target.value)}
                                    required
                                />
                                {errors.old_password && (
                                    <span className="text-sm text-red-500">
                                        {errors.old_password}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="new_password">
                                    New password
                                </Label>
                                <Input
                                    id="new_password"
                                    type="password"
                                    disabled={!isEditing}
                                    value={data.new_password}
                                    onChange={(e) => setData("new_password", e.target.value)}
                                    required
                                />
                                {errors.new_password && (
                                    <span className="text-sm text-red-500">
                                        {errors.new_password}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="new_password_confirmation">
                                    Confirm new password
                                </Label>
                                <Input
                                    id="new_password_confirmation"
                                    type="password"
                                    disabled={!isEditing}
                                    value={data.new_password_confirmation}
                                    onChange={(e) => setData("new_password_confirmation", e.target.value)}
                                    required
                                />
                                {errors.new_password_confirmation && (
                                    <span className="text-sm text-red-500">
                                        {errors.new_password_confirmation}
                                    </span>
                                )}
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
                                    <h3 className="text-lg font-medium">
                                        Project name
                                    </h3>
                                    <span className="opacity-50 ms-3">
                                        HR Employee Management System
                                    </span>
                                </div>

                                {/* Contact Email */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Contact email
                                    </h3>
                                    <span className="opacity-50 ms-3">
                                        felicesmarvin12@gmail.com
                                    </span>
                                </div>

                                {/* Date Completed */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Date completed
                                    </h3>
                                    <span className="opacity-50 ms-3">
                                        November XX, 2025
                                    </span>
                                </div>

                                {/* Developers */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Developers
                                    </h3>
                                    <div className="flex flex-col lg:flex-row lg:gap-16">
                                        <div className="flex flex-col ms-3">
                                            <span className="opacity-50">
                                                Amiluddin, Anthony P.
                                            </span>
                                            <span className="opacity-50">
                                                Oredeña, Rich Mae S.
                                            </span>
                                        </div>
                                        <div className="flex flex-col ms-3">
                                            <span className="opacity-50">
                                                Felices, Marvin N.
                                            </span>
                                            <span className="opacity-50">
                                                Reyel, Raheim Lebh
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SettingsPage.layout = (page) => <Layout>{page}</Layout>;
