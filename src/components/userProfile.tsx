import React from "react";
import { FollowerInfo, UserData } from "@/types";
import UserAvatar from "@/components/userAvatar";
import { formatDate } from "date-fns";
import { formatNumber } from "@/lib/utils";
import FollowerCount from "@/components/followerCount";
import FollowButton from "@/components/followButton";
import EditProfileButton from "@/app/(site)/users/[username]/editProfileButton";

type Props = {
  user: UserData;
  loggedInUserId: string;
};

const UserProfile: React.FC<Props> = ({ user, loggedInUserId }) => {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <div className={"h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm"}>
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className={"mx-auto size-full max-h-60 max-w-60 rounded-full shadow-xl"}
      />
      <div className={"flex flex-wrap gap-3 sm:flex-nowrap"}>
        <div className={"me-auto space-y-3"}>
          <div>
            <h1 className={"text-3xl font-bold capitalize"}>
              {user.displayName}
            </h1>
            <span className={"text-muted-foreground"}>@{user.username}</span>
          </div>
          <div>Member since {formatDate(user.createdAt, "MM d, yyyy")}</div>
          <div>
            <span>
              Posts: <span>{formatNumber(user._count.posts)}</span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <div className={"overflow-hidden whitespace-pre-line break-words"}>
            {user.bio}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
