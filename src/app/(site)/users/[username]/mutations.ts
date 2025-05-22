import { useRouter } from "next/navigation";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import { UpdateUserProfileValues } from "@/validation/profile.schema";
import { updateUserProfile } from "@/app/(site)/users/[username]/action";
import { PostsPage } from "@/types";
import { toast } from "sonner";

interface UploadType {
  values: UpdateUserProfileValues;
  avatar?: File;
}

export function useUpdateProfileMutaion() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  return useMutation({
    mutationFn: async ({ values, avatar }: UploadType) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
      ]);
    },

    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter = {
        queryKey: ["posts-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );

      router.refresh();

      toast.success("Profile Updated");
    },
    onError() {
      toast.error("Profile not updated");
    },
  });
}
