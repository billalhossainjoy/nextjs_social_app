"use client"

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/userAvatar";
import {useSession} from "@/context/sessionProvider";
import Link from "next/link";
import {LogOutIcon, UserIcon} from "lucide-react";
import {logout} from "@/app/(auth)/action";

type Props = {
    className?: string
};

const UserButton: React.FC<Props> = ({className}) => {
    const {user} = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={""} type={"button"}>
                    <UserAvatar avatarUrl={user.avatarUrl} size={48}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    logged in as @{user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/users/${user.username}`} className={"w-full"}>
                    <DropdownMenuItem>
                        <UserIcon className={"mr-2 size-4"}/>
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className={"text-destructive"}>
                   <LogOutIcon  className={"mr-2 size-4 text-destructive"}/>
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;