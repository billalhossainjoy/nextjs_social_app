import React from "react";
import { validateRequest } from "@/auth";
import SessionProvider from "@/context/sessionProvider";
import Navbar from "@/app/(site)/navbar";
import Menubar from "@/components/menubar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = async ({ children }) => {
  const session = await validateRequest();

  return (
    <SessionProvider value={session}>
      <div className={"flex min-h-screen flex-col"}>
        <Navbar user={session.user} />
        <div className={"max-w-7xl mx-auto p-5 flex w-full grow gap-5"}>
          <Menubar
            authenticated={!!session.user}
            className={
              "sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-xl bg-card px-3 py-5 shadow-sm sm:block lg:py-5 xl:w-80"
            }
          />
          {children}
        </div>
        <Menubar
          authenticated={!!session.user}
          className={
            "sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden "
          }
        />
      </div>
    </SessionProvider>
  );
};

export default Layout;
