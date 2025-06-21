import React, { useState } from "react";
import { CommentData } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import DeleteCommentDialog from "@/components/comments/deleteCommentDialog";

interface Props {
  comment: CommentData;
  className?: string;
}

const CommentMoreButton: React.FC<Props> = ({ comment, className }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className={className}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={() => {
            setShowDeleteDialog(true);
          }}
        >
          <span
            className={
              "flex items-center gap-3 text-destructive cursor-pointer"
            }
          >
            <Trash2 className={"size-4"} />
            delete
          </span>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        comment={comment}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default CommentMoreButton;
