"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getLoginPath, sanitizeReturnTo } from "@/lib/returnTo";

export default function GuestAuthButtons() {
  const router = useRouter();

  function getCurrentPath() {
    return sanitizeReturnTo(
      `${window.location.pathname}${window.location.search}`,
    );
  }

  return (
    <div className="sm:ms-auto flex items-center gap-2">
      <Button variant="ghost" onClick={() => router.push(getLoginPath(getCurrentPath()))}>
        Log in
      </Button>
      <Button
        onClick={() =>
          router.push(`/signup?returnTo=${encodeURIComponent(getCurrentPath())}`)
        }
      >
        Sign up
      </Button>
    </div>
  );
}
