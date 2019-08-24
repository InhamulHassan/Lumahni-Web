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
} from "../actions/types";

// const initialState = {
//   dataLoading: false,
//   authToken: null,
//   loggedIn: false,
//   error: ""
// };

let auth = JSON.parse(localStorage.getItem("auth_token"));
const initialState = auth
  ? {
      dataLoading: false,
      authToken: auth,
      authUser: {},
      loggedIn: true,
      resetSuccess: false,
      resetLoading: false,
      resetError: "",
      error: ""
    }
  : {
      dataLoading: false,
      authToken: null,
      authUser: {},
      loggedIn: false,
      resetSuccess: false,
      resetLoading: false,
      resetError: "",
      error: ""
    };

const userDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authToken: action.payload.authToken,
        authUser: action.payload.authUser,
        loggedIn: true
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case LOGIN_USER_RESET:
      return {
        ...state,
        dataLoading: false,
        error: ""
      };
    case LOGOUT_USER_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authToken: {},
        loggedIn: false
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        loggedIn: true,
        error: action.payload
      };
    case LOGOUT_USER_RESET:
      return {
        ...state,
        dataLoading: false,
        loggedIn: false,
        error: ""
      };
    case GET_USER_DETAILS_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authUser: action.payload.authUser
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_USER_DETAILS_RESET:
      return {
        ...state,
        dataLoading: false,
        error: ""
      };
    case PASSWORD_RESET_PENDING:
      return {
        ...state,
        resetLoading: action.dataLoading
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        resetLoading: action.dataLoading,
        resetSuccess: true
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        resetLoading: action.dataLoading,
        resetSuccess: false,
        resetError: action.payload
      };
    case PASSWORD_RESET_RESET:
      return {
        ...state,
        resetLoading: false,
        resetSuccess: false,
        resetError: ""
      };
    default:
      return state;
  }
};

export default userDbReducer;
