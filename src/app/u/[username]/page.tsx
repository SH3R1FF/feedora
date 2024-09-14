"use client";
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
import { Loader2, Stars } from "lucide-react";
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
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Navbar />
      <div className="text-center py-8">
        <h1 className="text-3xl font-extrabold mb-4">
          Send Private Message to{" "}
          <strong className="underline">{username}</strong>
        </h1>
        <p className="text-lg text-gray-400">
          Send a private message to the user. This message will only be visible
          to the recipient. Make sure to include your username when sending the
          message.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
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
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-gray-300">
                      Send a Message
                    </FormLabel>

                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={handleGenratedMessage}
                      className="mx-4 mb-2"
                      size={"sm"}
                    >
                      {messageLoading ? (
                        <>
                          <span className="text-gray-800"> Loading...</span>
                          <Loader2 className="h-4 w-4 mx-2 animate-spin text-gray-800" />
                        </>
                      ) : (
                        <>
                          <span className="text-gray-800">
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
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Message;