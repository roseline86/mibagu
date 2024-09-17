import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchPollCount() {
  return useQuery({
    queryKey: ["admin poll data"],
    queryFn: async () => {
      const response = await axios.get(`/api/dashboard/poll`);
      return response.data;
    },
  });
}
