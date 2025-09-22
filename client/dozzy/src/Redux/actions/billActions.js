import { createBillApi, fetchBillsApi } from "../../api/bill";


export const CREATE_BILL_SUCCESS = "CREATE_BILL_SUCCESS";
export const GET_BILLS_SUCCESS = "GET_BILLS_SUCCESS";

export const createBillAction = (billData) => async (dispatch) => {
  try {
    const data = await createBillApi(billData);
    
    dispatch({ type: CREATE_BILL_SUCCESS, payload: data });
  } catch (err) {
    console.error("Error creating bill", err);
  }
};

export const getBillsAction = () => async (dispatch) => {
  try {
    const data = await fetchBillsApi();
    dispatch({ type: GET_BILLS_SUCCESS, payload: data });
  } catch (err) {
    console.error("Error fetching bills", err);
  }
};
