import favicon from "@/image/favicon.png";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Subscribe from "./Subscribe";

function Footer() {
  const date = new Date();
  return (
    <div>
      <footer className="w-full bg-primary-100 py-4">
        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="mx-auto  text-center text-white">
            <div>
              <Image src={favicon} alt="favicon" className="mx-auto w-20" />
            </div>
            <Subscribe />
            <ul className=" my-10 grid grid-cols-2 gap-2 border-b pb-10 md:mx-auto md:flex md:items-center md:justify-center md:gap-16 ">
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/">Terms Of Use</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>

              <li>
                <Link href="/">Advertise With Us</Link>
              </li>
            </ul>
            <div className="mb-14 flex items-center justify-center space-x-10 text-3xl text-white">
              <Link href="/">
                <FaXTwitter />
              </Link>
              <Link href="/">
                <FaInstagram />
              </Link>
              <Link href="/">
                <FaFacebook />
              </Link>
              <Link href="/">
                <FaYoutube />
              </Link>
            </div>
            <span className="block text-center text-lg text-gray-400">
              ©MIBAGU {date.getFullYear()}, All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
