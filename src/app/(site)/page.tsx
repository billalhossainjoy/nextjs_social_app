import React from "react";
import PostEditor from "@/components/posts/editor/postEditor";
import TrendsSidebar from "@/components/trendsSidebar";
import Feed from "@/app/(site)/feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "@/app/(site)/followingFeed";
import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page: React.FC = async () => {
  const { user } = await validateRequest();

  return (
    <main className={"w-full min-w-0 gap-5 flex "}>
      <div className={"w-full min-w-0 space-y-5"}>
        {user ? (
          <PostEditor />
        ) : (
          <div className="space-y-3 rounded-2xl bg-card p-5 text-center shadow-sm">
            <h1 className="text-xl font-bold">Join the conversation</h1>
            <p className="text-muted-foreground">
              Log in or create an account to publish and interact with posts.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
        {user ? (
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
        ) : (
          <Feed />
        )}
      </div>
      <div className={"flex gap-3 flex-col"}>
        <TrendsSidebar />
      </div>
    </main>
  );
};

export default Page;
