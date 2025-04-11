import React from 'react';
import {PostData} from "@/types";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import {formatRelativeDate} from "@/lib/utils";

interface Props {
    post: PostData
};

const Post: React.FC<Props> = ({post}) => {
    return (
        <article className={"space-y-3 rounded-2xl bg-card p-5 shadow-sm"}>
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
            <div className={"whitespace-pre-line break-words"}>
                {post.content}
            </div>
        </article>
    );
};

export default Post;