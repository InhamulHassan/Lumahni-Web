import {
  GET_ALL_MEMBERS_PENDING,
  GET_ALL_MEMBERS_SUCCESS,
  GET_ALL_MEMBERS_FAILURE,
  GET_ALL_MEMBERS_RESET,
  GET_MEMBER_BY_ID_PENDING,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_FAILURE,
  GET_MEMBER_BY_ID_RESET,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_RESET,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAILURE,
  EDIT_MEMBER_RESET
} from "../actions/types";

const initialState = {
  dataLoading: false,
  data: [],
  memberDetails: {},
  memberId: null,
  editSuccess: false,
  editLoading: false,
  error: ""
};

const authorDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MEMBERS_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        data: action.payload
      };
    case GET_ALL_MEMBERS_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_ALL_MEMBERS_RESET:
      return {
        ...state,
        dataLoading: false,
        data: [],
        error: ""
      };
    case GET_MEMBER_BY_ID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        memberDetails: action.payload
      };
    case GET_MEMBER_BY_ID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_MEMBER_BY_ID_RESET:
      return {
        ...state,
        dataLoading: false,
        memberDetails: {},
        error: ""
      };
    case ADD_MEMBER_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        memberId: action.payload
      };
    case ADD_MEMBER_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case ADD_MEMBER_RESET:
      return {
        ...state,
        dataLoading: false,
        memberId: null,
        error: ""
      };
    case EDIT_MEMBER_PENDING:
      return {
        ...state,
        editLoading: action.dataLoading
      };
    case EDIT_MEMBER_SUCCESS:
      return {
        ...state,
        editLoading: action.dataLoading,
        editSuccess: action.payload.success,
        memberDetails: action.payload.changesMade // added
      };
    case EDIT_MEMBER_FAILURE:
      return {
        ...state,
        editLoading: action.dataLoading,
        error: action.payload
      };
    case EDIT_MEMBER_RESET:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        memberDetails: {}, // added
        error: ""
      };
    default:
      return state;
  }
};

export default authorDbReducer;
