"use server";

import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/validation/profile.schema";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types";
import streamServerClient from "@/lib/stream";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);
  const { user } = await validateRequest();

  if (!user) throw new Error("unauthorized");

  return prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });

    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
      },
    });

    return updatedUser;
  });
}
