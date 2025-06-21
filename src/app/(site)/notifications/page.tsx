import React from "react";
import { Metadata } from "next";
import TrendsSidebar from "@/components/trendsSidebar";
import Notifications from "@/app/(site)/notifications/notifications";

export const metadata: Metadata = {
  title: "Notifications",
};

const Page: React.FC = () => {
  return (
    <main className={"flex w-full main-w-0 gap-5"}>
      <div className={"w-full min-w-0 space-y-5"}>
        <div className={"rounded-2xl bg-card p-5 shadow-sm"}>
          <h1 className={"text-center text-2xl font-bold"}>Notifications</h1>
        </div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Page;
