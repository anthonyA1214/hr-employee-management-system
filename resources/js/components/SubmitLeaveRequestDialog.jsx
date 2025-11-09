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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner"

export default function SubmitLeaveRequestDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
    });

    const isDateDisabled = data.leave_type !== "vacation_leave";

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/employee/leave-requests/submit", {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast.success("Leave request submitted successfully!");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                    <Plus />
                    Leave Request
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Submit Leave Request
                        </DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>

                    {/* Leave Type */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="leave_type">Leave Type</Label>
                        <Select id="leave_type" value={data.leave_type} onValueChange={(value) => setData("leave_type", value)}>
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
                                    <SelectItem value="paternity_leave">
                                        Paternity Leave
                                    </SelectItem>
                                    <SelectItem value="emergency_leave">
                                        Emergency Leave
                                    </SelectItem>
                                    <SelectItem value="single_parent_leave">
                                        Single Parent Leave
                                    </SelectItem>
                                    <SelectItem value="magna_carta_leave">
                                        Magna Carta Leave
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.leave_type && (
                            <span className="text-sm text-red-500">
                                {errors.leave_type}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input 
                                id="start_date" 
                                type="date" 
                                disabled={isDateDisabled}
                                value={data.start_date}
                                onChange={(e) => setData("start_date", e.target.value)}
                                required={!isDateDisabled}
                            />
                            {isDateDisabled && (
                                <span className="text-sm opacity-50">
                                    Only available for vacation leave.
                                </span>
                            )}
                            {errors.start_date && (
                                <span className="text-sm text-red-500">
                                    {errors.start_date}
                                </span>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Input 
                                id="end_date" 
                                type="date" 
                                disabled={isDateDisabled}
                                value={data.end_date}
                                onChange={(e) => setData("end_date", e.target.value)}
                                required={!isDateDisabled}
                            />
                            {isDateDisabled && (
                                <span className="text-sm opacity-50">
                                    Only available for vacation leave.
                                </span>
                            )}
                            {errors.end_date && (
                                <span className="text-sm text-red-500">
                                    {errors.end_date}
                                </span>
                            )}
                        </div>
                    </div>        

                    {/* Reason */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <Label htmlFor="reason">
                            Reason<span className="opacity-50">(optional)</span>
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for leave"
                            value={data.reason}
                            onChange={(e) => setData("reason", e.target.value)}
                            className="min-h-40 max-h-60 overflow-y-auto"
                        />
                        {errors.reason && (
                            <span className="text-sm text-red-500">
                                {errors.reason}
                            </span>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <Spinner />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
