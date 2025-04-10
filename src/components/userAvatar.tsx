import React from 'react';
import Image from "next/image";
import avatarPlaceholder from "@/assets/Avatar-placeholder.png"
import {cn} from "@/lib/utils";

type Props = {
    avatarUrl?: string | null
    size?: number;
    className?: string;
};
const UserAvatar: React.FC<Props> = ({avatarUrl, size, className}) => {
    return (
        <Image
        src={avatarUrl || avatarPlaceholder}
        alt={"avatar"}
        width={size || 48}
        height={size || 48}
        className={cn("aspect-square h-fit flex-none rounded-full bg-secondary object-cover", className )}
        />
    );
};

export default UserAvatar;