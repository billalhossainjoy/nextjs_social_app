"use client";

import React, { useState } from "react";
import useInitializeChatClient from "@/app/(site)/messages/useInitializeChatClient";
import { Loader2 } from "lucide-react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatSideBar from "@/app/(site)/messages/chatSideBar";
import ChatChannel from "@/app/(site)/messages/chatChannel";
import { useTheme } from "next-themes";

const Chat: React.FC = () => {
  const chatClient = useInitializeChatClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { resolvedTheme } = useTheme();

  if (!chatClient) return <Loader2 className={"mx-auto animate-spin"} />;

  return (
    <main
      className={
        "relative w-full overflow-hidden rounded-2xl bg-card shadow-sm"
      }
    >
      <div className={"absolute bottom-0 top-0 flex w-full"}>
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSideBar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
};

export default Chat;
