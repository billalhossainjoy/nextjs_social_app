import React from "react";
import { Metadata } from "next";
import Bookmarks from "@/app/(site)/bookmarks/bookmarks";
import TrendsSidebar from "@/components/trendsSidebar";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { getLoginPath } from "@/lib/returnTo";

export const metadata: Metadata = {
  title: "Bookmarks",
};

const Page: React.FC = async () => {
  const { user } = await validateRequest();
  if (!user) redirect(getLoginPath("/bookmarks"));

  return (
    <main className={"flex w-full main-w-0 gap-5"}>
      <div className={"w-full min-w-0 space-y-5"}>
        <div className={"rounded-2xl bg-card p-5 shadow-sm"}>
          <h1 className={"text-center text-2xl font-bold"}>Bookmarks</h1>
        </div>
        <Bookmarks />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Page;
