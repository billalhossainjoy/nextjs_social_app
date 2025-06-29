import { validateRequest } from "@/auth";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { CommentsPage, getCommentDataInclude } from "@/types";

interface Options {
  params: Promise<{
    postId: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Options) {
  try {
    const { postId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 5;
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: getCommentDataInclude(user.id),
      orderBy: {
        createdAt: "asc",
      },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comments.length > pageSize ? comments[0].id : null;

    const data: CommentsPage = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
