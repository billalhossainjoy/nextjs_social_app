import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "@/components/posts/action";
import { toast } from "sonner";
import { PostsPage } from "@/types";

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: deletePost,
    async onSuccess(deletedPost) {
      const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>> =
        { queryKey: ["posts-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletedPost.id),
            })),
          };
        },
      );

      toast("Post deleted successfully");

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError() {
      toast.error("Failed to delete post. please try agai");
    },
  });
}
