"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";

export default function Menu() {
  const { data: session } = useSession();

  const name = session?.user?.name || "MIBAGU";
  const fallback = name.slice(0, 2);
  const image = session?.user?.image;

  async function handleLogout() {
    signOut({ redirect: false, callbackUrl: "/" });
  }

  return (
    <div className="mr-3 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-col items-end gap-1.5 p-1">
            <span className="h-[2px] w-5 bg-white"></span>
            <span className="h-[2px] w-4 bg-white"></span>
            <span className="h-[2px] w-5 bg-white"></span>
          </div>
        </SheetTrigger>
        <SheetContent className="pt-10">
          <SheetHeader>
            <SheetClose asChild>
              <div className="flex items-center gap-4">
                <Avatar className="cursor-pointer">
                  {image && <AvatarImage src={image} />}
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <span className="font-extrabold">{name}</span>
              </div>
            </SheetClose>
          </SheetHeader>

          <div className="mt-4 flex w-8/12 flex-col gap-1">
            <SheetClose asChild>
              <Link className="text-primary-bg-white " href="/about">
                <Button variant="outline" className="flex w-full">
                  About
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="text-primary-bg-white " href="/news">
                <Button variant="outline" className="flex w-full">
                  News
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="text-primary-bg-white " href="/resources">
                <Button variant="outline" className="flex w-full">
                  Resources
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="text-primary-bg-white " href="/polls">
                <Button variant="outline" className="flex w-full">
                  Polls & Surveys
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="text-primary-bg-white " href="/courses">
                <Button variant="outline" className="flex w-full">
                  Courses
                </Button>
              </Link>
            </SheetClose>
            {!session?.user?.id && (
              <SheetClose asChild>
                <Link className="text-primary-bg-white " href="/login">
                  <Button>Login</Button>
                </Link>
              </SheetClose>
            )}
          </div>
          {session?.user?.id && (
            <div className="mt-4 flex w-8/12 flex-col gap-3">
              <SheetClose asChild>
                <Link href="/profile">
                  <Button variant="outline" className="flex w-full">
                    Profile
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/editprofile">
                  <Button variant="secondary" className="flex w-full">
                    Edit Profile
                  </Button>
                </Link>
              </SheetClose>
              {session?.user?.role === "Administrator" && (
                <SheetClose asChild>
                  <Link href="/dashboard">
                    <Button variant="secondary" className="flex w-full">
                      Dashboard
                    </Button>
                  </Link>
                </SheetClose>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Log Out</Button>
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
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
