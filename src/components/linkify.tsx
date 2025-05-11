import React from 'react';
import {LinkIt, LinkItUrl} from "react-linkify-it"
import Link from "next/link";
import UserLinkWithTooltip from "@/components/UserLinkWithTooltip";

type Props = {
    children: React.ReactNode
};

function LinkifyUrl({children}: Props) {
    return <LinkItUrl className={"text-primary hover:underline"}>{children}</LinkItUrl>
}

function LinkifyUsername({children}: Props) {
    return <LinkIt regex={/@[a-zA-Z0-9_-]+/} component={
        (match, key) => {
            return (
               <UserLinkWithTooltip username={match.slice(1)} key={key}>
                   {match}
               </UserLinkWithTooltip>
            )
        }
    }>
        {children}
    </LinkIt>
}

function LinkifyHashTag({children} : Props) {
    return <LinkIt component={(match, key) => {
        return <Link key={key} href={`/hashtag/${match.slice(1)}`} className={"text-primary hover:underline"}>
            {match}
        </Link>
    }} regex={/#[a-zA-Z0-9]+/}>
        {children}
    </LinkIt>
}

const Linkify: React.FC<Props> = ({children}) => {
    return (
        <LinkifyUsername>
            <LinkifyHashTag>
                <LinkifyUrl>
                    {children}
                </LinkifyUrl>
            </LinkifyHashTag>
        </LinkifyUsername>
    );
};

export default Linkify;