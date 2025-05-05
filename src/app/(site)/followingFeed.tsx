"use client"
import React from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import {PostsPage} from "@/types";
import PostsLoadingSkeleton from "@/components/postsLoadingSkeleton";
import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import Post from "@/components/posts/post";
import {Loader2} from "lucide-react";

const FollowingFeed: React.FC = () => {

    const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey: ["following-feed"],
        queryFn: () => apiClient.get("api/posts/following").json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

    const posts = data?.pages.flatMap(page => page.posts) || [];

    if(status === "pending") {
        return <PostsLoadingSkeleton />
    }

    if(status === "success" && !posts.length && !hasNextPage) {
        return <p className={"text-center text-muted-foreground"}>
            No posts found. Start following people to see their posts.
        </p>
    }

    if(status === "error") {
        return <p className={"text-center text-destructive"}>
            An error occurred while loading posts.
        </p>
    }

    return (
        <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching  && fetchNextPage()} className={"space-y-5"}>
            {
                posts?.map(post => (
                    <Post post={post} key={post.id}/>
                ))
            }
            {
                isFetchingNextPage && <Loader2 className={"mx-auto animate-spin"} />
            }

        </InfiniteScrollContainer>
    );
};

export default FollowingFeed;