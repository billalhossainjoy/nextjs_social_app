import React from "react";
import { BookmarkInfo } from "@/types";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  postId: string;
  initialState: BookmarkInfo;
}

const BookmarkButton: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", props.postId];
  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      apiClient.get(`/api/posts/${props.postId}`).json<BookmarkInfo>(),
    staleTime: Infinity,
    initialData: props.initialState,
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      data?.isBookmarkedByUser
        ? apiClient.delete(`api/posts/${props.postId}/bookmark`)
        : apiClient.post(`api/posts/${props.postId}/bookmark`),
    onMutate: async () => {
      toast.success(
        data?.isBookmarkedByUser
          ? "Post is removed from bookmarks"
          : "Post is bookmarked",
      );

      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Something went wrong.");
    },
  });

  return (
    <button onClick={() => mutate()}>
      <Bookmark
        className={cn(
          "size-5",
          data?.isBookmarkedByUser && "fill-primary text-primary",
        )}
      />
    </button>
  );
};

export default BookmarkButton;
