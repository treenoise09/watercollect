import axios from 'axios'
import type {paymentRecord} from '~/domains/types/paymentRecord'

const BASE_URL = 'http://192.168.1.104:8000/api'
const API_URL = 'Payment Record'
const fields = '["date","unit","payment","maintenence_fee","paid","house"]'
export const getPaymentRecordByMonthAndYear = async (month: number, year: number): Promise<paymentRecord[]> => {
    // Construct your API URL with fields and date filters
    const url = `${BASE_URL}/method/water_api.api.get_payment_records_with_house?month=${month}&year=${year}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials:true
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};