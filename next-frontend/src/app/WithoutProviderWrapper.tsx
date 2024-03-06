"use client"
import React from 'react';
import { useSelector } from 'react-redux';

const WithoutProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useSelector((state: any) => state.Auth)

    return (<>
        <div
            className={`${isLoggedIn === true ? "m-4" : ""}`}
        >
            {children}
        </div>
    </>)
}

export default WithoutProviderWrapper
