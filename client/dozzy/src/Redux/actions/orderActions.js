
import {createOrderApi,fetchOrdersApi,updateOrderApi} from '../../api/orders'
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE";
export const createOrderAction = (orderData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const data = await createOrderApi(orderData);
    console.log('data for create order',data)

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    console.error("Error creating order", err);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: err });
  }
};

export const fetchOrdersAction = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const data = await fetchOrdersApi();
    console.log('order fetch',data)
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    console.error("Error fetching orders", err);
    dispatch({ type: GET_ORDERS_FAILURE, payload: err });
  }
};

export const updateOrderAction = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });
  try {
    const data = await updateOrderApi(id, updatedData);
    console.log('Order updated', data);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    console.error("Error updating order", err);
    dispatch({ type: UPDATE_ORDER_FAILURE, payload: err });
  }
};
