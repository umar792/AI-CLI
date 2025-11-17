"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const {data , isPending ,error} = authClient.useSession();
  const router  = useRouter();
  if (isPending){
    return <div className='w-full h-screen flex justify-center place-items-center'>
      <Spinner/>
    </div>
  }

  if(!data?.session && !data?.user){
    router.push("/sign-in");
  }


  return (
    <div className='w-full h-screen flex-col space-y-5 flex justify-center place-items-center'>
      <Card className='border-dashed border-2 w-[500px] flex justify-center place-items-center'>
        <Image
        src={data?.user?.image || ""}
        alt='user-image'
        width={120}
        height={120}
        className='rounded-full border-2 border-dashed border-zinc-600 object-cover'
        />
        <div className='space-y-3 text-center'>
          <h1 className='text-3xl font-bold text-zinc-50 truncate'>
            Welcome {data?.user?.name}
          </h1>
          <p className='text-zinc-400'>
            You are Authenticated Successfully 
          </p>
        </div>
      </Card>
      <Card className='border-dashed border-2 w-[500px] flex justify-center place-items-center'>
        <div className='space-y-3 text-center'>
          <p className='text-zinc-400'>
            Email : {data?.user?.email}
          </p>
        </div>
      </Card>
      <Card className='w-[500px] bg-transparent border-none flex justify-center place-items-center'>
        <Button
        className='w-full py-2 cursor-pointer'
        variant={'destructive'}
        onClick={()=> authClient.signOut({
          fetchOptions : {
            onError : (ctx)=> console.log("Sign out error due to ", ctx.error),
            onSuccess : ()=> router.replace("/sign-in"),
        }
        })}
        >
          Sign Out
        </Button>
      </Card>

    </div>
  )
}

export default page
