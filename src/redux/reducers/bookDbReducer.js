import {
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_RESET,
  GET_BOOKS_BY_PAGE_PENDING,
  GET_BOOKS_BY_PAGE_SUCCESS,
  GET_BOOKS_BY_PAGE_FAILURE,
  GET_BOOKS_BY_PAGE_RESET,
  GET_BOOK_BY_ID_PENDING,
  GET_BOOK_BY_ID_SUCCESS,
  GET_BOOK_BY_ID_FAILURE,
  GET_BOOK_BY_ID_RESET,
  ADD_BOOK_PENDING,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  ADD_BOOK_RESET,
  EDIT_BOOK_PENDING,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  EDIT_BOOK_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  data: [],
  totalResults: 0,
  bookDetails: {},
  bookId: null,
  editSuccess: false,
  editLoading: false,
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
    case GET_ALL_BOOKS_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        data: [],
        error: ""
      };
    case GET_BOOKS_BY_PAGE_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_BOOKS_BY_PAGE_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        data: action.payload.books,
        totalResults: action.payload.total
      };
    case GET_BOOKS_BY_PAGE_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_BOOKS_BY_PAGE_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        data: [],
        totalResults: 0,
        error: ""
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
        dataLoading: true, //changed
        bookDetails: {},
        error: ""
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
    case EDIT_BOOK_PENDING:
      return {
        ...state,
        editLoading: action.dataLoading
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editLoading: action.dataLoading,
        editSuccess: action.payload.success,
        bookDetails: action.payload.changesMade // added
      };
    case EDIT_BOOK_FAILURE:
      return {
        ...state,
        editLoading: action.dataLoading,
        error: action.payload
      };
    case EDIT_BOOK_RESET:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        bookDetails: {}, // added
        error: ""
      };
    default:
      return state;
  }
};

export default bookDbReducer;
