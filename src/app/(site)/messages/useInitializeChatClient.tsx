"use client";

import { useSession } from "@/context/sessionProvider";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import apiClient from "@/lib/ky";

export default function useInitializeChatClient() {
  const { user } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    client
      .connectUser(
        {
          id: user.id,
          username: user.username,
          name: user.displayName,
          image: user.avatarUrl ?? undefined,
        },
        async () =>
          apiClient
            .get("api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((err) => console.error(err))
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((err) => console.error(err))
        .then(() => console.log("connection closed"));
    };
  }, [user.id, user.username, user.displayName, user.avatarUrl, setChatClient]);

  return chatClient;
}
