"use server";

import { getCommentDataInclude, PostData } from "@/types";
import { validateRequest } from "@/auth";
import { createCommentSchema } from "@/validation/post.schema";
import prisma from "@/lib/prisma";

interface Input {
  post: PostData;
  content: string;
}

export async function submitComment({ post, content }: Input) {
  const { user } = await validateRequest();
  if (!user) throw new Error("User not authenticated");

  const { content: validatedContent } = createCommentSchema.parse({ content });

  return prisma.comment.create({
    data: {
      content: validatedContent,
      userId: user.id,
      postId: post.id,
    },
    include: getCommentDataInclude(user.id),
  });
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("User not authenticated");
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) {
    throw new Error("You are not authorized to delete this comment");
  }

  return prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });
}
