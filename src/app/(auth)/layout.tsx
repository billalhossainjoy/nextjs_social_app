import React from 'react';
import {validateRequest} from "@/auth";
import {redirect} from "next/navigation";

type Props = {
    children: React.ReactNode
};

const Layout: React.FC<Props> = async ({children}) => {

    const {user} = await validateRequest();
    if (user) redirect("/")

    return <>{children}</>
};

export default Layout;