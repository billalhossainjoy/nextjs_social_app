"use client"

import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

interface Props{
    children: React.ReactNode
}

const ReactQueryProvider: React.FC <Props>= ({children}) => {
    const [client] = useState(new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {
                children
            }
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;