import { CREATE_BILL_SUCCESS } from "../actions/billActions";

const initialState = {
  bills: [],
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        bills: [...state.bills, action.payload], // store newly created bill
      };
    default:
      return state;
  }
};
