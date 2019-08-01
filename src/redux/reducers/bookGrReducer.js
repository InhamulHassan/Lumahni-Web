import {
  GET_BOOK_BY_GRID_PENDING,
  GET_BOOK_BY_GRID_SUCCESS,
  GET_BOOK_BY_GRID_FAILURE,
  GET_BOOK_BY_GRID_RESET
} from "../actions/types";

const initialState = {
  dataLoading: false,
  bookDetails: {},
  error: ""
};

const bookGrReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_BY_GRID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_BOOK_BY_GRID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        bookDetails: action.payload
      };
    case GET_BOOK_BY_GRID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_BOOK_BY_GRID_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        bookDetails: {},
        error: ""
      };
    default:
      return state;
  }
};

export default bookGrReducer;
