"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function getNotificationsCount() {
  const { user } = await validateRequest();
  if (!user) throw new Error("User not authenticated");

  const unReadCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

  return { unReadCount };
}
