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
import { Textarea } from "@/components/ui/textarea";

export default function SubmitLeaveRequestDialog() {
    return (
        <Dialog>
            <Form>
                <DialogTrigger asChild>
                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <Plus />
                        Leave Request
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Submit Leave Request
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>

                    {/* Leave Type */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="leave_type">Leave Type</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Leave Types</SelectLabel>
                                    <SelectItem value="sick_leave">
                                        Sick Leave
                                    </SelectItem>
                                    <SelectItem value="vacation_leave">
                                        Vacation Leave
                                    </SelectItem>
                                    <SelectItem value="maternity_leave">
                                        Maternity Leave
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input id="start_date" type="date" required />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Input id="end_date" type="date" required />
                        </div>
                    </div>

                    {/* Number of Days */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="number_of_days">Number of Days</Label>
                        <Input
                            id="number_of_days"
                            type="number"
                            min="1"
                            required
                        />
                    </div>

                    {/* Reason */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="reason">
                            Reason<span className="opacity-50">(optional)</span>
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for leave"
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
                            Submit Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Form>
        </Dialog>
    );
}
