"use client";

import React from "react";
import { MessageCountInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  initialState: MessageCountInfo;
  className?: string;
}

const MessagesButton: React.FC<Props> = ({ initialState, className }) => {
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () =>
      apiClient.get("/api/messages/unread-count").json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant={"ghost"}
      className={cn("flex items-center justify-start gap-3", className)}
      title={"Messages"}
      asChild
    >
      <Link href={"/messages"}>
        <div className={"relative"}>
          <Mail />
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
        <span className={"hidden lg:inline"}>Messages</span>
      </Link>
    </Button>
  );
};

export default MessagesButton;
