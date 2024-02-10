import axios from "axios";
import type {House} from "~/domains/types/house";

const API_BASE_URL = "http://192.168.1.104:8000/api";

export const houseselect = (ownerName:string):Promise<House[]> => {
  const filters = JSON.stringify([
    ["owner_name", "like", `%${ownerName}%`]
  ]);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return axios.get(
    `${API_BASE_URL}/resource/House/?fields=["name","owner_name","address","meter_id","user"]&filters=${encodeURIComponent(filters)}`,
    config
  );
};