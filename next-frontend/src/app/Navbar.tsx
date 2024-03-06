"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { LuLogOut } from "react-icons/lu";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils';
const Navbar = () => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state: any) => state.Auth)
    const router = useRouter()

    const handleLogout = async () => {
        try {

            localStorage.clear()
            handleNavigation({ path: "/signin", router })

        } catch (err: any) {

            toast.error(err.message)
        }
    }
    console.log("isLoggedIn", isLoggedIn)
    return (<>
        {isLoggedIn === true && (<>
            <div className='p-5 bg-white' style={{ borderBottom: "1px solid #ebebeb", boxShadow: "0px -4px 10px 10px #ebebeb" }}>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='font-extrabold text-2xl mr-16 cursor-pointer' onClick={() => handleNavigation({ path: "/", router })}>
                            Sample app
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex items-center' onClick={handleLogout}>
                            <LuLogOut size={25} className='cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </>)}
    </>)
}

export default Navbar
