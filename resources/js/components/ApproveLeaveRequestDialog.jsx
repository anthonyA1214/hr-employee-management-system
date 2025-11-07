import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function ApproveLeaveRequestDialog({ open, onOpenChange, leaveRequest, onClose, }) {
    const { put, processing } = useForm();

    const handleApprove = () => {
        put(`/hr/leave-requests/approve/${leaveRequest.id}`, {
            onSuccess: () => {
                toast.success("Leave request approved successfully.");
                onClose();
            },
            onError: () => {
                toast.error("Failed to approve leave request. Please try again.");
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Approve Leave Request</DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium">
                            Are you sure you want to approve the leave request for <span className="font-bold">{leaveRequest?.first_name} {leaveRequest?.last_name}</span>?
                        </p>
                        <p className="text-sm opacity-50">
                            Do you want to proceed with approving this leave request?
                        </p>
                    </div>                
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={handleApprove}
                            disabled={processing}
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        >
                            {processing ? (
                                <>
                                    <Spinner /> Approving...
                                </>
                            ) : (
                                "Approve"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}