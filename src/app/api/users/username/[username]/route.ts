import {validateRequest} from "@/auth";
import prisma from "@/lib/prisma";
import {getUserDataSelect} from "@/types";

interface Options {
    params: Promise<{
        username: string
    }>
}


export async function GET(req: Request, {params}: Options) {
    try {
        const {username} = await params
        const {user: loggedInUser} = await validateRequest()
        if(!loggedInUser) {
            return Response.json({error: "Unauthorized"}, {status: 401})
        }

        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            },
            select: getUserDataSelect(loggedInUser.id)
        })

        if(!user) {
            return Response.json({error: "Unauthorized"}, {status: 401})
        }

        return Response.json(user)

    } catch (err: unknown) {

    }
}