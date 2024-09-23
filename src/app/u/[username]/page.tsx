"use client";

import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, MessageSquareMore, SendHorizontal, Stars } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Message = () => {
  const { username } = useParams();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      username: (username as string) || "",
      content: "",
    },
  });
  const handleGenratedMessage = async () => {
    setMessageLoading(true);
    try {
      const response = await axios.get(`/api/suggest-messages`);
      form.setValue("content", response.data.messages.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error generating message",
        description: axiosError.response?.data.message ?? "An error occurred",
        variant: "destructive",
      });
    } finally {
      setMessageLoading(false);
    }
  };
  const handleSendMessage = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/send-message`, data);
      if (response.data.success) {
        toast({
          title: "Message Sent",
          description: response.data.message,
        });
      }
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error sending message",
        description: axiosError.response?.data.message ?? "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (

    <>

        <Navbar />
    <div className="bg-transparent min-h-screen text-gray-100 mx-auto px-6">

      <div className=" text-center py-12">
        <h1 className="text-5xl font-extrabold mb-10 bg-clip-text text-transparent bg-[radial-gradient(100%_100%_at_top_left,white,white,#4ca1af)] uppercase">
          Send Private Message to{" "} 
          
          {/* bg-clip-text text-transparent bg-[radial-gradient(100%_100%_at_top_left,white,white,#4ca1af)] */}
          <strong className="">{username}</strong>
        </h1>
        <p className="text-lg text-gray-400 text-pretty">
          Send a private message to the user. This message will only be visible
          to the recipient. <br /> Make sure to include your username when sending the
          message.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="bg-transparent border border-white/15 bg-zinc-950 text-white px-6 py-2 rounded-lg shadow-lg "
          >
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input type="hidden" {...field} readOnly />
                  <FormMessage />
                </FormItem>
              )}
              />

            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex-row md:flex justify-between items-center text-center py-2 space-y-3 ">
                    <FormLabel className="text-gray-300 text-xl flex justify-center items-center gap-x-2 ">
                      <div>
                        <MessageSquareMore className="text-white" />
                      </div>
                      SEND A MESSAGE
                    </FormLabel>

                    <Button
                      type="button"
                      // variant={"outline"}
                      onClick={handleGenratedMessage}
                      className="mx-4 mb-2 bg-tranparent border border-white/15 hover:bg-zinc-900 "
                      size={"sm"}
                    >
                      {messageLoading ? (
                        <>
                          <span className="text-white"> Loading...</span>
                          <Loader2 className="h-4 w-4 mx-2 animate-spin text-gray-800" />
                        </>
                      ) : (
                        <>
                          <span className="text-gray-300">
                            {" "}
                            Generate Message{" "}
                          </span>
                          <Stars className="h-4 w-4 mx-2 text-yellow-400" />
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    {...field}
                    placeholder="Type your message here..."
                    className="bg-transparent border border-white/15 bg-zinc-900 text-zinc-300 placeholder-gray-400 h-32"
                    
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit"
              disabled={isLoading}
              variant={"secondary"}
              className="my-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <div className="flex justify-center items-center">
                  <span>  
                    Send Message 
                  </span>
                  <SendHorizontal className="h-4 w-4 ml-2 text-zinc-500 "/>
                </div> 

              )

              }
            </Button>

          </form>
        </Form>
      </div>
    </div>
          
    <Footer/>
  </>
  );
};

export default Message;