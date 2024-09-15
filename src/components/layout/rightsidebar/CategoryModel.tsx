import { FetchTags } from "@/components/fetch/get/tags/FetchTags";

export default function CategoryModel() {
  const { isLoading, data: categories, isError } = FetchTags();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <div className="flex flex-wrap gap-2 font-bold hover:[&>*]:text-primary">
      {categories && categories.length > 0 ? (
        categories.map((category: { category: string }, index: number) => (
          <span key={index}>{category.category}</span>
        ))
      ) : (
        <span>No categories available</span>
      )}
    </div>
  );
}
