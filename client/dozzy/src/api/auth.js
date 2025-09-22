import axios from "axios";
import { API_BASE_URL } from '../utils/baseUrl';


export const loginAPI = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    console.log('user login api',response.data.user)    
    return response.data.user;
  };