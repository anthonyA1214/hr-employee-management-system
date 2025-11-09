// Dialog Components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function ViewReasonDialog({ open, onOpenChange, leave }) {
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            {leave.leave_type}
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        {leave.name && (
                            <p>
                                <span className="font-medium">Name:</span> {leave.name}
                            </p>
                        )}
                        <p>
                            <span className="font-medium">Date:</span> {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                        </p>
                    </div>
                    
                    <p className="mt-8 whitespace-pre-line max-h-80 overflow-y-auto">{leave.reason}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}