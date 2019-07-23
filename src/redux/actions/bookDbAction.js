import {
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_RESET,
  GET_BOOK_BY_ID_PENDING,
  GET_BOOK_BY_ID_SUCCESS,
  GET_BOOK_BY_ID_FAILURE,
  GET_BOOK_BY_ID_RESET,
  ADD_BOOK_PENDING,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  ADD_BOOK_RESET
} from "./types";

import axios from "axios";

const URL = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/book`;

export const getBooksPending = () => ({
  type: GET_ALL_BOOKS_PENDING,
  dataLoading: true
});

export const getBooksSuccess = json => ({
  type: GET_ALL_BOOKS_SUCCESS,
  dataLoading: false,
  payload: json
});

export const getBooksFailure = error => ({
  type: GET_ALL_BOOKS_FAILURE,
  dataLoading: false,
  payload: error
});

export const getBooksReset = () => ({
  type: GET_ALL_BOOKS_RESET
});

export const getBooks = () => {
  return async dispatch => {
    try {
      let response = await axios.get(URL);
      dispatch(getBooksPending());
      let data = await response.data;
      dispatch(getBooksSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getBooksFailure(error));
    }
  };
};

export const resetGetBooks = () => {
  return dispatch => {
    dispatch(getBooksReset());
  };
};

export const getBookByIdPending = () => ({
  type: GET_BOOK_BY_ID_PENDING,
  dataLoading: true
});

export const getBookByIdSuccess = json => ({
  type: GET_BOOK_BY_ID_SUCCESS,
  dataLoading: false,
  payload: json
});

export const getBookByIdFailure = error => ({
  type: GET_BOOK_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

export const getBookByIdReset = () => ({
  type: GET_BOOK_BY_ID_RESET
});

export const getBookById = id => {
  return async dispatch => {
    try {
      let response = await axios.get(`${URL}/${id}`);
      dispatch(getBookByIdPending());
      let json = await response.data;
      dispatch(getBookByIdSuccess(json));
    } catch (error) {
      dispatch(getBookByIdFailure(error));
    }
  };
};

export const resetGetBookById = () => {
  return dispatch => {
    dispatch(getBookByIdReset());
  };
};

export const addBookPending = () => ({
  type: ADD_BOOK_PENDING,
  dataLoading: true
});

export const addBookSuccess = id => ({
  type: ADD_BOOK_SUCCESS,
  dataLoading: false,
  payload: id
});

export const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  dataLoading: false,
  payload: error
});

export const addBookReset = () => ({
  type: ADD_BOOK_RESET
});

export const addBook = data => {
  return async dispatch => {
    try {
      let response = await axios.post(`${URL}`, {
        grid: data.grid,
        title: data.bookTitle,
        descr: data.description,
        isbn: data.isbn,
        isbn13: data.isbn13,
        img: data.imgLink,
        img_thumbnail: data.imgThumbnailLink
      });
      dispatch(addBookPending());
      dispatch(addBookSuccess(response.data));
    } catch (error) {
      dispatch(addBookFailure(error));
    }
  };
};

export const resetaddBook = () => {
  return dispatch => {
    dispatch(addBookReset());
  };
};
