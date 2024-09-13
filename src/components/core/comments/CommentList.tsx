import { CommentType } from "@/components//type/CommentType";
import { FetchComments } from "@/components/fetch/get/comments/FetchComments";
import Loading from "@/components/helper/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CommentListProps {
  postId: string;
  isCommentAdded: boolean;
  resetCommentAdded: () => void;
}

export default function CommentsList({
  postId,
  isCommentAdded,
  resetCommentAdded,
}: CommentListProps) {
  const { isLoading, data, isError, refetch } = FetchComments(postId);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN;
  const { data: session } = useSession();
  const user = session?.user?.id as string | undefined;

  useEffect(() => {
    if (isCommentAdded) {
      refetch();
      resetCommentAdded();
    }
  }, [isCommentAdded, refetch, resetCommentAdded]);

  const handleDelete = async (commentId: string) => {
    try {
      toast.loading("Please wait while...");
      const response = await axios.delete(`/api/comment?id=${commentId}`);

      if (response.status === 204) {
        refetch();
        toast.dismiss();
        toast.success("Comment deleted");
      } else {
        toast.dismiss();
        toast.error("There was an error.");
      }
    } catch (error) {
      toast.error("There was an error.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : isError ? (
        "Error Fetching Comments."
      ) : (
        data.map((comment: CommentType) => (
          <Card key={comment.id} className="relative p-3">
            <div className="flex  md:flex-row md:justify-between">
              <div className="flex flex-wrap items-center gap-4 md:flex-row">
                {comment.author.image ? (
                  <Image
                    src={comment.author.image}
                    alt=""
                    height={100}
                    width={100}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-600  p-0.5 text-center text-sm">
                    No image
                  </div>
                )}
                <div className="text-xl font-bold">{comment.author.name}</div>
                <div>
                  {new Date(comment.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
            <div className="md:ml-16">{comment.content}</div>
            {(session?.user?.email === adminEmail ||
              session?.user?.name === comment.author.name) && (
              <div className=" absolute right-2 top-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(comment.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
