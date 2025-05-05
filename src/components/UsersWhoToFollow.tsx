import React from 'react';
import {WhoToFollow} from "@/app/(site)/action";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import FollowButton from "@/components/followButton";

const UsersWhoToFollow: React.FC =async () => {


    const usersToFollow =await WhoToFollow()
    console.log(usersToFollow)
    return (
        <div className={"hidden md:block space-y-5 rounded-2xl bg-cardshadow-sm"}>
            <div className={"text-xl font-bold flex flex-col gap-2"}>
                {
                    usersToFollow.map((user)=> (
                        <div key={user.id} className={"flex items-center justify-between gap-3"}>
                            <Link href={`/users/${user.username}`} className={"flex items-center gap-3"}>
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
                            <FollowButton
                                userId={user.id}
                                initialState={{
                                    followers: user._count.followers,
                                    isFollowedByUser: user.followers.some(({followerId}) => followerId === user.id)
                            }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UsersWhoToFollow;