import axios from 'axios';
import { apiBaseUrl } from '../contants';

export const fetchAxisData = async (params) => {
    let url = `${apiBaseUrl}/${params}/data`;
    try {
      const response = await axios.get(url, {
      });
      return response.data;
    } catch (error) {
        console.log("error-->",error)
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  };