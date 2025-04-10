import React from 'react';
import Link from "next/link";
import UserButton from "@/components/userButton";

const Navbar: React.FC = (props) => {
    return (
        <header className={"sticky top-0 z-10 bg-card shadow-sm"}>
            <div className={"max-w-7xl mx-auto flex items-center gap-5 px-5 py-3 justify-center flex-wrap"}>
                <Link href={"/"} className={"text-2xl font-bold text-primary"}>warpBook</Link>
                <UserButton />
            </div>
        </header>
    );
};

export default Navbar;