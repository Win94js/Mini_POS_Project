import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';

export const fetchProductsApi = async () => {
  const res = await axios.get(`${API_BASE_URL}/product/getAllProduct`);
  return res.data;
};
export const createProductApi = async (productData) => {
    const res = await axios.post(`${API_BASE_URL}/product/add-product`,productData);
    return res.data;
  };
export const getProductDetailApi = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/product/productDetail/${id}`);
  return res.data;
}

export const editProductApi = async (id,updateData) => {
    const res = await axios.put(`${API_BASE_URL}/product/updateProuduct/${id}`);
    return res.data;
}