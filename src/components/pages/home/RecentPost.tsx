"use client";
import PaginationUi from "@/components/common/pagination/Pagination";
import AdModel from "@/components/core/ads/AdModel";
import { FetchAds } from "@/components/fetch/get/ads/FetchAds";
import { FetchAllPost } from "@/components/fetch/get/allpost/FetchAllPost";
import Loading from "@/components/helper/Loading";
import FeaturedPostType from "@/components/type/post/FeaturedPostType";
import { useState } from "react";
import RecentPostModel from "./RecentPostModel";

const getAdForIndex = (index: number, ads: any[]) => {
  const adIndex = Math.floor(index / 2) % ads.length;
  return ads[adIndex];
};

export default function RecentPost() {
  const [page, setPage] = useState<number>(1);

  // Fetch posts
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = FetchAllPost(page);

  // Fetch ads
  const { data: adData, isLoading: adLoading, isError: adError } = FetchAds();

  if (postLoading || adLoading) {
    return <Loading />;
  }

  if (postError || adError || !postData || !adData) {
    return <p>Error loading posts or ads. Please try again later.</p>;
  }

  const { posts, totalPostsCount } = postData;
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

    // Insert an ad after every 2 articles, using fetched ads data
    if ((index + 1) % 2 === 0 && adData.length > 0) {
      const ad = getAdForIndex(index, adData);
      items.push(
        <AdModel
          key={`ad-${ad.id}`}
          adImage={ad.coverImage}
          adTitle={ad.title}
          adDescription={ad.description}
          adLink={ad.link}
          adCtaText={ad.cta}
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
