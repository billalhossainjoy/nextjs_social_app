import {z} from "zod";
import {requireString} from "@/validation/auth.schema";


export const createPostSchema = z.object({
    content: requireString
})
export type CreatePostSchemaType = z.infer<typeof createPostSchema>;