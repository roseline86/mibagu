"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Loading from "@/components/helper/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password can not be more than 15 characters"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setSubmitting(true);
      toast.loading("Please wait...");
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Successful sign-in");
        setTimeout(() => {
          router.back();
        }, 2000);
        return;
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "authenticated" ? (
        "You are already logged in"
      ) : (
        <div className="mt-28 flex items-center justify-center">
          <div className="grid w-11/12 grid-cols-1 justify-around rounded-2xl border  md:w-10/12 md:grid-cols-5 lg:w-8/12">
            <div className="col-span-3 md:rounded-l-2xl">
              <section className="my-8 flex flex-col items-center justify-center gap-4">
                <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                  Log in to MIBAGU
                </h1>
                <span className="flex h-1 w-20 rounded-full bg-primary-200"></span>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-10/12 space-y-3 lg:w-8/12"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button
                        type="submit"
                        className="mt-4 w-full"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </section>
              <div className="flex items-center justify-center space-x-2">
                <span className="my-4">Don't have an account</span>
                <Link href="/registration" className="font-bold text-blue-500">
                  Register Now
                </Link>
              </div>
            </div>
            <div className="col-span-2 hidden flex-col items-center justify-center gap-4 bg-secondary p-3 text-center md:flex  md:rounded-r-2xl lg:p-16">
              <span className="text-lightgray-100 text-3xl font-bold">
                Hi, There!
              </span>
              <span className="flex h-1 w-20 rounded-full"></span>
              <span className="my-4">
                New to Mibagu? Let&#39;s create a free account to start your
                journey with us.
              </span>
              <Link href="/registration">
                <Button>Registration</Button>
              </Link>
            </div>
          </div>
          <ToastContainer position="top-center" autoClose={3000} theme="dark" />
        </div>
      )}
    </>
  );
}
