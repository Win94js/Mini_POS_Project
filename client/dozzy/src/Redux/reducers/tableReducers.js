import {
    FETCH_TABLES_REQUEST,
    FETCH_TABLES_SUCCESS,
    FETCH_TABLES_FAIL,
    CREATE_TABLE_SUCCESS,
    GET_TABLE_DETAIL_SUCCESS,
    EDIT_TABLE_SUCCESS,
  } from '../actions/tableActions';
  
const initialState = {
  loading: false,
  tables: [],
  selected: null,
  error: null,
};
export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLES_REQUEST:
      return { ...state, loading: true };
    case FETCH_TABLES_SUCCESS:
      return { ...state, loading: false, tables: action.payload };
    case FETCH_TABLES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_TABLE_SUCCESS:
      return { ...state, tables: [...state.tables, action.payload] };
    case GET_TABLE_DETAIL_SUCCESS:
      return { ...state, selected: action.payload };
    case EDIT_TABLE_SUCCESS:
      return {
        ...state,
        tables: state.tables.map((table) =>
            table._id === action.payload._id ? action.payload : table
        ),
        selected: action.payload,
      };
    default:
      return state;
  }
};
console.log('tables',initialState.tables)
