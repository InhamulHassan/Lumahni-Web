import {
  GET_ALL_GENRES_PENDING,
  GET_ALL_GENRES_SUCCESS,
  GET_ALL_GENRES_FAILURE,
  GET_ALL_GENRES_RESET,
  GET_GENRE_BY_ID_PENDING,
  GET_GENRE_BY_ID_SUCCESS,
  GET_GENRE_BY_ID_FAILURE,
  GET_GENRE_BY_ID_RESET,
  ADD_GENRE_PENDING,
  ADD_GENRE_SUCCESS,
  ADD_GENRE_FAILURE,
  ADD_GENRE_RESET,
  EDIT_GENRE_PENDING,
  EDIT_GENRE_SUCCESS,
  EDIT_GENRE_FAILURE,
  EDIT_GENRE_RESET,
  GET_GENRE_BOOKS_PENDING,
  GET_GENRE_BOOKS_SUCCESS,
  GET_GENRE_BOOKS_FAILURE,
  GET_GENRE_BOOKS_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  data: [],
  genreDetails: {},
  genreBooks: {},
  genreId: null,
  editSuccess: false,
  editLoading: false,
  error: ""
};

const genreDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GENRES_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_ALL_GENRES_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        data: action.payload
      };
    case GET_ALL_GENRES_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_ALL_GENRES_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        data: [],
        error: ""
      };
    case GET_GENRE_BY_ID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_GENRE_BY_ID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        genreDetails: action.payload
      };
    case GET_GENRE_BY_ID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_GENRE_BY_ID_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        genreDetails: {},
        error: ""
      };
    case ADD_GENRE_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case ADD_GENRE_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        genreId: action.payload
      };
    case ADD_GENRE_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case ADD_GENRE_RESET:
      return {
        ...state,
        dataLoading: false,
        genreId: null,
        error: ""
      };
    case EDIT_GENRE_PENDING:
      return {
        ...state,
        editLoading: action.dataLoading
      };
    case EDIT_GENRE_SUCCESS:
      return {
        ...state,
        editLoading: action.dataLoading,
        editSuccess: action.payload.success,
        genreDetails: action.payload.changesMade // added
      };
    case EDIT_GENRE_FAILURE:
      return {
        ...state,
        editLoading: action.dataLoading,
        error: action.payload
      };
    case EDIT_GENRE_RESET:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        genreDetails: {},
        error: ""
      };
    case GET_GENRE_BOOKS_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_GENRE_BOOKS_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        genreBooks: action.payload
      };
    case GET_GENRE_BOOKS_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_GENRE_BOOKS_RESET:
      return {
        ...state,
        dataLoading: true, //changed
        genreBooks: {},
        error: ""
      };
    default:
      return state;
  }
};

export default genreDbReducer;
