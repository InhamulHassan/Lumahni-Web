import {
  FETCH_QUOTE_PENDING,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAILURE,
  FETCH_QUOTE_RESET,
  FETCH_QUOTE_BY_TAG_PENDING,
  FETCH_QUOTE_BY_TAG_SUCCESS,
  FETCH_QUOTE_BY_TAG_FAILURE,
  FETCH_QUOTE_BY_TAG_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  quoteDetails: {},
  error: ""
};

const genreDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUOTE_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case FETCH_QUOTE_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        quoteDetails: action.payload
      };
    case FETCH_QUOTE_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case FETCH_QUOTE_RESET:
      return {
        ...state,
        dataLoading: false,
        quoteDetails: {},
        error: ""
      };
    case FETCH_QUOTE_BY_TAG_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case FETCH_QUOTE_BY_TAG_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        quoteDetails: action.payload
      };
    case FETCH_QUOTE_BY_TAG_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case FETCH_QUOTE_BY_TAG_RESET:
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
