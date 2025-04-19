'use server'

import {validateRequest} from "@/auth";
import prisma from "@/lib/prisma";
import {PostDataInclude} from "@/types";

export async function deletePost (id: string) {
    const {user} = await validateRequest()

    if(!user) throw new Error("unauthenticated")

    const post = await prisma.post.findUnique({
        where: {id}
    })

    if(!post) throw new Error("post not fond")

    if(post.userId !== user.id) throw new Error("unauthenticated")

    const deletedPost = await prisma.post.delete({
        where: {id},
        include: PostDataInclude
    })

    return deletedPost
}