import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NotificationCountInfo } from "@/types";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    
    const unReadCount = await prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    });

    const data: NotificationCountInfo = {
      unReadCount,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
