import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchSubscriber() {
  return useQuery({
    queryKey: ["admin subscriber data"],
    queryFn: async () => {
      const response = await axios.get(`/api/dashboard/subscribe`);
      return response.data;
    },
  });
}
