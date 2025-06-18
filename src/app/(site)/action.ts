"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { unstable_cache } from "next/cache";
import { getUserDataSelect } from "@/types";

export async function WhoToFollow() {
  const { user } = await validateRequest();
  if (!user) {
    return [];
  }
  try {
    return await prisma.user.findMany({
      where: {
        NOT: {
          id: user.id,
        },
        followers: {
          none: {
            followerId: user.id,
          },
        },
      },
      select: getUserDataSelect(user.id),
      take: 5,
    });
  } catch {
    return [];
  }
}

export const getTreadingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
      SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag,
             count(*) AS count
      FROM posts
      GROUP BY (hashtag)
      ORDER BY count DESC, hashtag ASC
        LIMIT 5
    `;

    return result.map(({ hashtag, count }) => ({
      hashtag,
      count: Number(count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: process.env.NODE_ENV != "development" ? 3 * 60 * 60 : 1, // 3 hours or 1ms revalidate in development
  },
);
