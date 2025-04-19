import React from 'react';
import PostEditor from "@/components/posts/editor/postEditor";
import TrendsSidebar from "@/components/trendsSidebar";
import TrendingTopics from "@/components/TrendingTopics";
import Feed from "@/app/(site)/feed";

const Page: React.FC = async () => {

    
    return (
        <main className={"w-full min-w-0 gap-5 flex "}>
           <div className={"w-full min-w-0 space-y-5"}>
               <PostEditor />
               <Feed />
           </div>
           <div className={"flex gap-3 flex-col"}>
               <TrendsSidebar />
               <TrendingTopics />
           </div>
        </main>
    );
};

export default Page;