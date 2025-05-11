"use client"

import {FollowerInfo} from "@/types";
import {useQuery} from "@tanstack/react-query";
import apiClient from "@/lib/ky";


export default function useFollowerInfo (userId: string, initialState: FollowerInfo) {
    return useQuery({
        queryKey: ["follower-info", userId],
        queryFn: () => apiClient.get("api/users/").json<FollowerInfo>(),
        initialData: initialState,
        staleTime: Infinity,
    })

}