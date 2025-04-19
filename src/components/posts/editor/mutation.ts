import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import {submitPost} from "@/components/posts/editor/action";
import {toast} from "sonner";
import {PostsPage} from "@/types";

export function usePostMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: submitPost,
        onSuccess: async (newPost) => {
            const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>> = {
                queryKey: ["posts-feed"]
            }
            await queryClient.cancelQueries(queryFilter)

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    const firstPage = oldData?.pages[0]

                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [{
                                posts: [newPost, ...firstPage.posts],
                                nextCursor: firstPage.nextCursor
                            },
                                ...oldData.pages.slice(1),
                            ]
                        }
                    }
                    return oldData
                }
            );

            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return !query.state.data
                }
            })

            toast.success("Post created successfully");
        },
        onError: () => {
            toast.error("Error creating post");
        }
    })
}