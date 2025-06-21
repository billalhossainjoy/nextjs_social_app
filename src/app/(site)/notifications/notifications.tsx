"use client";

import React, { useEffect } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NotificationCountInfo, NotificationsPage } from "@/types";
import { Loader2 } from "lucide-react";
import apiClient from "@/lib/ky";
import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/postsLoadingSkeleton";
import Notification from "@/app/(site)/notifications/notification";

const Notifications: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      apiClient
        .get(
          "api/notifications",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<NotificationsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => apiClient.patch("api/notifications/mark-as-read"),
    onSuccess: () => {
      queryClient.setQueryData<NotificationCountInfo>(
        ["unread-notifications-count"],
        {
          unReadCount: 0,
        },
      );
    },
    onError: () => {},
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !notifications.length && !hasNextPage) {
    return (
      <p className={"text-center text-muted-foreground"}>
        You don&apos;t have any notifications yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className={"text-center text-destructive"}>
        An error occurred while loading notifications.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className={"space-y-5"}
    >
      {notifications?.map((notification) => (
        <Notification notification={notification} key={notification.id} />
      ))}
      {isFetchingNextPage && <Loader2 className={"mx-auto animate-spin"} />}
    </InfiniteScrollContainer>
  );
};

export default Notifications;
