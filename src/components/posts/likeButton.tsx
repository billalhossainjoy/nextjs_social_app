"use client";

import React from "react";
import { LikeInfo } from "@/types";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  postId: string;
  initialState: LikeInfo;
}

const LikeButton: React.FC<Props> = ({ postId, initialState }) => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["like-info", postId];
  const { data } = useQuery({
    queryKey,
    queryFn: () => apiClient.get(`api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikedByUser
        ? apiClient.delete(`api/posts/${postId}/likes`)
        : apiClient.post(`api/posts/${postId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) + (previousState?.isLikedByUser ? -1 : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error("Something went wrong.");
    },
  });
  return (
    <button onClick={() => mutate()} className={"flex items-center gap-2"}>
      <Heart
        className={cn(
          "size-5",
          data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />
      <span className={"text-sm font-medium tabular-nums"}>
        {data.likes} <span className={"text-sm sm:inline"}>likes</span>
      </span>
    </button>
  );
};

export default LikeButton;
