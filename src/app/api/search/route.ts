import { NextRequest } from "next/server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || undefined;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = q?.split(" ").join(" & ");
    const pageSize = 10;
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            user: {
              displayName: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              username: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
