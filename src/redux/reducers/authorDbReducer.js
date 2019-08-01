import {
  GET_ALL_AUTHORS_PENDING,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILURE,
  GET_ALL_AUTHORS_RESET,
  GET_AUTHOR_BY_ID_PENDING,
  GET_AUTHOR_BY_ID_SUCCESS,
  GET_AUTHOR_BY_ID_FAILURE,
  GET_AUTHOR_BY_ID_RESET,
  ADD_AUTHOR_PENDING,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  ADD_AUTHOR_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  data: [],
  authorDetails: {},
  authorId: null,
  error: ""
};

const authorDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        data: action.payload
      };
    case GET_ALL_AUTHORS_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_ALL_AUTHORS_RESET:
      return {
        ...state,
        dataLoading: false,
        data: [],
        error: ""
      };
    case GET_AUTHOR_BY_ID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_AUTHOR_BY_ID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authorDetails: action.payload
      };
    case GET_AUTHOR_BY_ID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_AUTHOR_BY_ID_RESET:
      return {
        ...state,
        dataLoading: false,
        authorDetails: {},
        error: ""
      };
    case ADD_AUTHOR_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case ADD_AUTHOR_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authorId: action.payload
      };
    case ADD_AUTHOR_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case ADD_AUTHOR_RESET:
      return {
        ...state,
        dataLoading: false,
        authorId: null,
        error: ""
      };
    default:
      return state;
  }
};

export default authorDbReducer;
