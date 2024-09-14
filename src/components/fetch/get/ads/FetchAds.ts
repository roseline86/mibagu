import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAds() {
  return useQuery({
    queryKey: ["allAds"],
    queryFn: async () => {
      const response = await axios.get(`/api/ads`);
      return response.data;
    },
  });
}
