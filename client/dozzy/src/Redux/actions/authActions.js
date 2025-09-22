import { loginAPI } from "../../api/auth";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT = 'LOG_OUT';

export const loginUser = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const data = await loginAPI(email, password);
  
      dispatch({ type: LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response?.data?.message || 'Login failed!',
      });
    }
  };