"use client";
import AdModelPage from "@/components/core/ads/AdModelPage";
import { FetchAds } from "@/components/fetch/get/ads/FetchAds";
import Loading from "@/components/helper/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function AdsList() {
  const { data: session } = useSession();
  const { isLoading, data, isError, refetch } = FetchAds();

  if (!session) {
    return <p>User not loged in</p>;
  }

  if(session.user?.role !== 'adminstrator')

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error loading ads</p>;
  }

  if (!data || data.length === 0) {
    return <p>No ads available</p>;
  }

  const handleDeleteAd = async (adId: string) => {
    try {
      toast.loading("Please wait...");
      await axios.delete(`/api/ads?adId=${adId}`);
      toast.success("Ad deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.map((ad: any) => (
        <AdModelPage
          key={ad.id}
          adImage={ad.coverImage}
          adTitle={ad.title}
          adDescription={ad.description}
          adLink={ad.link}
          adCtaText={ad.cta}
          onDelete={() => handleDeleteAd(ad.id)}
        />
      ))}
    </div>
  );
}
