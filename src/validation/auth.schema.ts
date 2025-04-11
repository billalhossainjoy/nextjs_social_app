import {z} from 'zod';

export const requireString = z.string().trim().min(1,"Required")

export const signUpSchema = z.object({
    email: requireString.email("Invalid email address."),
    username: requireString.regex(/^[a-zA-Z0-9_\-]+$/,"Only leters, numbers, - and _ allowed"),
    password: requireString.min(8, "must be at least 8 characters long"),
})

export const loginSchema = z.object({
    identifier: requireString,
    password: requireString
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;


