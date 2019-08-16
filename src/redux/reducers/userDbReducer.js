import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_RESET,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_RESET
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
      error: ""
    }
  : {
      dataLoading: false,
      authToken: null,
      authUser: {},
      loggedIn: false,
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
    default:
      return state;
  }
};

export default userDbReducer;
