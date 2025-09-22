import { fetchTableApi,createTableApi,editTableApi,getTableDetailApi } from "../../api/tables";

export const FETCH_TABLES_REQUEST = 'FETCH_TABLES_REQUEST';
export const FETCH_TABLES_SUCCESS = 'FETCH_TABLES_SUCCESS';
export const FETCH_TABLES_FAIL = 'FETCH_TABLES_FAIL';
export const CREATE_TABLE_SUCCESS = 'CREATE_TABLE_SUCCESS';
export const GET_TABLE_DETAIL_SUCCESS = 'GET_TABLE_DETAIL_SUCCESS';
export const EDIT_TABLE_SUCCESS = 'EDIT_TABLE_SUCCESS';


export const createTableAction = (productData) => async (dispatch) => {
  try {
    const data = await createTableApi(productData);
    dispatch({ type: CREATE_TABLE_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const fetchTablesAction = () => async (dispatch) => {
  dispatch({ type: FETCH_TABLES_REQUEST });
  try {
    const res = await fetchTableApi();
    dispatch({ type: FETCH_TABLES_SUCCESS, payload: res.tables });
    console.log('res.data',res.products)
  } catch (err) {
    dispatch({ type: FETCH_TABLES_FAIL, payload: err.message });
  }
};

export const getTableDetailAction = (id) => async (dispatch) => {
  try {
    const data = await getTableDetailApi(id);
    dispatch({ type: GET_TABLE_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const editTableAction = (id, updatedData) => async (dispatch) => {
  try {
    const data = await editTableApi(id, updatedData);
    console.log('edit table action',data)
    dispatch({ type: EDIT_TABLE_SUCCESS, payload: data });
  } catch (err) {
    console.error(err);
  }
};