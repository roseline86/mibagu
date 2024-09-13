"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import CommentArea from "./CommentAre";
import CommentsList from "./CommentList";

interface CommentFormProps {
  postId: string;
}

function CommentForm({ postId }: CommentFormProps) {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetCommentAdded = () => {
    setIsCommentAdded(false);
  };

  return (
    <div className="flex flex-col gap-4 overflow-hidden ">
      <div className="flex flex-col gap-4  rounded-lg border p-4">
        <span className="text-2xl font-semibold">Leave A Reply</span>
        {name ? (
          <div className="flex flex-col gap-6">
            <span className="items-baseline">
              <span className="pr-2 text-xl">
                You Are Logged In As
                <Link href={"/dashboard"}>
                  <span className="font-bold text-primary"> {name}</span>
                </Link>
              </span>
            </span>
            <Formik
              initialValues={{ comment: "", postId }}
              validationSchema={Yup.object({
                comment: Yup.string()
                  .max(400, "Comment can not be more than 400 characters")
                  .required(),
              })}
              onSubmit={async (values) => {
                try {
                  setIsSubmitting(true);
                  toast.loading("Please wait...");
                  const response = await axios.post(`/api/comment`, values);

                  if (response.status === 201) {
                    values.comment = "";
                    setIsSubmitting(false);
                    toast.dismiss();
                    setIsCommentAdded(true);
                    toast.success("comment has been added.");
                  } else {
                    setIsSubmitting(false);
                    toast.dismiss();
                    toast.error("There was an error.");
                  }
                } catch (error) {
                  setIsSubmitting(false);
                  console.error("Error sending comment:", error);
                  toast.error("Error sending comment:");
                }
              }}
            >
              <Form>
                <div className="mb-4">
                  <CommentArea
                    name="comment"
                    label="Comment"
                    placeholder="Enter your comment here"
                    type="text"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        ) : (
          <div className="text-xl">
            You Need To
            <Link href={"/signin"}>
              <span className="font-bold text-primary"> Log In</span>
            </Link>
          </div>
        )}
      </div>
      <CommentsList
        postId={postId}
        isCommentAdded={isCommentAdded}
        resetCommentAdded={resetCommentAdded}
      />
      <ToastContainer theme="dark" position="top-center" />
    </div>
  );
}

export default CommentForm;
