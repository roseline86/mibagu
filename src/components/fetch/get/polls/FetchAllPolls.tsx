import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAllPolls() {
  return useQuery({
    queryKey: ["allPolls"],
    queryFn: async () => {
      const response = await axios.get(`/api/polls`);
      return response.data;
    },
  });
}
