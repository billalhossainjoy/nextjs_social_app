"use client";

import React from "react";
import { NotificationCountInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import { cn } from "@/lib/utils";

interface Props {
  initialState: NotificationCountInfo;
  className?: string;
}

const NotificationsButton: React.FC<Props> = ({ initialState, className }) => {
  const { data } = useQuery({
    queryKey: ["unread-notifications-count"],
    queryFn: () =>
      apiClient
        .get(`api/notifications/unread-count`)
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant={"ghost"}
      className={cn("flex items-center justify-start gap-3", className)}
      title={"Notifications"}
      asChild
    >
      <Link href={`/notifications`}>
        <div className={"relative"}>
          <Bell />
          {!!data.unReadCount && (
            <span
              className={
                "absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground"
              }
            >
              {data.unReadCount}
            </span>
          )}
        </div>
        <span className={"hidden lg:inline"}>Notifications</span>
      </Link>
    </Button>
  );
};

export default NotificationsButton;
