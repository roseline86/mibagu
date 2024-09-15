import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

function Footer() {
  const date = new Date();
  return (
    <footer className="w-full bg-primary-100 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-4xl text-primary">
          MIBAGU
          <ul className="mb-10 flex flex-col items-center justify-center gap-7 border-b border-gray-200 py-16 text-lg transition-all duration-500 md:flex-row md:gap-12">
            <li>
              <a href="#" className="text-gray-300 hover:text-gray-100">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-300 hover:text-gray-100">
                Terms Of Use
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-300 hover:text-gray-100">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-300 hover:text-gray-100">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className=" text-gray-300 hover:text-gray-100">
                Advertise With Us
              </a>
            </li>
          </ul>
          <div className="mb-14 flex items-center justify-center space-x-10 text-white">
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
  );
}

export default Footer;
