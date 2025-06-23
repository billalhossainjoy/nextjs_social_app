"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatContext } from "stream-chat-react";
import { useSession } from "@/context/sessionProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { UserResponse } from "stream-chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, SearchIcon, X } from "lucide-react";
import SearchResult from "@/app/(site)/messages/searchResult";
import UserAvatar from "@/components/userAvatar";
import { toast } from "sonner";
import LoadingButton from "@/components/loadingButton";

interface Props {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onChatCreated: () => void;
}

const NewChatDialog: React.FC<Props> = ({ onOpenChange, onChatCreated }) => {
  const { client, setActiveChannel } = useChatContext();

  const { user: loggedInUser } = useSession();
  const [searchInput, setSearchInput] = useState("");

  const searchInputDebounced = useDebounce(searchInput);

  const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["stream-users", searchInputDebounced],
    queryFn: async () =>
      client.queryUsers(
        {
          // id: { $ne: loggedInUser.id },
          // role: { $ne: "admin" },
          ...(searchInputDebounced
            ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { username: { $autocomplete: searchInputDebounced } },
                ],
              }
            : {}),
        },
        { name: 1, username: 1 },
        { limit: 15 },
      ),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const channel = client.channel("messaging", {
        members: [loggedInUser.id, ...selectedUsers.map((u) => u.id)],
        name:
          selectedUsers.length > 1
            ? loggedInUser.displayName +
              ", " +
              selectedUsers.map((u) => u.name).join(", ")
            : undefined,
      } as {
        members: string[];
        name?: string;
      });
      await channel.create();
      return channel;
    },
    onSuccess: (channel) => {
      setActiveChannel(channel);
      onChatCreated();
      toast.success("Chat started successfully.");
    },
    onError: () => {
      console.log("error");
      toast.error("An error occurred while creating the chat.");
    },
  });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className={"bg-card p-0"}>
        <DialogHeader className={"px-6 pt-6"}>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <div>
          <div className={"group relative"}>
            <SearchIcon
              className={
                "absolute left-5 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary"
              }
            />
            <input
              placeholder={"search user..."}
              className={"h-12 w-full pe-4 ps-14 focus:outline-none"}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {!!selectedUsers.length && (
            <div className={"flex flex-wrap gap-2 p-2 mt-4"}>
              {selectedUsers.map((user) => (
                <SelectedUserTag
                  key={user.id}
                  user={user}
                  onRemove={() => {
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id),
                    );
                  }}
                />
              ))}
            </div>
          )}
          <hr />
          <div className={"h-96 overflow-y-auto"}>
            {isSuccess &&
              data.users.map((user) => (
                <SearchResult
                  key={user.id}
                  user={user}
                  selected={selectedUsers.some((u) => u.id === user.id)}
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.id === user.id)
                        ? prev.filter((u) => u.id !== user.id)
                        : [...prev, user],
                    );
                  }}
                />
              ))}
            {isSuccess && !data?.users.length && (
              <p className={"my-3 text-center text-muted-foreground"}>
                No users found. Try a different name.
              </p>
            )}
            {isFetching && <Loader2 className={"mx-auto my-3 animate-spin"} />}
            {isError && (
              <p className={"my-3 text-center text-muted-foreground"}>
                An error occurred while loading users.
              </p>
            )}
          </div>
        </div>
        <DialogFooter className={"px-6 pb-6"}>
          <LoadingButton
            loading={mutation.isPending}
            disabled={!selectedUsers.length}
            onClick={() => mutation.mutate()}
          >
            Start Chat
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;

interface SelectedUserTagProps {
  user: UserResponse;
  onRemove: () => void;
}

function SelectedUserTag({ user, onRemove }: SelectedUserTagProps) {
  return (
    <button
      onClick={onRemove}
      className={
        "flex items-center gap-2 rounded-full border p-1 hover:bg-muted/50 "
      }
    >
      <UserAvatar avatarUrl={(user.image as string) || null} size={24} />
      <p className={"font-bold"}>{user.name}</p>
      <X className={"size-5 mx-2 text-muted-foreground"} />
    </button>
  );
}
