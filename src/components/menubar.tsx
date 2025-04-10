"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import useRoutes from "@/hooks/useRoutes";

type Props = {
    className: string
};

const Menubar: React.FC<Props> = ({className}) => {
    const routes = useRoutes();

    return (
        <div className={cn("", className)}>
            {routes.map(({icon: Icon, label, href, active}) => (
                <Button
                    key={href}
                    variant={"ghost"}
                    className={cn("flex items-center justify-start gap-3", active && "bg-secondary")}
                    title={label}
                    asChild
                >
                    <Link href={href}>
                        <Icon  className={"size-5"}/>
                        <span className={"hidden lg:inline"}>{label}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
};

export default Menubar;