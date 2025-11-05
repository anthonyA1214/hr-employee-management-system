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

export default function ViewMemoDialog({ open, onOpenChange, memo }) {
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            {memo.subject}
                        </DialogTitle>
                    </DialogHeader>
                    <p><span className="font-medium">Date:</span> {formatDate(memo.sent_at)}</p>
                    <p className="mt-8 whitespace-pre-line">{memo.body}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}