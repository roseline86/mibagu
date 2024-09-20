import Link from "next/link";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

export default function ContractLeft() {
  return (
    <div className=" col-span-1 flex flex-col gap-4 p-2 md:gap-16">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-primary">Get In Touch</span>
        <span className="h-1 w-20 bg-primary"></span>
        <span className=" mt-4 text-secondary-foreground">
          Feel free to get in touch with us for any inquiries, feedback or
          assistance. I am dedicated to providing excellent service and are
          eager to hear from you.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 font-semibold md:gap-8">
          <div className="text-primary">
            <IoLocationOutline size="24" />
          </div>

          <div>Windhoek, Namibia</div>
        </div>
        <div className="flex items-center gap-3 font-semibold md:gap-8">
          <div className="text-primary">
            <TfiEmail size="20" />
          </div>

          <div>info@mibagu.com</div>
        </div>
        <div className="mt-3 flex items-center gap-10 text-2xl text-primary">
          <Link
            href="https://facebook.com/people/Mibagu/61565820790664/"
            target="_blank"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.linkedin.com/in/trip2africa-travel-agency-719b35189/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link href="https://www.youtube.com/@mibagu0" target="_blank">
            <FaYoutube />
          </Link>
        </div>
      </div>
    </div>
  );
}
