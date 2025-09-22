import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { productReducer } from '../reducers/productReducers';
import { tableReducer } from '../reducers/tableReducers';
import {orderReducer} from '../reducers/orderReducers';
import { billReducer } from '../reducers/billReducers';
import { userReducer } from '../reducers/userReducers';


const rootReducer = combineReducers({
  products: productReducer,
  tables: tableReducer,
  ordersState: orderReducer,
  billsState: billReducer,
  userState : userReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
