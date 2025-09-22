import axios from "axios";
import { API_BASE_URL } from '../utils/baseUrl';

export const fetchUsersApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/users`);
  console.log('responses users',response.data.users)
  return response.data.users;
};
export const updateUsersPermissionApi = async (id,permissions) => {
  const response = await axios.put(`${API_BASE_URL}/user/permissions/${id}`,permissions);
  return response.updateRoleData;
};