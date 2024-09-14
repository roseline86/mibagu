import { FetchAds } from "@/components/fetch/get/ads/FetchAds";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Assuming you're using next/image for image optimization
import { useState } from "react";

type AdModelProps = {
  adImage: string;
  adTitle: string;
  adDescription: string;
  adLink: string;
  adCtaText: string;
  onDelete: () => void; // Function to handle ad deletion
};

export default function AdModelPage({
  adImage,
  adTitle,
  adDescription,
  adLink,
  adCtaText,
  onDelete,
}: AdModelProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { refetch } = FetchAds();

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
    refetch();
  };

  return (
    <div className="mx-2 my-10 border p-3 md:mx-20">
      <div>
        <Image
          src={adImage}
          alt={adTitle}
          width={500}
          height={300}
          className="h-40 w-40 rounded-md"
        />
        <h2 className="mt-4 text-xl font-bold">{adTitle}</h2>
        <p className="mt-2 text-sm text-gray-600">{adDescription}</p>
        <a href={adLink} className="mb-4 inline-block text-blue-500">
          {adCtaText}
        </a>
      </div>

      <Button onClick={handleDelete} disabled={isDeleting} className="">
        {isDeleting ? "Deleting..." : "Delete Ad"}
      </Button>
    </div>
  );
}
