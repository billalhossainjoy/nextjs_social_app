"use client";

import { useRouter } from "next/navigation";
import { getLoginPath } from "@/lib/returnTo";

export function useLoginRedirect() {
  const router = useRouter();

  return () => {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    router.push(getLoginPath(returnTo));
  };
}
