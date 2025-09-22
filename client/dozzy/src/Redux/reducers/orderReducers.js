import { CREATE_ORDER_SUCCESS,GET_ORDERS_SUCCESS,GET_ORDERS_FAILURE,GET_ORDERS_REQUEST,UPDATE_ORDER_SUCCESS  } from "../actions/orderActions";

// import { ADD_ORDER_SUCCESS } from "../actions/orderActions";

const initialState = {
  orders: [],
  orderId:[]
  
};
console.log('initialState.orders',initialState.orders)
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload], // add new order to the list
        orderId: [...state.orderId, action.payload._id]
      };
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload, error: null };
    case GET_ORDERS_FAILURE:
      return { loading: false, orders: [], error: action.payload };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
