import React from 'react';
import PostEditor from "@/components/posts/editor/postEditor";
import {getPosts} from "@/app/(site)/action";
import Post from "@/components/posts/post";
import TrendsSidebar from "@/components/trendsSidebar";
import TrendingTopics from "@/components/TrendingTopics";

const Page: React.FC = async () => {
    const posts =await getPosts()

    return (
        <main className={"w-full min-w-0 gap-5 flex"}>
           <div className={"w-full min-w-0 space-y-5"}>
               <PostEditor />
               {
                   posts.map(post => (
                       <Post post={post} key={post.id}/>
                   ))
               }
           </div>
           <div className={"flex gap-3 flex-col"}>
               <TrendsSidebar />
               <TrendingTopics />
           </div>
        </main>
    );
};

export default Page;