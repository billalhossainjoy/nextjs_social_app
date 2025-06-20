import React from "react";
import { UserData } from "@/types";
import Linkify from "@/components/linkify";
import FollowButton from "@/components/followButton";
import { validateRequest } from "@/auth";
import PostsTooltip from "@/app/(site)/posts/[postId]/tooltip";

interface Props {
  user: UserData;
}

export async function UserInfoSideBar({ user }: Props) {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return null;

  return (
    <div className={"space-y-5 rounded-2xl bg-card p-5 shadow-sm"}>
      <div className={"text-xl font-bold"}>About this user</div>
      <PostsTooltip user={user} />
      <Linkify>
        <div
          className={
            "line-clamp-6 whitespace-pre-line break-words text-muted-foreground"
          }
        >
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}
