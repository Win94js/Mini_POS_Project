import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    CREATE_PRODUCT_SUCCESS,
    GET_PRODUCT_DETAIL_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
  } from '../actions/productActions';
  
const initialState = {
  loading: false,
  items: [],
  selected: null,
  error: null,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
    case GET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, selected: action.payload };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        selected: action.payload,
      };
    default:
      return state;
  }
};
console.log('items',initialState.items)
