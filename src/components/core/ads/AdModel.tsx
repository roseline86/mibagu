import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

interface AdProps {
  adImage: StaticImageData;
  adTitle: string;
  adDescription: string;
  adLink: string;
  adCtaText: string;
}

export default function AdModel({
  adImage,
  adTitle,
  adDescription,
  adLink,
  adCtaText,
}: AdProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-3">
        <div className="relative">
          <Link href={adLink}>
            <Image
              src={adImage}
              alt="Ad Image"
              className="h-full w-full rounded-md object-cover"
              height={500}
              width={500}
            />
          </Link>
          <Link href={adLink}>
            <Button
              size="sm"
              className="absolute bottom-1 right-0 flex items-center justify-center gap-3 transition-all duration-300 hover:px-5"
            >
              <span>{adCtaText}</span>
              <FaAngleRight />
            </Button>
          </Link>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <Link href={adLink}>
            <h1 className="text-2xl font-bold transition-all duration-300 hover:text-primary">
              {adTitle}
            </h1>
          </Link>
          <p className="text-gray-700 dark:text-gray-400">{adDescription}</p>
        </div>
        <div className="mt-4 flex items-end justify-end">
          <Badge>Ads</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
