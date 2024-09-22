"use client";
import { CommentBox } from "@/components/core/comments/CommentBox";
import CommentsList from "@/components/core/comments/CommentList";
import { useFetchSinglePost } from "@/components/fetch/get/singlepost/FetchSinglePost";

import Loading from "@/components/helper/Loading";
import Header from "@/components/pages/singlepost/Header";
import MainContent from "@/components/pages/singlepost/MainContent";
import { useParams } from "next/navigation";

export default function Blog() {
  const params = useParams();
  const category = params.category;
  const createdAt = `${params.slug[2]}-${params.slug[1].padStart(2, "0")}-${
    params.slug[0]
  }`;
  const title = params.slug[3];
  const { data, isLoading, isError } = useFetchSinglePost({
    category,
    createdAt,
    title,
  });
  return (
    <>
      {isLoading ? (
        <div className="m-1">
          <Loading />
        </div>
      ) : isError ? (
        <p>Error loading posts. Please try again later.</p>
      ) : (
        <>
          <Header
            title={data.title}
            image={data.coverImage}
            name={data.author.name}
            updatedAt={data.updatedAt}
            category={data.category}
            createdAt={data.createdAt}
            authorId={data.authorId}
            id={data.id}
          />
          <MainContent content={data.content} />
          <div className="mt-10">
            <CommentBox postId={data.id as string} />
            <CommentsList postId={data.id} />
          </div>
        </>
      )}
    </>
  );
}
