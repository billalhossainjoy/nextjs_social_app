import React from 'react';
import {validateRequest} from "@/auth";
import {redirect} from "next/navigation";
import SessionProvider from "@/context/sessionProvider";
import Navbar from "@/app/(site)/navbar";

type Props = {
    children: React.ReactNode
};

const Layout: React.FC<Props> = async ({children}) => {

    const session = await validateRequest();

    if (!session.user) redirect("/login")

    return <SessionProvider value={session}>
        <div className={"flex min-h-screen flex-col"}>
            <Navbar/>
            <div className={"max-w-7xl mx-auto p-5"}>
                {children}
            </div>
        </div>
    </SessionProvider>
};

export default Layout;