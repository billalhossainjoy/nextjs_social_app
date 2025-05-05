import {NextRequest} from "next/server";
import {validateRequest} from "@/auth";
import prisma from "@/lib/prisma";
import {FollowerInfo} from "@/types";

interface Params {
    params: Promise<{
        userId: string
    }>
}


export async function GET (_req: NextRequest, {params} : Params) {
    try {
        const {userId} = await params
        const {user: loggedInUser} = await validateRequest();

        if (!loggedInUser) {
            return Response.json({error: "unauthorized"}, {status: 401})
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                followers: {
                    where: {
                        followerId: loggedInUser.id
                    },
                    select: {
                        followerId: true
                    }
                },
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        })

        if(!user ) {
            return Response.json({error: "user not found"}, {status: 404})
        }

        const data : FollowerInfo = {
            followers: user._count.followers,
            isFollowedByUser: !!user.followers.length
        }

        return Response.json(data)
    } catch (err: unknown) {
        console.error(err)
        return Response.json({error: "internal server error"}, {status: 500})
    }
}

export async function POST(_req: NextRequest, {params}: Params) {
    try {
        const {userId} = await params
        const {user: loggedInUser} = await validateRequest();

        if (!loggedInUser) {
            return Response.json({error: "unauthorized"}, {status: 401})
        }

        await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: loggedInUser.id,
                    followingId: userId
                }
            },
            create: {
                followerId: loggedInUser.id,
                followingId: userId
            },
            update: {}
        })

        return Response.json({status: 200})
    } catch (err: unknown) {
        console.error(err)
        return Response.json({error: "internal server error"}, {status: 500})
    }
}

export async function DELETE (_req: NextRequest, {params}: Params) {
    try {
        const {userId} = await params
        const {user: loggedInUser} = await validateRequest();

        if (!loggedInUser) {
            return Response.json({error: "unauthorized"}, {status: 401})
        }

        await prisma.follow.deleteMany({
            where: {
                followerId: loggedInUser.id,
                followingId: userId
            }
        })

        return new Response()
    } catch (err: unknown) {
        console.error(err)
        return Response.json({error: "internal server error"}, {status: 500})
    }

}