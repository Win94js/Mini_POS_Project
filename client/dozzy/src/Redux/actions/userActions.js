import { fetchUsersApi, updateUsersPermissionApi } from "../../api/adminAccountsRole";
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

export const UPDATE_USER_PERMISSIONS_SUCCESS = 'UPDATE_USER_PERMISSIONS_SUCCESS';
export const UPDATE_USER_PERMISSIONS_FAILURE = 'UPDATE_USER_PERMISSIONS_FAILURE';

export const fetchUsers = () => async (dispatch) => {
    try {
      const data = await fetchUsersApi();
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: err.message });
    }
  };
  
  export const updateUserPermissions = (id, permissions) => async (dispatch) => {
    try {
      const updated = await updateUsersPermissionApi(id, permissions);
      dispatch({ type: UPDATE_USER_PERMISSIONS_SUCCESS, payload: updated });
    } catch (err) {
      dispatch({ type: UPDATE_USER_PERMISSIONS_FAILURE, payload: err.message });
    }
  };

