"use server"
import {validateRequest} from "@/auth";
import {createPostSchema} from "@/validation/post.schema";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function submitPost(input : string) {
    const {user} = await validateRequest()

    if(!user) {
        throw new Error("User not authenticated");
    }

    const {content} = createPostSchema.parse({content: input})

    await prisma.post.create({
        data: {
            content,
            userId: user.id
        }
    })
}