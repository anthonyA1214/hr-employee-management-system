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

export default function DeleteEmployeeDialog({ open, onOpenChange, employee, onClose, }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (!employee) return;

        destroy(`/hr/employees/delete/${employee.id}`, {
            method: 'delete',
            onSuccess: () => {
                onClose();
                toast.success("Employee deleted successfully!");
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <div className="border-b-2 border-[#8EC5EE]"></div>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium">
                            Are you sure you want to delete <span className="font-bold">{employee?.name}</span>?
                        </p>
                        <p className="text-sm opacity-50">
                            This action is permanent and cannot be undone.
                        </p>
                    </div>                
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={handleDelete}
                            disabled={processing}
                            className="bg-[#018CEF] hover:bg-[#30A1EF] active:bg-[#5DB1EB]"
                        >
                            {processing ? (
                                <>
                                    <Spinner /> Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}