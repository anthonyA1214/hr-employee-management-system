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
import { Send } from "lucide-react";
import { Form } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";

export default function SendMemoDialog() {
    return (
        <Dialog>
            <Form>
                <DialogTrigger asChild>
                    <Button className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]">
                        <Send />
                        Send Memo
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Send New Memo
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
                                    <SelectItem value="john_doe">
                                        John Doe
                                    </SelectItem>
                                    <SelectItem value="jane_smith">
                                        Jane Smith
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="memo_subject">Memo Subject</Label>
                        <Input
                            id="memo_subject"
                            type="text"
                            placeholder="Enter memo subject"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="memo_body">Memo Body</Label>
                        <Textarea
                            id="memo_body"
                            placeholder="Enter memo body"
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
                            Send Memo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Form>
        </Dialog>
    );
}
