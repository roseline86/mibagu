import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchComments(postId: string) {
  return useQuery({
    queryKey: ["Comments", postId],
    queryFn: async () => {
      const response = await axios.get(`/api/comment?id=${postId}`);
      return response.data;
    },
  });
}
