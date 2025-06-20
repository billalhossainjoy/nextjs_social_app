"use client";

import React from "react";
import { UserData } from "@/types";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import UserTooltip from "@/components/UserTooltip";

interface Props {
  user: UserData;
}

const PostsTooltip: React.FC<Props> = ({ user }) => {
  return (
    <UserTooltip user={user}>
      <Link
        href={`/users/${user.username}`}
        className={"flex items-enter gap-3"}
      >
        <UserAvatar avatarUrl={user.avatarUrl} className={"flex-none"} />
        <div>
          <p className={"line-clamp-1 break-all font-semibold hover:underline"}>
            {user.displayName}
          </p>
          <p className={"line-clamp-1 break-all text-muted-foreground"}>
            @{user.username}
          </p>
        </div>
      </Link>
    </UserTooltip>
  );
};

export default PostsTooltip;
