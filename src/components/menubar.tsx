import React from "react";
import { cn } from "@/lib/utils";
import { getNotificationsCount } from "@/app/(site)/notifications/actions";
import { Button } from "@/components/ui/button";
import NotificationsButton from "@/components/notificationsButton";
import Link from "next/link";
import { Bookmark, Home } from "lucide-react";

type Props = {
  className: string;
};

const Menubar: React.FC<Props> = async ({ className }) => {
  const { unReadCount } = await getNotificationsCount();

  return (
    <div className={cn("", className)}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 w-full"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton initialState={{ unReadCount: unReadCount }} />
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
