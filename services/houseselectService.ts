import axios from "axios";

const API_BASE_URL = "http://192.168.1.104:8000/api";

export const houseselect = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return axios.get(
    `${API_BASE_URL}/resource/House/?fields=["name","owner_name","address","meter_id","user"]`,
    config
  );
};