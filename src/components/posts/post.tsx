"use client";

import React from "react";
import { PostData } from "@/types";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import { formatRelativeDate } from "@/lib/utils";
import PostMoreButton from "@/components/posts/postMoreButton";
import Linkify from "@/components/linkify";
import UserTooltip from "@/components/UserTooltip";
import { useSession } from "@/context/sessionProvider";
import MediaPreviews from "@/components/posts/mediaPreviews";
import LikeButton from "@/components/posts/likeButton";
import BookmarkButton from "@/components/posts/bookmarkButton";

interface Props {
  post: PostData;
}

const Post: React.FC<Props> = ({ post }) => {
  const { user } = useSession();
  return (
    <article className={"group space-y-3 rounded-2xl bg-card p-5 shadow-sm"}>
      <div className={"flex justify-between gap-3"}>
        <div className={"flex flex-wrap gap-3"}>
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className={"block font-medium hover:underline "}
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <UserTooltip user={post.user}>
              <Link
                href={`/posts/${post.id}`}
                className={
                  "text-sm block text-muted-foreground hover:underline"
                }
              >
                {formatRelativeDate(post.createdAt)}
              </Link>
            </UserTooltip>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            classname={"group-hover:opacity-100 opacity-0 transition-opacity"}
          />
        )}
      </div>
      <Linkify>
        <div className={"whitespace-pre-line break-words"}>{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr />
      <div className={"flex justify-between gap-3"}>
        <LikeButton
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some(({ userId }) => userId === user.id),
          }}
        />
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              ({ userId }) => userId === user.id,
            ),
          }}
        />
      </div>
    </article>
  );
};

export default Post;
