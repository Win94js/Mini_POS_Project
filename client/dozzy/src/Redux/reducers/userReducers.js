import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS, UPDATE_USER_PERMISSIONS_FAILURE, UPDATE_USER_PERMISSIONS_SUCCESS } from "../actions/userActions";



const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null,
        };
  
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_USER_PERMISSIONS_SUCCESS:
        return {
          ...state,
          users: state.users.map(user =>
            user._id === action.payload._id ? action.payload : user
          ),
          error: null,
        };
  
      case UPDATE_USER_PERMISSIONS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  