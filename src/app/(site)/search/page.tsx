import React from "react";
import SearchResult from "@/app/(site)/search/searchResult";

interface Props {
  searchParams: Promise<{
    q: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: `Search result for "${q}"`,
  };
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { q } = await searchParams;
  return (
    <main className={"flex w-full min-w-0 gap-5"}>
      <div className={"w-full min-w-0 space-y-5"}>
        <div className={"rounded-2xl bg-card p-5 shadow-sm"}>
          <h1 className={"text-center text-2xl font-bold"}>
            Search result for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResult query={q} />
      </div>
    </main>
  );
};

export default Page;
