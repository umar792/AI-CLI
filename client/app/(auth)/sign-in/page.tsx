"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { Github } from 'lucide-react';
import React from 'react'

const Page = () => {
  return (
    <div className='w-full h-screen flex justify-center place-items-center'>
      <Card className='border-dashed border-2'>
        <CardContent>
            <div>
                <Button
                variant={"outline"}
                className='w-full h-full cursor-pointer'
                type='button'
                onClick={()=> authClient.signIn.social({
                    provider:"github",
                    callbackURL : "http://localhost:3000"
                })}>
                    <Github/>
                    Continue With Github
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
