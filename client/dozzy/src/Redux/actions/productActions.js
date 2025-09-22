import axios from 'axios';
import { fetchProductsApi,  createProductApi,
  getProductDetailApi,
  editProductApi } from '../../api/products';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL_SUCCESS = 'GET_PRODUCT_DETAIL_SUCCESS';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';

export const createProductAction = (productData) => async (dispatch) => {
  try {
    const data = await createProductApi(productData);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const fetchProductsAction = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const res = await fetchProductsApi();
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.products });
    console.log('res.data',res.products)
  } catch (err) {
    dispatch({ type: FETCH_PRODUCTS_FAIL, payload: err.message });
  }
};

export const getProductDetailAction = (id) => async (dispatch) => {
  try {
    const data = await getProductDetailApi(id);
    dispatch({ type: GET_PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const editProductAction = (id, updatedData) => async (dispatch) => {
  try {
    const data = await editProductApi(id, updatedData);
    dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};