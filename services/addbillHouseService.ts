import axios from "axios";

const API_BASE_URL = "http://192.168.1.104:8000/api";

export const addbillHouseInfo = (houseName) => {
  const filters = encodeURIComponent(JSON.stringify([["Payment Record", "house", "=", houseName]]));
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return axios.get(
    `${API_BASE_URL}/resource/Payment Record?fields=["name"]&filters=${filters}`,
    config
  );
};
