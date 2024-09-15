"use client";
import formatDate from "@/components/helper/hook/FormattedDate";
import { useFormattedPostLink } from "@/components/helper/hook/FormattedLink";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface props {
  id: string;
  title: string;
  image: string;
  name: string;
  updatedAt: string;
  category: string;
  createdAt: string;
  authorId: string;
}

export default function Header({
  id,
  title,
  image,
  name,
  updatedAt,
  category,
  createdAt,
  authorId,
}: props) {
  const { postLink } = useFormattedPostLink(createdAt, title, category),
    { data: session, status } = useSession(),
    encodeForUrl = (str: string) =>
      encodeURIComponent(str.replace(/\s+/g, "-")).toLowerCase(),
    encodedCategory = category ? encodeForUrl(category) : "";
  const route = useRouter();

  async function handleDelete(id: string) {
    try {
      toast.loading("Please wait...");
      const response = await axios.delete(`/api/post/singlepost?postId=${id}`);

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Post deleted successfully!");
        route.back();
      } else {
        toast.dismiss();
        toast.error("Failed to delete the post. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while deleting the post.");
    }
  }

  return (
    <>
      <div className="rounded-lg border  md:mb-10 md:p-4  ">
        <h1 className="mb-4 text-xl font-extrabold text-primary md:text-2xl lg:text-4xl">
          {title}
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <span className="flex text-sm">
              <span className="text-sm ">
                This Post Last Was Updated By
                <Link href={"/users/"}>
                  <span className="px-1 text-lg font-medium text-primary">
                    {name}
                  </span>
                </Link>
                At <span className=" font-medium">{formatDate(updatedAt)}</span>
              </span>
            </span>
          </div>
          <div>
            <Link href={`/category/${encodedCategory}/page/1`}>
              <Badge>{category}</Badge>
            </Link>
          </div>
        </div>

        {status === "authenticated" &&
          (authorId === session.user?.id ||
            session.user?.role === "Administrator") && (
            <div className="mt-4 flex items-center justify-center gap-20">
              <Link href={`/editpost/${postLink}`}>
                <Button className="flex items-center gap-2" variant="secondary">
                  <FaPen />
                  <span>Edit Post</span>
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="space-x-2">
                    <FaTrash />
                    <span>Delete Post</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the article and its associate data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
      </div>

      <Image
        src={image}
        alt=""
        className="h-52 w-full rounded-lg object-cover  md:h-[29rem]"
        width={900}
        height={900}
      />
    </>
  );
}
