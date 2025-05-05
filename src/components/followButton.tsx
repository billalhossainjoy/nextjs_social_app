"use client"
import React from 'react';
import {FollowerInfo} from "@/types";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import {Button} from "@/components/ui/button";
import {QueryKey, useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import {toast} from "sonner";

type Props = {
    userId: string;
    initialState: FollowerInfo;
};

const FollowButton: React.FC<Props> = ({userId, initialState}) => {
    const {data} = useFollowerInfo(userId, initialState)

    const queryClient = useQueryClient()
    const queryKey : QueryKey = ["follower-info", userId]

    const {mutate} = useMutation({
        mutationFn: () => data.isFollowedByUser ?
            apiClient.delete(`api/users/${userId}/followers`) :
            apiClient.post(`api/users/${userId}/followers`),
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey})

            const previousState = queryClient.getQueryData<FollowerInfo>(queryKey)

            queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
                followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser? -1 : 1),
                isFollowedByUser: !previousState?.isFollowedByUser
            }))
            return {previousState}
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey,context?.previousState)
            console.error(error);
            toast.error("Something went wrong.")
        }
    })

    return (
        <Button variant={data.isFollowedByUser ? "secondary" : "default"} onClick={() => {
            mutate()
        }} className={"cursor-pointer"}>
            {data.isFollowedByUser ? "Unfollow" : "Follow"}
        </Button>
    );
};

export default FollowButton;