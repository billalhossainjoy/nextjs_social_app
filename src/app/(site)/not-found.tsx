import React from 'react';

const NotFound: React.FC = () => {
    return (
        <main className={"my-12 w-full space-y-3 text-center"}>
            <h1 className={"text-3xl font-bold"}>Not Found</h1>
            <p>Te page you are looking for does not exist.</p>
        </main>
    );
};

export default NotFound;