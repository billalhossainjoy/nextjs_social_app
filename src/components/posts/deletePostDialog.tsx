import React from 'react';
import {PostData} from "@/types";
import {useDeletePostMutation} from "@/components/posts/mutation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import LoadingButton from "@/components/loadingButton";
import {Button} from "@/components/ui/button";

type Props = {
    post: PostData;
    open: boolean;
    onClose: () => void;
};

const DeletePostDialog: React.FC<Props> = ({post, open, onClose}) => {
    const mutation = useDeletePostMutation()

    const handleDelete = async () => {
        if(!open || !mutation.isPending) {
            onClose()
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete posts?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <LoadingButton variant={"destructive"} onClick={() => mutation.mutate(post.id, {onSuccess: onClose})} loading={mutation.isPending}>
                        Delete
                    </LoadingButton>
                    <Button variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeletePostDialog;