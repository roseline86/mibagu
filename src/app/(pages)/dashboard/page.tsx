"use client";
import TotalCommentCard from "@/components/pages/dashboard/TotalCommentCard";
import TotalPollCard from "@/components/pages/dashboard/TotalPollCard";
import TotalPostCard from "@/components/pages/dashboard/TotalPostCard";
import TotalUserCard from "@/components/pages/dashboard/TotalUserCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Unauthenticated</p>;
  }
  if (status === "authenticated" && session.user?.role === "Administrator") {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <MdOutlineSpaceDashboard />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/newpost"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              New&nbsp;Post
            </Link>
            <Link
              href="/newads"
              className="flex w-20 flex-row items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              New&nbsp;Ads
            </Link>
            <Link
              href="/newpoll"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              New&nbsp;Polls
            </Link>
            <Link
              href="/subscriber-list"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Subscriber&nbsp;List
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <MdOutlineSpaceDashboard />
                  <span className="sr-only">Dashboard</span>
                </Link>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="/newpost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New&nbsp;Post
                </Link>
                <Link
                  href="/newads"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New&nbsp;Ads
                </Link>
                <Link
                  href="/newpoll"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New&nbsp;Polls
                </Link>
                <Link
                  href="subscriber-list"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Subscriber&nbsp;List
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="text-center md:hidden">Dashboard</div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <TotalPostCard />
            <TotalCommentCard />
            <TotalPollCard />
            <TotalUserCard />
          </div>
        </main>
      </div>
    );
  } else {
    return <div>You don't have access to this page</div>;
  }
}
