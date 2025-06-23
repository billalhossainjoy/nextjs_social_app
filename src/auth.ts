import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/lib/prisma";
import { Lucia, Session } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { UserData } from "@/types";
import { Google } from "arctic";

type AuthResult =
  | { user: UserData; session: Session }
  | { user: null; session: null };
const adapter = new PrismaAdapter(prisma.session, prisma.user);

declare module "lucia" {
  interface User extends UserData {}

  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserData;
  }
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes(data) {
    return {
      id: data.id,
      username: data.username,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
    };
  },
});

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback/google`,
);

export const validateRequest = cache(async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result: AuthResult = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (err) {
    console.log(err);
  }

  return result;
});
