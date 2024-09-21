"use client";
import logo from "@/image/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileSlide from "../pages/profile/ProfileSlide";
import Menu from "./Menu";

import SearchIcon from "./SearchIcon";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        currentScrollPos < 200 || prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-primary-100 py-3 transition-all duration-300 md:w-[94.4%] md:pl-3 md:pr-10 lg:py-4 lg:pl-4 ${
        visible ? "translate-y-0  opacity-100 " : "-translate-y-20 opacity-10"
      }`}
    >
      <div className="">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className=" -ml-6 h-16 w-60 object-cover px-0"
          />
        </Link>
      </div>

      <div className="hidden items-center justify-center md:gap-4 lg:flex lg:gap-8">
        <div className=" flex items-center gap-5 text-white">
          <Link
            className="rounded px-4 py-2 transition-all duration-300 hover:bg-red-700"
            href={"/about"}
          >
            About
          </Link>
          <Link
            className="rounded px-4 py-2 transition-all duration-300 hover:bg-red-700"
            href={"/category/news/page/1"}
          >
            News
          </Link>
          <Link
            className="rounded px-4 py-2 transition-all duration-300 hover:bg-red-700"
            href={"/category/resources/page/1"}
          >
            Resources
          </Link>
          <Link
            className="rounded px-4 py-2 transition-all duration-300 hover:bg-red-700"
            href={"/polls"}
          >
            Polls and surveys
          </Link>
          <Link
            className="rounded px-4 py-2 transition-all duration-300 hover:bg-red-700"
            href={"/category/courses/page/1"}
          >
            Courses
          </Link>
        </div>
        <ProfileSlide />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <SearchIcon />
        <div className="scale-75">
          <ThemeSwitch />
        </div>
        <Menu />
      </div>
    </header>
  );
}
