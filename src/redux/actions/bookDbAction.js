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
} from "./types";

import axios from "../../helpers/axios";

const URL = "/book";

const getBooksPending = () => ({
  type: GET_ALL_BOOKS_PENDING,
  dataLoading: true
});

const getBooksSuccess = data => ({
  type: GET_ALL_BOOKS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getBooksFailure = error => ({
  type: GET_ALL_BOOKS_FAILURE,
  dataLoading: false,
  payload: error
});

const getBooksReset = () => ({
  type: GET_ALL_BOOKS_RESET
});

export const getBooks = () => {
  return async dispatch => {
    try {
      dispatch(getBooksPending()); //changed position
      let response = await axios.get(URL);
      let result = response.data;
      dispatch(getBooksSuccess(result.books));
    } catch (error) {
      console.log(error);
      dispatch(getBooksFailure(error.message));
    }
  };
};

export const resetGetBooks = () => {
  return dispatch => {
    dispatch(getBooksReset());
  };
};

const getBooksByPagePending = () => ({
  type: GET_BOOKS_BY_PAGE_PENDING,
  dataLoading: true
});

const getBooksByPageSuccess = data => ({
  type: GET_BOOKS_BY_PAGE_SUCCESS,
  dataLoading: false,
  payload: data
});

const getBooksByPageFailure = error => ({
  type: GET_BOOKS_BY_PAGE_FAILURE,
  dataLoading: false,
  payload: error
});

const getBooksByPageReset = () => ({
  type: GET_BOOKS_BY_PAGE_RESET
});

export const getBooksByPage = (page, limit) => {
  return async dispatch => {
    try {
      dispatch(getBooksByPagePending()); //changed position
      let response = await axios.get(`${URL}/page/${page}?limit=${limit}`);
      let result = response.data;
      dispatch(getBooksByPageSuccess(result));
    } catch (error) {
      console.log(error);
      dispatch(getBooksByPageFailure(error.message));
    }
  };
};

export const resetGetBooksByPage = () => {
  return dispatch => {
    dispatch(getBooksByPageReset());
  };
};


const getBookByIdPending = () => ({
  type: GET_BOOK_BY_ID_PENDING,
  dataLoading: true
});

const getBookByIdSuccess = data => ({
  type: GET_BOOK_BY_ID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getBookByIdFailure = error => ({
  type: GET_BOOK_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

const getBookByIdReset = () => ({
  type: GET_BOOK_BY_ID_RESET
});

export const getBookById = id => {
  return async dispatch => {
    try {
      dispatch(getBookByIdPending()); //changed position
      let response = await axios.get(`${URL}/${id}`);
      let result = response.data; //removed await
      dispatch(getBookByIdSuccess(result.book));
    } catch (error) {
      dispatch(getBookByIdFailure(error.message));
    }
  };
};

export const resetGetBookById = () => {
  return dispatch => {
    dispatch(getBookByIdReset());
  };
};

const addBookPending = () => ({
  type: ADD_BOOK_PENDING,
  dataLoading: true
});

const addBookSuccess = id => ({
  type: ADD_BOOK_SUCCESS,
  dataLoading: false,
  payload: id
});

const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  dataLoading: false,
  payload: error
});

const addBookReset = () => ({
  type: ADD_BOOK_RESET
});

export const addBook = data => {
  return async dispatch => {
    try {
      dispatch(addBookPending()); //changed position
      let response = await axios.post(`${URL}`, {
        grid: data.grid,
        title: data.bookTitle,
        descr: data.description,
        isbn: data.isbn,
        isbn13: data.isbn13,
        img: data.imgLink,
        img_thumbnail: data.imgThumbnailLink,
        genres: data.genreTags,
        authors: data.authorTags
      });
      const result = response.data;
      if (result.success) {
        dispatch(addBookSuccess(result.id));
      } else {
        dispatch(addBookFailure("Failed"));
      }
    } catch (error) {
      dispatch(addBookFailure(error.message));
    }
  };
};

export const resetAddBook = () => {
  return dispatch => {
    dispatch(addBookReset());
  };
};

const editBookPending = () => ({
  type: EDIT_BOOK_PENDING,
  dataLoading: true
});

const editBookSuccess = data => ({
  type: EDIT_BOOK_SUCCESS,
  dataLoading: false,
  payload: data
});

const editBookFailure = error => ({
  type: EDIT_BOOK_FAILURE,
  dataLoading: false,
  payload: error
});

const editBookReset = () => ({
  type: EDIT_BOOK_RESET
});

export const editBook = data => {
  return async dispatch => {
    try {
      dispatch(editBookPending()); //changed position
      let response = await axios.put(`${URL}/${data.id}`, {
        grid: data.grid,
        title: data.bookTitle,
        descr: data.description,
        isbn: data.isbn,
        isbn13: data.isbn13,
        img: data.imgLink,
        img_thumbnail: data.imgThumbnailLink,
        genres: data.genreTags,
        authors: data.authorTags
      });
      const result = response.data;
      if (result.success) {
        dispatch(editBookSuccess(result));
      } else {
        dispatch(editBookFailure("Failed"));
      }
    } catch (error) {
      dispatch(editBookFailure(error.message));
    }
  };
};

export const resetEditBook = () => {
  return dispatch => {
    dispatch(editBookReset());
  };
};
