import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { sanitizeReturnTo } from "@/lib/returnTo";

export async function GET(request: NextRequest) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "profile",
    "email",
  ]);

  const cookie = await cookies();
  const returnTo = sanitizeReturnTo(
    request.nextUrl.searchParams.get("returnTo"),
  );
  cookie.set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookie.set("code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookie.set("oauth_return_to", returnTo, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
