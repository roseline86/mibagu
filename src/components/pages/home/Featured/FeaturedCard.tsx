import formatDate from "@/components/helper/hook/FormattedDate";
import { useFormattedPostLink } from "@/components/helper/hook/FormattedLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import fallbackAuthorImage from "@/image/user.png";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight, FaComment, FaRegCalendarAlt } from "react-icons/fa";

interface props {
  image: string;
  name: string;
  createdAt: string;
  authorImage: string;
  title: string;
  category: string;
  updatedAt: string;
  comments: number;
}

export default function FeaturedCard({
  image,
  name,
  createdAt,
  authorImage,
  title,
  category,
  updatedAt,
  comments,
}: props) {
  const { postLink } = useFormattedPostLink(createdAt, title, category);
  const formattedCategory = category.replace(/\s+/g, "-").toLowerCase();
  return (
    <Card className="group relative bg-secondary">
      <Link href={`/article/${postLink}`}>
        <Image
          src={image}
          alt=""
          className="h-52 w-full rounded-lg object-cover brightness-50 transition-all duration-700  group-hover:brightness-75 md:h-[29rem]"
          width={900}
          height={900}
        />
      </Link>

      <div className="hidden flex-col gap-2 py-6 md:flex md:flex-row md:items-center md:justify-between md:px-8">
        <div className="mt-5 flex flex-row justify-between text-muted-foreground md:gap-16">
          <span>{name}</span>
          <span className="flex items-center gap-2 md:justify-center">
            <FaRegCalendarAlt />
            <span>{formatDate(updatedAt)}</span>
          </span>
        </div>
      </div>
      {/* <div className="absolute left-10  hidden items-center justify-center md:bottom-[3.75rem] md:left-16 md:flex">
        <Image
          src={authorImage || fallbackAuthorImage} // Use fallback image if no authorImage
          alt=""
          height={100}
          width={100}
          className="z-10 h-10 w-10 rounded-full object-cover ring ring-white md:h-16 md:w-16"
        />

        <div className="absolute -top-1.5 h-7 w-[3.1rem]  rounded-t-full bg-primary md:-top-2 md:h-10 md:w-20"></div>
      </div> */}
      <Link href={`/article/${postLink}`}>
        <Button className="absolute bottom-0 right-0 flex scale-75 items-center justify-center gap-3 transition-all duration-300 hover:bg-primary-200/80 hover:px-10 md:bottom-24 md:right-6 md:scale-100">
          <span>View Details</span>
          <FaAngleRight />
        </Button>
      </Link>
      <div
        className=" absolute right-4 top-2 md:right-10 md:top-10"
        title="comment count"
      >
        <div className="relative text-primary-200">
          <FaComment size="36" />
        </div>
        <p className="absolute left-3 top-1 text-black">{comments}</p>
      </div>
      <Link
        href={`/article/${postLink}`}
        className="absolute bottom-10 left-12 mr-12 text-2xl font-bold text-white md:bottom-48 md:text-5xl"
      >
        {title}
      </Link>
    </Card>
  );
}
