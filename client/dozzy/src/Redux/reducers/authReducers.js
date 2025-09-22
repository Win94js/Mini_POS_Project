import { LOG_OUT, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/authActions";



const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
  
      case LOGIN_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      case LOGOUT:
        return { loading: false, user: null, token: null, error: null };
  
      default:
        return state;
    }
  };
  