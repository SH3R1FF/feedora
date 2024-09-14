"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
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
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Feedora
          </h1>
          <p className="text-gray-600">
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
                  <FormLabel className="">
                    Email or Username
                  </FormLabel>
                  <FormControl> 
                    <Input
                      {...field}
                      placeholder="Enter your email or username"
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
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition duration-300"
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

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignInForm