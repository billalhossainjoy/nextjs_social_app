"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/ky";
import { UserData } from "@/types";
import Link from "next/link";
import UserTooltip from "@/components/UserTooltip";
import { HTTPError } from "ky";

interface Props extends React.PropsWithChildren {
  username: string;
}

const UserLinkWithTooltip: React.FC<Props> = ({ username, children }) => {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      apiClient.get(`api/users/username/${username}`).json<UserData>(),
    retry(failure, error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return false;
      }
      return failure < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <Link
        href={`/users/${username}`}
        className={"text-primary hover:underline"}
      >
        {children}
      </Link>
    );
  }

  return (
    <UserTooltip user={data}>
      <Link
        href={`/users/${username}`}
        className={"text-primary hover:underline"}
      >
        {children}
      </Link>
    </UserTooltip>
  );
};

export default UserLinkWithTooltip;
