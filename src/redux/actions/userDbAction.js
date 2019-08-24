import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_RESET,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_RESET,
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_RESET,
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/user";

const userLoginPending = () => ({
  type: LOGIN_USER_PENDING,
  dataLoading: true
});

const userLoginSuccess = data => ({
  type: LOGIN_USER_SUCCESS,
  dataLoading: false,
  payload: data
});

const userLoginFailure = error => ({
  type: LOGIN_USER_FAILURE,
  dataLoading: false,
  payload: error
});

const userLoginReset = () => ({
  type: LOGIN_USER_RESET
});

export const userLogin = data => {
  return async dispatch => {
    try {
      dispatch(userLoginPending()); // changed position
      let response = await axios.post(`${URL}/auth`, {
        username: data.username,
        password: data.password
      });
      const result = response.data;
      if (result.success) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("auth_token", JSON.stringify(result.authToken));
        dispatch(userLoginSuccess(result));
      } else {
        dispatch(userLoginFailure(result.message));
      }
    } catch (error) {
      if (error.response) {
        dispatch(userLoginFailure(error.response.data.message));
      } else {
        dispatch(userLoginFailure(error.message));
      }
    }
  };
};

export const resetUserLogin = () => {
  return dispatch => {
    dispatch(userLoginReset());
  };
};

const userLogoutPending = () => ({
  type: LOGOUT_USER_PENDING,
  dataLoading: true
});

const userLogoutSuccess = data => ({
  type: LOGOUT_USER_SUCCESS,
  dataLoading: false
});

const userLogoutFailure = error => ({
  type: LOGOUT_USER_FAILURE,
  dataLoading: false,
  payload: error
});

const userLogoutReset = () => ({
  type: LOGOUT_USER_RESET
});

export const userLogout = () => {
  return async dispatch => {
    try {
      dispatch(userLogoutPending()); // changed position
      localStorage.removeItem("auth_token");
      if (localStorage.getItem("auth_token") === null) {
        dispatch(userLogoutSuccess());
      } else {
        dispatch(userLogoutFailure("Logout failed"));
      }
    } catch (error) {
      dispatch(userLogoutFailure(error.message));
    }
  };
};

export const resetUserLogout = () => {
  return dispatch => {
    dispatch(userLogoutReset());
  };
};

const getUserDetailsPending = () => ({
  type: GET_USER_DETAILS_PENDING,
  dataLoading: true
});

const getUserDetailsSuccess = data => ({
  type: GET_USER_DETAILS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getUserDetailsFailure = error => ({
  type: GET_USER_DETAILS_FAILURE,
  dataLoading: false,
  payload: error
});

const getUserDetailsReset = () => ({
  type: GET_USER_DETAILS_RESET
});

export const getUserDetails = () => {
  return async dispatch => {
    try {
      dispatch(getUserDetailsPending()); // changed position
      let response = await axios.get(`${URL}/details`);
      const result = response.data;
      if (result.success) {
        dispatch(getUserDetailsSuccess(result));
      } else {
        dispatch(getUserDetailsFailure(result.message));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserDetailsFailure(error.response.data.message));
      } else {
        dispatch(getUserDetailsFailure(error.message));
      }
    }
  };
};

export const resetGetUserDetails = () => {
  return dispatch => {
    dispatch(getUserDetailsReset());
  };
};

const passwordResetPending = () => ({
  type: PASSWORD_RESET_PENDING,
  dataLoading: true
});

const passwordResetSuccess = data => ({
  type: PASSWORD_RESET_SUCCESS,
  dataLoading: false
});

const passwordResetFailure = error => ({
  type: PASSWORD_RESET_FAILURE,
  dataLoading: false,
  payload: error
});

const passwordResetReset = () => ({
  type: PASSWORD_RESET_RESET
});

export const passwordReset = data => {
  return async dispatch => {
    try {
      dispatch(passwordResetPending()); // changed position
      let response = await axios.post(`${URL}/reset`, {
        id: data.id,
        username: data.username,
        old_password: data.old_password,
        new_password: data.new_password
      });
      const result = response.data;
      if (result.success) {
        dispatch(passwordResetSuccess());
      } else {
        dispatch(passwordResetFailure("Password Reset failed"));
      }
    } catch (error) {
      if (error.response) {
        dispatch(passwordResetFailure(error.response.data.message));
      } else {
        dispatch(passwordResetFailure(error.message));
      }
    }
  };
};

export const resetPasswordReset = () => {
  return dispatch => {
    dispatch(passwordResetReset());
  };
};
