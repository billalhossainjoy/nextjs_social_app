import { z } from "zod";
import { requireString } from "@/validation/auth.schema";

export const updateUserProfileSchema = z.object({
  displayName: requireString,
  bio: z.string().max(1000).nullable(),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
