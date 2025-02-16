import axios from "axios";

export const fetchHotelDetail = async (
  id: string | undefined
): Promise<Hotel> => {
  const response = await axios.get<Hotel>(`http://localhost:3001/hotels/${id}`);
  return response.data;
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await axios.get<Hotel[]>("http://localhost:3001/hotels");
  return response.data;
};
