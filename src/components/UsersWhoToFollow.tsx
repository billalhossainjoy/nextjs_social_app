import React from 'react';
import {WhoToFollow} from "@/app/(site)/action";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import {Button} from "@/components/ui/button";

const UsersWhoToFollow: React.FC =async () => {

    // await new Promise(r => setTimeout(r, 5000)) // just for testing
    const usersToFollow =await WhoToFollow()
    return (
        <div className={"hidden md:block space-y-5 rounded-2xl bg-card p-5 shadow-sm"}>
            <div className={"text-xl font-bold"}>
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
                            <Button>
                                Follow
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UsersWhoToFollow;