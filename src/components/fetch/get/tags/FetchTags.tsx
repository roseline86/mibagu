import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get(`/api/post/tags`);
      return response.data;
    },
  });
}
