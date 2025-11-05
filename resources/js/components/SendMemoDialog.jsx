// React & Inertia
import { useState } from "react";
import { useForm } from "@inertiajs/react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"

// Dialog Components
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Select Components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Icons
import { Send } from "lucide-react";

export default function SendMemoDialog({ employees }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        subject: '',
        body: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/hr/memos/send', {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast.success("Memo sent successfully!");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <Send />
                        Send Memo
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Send New Memo
                            </DialogTitle>
                            <div className="border-b-2 border-[#8EC5EE]"></div>
                        </DialogHeader>
                        <div className="flex flex-col gap-y-2 w-full">
                            <Label htmlFor="employee_name">Employee Name</Label>
                            <Select value={data.employee_id} onValueChange={(value) => setData('employee_id', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Employees</SelectLabel>
                                        <SelectItem value="all">All Employees</SelectItem>
                                        {employees.map((employee) => (
                                            <SelectItem key={employee.id} value={employee.id.toString()}>
                                                {employee.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.employee_id && (
                                <span className="text-sm text-red-500">
                                    {errors.employee_id}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="memo_subject">Memo Subject</Label>
                            <Input
                                id="memo_subject"
                                type="text"
                                placeholder="Enter memo subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                required
                            />
                            {errors.subject && (
                                <span className="text-sm text-red-500">
                                    {errors.subject}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="memo_body">Memo Body</Label>
                            <Textarea
                                id="memo_body"
                                placeholder="Enter memo body"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                required
                            />
                            {errors.body && (
                                <span className="text-sm text-red-500">
                                    {errors.body}
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
                                        <Spinner />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Memo"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    );
}
