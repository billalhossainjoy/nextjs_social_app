import React, { JSX } from "react";
import { NotificationData } from "@/types";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/userAvatar";

interface Props {
  notification: NotificationData;
}

const Notification: React.FC<Props> = ({ notification }) => {
  const notificationTypeMap: Record<
    NotificationType,
    {
      message: string;
      icon: JSX.Element;
      href: string;
    }
  > = {
    FOLLOW: {
      message: `${notification.issuer.displayName} followed you`,
      icon: <User2 className={"size-7 text-primary"} />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.displayName} comment on your post`,
      icon: <MessageCircle className={"size-7 text-primary"} />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `${notification.issuer.displayName} liked your post`,
      icon: <Heart className={"size-7 text-destructive fill-destructive"} />,
      href: `/posts/${notification.postId}`,
    },
  };
  const { message, icon, href } = notificationTypeMap[notification.type];
  return (
    <Link href={href} className={"block"}>
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className={"my-1"}>{icon}</div>
        <div>
          <UserAvatar
            avatarUrl={notification.issuer.avatarUrl}
            className={"flex-none"}
          />
          <div>
            <span className={"font-bold"}>
              {notification.issuer.displayName}
            </span>
            <span>{message}</span>
          </div>
          {notification.post && (
            <div
              className={
                "line-clamp-3 whitespace-pre-line text-muted-foreground"
              }
            >
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Notification;
