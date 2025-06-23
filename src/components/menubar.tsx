import React from "react";
import { cn } from "@/lib/utils";
import { getNotificationsMessagesCount } from "@/app/(site)/notifications/actions";
import { Button } from "@/components/ui/button";
import NotificationsButton from "@/components/notificationsButton";
import Link from "next/link";
import { Bookmark, Home } from "lucide-react";
import MessagesButton from "@/app/(site)/messages/messagesButton";

type Props = {
  className: string;
};

const Menubar: React.FC<Props> = async ({ className }) => {
  const { unreadNotificationCount, unreadMessagesCount } =
    await getNotificationsMessagesCount();

  return (
    <div className={cn("", className)}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unReadCount: unreadNotificationCount }}
      />
      <MessagesButton initialState={{ unReadCount: unreadMessagesCount }} />

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
};

export default Menubar;
