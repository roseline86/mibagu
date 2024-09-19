"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function Subscribe() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast.loading("Please wait...");
      const response = await axios.post("/api/dashboard/subscribe", {
        email: data.email,
      });

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Successfully subscribed!");
        form.reset();
      } else if (response.status === 409) {
        toast.dismiss();
        toast.info("Email already in use");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(`${error.response.data.message}`);
    }
  }
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center rounded border border-gray-200 p-5 text-left  md:p-8 lg:flex-nowrap">
        <div className="mb-5 w-full flex-1 md:mb-0 md:w-1/2 md:pr-5 lg:pr-10">
          <h3 className="mb-2 text-xl font-bold text-gray-200 md:text-2xl">
            Subscribe to Newsletter
          </h3>
          <p className="md:text-md text-sm text-gray-300">
            Provide your email to get email notification when we launch new
            products or publish new articles
          </p>
        </div>
        <div className="flex-0 w-full px-1 md:w-auto lg:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" flex flex-col  gap-2 md:w-3/4 md:flex-row md:justify-center md:space-x-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="hover:bg-primary-200/80">
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
