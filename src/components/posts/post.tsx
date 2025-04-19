"use client"

import React from 'react';
import {PostData} from "@/types";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import {formatRelativeDate} from "@/lib/utils";
import {useSession} from "@/context/sessionProvider";
import PostMoreButton from "@/components/posts/postMoreButton";

interface Props {
    post: PostData
};

const Post: React.FC<Props> = ({post}) => {
    const {user} = useSession()
    return (
        <article className={"group space-y-3 rounded-2xl bg-card p-5 shadow-sm"}>
            <div className={"flex justify-between gap-3"}>
            <div className={"flex flex-wrap gap-3"}>
                <Link href={`/users/${post.user.username}`}>
                    <UserAvatar avatarUrl={post.user.avatarUrl}/>
                </Link>
                <div>
                    <Link href={`/uses/${post.user.username}`} className={"block font-medium hover:underline "}>
                        {post.user.displayName}
                    </Link>
                    <Link href={`/posts/${post.id}`}
                    className={"text-sm block text-muted-foreground hover:underline"}
                    >
                        {
                            formatRelativeDate(post.createdAt)
                        }
                    </Link>
                </div>
            </div>
                {
                    post.user.id === user.id && <PostMoreButton post={post} classname={"group-hover:opacity-100 opacity-0 transition-opacity"} />
                }
            </div>
            <div className={"whitespace-pre-line break-words"}>
                {post.content}
            </div>
        </article>
    );
};

export default Post;