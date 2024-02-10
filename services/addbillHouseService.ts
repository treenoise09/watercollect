import axios from "axios";
import type { House } from "~/domains/types/house";
import type {paymentRecord} from "~/domains/types/paymentRecord";

const API_BASE_URL = "http://192.168.1.104:8000/api";
const fields = '["date","unit","payment","maintenence_fee","paid","house"]';
const housefields = '["name","owner_name","address","meter_id","user"]';

export const addbillHouseInfo = async (houseName:string): Promise<paymentRecord[]> => {
  const filters = encodeURIComponent(JSON.stringify([["Payment Record", "house", "=", houseName]]));
  const homefilter = encodeURIComponent(JSON.stringify([["House", "name", "=", houseName]]));
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  try {
    const paymentResponse = await axios.get(
      `${API_BASE_URL}/resource/Payment Record?fields=${fields}&filters=${filters}`,
      config
    );
    const houseResponse = await axios.get(
      `${API_BASE_URL}/resource/House?fields=${housefields}&filters=${homefilter}`,
      config
    );

    if (paymentResponse.data && paymentResponse.data.data) {
      return paymentResponse.data.data.map((payment: paymentRecord) => {
        const new_payment = payment;
        new_payment.house = houseResponse.data.data; // Assuming this is the desired structure
        return new_payment;
      });
    } else {
      return []; // or handle this case as needed
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // or handle it as needed
  }
};
