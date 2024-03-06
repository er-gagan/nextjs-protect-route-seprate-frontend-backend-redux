"use client"

import { store } from '@/redux/store';
import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import GlobalStateWrapper from './GlobalStateWrapper';


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

    return (<>
        <Provider store={store}>
            <GlobalStateWrapper>

                {children}

            </GlobalStateWrapper>
        </Provider>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>)
}

export default ClientWrapper
