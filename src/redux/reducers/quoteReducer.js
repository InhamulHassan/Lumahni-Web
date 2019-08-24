import {
  GET_QUOTE_PENDING,
  GET_QUOTE_SUCCESS,
  GET_QUOTE_FAILURE,
  GET_QUOTE_RESET,
  GET_QUOTE_BY_TAG_PENDING,
  GET_QUOTE_BY_TAG_SUCCESS,
  GET_QUOTE_BY_TAG_FAILURE,
  GET_QUOTE_BY_TAG_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  quoteDetails: {},
  error: ""
};

const genreDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTE_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_QUOTE_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        quoteDetails: action.payload
      };
    case GET_QUOTE_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_QUOTE_RESET:
      return {
        ...state,
        dataLoading: false,
        quoteDetails: {},
        error: ""
      };
    case GET_QUOTE_BY_TAG_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_QUOTE_BY_TAG_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        quoteDetails: action.payload
      };
    case GET_QUOTE_BY_TAG_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_QUOTE_BY_TAG_RESET:
      return {
        ...state,
        dataLoading: false,
        quoteDetails: {},
        error: ""
      };
    default:
      return state;
  }
};

export default genreDbReducer;
