import React, {Suspense} from 'react';
import {Loader2} from "lucide-react";
import UsersWhoToFollow from "@/components/UsersWhoToFollow";
import TrendingTopics from "@/components/TrendingTopics";

const TrendsSidebar: React.FC = async () => {
    return (
        <div className={"sticky top-[5.25rem] hidden w-72 h-fit flex-none md:block space-y-5 lg:w-80"}>
           <Suspense fallback={<Loader2 className={"mx-auto animate-spin"}/>}>
               <UsersWhoToFollow />
           </Suspense>
            <Suspense fallback={<Loader2 className={"mx-auto animate-spin"}/>}>
                <TrendingTopics />
           </Suspense>
        </div>
    );
};

export default TrendsSidebar;

