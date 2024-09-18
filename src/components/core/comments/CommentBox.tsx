"use client";

import { FetchComments } from "@/components/fetch/get/comments/FetchComments";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  comment: z.string().min(5, {
    message: "Comment must be at least 5 characters.",
  }),
});

export function CommentBox({ postId }: { postId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const { refetch } = FetchComments(postId);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast.loading("Please wait...");

      await axios.post("/api/comment", { data, postId });

      refetch();
      toast.dismiss();
      toast.success("Comment submitted successfully!");

      // Reset the form after successful submission
      form.reset();
    } catch (error: any) {
      toast.dismiss();

      // Show specific error message if available
      const errorMessage =
        error?.response?.data?.message || "Error creating comment.";
      toast.error(errorMessage);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave A Reply</CardTitle>
        <CardDescription>
          Thanks for choosing to leave a comment. Please keep in mind that all
          comments are moderated according to our comment policy, and your email
          address will NOT be published. Please Do NOT use keywords in the name
          field. Let's have a personal and meaningful conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 md:w-2/3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="name">Name</label>
                  <FormControl>
                    <Input id="name" placeholder="Your Real Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email">Email</label>
                  <FormControl>
                    <Input id="email" placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="comment">Comment</label>
                  <FormControl>
                    <Textarea id="comment" placeholder="Comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="px-10 hover:bg-primary-200/80"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <ToastContainer position="top-center" />
    </Card>
  );
}
