import React from 'react';
import Link from "next/link";
import UserButton from "@/components/userButton";
import SearchField from "@/components/searchField";

const Navbar: React.FC = () => {
    return (
        <header className={"sticky top-0 z-10 bg-card shadow-sm"}>
            <div className={"max-w-7xl mx-auto flex items-center gap-5 px-5 py-3 justify-center flex-wrap"}>
                <Link href={"/"} className={"text-2xl font-bold text-primary"}>warpBook</Link>
                <SearchField />
                <UserButton className={"sm:ms-auto"}/>
            </div>
        </header>
    );
};

export default Navbar;