import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "../services/hotelServices";

export const useHotels = () => {
  return useQuery<Hotel[]>({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
