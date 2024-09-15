import { FetchTags } from "@/components/fetch/get/tags/FetchTags";
import Link from "next/link";

export default function CategoryModel() {
  const { isLoading, data: categories, isError } = FetchTags();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  // Function to encode category names for URL
  const encodeForUrl = (str: string) =>
    encodeURIComponent(str.replace(/\s+/g, "-")).toLowerCase();

  return (
    <div className="flex flex-wrap gap-2 font-bold hover:[&>*]:text-primary">
      {categories && categories.length > 0 ? (
        categories.map((category: { category: string }, index: number) => {
          const encodedCategory = encodeForUrl(category.category); // Encode the category name
          return (
            <Link href={`/category/${encodedCategory}/page/1`} key={index}>
              {category.category}
            </Link>
          );
        })
      ) : (
        <span>No categories available</span>
      )}
    </div>
  );
}
