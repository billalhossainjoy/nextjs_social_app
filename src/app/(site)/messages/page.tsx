import { Metadata } from "next";
import Chat from "@/app/(site)/messages/Chat";

export const metadata: Metadata = {
  title: "Messages",
};

const Page: React.FC = () => {
  return <Chat />;
};

export default Page;
