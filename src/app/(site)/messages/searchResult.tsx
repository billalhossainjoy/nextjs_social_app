"use client";

import React from "react";

import UserAvatar from "@/components/userAvatar";
import { Check } from "lucide-react";
import { UserResponse } from "stream-chat";

interface Props {
  user: UserResponse;
  selected: boolean;
  onClick: () => void;
}

const SearchResult: React.FC<Props> = ({ user, selected, onClick }) => {
  return (
    <button
      className={
        "flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/50"
      }
      onClick={onClick}
    >
      <div className={"flex items-center gap-3"}>
        <UserAvatar avatarUrl={user.image} />
        <div className={"flex flex-col text-start "}>
          <p className={"font-bold "}>{user.name}</p>
          <p className={"text-muted-foreground"}>@{user.username}</p>
        </div>
      </div>

      {selected && <Check className={"size-5 text-green-500"} />}
    </button>
  );
};

export default SearchResult;
