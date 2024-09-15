import logo from "@/image/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  const date = new Date();
  return (
    <footer className="bg-primary-100 mt-10 divide-y text-white md:px-4">
      <div className="mx-auto flex flex-col justify-between space-y-8 py-10 pl-4 pr-2 lg:flex-row lg:space-y-0">
        <div className="h-fit lg:w-1/3">
          <Link href="/" className="h-fit">
            <Image src={logo} alt="logo" className="h-20 object-cover" />
          </Link>
        </div>
        <div className="grid  grid-cols-2 gap-x-3 gap-y-8 text-sm sm:grid-cols-4 lg:w-2/3">
          <div className="space-y-3">
            <h3 className="uppercase tracking-wide dark:text-gray-50">
              Useful links
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Contact Us
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Terms of Use
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase tracking-wide dark:text-gray-50">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50">Social media</div>
            <div className="flex justify-start space-x-3">
              <FaFacebookSquare size={18} />
              <FaTwitterSquare size={18} />
              <FaLinkedin size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="  border-t border-primary py-3 text-center">
        © {date.getFullYear()} MIBAGU. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
