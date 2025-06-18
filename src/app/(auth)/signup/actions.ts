"use server";

import { signUpSchema, SignUpSchemaType } from "@/validation/auth.schema";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signUp(
  credentials: SignUpSchemaType,
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19356,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const exitstingUsername = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username,
              mode: "insensitive",
            },
          },
          {
            email: {
              equals: email,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (exitstingUsername && exitstingUsername.username === username) {
      return {
        error: "Username already exists.",
      };
    }
    if (exitstingUsername && exitstingUsername.email === email) {
      return {
        error: "Email already exists.",
      };
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) throw error;
    return {
      error: "Something went wrong. please try again.",
    };
  }
}
