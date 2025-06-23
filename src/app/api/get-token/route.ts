import { validateRequest } from "@/auth";
import streamClient from "@/lib/stream";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 404 });
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user.id, expirationTime, issuedAt);

    return Response.json({ token });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
