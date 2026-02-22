
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    isDeleting?: boolean;
}

export const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item",
    isDeleting,
}: ConfirmDeleteModalProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-card border-border max-w-sm rounded-lg sm:max-w-md">
                <AlertDialogHeader className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-destructive/10 p-3 ring-1 ring-destructive/20 ring-offset-2 ring-offset-card">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <AlertDialogTitle className="text-xl font-bold tracking-tight">
                            Delete Confirmation
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground text-sm font-medium">
                            Are you sure you want to delete <span className="font-bold text-foreground">{itemName}</span>?
                            <br /> This action cannot be undone.
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                    <AlertDialogCancel onClick={onClose} disabled={isDeleting} className="w-full mt-0">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} disabled={isDeleting} className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
