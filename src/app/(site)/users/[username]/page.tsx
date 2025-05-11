import prisma from "@/lib/prisma";
import {getUserDataSelect} from "@/types";
import {notFound} from "next/navigation";
import {cache} from "react";
import {validateRequest} from "@/auth";
import {Metadata} from "next";
import TrendsSidebar from "@/components/trendsSidebar";
import UserProfile from "@/components/userProfile";
import UserPosts from "@/app/(site)/users/[username]/userPosts";

interface Params {
    username: string
}

interface Props {
    params: Promise<Params>
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: getUserDataSelect(loggedInUserId)
    })
    if(!user) notFound();
    return user
})


export async function generateMetadata ({params}: Props): Promise<Metadata> {
    const { username } = await params
    const {user: loggedInUser} = await validateRequest()

    if(!loggedInUser) return {}

    const user = await  getUser(username, loggedInUser.id)

    return {
        title: `${user.displayName} (@${user.username})`
    }
}

export default async function Page ({params}: Props) {
    const {username} = await params
    const {user: loggedInUser} = await validateRequest()

    if(!loggedInUser) {
        return <p className={"text-destructive"}>
            Your&apos;re not authorized to view this page
        </p>
    }

    const user =await getUser(username, loggedInUser.id);

    return <main className={"flex w-full min-w-0 gap-5"} >
        <div className={"w-full min-w-0 space-y-5"}>
            <UserProfile user={user} loggedInUserId={loggedInUser.id} />
            <div className={"rounded-2xl bg-card p-5 shadow-sm text-center"}>
                <h1 className={"text-2xl font-bold"}>
                    {user.displayName}&apos;s posts
                </h1>
            </div>
                <UserPosts userId={user.id} />
        </div>
        <TrendsSidebar />
    </main>
}