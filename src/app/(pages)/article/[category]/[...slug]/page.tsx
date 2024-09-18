"use client";
import { CommentBox } from "@/components/core/comments/CommentBox";
import CommentsList from "@/components/core/comments/CommentList";
import { FetchSinglePost } from "@/components/fetch/get/singlepost/FetchSinglePost";
import Loading from "@/components/helper/Loading";
import Header from "@/components/pages/singlepost/Header";
import MainContent from "@/components/pages/singlepost/MainContent";

export default function Page() {
  const { data, isLoading, isError } = FetchSinglePost();

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
