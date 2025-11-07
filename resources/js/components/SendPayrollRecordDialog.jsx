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

export default function SendPayrollRecordDialog({ open, onOpenChange, payroll, onClose, }) {
    const { put, processing } = useForm();

    const handleSend = () => {
        if (!payroll) return;

        put(`/hr/payroll/send/${payroll.id}`, {
            onSuccess: () => {
                onClose();
                toast.success("Payroll record sent successfully!");
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Payroll Record</DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium">
                            Are you sure you want to send payroll for <span className="font-bold">{payroll?.name}</span>?
                        </p>
                        <p className="text-sm opacity-50">
                            Do you want to proceed with sending this payroll record?
                        </p>
                    </div>                
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={handleSend}
                            disabled={processing}
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        >
                            {processing ? (
                                <>
                                    <Spinner /> Sending...
                                </>
                            ) : (
                                "Send"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}