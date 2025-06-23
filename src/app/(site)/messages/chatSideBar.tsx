import React, { useCallback, useEffect } from "react";
import { useSession } from "@/context/sessionProvider";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import MenuHeader from "@/app/(site)/messages/menuHeader";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChatSideBar: React.FC<Props> = ({ open, onClose }) => {
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { channel } = useChatContext();

  useEffect(() => {
    if (channel?.id) {
      queryClient
        .invalidateQueries({ queryKey: ["unread-messages-count"] })
        .then(() => console.log("invalidated"));
    }
  }, [channel?.id, queryClient]);

  const channelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );

  return (
    <div
      className={cn(
        "size-full md:flex flex-col border-e md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: "messaging",
          members: {
            $in: [user.id],
          },
        }}
        options={{
          state: true,
          presence: true,
          limit: 8,
        }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: {
                members: {
                  $in: [user.id],
                },
              },
            },
          },
        }}
        showChannelSearch
        Preview={channelPreviewCustom}
      />
    </div>
  );
};

export default ChatSideBar;
