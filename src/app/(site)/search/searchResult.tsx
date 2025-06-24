"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostsPage } from "@/types";
import { Loader2 } from "lucide-react";
import Post from "@/components/posts/post";
import apiClient from "@/lib/ky";
import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/postsLoadingSkeleton";

interface Props {
  query: string;
}

const Bookmarks: React.FC<Props> = ({ query }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts-feed", "search", query],
    queryFn: ({ pageParam }) =>
      apiClient
        .get("api/search", {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className={"text-center text-muted-foreground"}>
        no post found for this query.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className={"text-center text-destructive"}>
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className={"space-y-5"}
    >
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      {isFetchingNextPage && <Loader2 className={"mx-auto animate-spin"} />}
    </InfiniteScrollContainer>
  );
};

export default Bookmarks;
