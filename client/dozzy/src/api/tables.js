import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';

export const fetchTableApi = async () => {
  const res = await axios.get(`${API_BASE_URL}/table/tables`);
  return res.data;
};
export const createTableApi = async (productData) => {
    const res = await axios.post(`${API_BASE_URL}/product/add-table`,productData);
    return res.data;
  };
export const getTableDetailApi = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/table/table-detail/${id}`);
  return res.data;
}

export const editTableApi = async (id,updateData) => {
    const res = await axios.put(`${API_BASE_URL}/table/updateTable/${id}`,updateData);
    console.log('table edit data api',res.data.table)
    return res.data.table;
}