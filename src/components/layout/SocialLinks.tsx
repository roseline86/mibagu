import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import ToolTipHook from "../helper/ToolTipHook";

export default function SocialLinks() {
  return (
    <section className="flex flex-col gap-8 [&>*]:text-gray-300 hover:[&>*]:text-primary">
      <Link
        href="https://facebook.com/people/Mibagu/61565820790664/"
        target="_blank"
        rel="noopener"
      >
        <ToolTipHook text="Facebook" icon={<BsFacebook size={28} />} />
      </Link>

      <Link
        href="https://www.linkedin.com/in/trip2africa-travel-agency-719b35189/"
        target="_blank"
        rel="noopener"
      >
        <ToolTipHook text="Linkedin" icon={<FaLinkedinIn size={28} />} />
      </Link>
      <Link
        href="https://www.youtube.com/@mibagu0"
        target="_blank"
        rel="noopener"
      >
        <ToolTipHook text="YouTube" icon={<FaYoutube size={28} />} />
      </Link>
    </section>
  );
}
