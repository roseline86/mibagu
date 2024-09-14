import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAllPost(page: number) {
  return useQuery({
    queryKey: ["allPosts", page],
    queryFn: async () => {
      const response = await axios.get(
        `/api/post/allpost?page=${page}&pageSize=11`,
      );
      return response.data;
    },
  });
}
