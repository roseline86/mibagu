import { useFormattedPostLink } from "@/components/helper/hook/FormattedLink";
import Image from "next/image";
import Link from "next/link";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
  };
  post: {
    title: string;
    coverImage: string;
    createdAt: string;
    category: string;
  };
  createdAt: string;
}

export default function CommentsModel({ comment }: { comment: Comment }) {
  const { postLink } = useFormattedPostLink(
    comment.post.createdAt,
    comment.post.title,
    comment.post.category,
  );

  console.log(postLink);
  return (
    <Link href={`/article/${postLink}`} className="flex items-start gap-2">
      <div>
        <Image
          src={comment.post.coverImage}
          alt=""
          className="mt-1.5 h-12 w-16 rounded-md object-cover"
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="text-sm text-gray-600">{comment.author.name} says</div>
        <div className="font-bold hover:text-primary">{comment.content}</div>
      </div>
    </Link>
  );
}
