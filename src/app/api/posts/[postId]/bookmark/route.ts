import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BookmarkInfo } from "@/types";

interface Options {
  params: Promise<{
    postId: string;
  }>;
}

export async function GET(req: Request, { params }: Options) {
  try {
    const { postId } = await params;
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
    });
    if (!bookmark) {
      return Response.json({ error: "bookmark not found" }, { status: 404 });
    }

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: Options) {
  try {
    const { postId } = await params;
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
      create: {
        userId: loggedInUser.id,
        postId,
      },
      update: {},
    });

    return new Response();
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Options) {
  try {
    const { postId } = await params;
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.deleteMany({
      where: {
        userId: loggedInUser.id,
        postId: postId,
      },
    });

    return new Response();
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
