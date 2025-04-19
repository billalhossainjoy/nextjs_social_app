import React from 'react';
import {cn} from "@/lib/utils";



type Props = {
    className?: string;
};

const Skeleton: React.FC<Props> = ({className, ...props}) => {
    return (
        <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
    );
};

const PostLoadingSkeleton: React.FC = () => {
    return (
        <div className={"w-full animate-pulse space-y-3 rounded-2xl bg-card p-5 shadow-sm"}>
            <div className={"flex flex-wrap gap-3"}>
                <Skeleton className={"size-12 rounded-full"} />
                <div>
                    <Skeleton className={"h-4 w-24 rounded"} />
                    <Skeleton className={"h-4 w-20 rounded"} />
                </div>
            </div>
            <Skeleton className={"w-20 rounded-full"} />
        </div>
    );
};


const PostsLoadingSkeleton: React.FC = () => {
    return (
        <div className={"space-y-5"}>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
        </div>
    );
};

export default PostsLoadingSkeleton;