"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";

const SearchField: React.FC = () => {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget
        const q = (form.q as HTMLInputElement).value.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (<form onSubmit={handleSubmit} action={"/search"} method={"GET"}>
            <div className={"relative"}>
                <Input name={"q"} placeholder={"search"} className={"pe-10"}/>
                <SearchIcon
                    className={"absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground "}/>
            </div>
        </form>);
};

export default SearchField;