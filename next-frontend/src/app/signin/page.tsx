"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserDataRequest } from '@/redux/actions-reducers/auth/auth'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import Button from '@/components/Button'
const Signin = () => {
  const [signinFormData, setSigninFormData] = useState({ email: "", password: "" })
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state: any) => state.Auth)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    showLoader()
    try {
      const api_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, { method: "POST", body: JSON.stringify(signinFormData) })
      const res_data = await api_res.json()

      if (res_data.status_code === 200) {
        const { token } = res_data.data
        toast.success(res_data.message)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("token", token)
        handleNavigation({ path: "/", router })
        dispatch(handleGetUserDataRequest())
      } else {
        hideLoader()
        toast.error(res_data.message)
      }
    } catch (err: any) {
      hideLoader()
      toast.error(err.message)
    }

  }

  return (<>
    {isLoggedIn === false && (<>
      <div className='flex w-full'>
        <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
          <Advertisement />
        </div>
        <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
          <div className='flex flex-col justify-center h-5/6'>
            <div className='font-black text-3xl'>
              Sample App
            </div>
            <div className='text-2xl mt-20 '>
              Sign In
            </div>
            <div>
              Don't have an account yet? <Link
                href="/signup"
                onClick={e => {
                  e.preventDefault()
                  handleNavigation({ path: "/signup", router })
                }}
                className='font-bold'
              >
                Sign Up
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mt-10'>

                <div className='mt-6'>
                  <Input
                    labeltext="Email"
                    type="email"
                    onChange={(e: any) => {
                      setSigninFormData({ ...signinFormData, email: e.target.value })
                    }}
                    value={signinFormData.email}
                    placeholder="Enter your email"
                  />
                </div>
                <div className='mt-4'>
                  <Input
                    labeltext="Password"
                    type="password"
                    onChange={(e: any) => {
                      setSigninFormData({ ...signinFormData, password: e.target.value })
                    }}
                    value={signinFormData.password}
                    placeholder="Enter your password"
                  />
                </div>
                <div className='mt-4'>
                  <Button
                    buttontype="primary"
                    title={"Sign In"}
                    type='submit'
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>)}
  </>)
}

export default Signin
