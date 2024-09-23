"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MessageSquareCode } from 'lucide-react'

const VerifyCode = () => {

    const router = useRouter()
    const params = useParams<{username: string}>()
    const { toast } = useToast()
    
    // zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema)
  })

  const onSubmit = async (data : z.infer<typeof verifySchema>) => {

    try {
        const response = await axios.post<ApiResponse>(`/api/verify-code`, {
            username: params.username,
            code: data.code
        })

        toast({
            title: 'Verification successful',
            description: response.data.message
        })

        router.replace(`/sign-in`)

    } catch (error) {
        console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>;
      
      toast({
        title: 'Signup failed',
        description: axiosError.response?.data.message  || 'Error signing up',
        variant: "destructive"
      })

    }

  }
  
    return (

    <div className='flex justify-center items-center min-h-screen container'>
        <div className='w-full max-w-md p-8 space-y-8 rounded-lg shadow-md border border-white/15 '>
        <div className="text-center">
          <div className='flex justify-center items-center p-2'>
            <MessageSquareCode className='w-12 h-12'/>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your Account
          </h1>
          <p className="mb-2 text-white/50">Enter the verification code sent to your email</p>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    name="code" 
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white/80'>Verification Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Code" className='bg-transparent border border-white/15' {...field} />
                            </FormControl>
                    
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                  type="submit" 
                  className='w-full transition duration-300 text-black'
                  variant={'secondary'}>
                    Submit
                </Button>
            </form>
        </Form>

        </div>
    </div>
  )
}

export default VerifyCode