import React from "react";
import { CommentData } from "@/types";
import UserTooltip from "@/components/UserTooltip";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/context/sessionProvider";
import CommentMoreButton from "@/components/comments/commentMoreButton";

interface Props {
  comment: CommentData;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const { user } = useSession();

  return (
    <div className={"flex gap-3 py-3 items-center group/comment"}>
      <span className={"hidden sm:inline"}>
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className={"flex items-center gap-1 text-sm"}>
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className={"font-medium hover:underline"}
            >
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className={"text-muted-foreground"}>
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <div>{comment.content}</div>
      </div>
      {comment.user.id === user.id && (
        <CommentMoreButton
          comment={comment}
          className={
            "ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
          }
        />
      )}
    </div>
  );
};

export default Comment;
