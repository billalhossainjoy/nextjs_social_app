"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamClient from "@/lib/stream";

export async function getNotificationsMessagesCount() {
  const { user } = await validateRequest();
  if (!user) throw new Error("User not authenticated");

  const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
    await prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return { unreadNotificationCount, unreadMessagesCount };
}
