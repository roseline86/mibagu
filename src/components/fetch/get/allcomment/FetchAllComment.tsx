import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAllComments() {
  return useQuery({
    queryKey: ["allcomments"],
    queryFn: async () => {
      const response = await axios.get(`/api/comment/allcomment`);
      return response.data;
    },
  });
}
