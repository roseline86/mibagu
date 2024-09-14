"use client";
import PaginationUi from "@/components/common/pagination/Pagination";
import AdModel from "@/components/core/ads/AdModel";
import { adsData } from "@/components/core/ads/AdsData";
import { FetchAllPost } from "@/components/fetch/get/allpost/FetchAllPost";
import Loading from "@/components/helper/Loading";
import FeaturedPostType from "@/components/type/post/FeaturedPostType";
import { useState } from "react";
import RecentPostModel from "./RecentPostModel";

const getAdForIndex = (index: number) => {
  const adIndex = Math.floor(index / 2) % adsData.length;
  return adsData[adIndex];
};

export default function RecentPost() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = FetchAllPost(page);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <p>Error loading posts. Please try again later.</p>;
  }

  const { posts, totalPostsCount } = data;
  const totalPages = Math.ceil(totalPostsCount / 10);

  const items: JSX.Element[] = [];
  posts.forEach((post: FeaturedPostType, index: number) => {
    items.push(
      <RecentPostModel
        key={post._id}
        title={post.title}
        image={post.coverImage}
        authorImage={post.author.image}
        updatedAt={post.updatedAt}
        comments={post._count.comments}
        category={post.category}
        createdAt={post.createdAt}
        content={post.content}
      />,
    );

    // Insert an ad after every 2 articles
    if ((index + 1) % 2 === 0) {
      const ad = getAdForIndex(index);
      items.push(
        <AdModel
          key={`ad-${ad.id}`}
          adImage={ad.adImage}
          adTitle={ad.adTitle}
          adDescription={ad.adDescription}
          adLink={ad.adLink}
          adCtaText={ad.adCtaText}
        />,
      );
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">{items}</div>
      <div className="my-20">
        <PaginationUi
          currentPage={page}
          totalPages={totalPages}
          setCurrentPage={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}
