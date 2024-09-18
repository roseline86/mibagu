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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CommentListProps {
  postId: string;
}

export default function CommentsList({ postId }: CommentListProps) {
  const { isLoading, data, isError, refetch } = FetchComments(postId);
  const { data: session } = useSession();

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
      toast.dismiss();
      toast.error("There was an error.");
    }
  };

  return (
    <div className="my-10 flex w-full flex-col gap-4">
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
                <div className="text-xl font-bold">{comment.name}</div>
                <div>
                  {new Date(comment.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
            <div className="mt-4">{comment.comment}</div>
            {session?.user?.role === "Administrator" && (
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
