import axios from 'axios'
import app from '@/composables/axiosConfig';
import type {paymentRecord} from '~/domains/types/paymentRecord'
import type {RequestPaymentRecord} from "~/domains/types/requestPaymentRecord";

const API_URL = 'Payment Record'
export const getPaymentRecordByMonthAndYear = async (month: number, year: number): Promise<paymentRecord[]> => {
    const url = `method/water_api.api.get_payment_records_with_house?month=${month}&year=${year}`;
    try {
        const response = await app.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};
export const addBill = async (data:RequestPaymentRecord): Promise<void> => {
    const url = `resource/Payment Record`;
    try {
        const response = await app.post(url,data);
        if (response.status != 200) {
            throw new Error()
        }
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};