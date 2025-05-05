"use client"

import React from 'react';
import {FollowerInfo} from "@/types";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import {formatNumber} from "@/lib/utils";

type Props = {
    userId: string;
    initialState: FollowerInfo;
};

const FollowerCount: React.FC<Props> = ({userId, initialState}) => {
    const { data } = useFollowerInfo(userId, initialState)

    return (
        <div>
            Followers: {" "}
            <span className={"font-semibold"}>{formatNumber(data.followers)}</span>
        </div>
    );
};

export default FollowerCount;