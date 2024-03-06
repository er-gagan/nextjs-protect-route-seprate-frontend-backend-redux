"use client"
import { handleGetUserDataRequest } from '@/redux/actions-reducers/auth/auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const page = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleGetUserDataRequest())
  }, [])

  return (

    <div className='flex justify-center items-center h-screen text-4xl font-extrabold'>
      Welcome!
    </div>

  )
}

export default page
