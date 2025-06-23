import React, { Suspense } from "react";
import { validateRequest } from "@/auth";
import { Loader2 } from "lucide-react";

interface Props {
  params: Promise<{
    trends: string;
  }>;
}

const Page: React.FC<Props> = async () => {
  const { user } = await validateRequest();
  // const { trends } = await params;

  if (!user) return <p>You&apos;re not authorized to view this page.</p>;

  // const post = await getPost(postId, user.id);

  return (
    <main className={"flex w-full min-w-0 gap-5"}>
      <div className={"w-full min-w-0 space-y-5"}>
        {/*<Post post={post} />*/}
      </div>
      <div
        className={"sticky top[5.25rem] hidden lg:block h-fit w-80 flex-none"}
      >
        <Suspense fallback={<Loader2 className={"mx-auto animate-spin"} />}>
          {/*<UserInfoSideBar user={post.user} />*/}
          Working on it
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
