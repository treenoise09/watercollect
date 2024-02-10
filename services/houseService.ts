import axios from 'axios'
import type {House} from "~/domains/types/house";
import type {LocationQueryValue} from "vue-router";

const BASE_URL = 'http://192.168.1.104:8000/api'
export const getHouseByUserId = async (user:string): Promise<House[]> => {
    // Construct your API URL with fields and date filters
    const url = `${BASE_URL}/method/water_api.api.get_house_records_for_user?user=${user}`;
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

export const getHouseByName = async (owner_name:string): Promise<House[]> => {
    // Construct your API URL with fields and date filters
    const url = `${BASE_URL}/method/water_api.api.get_house_records?owner_name=${owner_name}`;
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

export const getHouseByHouseId = async (house_id:string |  LocationQueryValue[],limit = 12): Promise<House> => {
    // Construct your API URL with fields and date filters
    const url = `${BASE_URL}/method/water_api.api.get_house_by_id?house_id=${house_id}&limit=${limit}`;
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