import React from 'react';
import {getTreadingTopics} from "@/app/(site)/action";
import Link from "next/link";
import {formatNumber} from "@/lib/utils";

const TrendingTopics: React.FC = async () => {
    const trendingTopics = await getTreadingTopics()


    return (
        <div className={"hidden md:block space-y-5 rounded-2xl bg-card p-5 shadow-sm"}>
            <div className={"text-xl font-bold"}>
                {
                    trendingTopics.map(({hashtag, count}, i) => {
                        const title = hashtag.split("#")[1];
                        return <Link key={i} href={`/hashtag/${title}`} className={"block"}>
                            <p className={"line-clamp-1 break-all font-semibold hover:underline"}>
                                {hashtag}
                            </p>
                            <p className={"text-sm text-muted-foreground"}>
                                {formatNumber(count)}
                                {
                                    count === (1) ? "post" : "posts"
                                }
                            </p>
                        </Link>
                    })
                }
            </div>
        </div>
    );
};

export default TrendingTopics;