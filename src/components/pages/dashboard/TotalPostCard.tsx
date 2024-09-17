import { FetchPostCount } from "@/components/fetch/admin/FetchPostCount";
import Loading from "@/components/helper/Loading";
import { Card } from "@/components/ui/card";
import { GrArticle } from "react-icons/gr";

export default function TotalPostCard() {
  const { isLoading, data, isError } = FetchPostCount();
  return (
    <>
      {isLoading ? (
        <div className="m-3">
          <Loading />
        </div>
      ) : isError ? (
        <p>Error loading data. Please try again later.</p>
      ) : (
        <Card className="p-3">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-bold">{data.totalPosts}</div>
              <div>Total Blog Post</div>
              <div className="flex flex-wrap gap-1">
                <span
                  className={
                    data.percentage > 0 ? "text-primary" : "text-red-500"
                  }
                >
                  {data.percentage} % {data.percentage >= 0 ? "More" : "less"}
                </span>
                <span>Then Last Month</span>
              </div>
            </div>
            <div className="mx-auto flex items-center justify-center text-primary">
              <GrArticle size={60} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
