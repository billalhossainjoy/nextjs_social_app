import { validateRequest } from "@/auth";
import streamClient from "@/lib/stream";
import { MessageCountInfo } from "@/types";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });

    const { total_unread_count } = await streamClient.getUnreadCount(user.id);

    const data: MessageCountInfo = {
      unReadCount: total_unread_count,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
