import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function PATCH() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    await prisma.notification.updateMany({
      where: {
        recipientId: user.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return new Response();
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
