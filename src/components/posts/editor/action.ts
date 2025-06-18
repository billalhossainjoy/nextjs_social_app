"use server";

import { validateRequest } from "@/auth";
import { createPostSchema } from "@/validation/post.schema";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/types";

interface Input {
  content: string;
  mediaIds: string[];
}

export async function submitPost(input: Input) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { content, mediaIds } = createPostSchema.parse(input);

  const post = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attatchments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });
  return post;
}
