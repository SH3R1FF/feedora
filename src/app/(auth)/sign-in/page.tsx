"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader2, MessageSquareCode } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const SignInForm = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data : z.infer<typeof signInSchema>) => {
    
      setSubmitting(true);

      const result = await signIn('credentials', {
        redirect:false,
        identifier: data.identifier,
        password: data.password,
      })

      if (result?.error) {

        toast({
          title: 'Login Failed',
          description: result.error,
          variant: "destructive"
        })
      } 

      if (result?.url) {
        router.replace('/dashboard')
      }
      setSubmitting(false);
    }

  

  return (
    <div className="flex justify-center items-center min-h-screen container px-1">
      <div className="w-full max-w-md p-5 md:p-8 rounded-lg shadow-lg space-y-2 md:space-y-8 border border-white/15 bg-zinc-950">
        <div className="text-center">
          <div className='flex justify-center items-center'>
            <Link href={"/"}>
              <MessageSquareCode className='w-10 h-10'/>
            </Link>
          </div>
          <h1 className="text-4xl pt-0 lg:pt-4 font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-[radial-gradient(100%_100%_at_top_left,white,white,#4ca1af)]">
            {/* Login to Feedora */}
              {/* LOGIN TO FEEDORA */}
              LOGIN
          </h1>
          <p className="text-white/50">
            Sign in to start your anonymous adventure.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Email or Username
                  </FormLabel>
                  <FormControl> 
                    <Input
                      {...field}
                      placeholder="Enter your email or username"
                      className='border border-white/15 bg-zinc-900 text-zinc-300'
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Password
                  </FormLabel>
                  <FormControl >
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className='border border-white/15 bg-zinc-900 text-zinc-300'
                      
                      />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition duration-300 mt-4"
              variant={'secondary'}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center pt-6 md:pt-2">
          <p className="text-white/50">
            Don&apos;t have an account yet?{" "}
            <Link href="/sign-up" className="hover:text-teal-300 text-teal-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignInForm