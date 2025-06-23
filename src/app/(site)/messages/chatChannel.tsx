import React from "react";
import { Channel, MessageInput, MessageList, Window } from "stream-chat-react";
import { cn } from "@/lib/utils";
import CustomChannelHeader from "@/app/(site)/messages/chatHeader";

interface Props {
  open: boolean;
  openSidebar: () => void;
}

const ChatChannel: React.FC<Props> = ({ open, openSidebar }) => {
  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <Channel>
        <Window>
          <CustomChannelHeader openSidebar={openSidebar} />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
};

export default ChatChannel;
