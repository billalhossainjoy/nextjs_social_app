import { Metadata } from "next";
import Chat from "@/app/(site)/messages/Chat";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { getLoginPath } from "@/lib/returnTo";

export const metadata: Metadata = {
  title: "Messages",
};

const Page: React.FC = async () => {
  const { user } = await validateRequest();
  if (!user) redirect(getLoginPath("/messages"));

  return <Chat />;
};

export default Page;
