"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
// import { User } from 'next-auth'
import { Button } from './ui/button'
import { ChevronRight, 
    // MenuIcon,
   MessageSquareCode } from 'lucide-react'

const Navbar = () => {

const {data: session} = useSession()

// const user: User = session?.user as User

return (
    // <nav className="py-2 md:py-4 px-28 shadow-md bg-gray-900 text-white ">
    //   <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    //     <a href="#" className="text-xl font-bold mb-4 md:mb-0">
    //       FEEDORA
    //     </a>
    //     {session ? (
    //       <>
    //         <span className="mr-4">
    //           Welcome, {user?.username || user?.email}
    //         </span>
    //         <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black rounded-full px-8 py-2 " variant='outline'>
    //           Logout
    //         </Button>
    //       </>
    //     ) : (
    //       <Link href="/sign-in">
    //         <Button className="w-full md:w-auto bg-slate-100 text-black rounded-full px-8 py-2 " variant={'secondary'}>Login</Button>
    //       </Link>
    //     )}
    //   </div>
    // </nav>


    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
    <div className='absolute inset-0 backdrop-blur -z-10 md:hidden bg-zinc-950'></div>
    <div className="container">
      <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative backdrop-blur bg-zinc-950">
        {/* <div className='absolute inset-0 backdrop-blur -z-10 hidden md:block'></div> */}
        {/* <div className='flex '>
          <a href="#" className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
            <MessageSquareCode />
          </a>
        </div> */}
          {/* <a href="#" className="text-xl font-bold mb-4 md:mb-0">
            FEEDORA
            FEEDORA
          </a> */}

        <div className='flex flex-row justify-between items-center border border-white/15 bg-zinc-900 rounded-lg h-10 gap-2 p-2 '>
        {/* <div className='flex flex-row justify-between items-center border border-white/15 rounded-lg h-10 gap-2 p-2 bg-zinc-900/100'> */}
          <MessageSquareCode />
          <h1 className='font-bold text-base x'>
            FEEDORA
          </h1>
        </div>

        <div className='flex gap-4 items-center'>
          
          {session ? (
            <>
              {/* <span className="mr-4">
                Hey, {user?.username || user?.email}
              </span> */}
              <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black rounded-full px-3 py-2 flex flex-row justify-between items-center gap-2" variant='secondary'>
                Sign out
                <ChevronRight className='h-4 w-4 text-gray-500 ' /> 
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto bg-slate-100 text-black rounded-full px-3 py-2 flex flex-row justify-between items-center gap-2" variant={'secondary'}>
                Get Started
                <ChevronRight className='h-4 w-4 text-gray-500 ' />  
              </Button>
            </Link>
          )}

            {/* <MenuIcon className="md:hidden" /> */}
          
          </div>

      </div>
    </div>
  </header>
  );
}

export default Navbar