import React, {PropsWithChildren} from 'react';
import {UserData} from "@/types";
import {useSession} from "@/context/sessionProvider";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import FollowButton from "@/components/followButton";
import Linkify from "@/components/linkify";
import FollowerCount from "@/components/followerCount";

interface Props extends PropsWithChildren {
    user: UserData;
}

const UserTooltip: React.FC<Props> = ({children, user}) => {
    const {user: loggedInUser} = useSession()

    const followerState = {
        followers: user._count.followers,
        isFollowedByUser: !!user.followers.some(({followerId}) => followerId === loggedInUser.id)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={""}>
                    <div className={"flex max-w-80 md:min-w-60 flex-col gap-3 break-words px-1 py-2.5 "}>
                        <div className={"flex items-center justify-between gap-2"}>
                            <Link href={`/users/${user.username}`}>
                                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
                            </Link>
                            {
                                loggedInUser.id !== user.id && (
                                    <FollowButton userId={user.id} initialState={{followers: 1, isFollowedByUser: false}} />
                                )
                            }
                        </div>
                        <Link href={`/users/${user.username}`}>
                            <div className={"text-lg font-semibold hover:underline text-primary"}>
                                {user.displayName}
                            </div>
                            <div className={"text-muted-foreground"}>
                                @{user.username}
                            </div>
                        </Link>
                    </div>
                    {user.bio && (
                        <Linkify>
                            <div className={"line-clamp-4 whitespace-pre-line"}>
                                {user.bio}
                            </div>
                        </Linkify>
                    )}
                    <FollowerCount userId={user.id} initialState={followerState} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default UserTooltip;