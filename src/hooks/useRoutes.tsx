"use client"

import {useMemo} from 'react';
import {Bell, Bookmark, Home, Mail} from "lucide-react";
import {usePathname} from "next/navigation";

const useRoutes = () => {
    const pathname = usePathname()

    return useMemo(() => (
        [
            {
                icon: Home,
                label: "Home",
                href: "/",
                active: pathname === "/"
            },
            {
                icon: Bell,
                label: "Notifications",
                href: "/notifications",
                active: pathname === "/notifications"
            },
            {
                icon: Mail,
                label: "Messages",
                href: "/messages",
                active: pathname === "/messages"
            },
            {
                icon: Bookmark,
                label: "Bookmarks",
                href: "/bookmarks",
                active: pathname === "/bookmarks"
            }
        ]
    ), [pathname]);
};

export default useRoutes;