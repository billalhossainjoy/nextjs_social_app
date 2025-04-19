"use client"

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/userAvatar";
import {useSession} from "@/context/sessionProvider";
import Link from "next/link";
import {LogOutIcon, Monitor, Moon, Sun, UserIcon} from "lucide-react";
import {logout} from "@/app/(auth)/action";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    className?: string
};

const UserButton: React.FC<Props> = ({className}) => {
    const {user} = useSession()

    const {theme, setTheme} = useTheme()

    const queryClient = useQueryClient()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex-none rounded-full", className)} type={"button"}>
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
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className={"mr-2 size-4"}/>
                        theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem className={cn(theme === "system" && "bg-secondary")} onClick={() => setTheme("system")}>
                                <Monitor className={"mr-4 size-4"}/>
                                System Defult
                            </DropdownMenuItem>
                            <DropdownMenuItem className={cn(theme === "light" && "bg-secondary")} onClick={() => setTheme("light")}>
                                <Sun className={"mr-4 size-4"}/>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem className={cn(theme === "dark" && "bg-secondary")} onClick={() => setTheme("dark")}>
                                <Moon className={"mr-4 size-4"}/>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    queryClient.clear();
                    logout()
                }} className={"text-destructive"}>
                   <LogOutIcon  className={"mr-2 size-4 text-destructive"}/>
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;