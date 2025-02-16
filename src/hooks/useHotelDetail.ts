import { useQuery } from "@tanstack/react-query";
import { fetchHotelDetail } from "../services/hotelServices";

export const useHotelDetail = (id: string | undefined) => {
  return useQuery<Hotel>({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
