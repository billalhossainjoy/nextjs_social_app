import React, { cache, Suspense } from "react";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/types";
import { notFound } from "next/navigation";
import { validateRequest } from "@/auth";
import Post from "@/components/posts/post";
import { Loader2 } from "lucide-react";
import { UserInfoSideBar } from "@/app/(site)/posts/[postId]/userInfoSideBar";

interface Props {
  params: Promise<{
    postId: string;
  }>;
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();
  return post;
});

export async function generateMetadata({ params }: Props) {
  const { postId } = await params;
  const { user } = await validateRequest();
  if (!user) return {};
  const post = await getPost(postId, user.id);

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const { user } = await validateRequest();
  const { postId } = await params;

  if (!user) return <p>You&apos;re not authorized to view this page.</p>;

  const post = await getPost(postId, user.id);

  return (
    <main className={"flex w-full min-w-0 gap-5"}>
      <div className={"w-full min-w-0 space-y-5"}>
        <Post post={post} />
      </div>
      <div
        className={"sticky top[5.25rem] hidden lg:block h-fit w-80 flex-none"}
      >
        <Suspense fallback={<Loader2 className={"mx-auto animate-spin"} />}>
          <UserInfoSideBar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
