"use server"
import {loginSchema, LoginSchemaType} from "@/validation/auth.schema";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";
import {verify} from "@node-rs/argon2"
import {lucia} from "@/auth";
import {cookies} from "next/headers";

export async function login(credentials: LoginSchemaType): Promise<{error: string}> {
    try {
        const {identifier, password} = loginSchema.parse(credentials)

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: {
                            equals: identifier,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            equals: identifier,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })

        if(!existingUser || !existingUser.passwordHash) {
            return {
                error: "invalid credentials"
            }
        }

        const isValidPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19356,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        })

        if(!isValidPassword) {
            return {
                error: "invalid credentials"
            }
        }

        const session = await lucia.createSession(existingUser.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        const cookieStore = await  cookies()
        cookieStore.set(sessionCookie.name, sessionCookie.value,sessionCookie.attributes)


        return redirect("/")
    }catch (error) {
        if(isRedirectError(error)) throw error;
        return {
            error: "something went wrong",
        }
    }
}