import axios from 'axios'
import app from '@/composables/axiosConfig';
import type {House} from "~/domains/types/house";
import type {LocationQueryValue} from "vue-router";

export const getHouseByUserId = async (): Promise<House[]> => {
    // Construct your API URL with fields and date filters
    const url = `method/water_api.api.get_house_records_for_user`;
    try {
        const response = await app.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};

export const getHouseByName = async (owner_name:string): Promise<House[]> => {
    // Construct your API URL with fields and date filters
    const url = `method/water_api.api.get_house_records?owner_name=${owner_name}`;
    try {
        const response = await app.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};

export const getHouseByHouseId = async (house_id:string |  LocationQueryValue[],limit = 12): Promise<House> => {
    // Construct your API URL with fields and date filters
    const url = `method/water_api.api.get_house_by_id?house_id=${house_id}&limit=${limit}`;
    try {
        const response = await app.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching payment records:', error);
        throw error;
    }
};