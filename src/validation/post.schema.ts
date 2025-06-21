import { z } from "zod";
import { requireString } from "@/validation/auth.schema";

export const createPostSchema = z.object({
  content: requireString,
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments"),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;

export const createCommentSchema = z.object({
  content: requireString,
});
