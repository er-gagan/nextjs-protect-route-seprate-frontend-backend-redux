"use client"
import { handleGetUserDataRequest, handleSetIsLoggedInRequest } from '@/redux/actions-reducers/auth/auth';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { Provider, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hideLoader, showLoader, handleNavigation } from '@/utils/utils';
import { authenticatedRoutes, unAuthenticatedRoutes } from '../../routes';

const GlobalStateWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const pathname = usePathname();
    const router = useRouter()
    useEffect(() => {
        dispatch(handleGetUserDataRequest())
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (pathname === location.pathname) {
                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
                dispatch(handleSetIsLoggedInRequest({ isLoggedIn }))
                hideLoader()
                if (isLoggedIn) {
                    if (!authenticatedRoutes.includes(location.pathname)) {
                        handleNavigation({ path: "/", router })
                    }
                } else {
                    if (!unAuthenticatedRoutes.includes(location.pathname)) {
                        handleNavigation({ path: "/signin", router })
                    }
                }

            } else {
                showLoader()
            }
        }
    }, [pathname])

    return (<>
        {children}
    </>)
}

export default GlobalStateWrapper
