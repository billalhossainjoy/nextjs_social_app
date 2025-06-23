import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { google, lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import streamClient from "@/lib/stream";
import { OAuth2RequestError } from "arctic";
import ky from "ky";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const cookie = await cookies();

  const storedState = cookie.get("state")?.value;
  const storedCodeVerifier = cookie.get("code_verifier")?.value;

  if (!code || !state || storedState !== state || !storedCodeVerifier) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUser = await ky
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      })
      .json<{ id: string; name: string }>();

    const existingUser = await prisma.user.findUnique({
      where: {
        googleId: googleUser.id,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = await lucia.createSessionCookie(session.id);

      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const currentTime = Date.now();

    const username = slugify(googleUser.name) + "-" + currentTime.toString();

    const newUser = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          username,
          displayName: googleUser.name,
          googleId: googleUser.id,
        },
      });

      await streamClient.upsertUser({
        id: newUser.id,
        username,
        name: username,
      });

      return newUser;
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (err) {
    console.log(err);
    if (err instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }
    return new Response(null, { status: 500 });
  }
}
