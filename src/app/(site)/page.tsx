import React from "react";
import PostEditor from "@/components/posts/editor/postEditor";
import TrendsSidebar from "@/components/trendsSidebar";
import Feed from "@/app/(site)/feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "@/app/(site)/followingFeed";

const Page: React.FC = async () => {
  return (
    <main className={"w-full min-w-0 gap-5 flex "}>
      <div className={"w-full min-w-0 space-y-5"}>
        <PostEditor />
        <Tabs defaultValue={"for-you"}>
          <TabsList>
            <TabsTrigger value={"for-you"}>For you</TabsTrigger>
            <TabsTrigger value={"following"}>Following</TabsTrigger>
          </TabsList>
          <TabsContent value={"for-you"}>
            <Feed />
          </TabsContent>
          <TabsContent value={"following"}>
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <div className={"flex gap-3 flex-col"}>
        <TrendsSidebar />
      </div>
    </main>
  );
};

export default Page;
