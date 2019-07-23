import {
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_BY_ID_PENDING,
  GET_BOOK_BY_ID_SUCCESS,
  GET_BOOK_BY_ID_FAILURE,
  GET_BOOK_BY_ID_RESET,
  ADD_BOOK_PENDING,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  ADD_BOOK_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  data: [],
  bookDetails: {},
  bookId: null,
  error: ""
};

const bookDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        data: action.payload
      };
    case GET_ALL_BOOKS_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_BOOK_BY_ID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        bookDetails: action.payload
      };
    case GET_BOOK_BY_ID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_BOOK_BY_ID_RESET:
      return {
        ...state,
        dataLoading: false,
        bookDetails: null,
        error: null
      };
    case ADD_BOOK_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        bookId: action.payload
      };
    case ADD_BOOK_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case ADD_BOOK_RESET:
      return {
        ...state,
        dataLoading: false,
        bookId: null,
        error: ""
      };
    default:
      return state;
  }
};

export default bookDbReducer;
