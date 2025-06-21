import React from "react";
import { CommentsPage, PostData } from "@/types";
import CommentsInput from "@/components/comments/commentsInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import Comment from "@/components/comments/comment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  post: PostData;
}

const Comments: React.FC<Props> = ({ post }) => {
  const { data, hasNextPage, isFetching, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        apiClient
          .get(
            `api/posts/${post.id}/comment`,
            pageParam
              ? {
                  searchParams: {
                    cursor: pageParam,
                  },
                }
              : {},
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => {
        console.log("firstPage", firstPage);
        return firstPage.previousCursor;
      },
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div>
      <CommentsInput post={post} />
      {hasNextPage && (
        <Button
          className={"mx-auto block py-3"}
          variant={"link"}
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      {status === "pending" && <Loader2 className={"mx-auto animate-spin"} />}
      {status === "success" && !comments.length && (
        <p className={"text-primary text-center py-3"}>No comments yet.</p>
      )}
      {status === "error" && (
        <p className={"text-destructive text-center"}>
          An error occurred while loading comments.
        </p>
      )}
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
