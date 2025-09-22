import axios from "axios";
import { API_BASE_URL } from '../utils/baseUrl';
export const createBillApi = async (billData) => {
  const response = await axios.post(`${API_BASE_URL}/bill/createBill`, billData);
  console.log('response bill',response)
  return response.bills;
};

export const fetchBillsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/bill/bills`);
  return response.bills;
};
