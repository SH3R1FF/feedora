"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useDebounceCallback } from 'usehooks-ts'
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2, MessageSquareCode } from "lucide-react"
import { Input } from "@/components/ui/input"

const SignUpForm = () => {

  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 300)

  const { toast } = useToast()
  const router = useRouter()

  
  // zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {  
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)

          setUsernameMessage(response.data.message)

        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message || 'Error checking username',
          )
        } finally {
          setIsCheckingUsername(false)
        }

      }
    }
    checkUsernameUnique()
  }, [username])
  
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast(
        { 
          title: 'Success',
          description: response.data.message
        })
        router.replace(`/verify/${username}`)
        setIsSubmitting(false)
    } catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message 
      toast({
        title: 'Signup failed',
        description: errorMessage || 'Error signing up',
        variant: "destructive"
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen container px-1">
      <div className="w-full max-w-md p-5 md:p-8 rounded-lg shadow-lg space-y-2 lg:space-y-4 border border-white/15 bg-zinc-950">
        <div className="text-center">
          <div className='flex justify-center items-center'>
          <Link href={"/"}>
              <MessageSquareCode className='w-10 h-10'/>
            </Link>
          </div>
          <h1 className="text-4xl pt-0 lg:pt-4  font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-[radial-gradient(100%_100%_at_top_left,white,white,#4ca1af)]">
            JOIN FEEDORA
          </h1>
          <p className="mb-2 text-white/50">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Username</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      className='bg-transparent border border-white/15 bg-zinc-900 text-zinc-300 placeholder-slate-900'
                      placeholder="Enter a unique username"
                      />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && usernameMessage && (
                          <p
                            className={`text-sm ${
                              usernameMessage === 'Username is unique'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        )}   
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Email</FormLabel>
                  <FormControl>
                    <Input {...field} name="email" className='bg-transparent border border-white/15 bg-zinc-900 text-zinc-300' placeholder="Enter your email address"/>
                  </FormControl>
                  <p className='text-muted text-xs'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80" >Password</FormLabel>
                  <Input 
                    type="password" {...field} 
                    name="password" 
                    className='bg-transparent border border-white/15 bg-zinc-900 text-zinc-300' 
                    placeholder="Enter a strong password"
                    />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full text-center transition duration-300 mt-4"
              variant={'secondary'} 
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center pt-5 md:pt-2">
          <p className="text-white/50">
            Already a member?{' '}
            <Link href="/sign-in" className="hover:text-teal-300 text-teal-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm