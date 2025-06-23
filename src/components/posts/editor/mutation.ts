import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "@/components/posts/editor/action";
import { toast } from "sonner";
import { PostsPage } from "@/types";
import { useSession } from "@/context/sessionProvider";

export function usePostMutation() {
  const queryClient = useQueryClient();

  const { user } = useSession();

  return useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["posts-feed"],
        predicate(query: { queryKey: readonly unknown[] }) {
          return (
            query.queryKey.includes("home") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          return oldData;
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate: (query) => {
          return queryFilter.predicate(query) && !query.state.data;
        },
      });

      toast.success("Post created successfully");
    },
    onError: () => {
      toast.error("Error creating post");
    },
  });
}
