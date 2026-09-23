import React from "react";
import Link from "next/link";
import UserButton from "@/components/userButton";
import SearchField from "@/components/searchField";
import { UserData } from "@/types";
import GuestAuthButtons from "@/components/guestAuthButtons";

interface Props {
  user: UserData | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <header className={"sticky top-0 z-10 bg-card shadow-sm"}>
      <div
        className={
          "max-w-7xl mx-auto flex items-center gap-5 px-5 py-3 justify-center flex-wrap"
        }
      >
        <Link href={"/"} className={"text-2xl font-bold text-primary"}>
          OpenParadox
        </Link>
        <SearchField />
        {user ? (
          <UserButton className={"sm:ms-auto shadow-lg"} />
        ) : (
          <GuestAuthButtons />
        )}
      </div>
    </header>
  );
};

export default Navbar;
