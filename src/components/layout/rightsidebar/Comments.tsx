import { FetchAllComments } from "@/components/fetch/get/allcomment/FetchAllComment";
import CommentModel from "./CommentsModel";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
  };
  post: {
    title: string;
    coverImage: string;
    category: string;
    createdAt: string;
  };
  createdAt: string;
}

export default function Comments() {
  const { data, isLoading, isError } = FetchAllComments();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading comments</p>;
  }

  if (!data || data.length === 0) {
    return <p>No comments available</p>;
  }
  console.log(data);

  return (
    <>
      {data.map((comment: Comment) => (
        <CommentModel key={comment.id} comment={comment} />
      ))}
    </>
  );
}
