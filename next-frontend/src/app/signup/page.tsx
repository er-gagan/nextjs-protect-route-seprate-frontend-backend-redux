"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import Button from '@/components/Button'

const SignUp = () => {
  const router = useRouter()
  const [signupFormData, setSignupFormData] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      showLoader()

      const api_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, { method: "POST", body: JSON.stringify(signupFormData) })
      const res_data = await api_res.json()
      console.log("res_data", res_data)
      if (res_data.status_code === 200) {
        toast.success(res_data.message)
        handleNavigation({ path: "/signin", router })
      } else {
        hideLoader()
        toast.error(res_data.message)
      }
    } catch (err: any) {
      hideLoader()
      toast.error(err.message)
    }
  }

  return (
    <div className='flex w-full'>
      <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
        <Advertisement />
      </div>
      <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
        <div className='flex flex-col justify-center h-5/6'>
          <div className='font-black text-3xl'>
            Start using Sample App today!
          </div>
          <div className='text-2xl mt-20 '>
            Sign Up
          </div>
          <div>
            Already have an account? <Link
              href="/signin"
              onClick={e => {
                e.preventDefault()
                handleNavigation({ path: "/signin", router })
              }}
              className='font-bold'
            >
              Log in here
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-16'>

              <div className='flex mt-4'>
                <div className='w-full'>
                  <Input
                    labeltext="Enter Name"
                    type="text"
                    required={true}
                    onChange={(e: any) => {
                      setSignupFormData({ ...signupFormData, name: e.target.value })
                    }}
                    value={signupFormData.name}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className='mt-4'>
                <Input
                  labeltext="Email Address"
                  type="email"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, email: e.target.value })
                  }}
                  value={signupFormData.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Password"
                  type="password"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, password: e.target.value })
                  }}
                  value={signupFormData.password}
                  placeholder="Enter your password"
                />
              </div>
              <div className='mt-4'>

                <Button
                  buttontype="primary"
                  title={"Sign Up"}
                  type='submit'
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
