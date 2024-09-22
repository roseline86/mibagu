import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Reusable function to fetch a single post
export function useFetchSinglePost({
  category,
  createdAt,
  title,
}: {
  category: string | string[];
  createdAt: string;
  title: string;
}) {
  return useQuery({
    queryKey: ["singlePost", category, createdAt, title],
    queryFn: async () => {
      const response = await axios.get(
        `/api/post/singlepost?category=${category}&createdAt=${createdAt}&title=${title}`,
      );
      return response.data;
    },
  });
}

import { useParams } from "next/navigation";

export function FetchEditPost() {
  const params = useParams();

  const category = params.category;

  const createdAt = `${params.slug[2]}-${params.slug[1].padStart(2, "0")}-${
    params.slug[0]
  }`;
  return useQuery({
    queryKey: ["singlePost", category, createdAt, params.slug[3]],
    queryFn: async () => {
      const response = await axios.get(
        `/api/post/singlepost?category=${category}&createdAt=${createdAt}&title=${params.slug[3]}`,
      );
      return response.data;
    },
  });
}
