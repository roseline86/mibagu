import RightSidebar from "@/components/layout/rightsidebar/RightSidebar";
import Featured from "@/components/pages/home/Featured/Featured";
import RecentPost from "@/components/pages/home/RecentPost";

export default function Home() {
  return (
    <div className=" overflow-x-hidden">
      <div className="md:grid md:grid-cols-24 lg:flex">
        <div className="col-span-22 w-full">
          <div className="lg:grid lg:grid-cols-48">
            <div className="col-span-37 border-r px-1 pt-4 md:px-10">
              <Featured />
              <RecentPost />
            </div>
            <div className="col-span-11">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
