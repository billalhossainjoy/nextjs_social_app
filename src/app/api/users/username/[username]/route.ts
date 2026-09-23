import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types";

interface Options {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(req: Request, { params }: Options) {
  try {
    const { username } = await params;
    const { user: loggedInUser } = await validateRequest();

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUser?.id),
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
