import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
   <>
   <div className='flex h-screen items-center justify-center '>
   <div id="my_modal_3" className="border-[2px] shadow-md p-5 rounded-md">
                <div className="">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Register</h3>
                    {/* {Email} */}
                   <div className='mt-4 space-y-2'>
                    <span>Email</span>
                    <br/>
                    <input type="email" placeholder="Enter your email" className='w-80 px-3 py-1 border rounded-md outline-none' />
                   </div>
                   {/* {Password} */}
                   <div className='mt-4 space-y-2'>
                    <span>Password</span>
                    <br/>
                    <input type="text" placeholder="Enter your password" className='w-80 px-3 py-1 border rounded-md outline-none' />
                   </div>
                    {/* {Button} */}
                    <div className='flex justify-around mt-4'>
                        <button className='bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-700 duration-200'>Submit</button>
                        <p>Have account ?{""} <Link
                         to="/"className='underline text-blue-500 cursor-pointer'>Login</Link></p>
                    </div>
                </div>
            </div>
   </div>
   </>
  )
}

export default Register
