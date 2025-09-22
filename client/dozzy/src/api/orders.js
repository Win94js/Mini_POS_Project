import axios from "axios";
import { API_BASE_URL } from '../utils/baseUrl';

// Function to create a new order
export const createOrderApi = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/order/create-order`, orderData);
    // Assuming response contains 'orders' data in response.data
  console.log('order response',response)
    return response.data.order;
  } catch (error) {
    console.error("Error creating order:", error.response.data.message);
    throw new Error("Failed to create order. Please try again later.");
  }
};

// Function to fetch all orders
export const fetchOrdersApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/getAllOrders`);
    // Assuming response contains 'orders' data in response.data
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders. Please try again later.");
  }
};

export const updateOrderApi = (id, updatedData) => {
  return axios.put(`${API_BASE_URL}/order/update-order/${id}`, updatedData).then((res) => res.data);
};
