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
  ADD_AUTHOR_RESET,
  EDIT_AUTHOR_PENDING,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_FAILURE,
  EDIT_AUTHOR_RESET,
  GET_AUTHOR_BOOKS_PENDING,
  GET_AUTHOR_BOOKS_SUCCESS,
  GET_AUTHOR_BOOKS_FAILURE,
  GET_AUTHOR_BOOKS_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/author";

const getAuthorsPending = () => ({
  type: GET_ALL_AUTHORS_PENDING,
  dataLoading: true
});

const getAuthorsSuccess = data => ({
  type: GET_ALL_AUTHORS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getAuthorsFailure = error => ({
  type: GET_ALL_AUTHORS_FAILURE,
  dataLoading: false,
  payload: error
});

const getAuthorsReset = () => ({
  type: GET_ALL_AUTHORS_RESET
});

export const getAuthors = () => {
  return async dispatch => {
    try {
      dispatch(getAuthorsPending()); // changed positon
      let response = await axios.get(URL);
      let result = response.data; // removed await
      dispatch(getAuthorsSuccess(result.authors));
    } catch (error) {
      console.log(error);
      dispatch(getAuthorsFailure(error.message));
    }
  };
};

export const resetGetAuthors = () => {
  return dispatch => {
    dispatch(getAuthorsReset());
  };
};

const getAuthorByIdPending = () => ({
  type: GET_AUTHOR_BY_ID_PENDING,
  dataLoading: true
});

const getAuthorByIdSuccess = data => ({
  type: GET_AUTHOR_BY_ID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getAuthorByIdFailure = error => ({
  type: GET_AUTHOR_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

const getAuthorByIdReset = () => ({
  type: GET_AUTHOR_BY_ID_RESET
});

export const getAuthorById = id => {
  return async dispatch => {
    try {
      dispatch(getAuthorByIdPending()); // changed position
      let response = await axios.get(`${URL}/${id}`);
      let result = response.data; // removed await
      dispatch(getAuthorByIdSuccess(result.author));
    } catch (error) {
      dispatch(getAuthorByIdFailure(error.message));
    }
  };
};

export const resetGetAuthorById = () => {
  return dispatch => {
    dispatch(getAuthorByIdReset());
  };
};

const addAuthorPending = () => ({
  type: ADD_AUTHOR_PENDING,
  dataLoading: true
});

const addAuthorSuccess = id => ({
  type: ADD_AUTHOR_SUCCESS,
  dataLoading: false,
  payload: id
});

const addAuthorFailure = error => ({
  type: ADD_AUTHOR_FAILURE,
  dataLoading: false,
  payload: error
});

const addAuthorReset = () => ({
  type: ADD_AUTHOR_RESET
});

export const addAuthor = data => {
  return async dispatch => {
    try {
      dispatch(addAuthorPending()); // changed position
      let response = await axios.post(`${URL}`, {
        grid: data.grid,
        name: data.authorName,
        bio: data.biography,
        img_m: data.imgLink,
        img_l: data.imgLargeLink,
        img_s: data.imgThumbnailLink,
        genres: data.genreTags
      });
      const result = response.data;
      if (result.success) {
        dispatch(addAuthorSuccess(result.id));
      } else {
        dispatch(addAuthorFailure("Failed"));
      }
    } catch (error) {
      dispatch(addAuthorFailure(error.message));
    }
  };
};

export const resetAddAuthor = () => {
  return dispatch => {
    dispatch(addAuthorReset());
  };
};

const editAuthorPending = () => ({
  type: EDIT_AUTHOR_PENDING,
  dataLoading: true
});

const editAuthorSuccess = data => ({
  type: EDIT_AUTHOR_SUCCESS,
  dataLoading: false,
  payload: data
});

const editAuthorFailure = error => ({
  type: EDIT_AUTHOR_FAILURE,
  dataLoading: false,
  payload: error
});

const editAuthorReset = () => ({
  type: EDIT_AUTHOR_RESET
});

export const editAuthor = data => {
  return async dispatch => {
    try {
      // dispatch pending causes for dialog closure - FIXED!
      dispatch(editAuthorPending()); // changed position
      let response = await axios.put(`${URL}/${data.id}`, {
        grid: data.grid,
        name: data.authorName,
        bio: data.biography,
        img_m: data.imgLink,
        img_l: data.imgLargeLink,
        img_s: data.imgThumbnailLink,
        genres: data.genreTags
      });
      const result = response.data;
      if (result.success) {
        dispatch(editAuthorSuccess(result));
      } else {
        dispatch(editAuthorFailure("Author Edit Failed"));
      }
    } catch (error) {
      dispatch(editAuthorFailure(error.message));
    }
  };
};

export const resetEditAuthor = () => {
  return dispatch => {
    dispatch(editAuthorReset());
  };
};

const getAuthorBooksPending = () => ({
  type: GET_AUTHOR_BOOKS_PENDING,
  dataLoading: true
});

const getAuthorBooksSuccess = data => ({
  type: GET_AUTHOR_BOOKS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getAuthorBooksFailure = error => ({
  type: GET_AUTHOR_BOOKS_FAILURE,
  dataLoading: false,
  payload: error
});

const getAuthorBooksReset = () => ({
  type: GET_AUTHOR_BOOKS_RESET
});

export const getAuthorBooks = id => {
  return async dispatch => {
    try {
      dispatch(getAuthorBooksPending()); // changed position
      let response = await axios.get(`${URL}/books/${id}`);
      let data = response.data; // removed await
      dispatch(getAuthorBooksSuccess(data.books));
    } catch (error) {
      console.log(error);
      dispatch(getAuthorBooksFailure(error.message));
    }
  };
};

export const resetGetAuthorBooks = () => {
  return dispatch => {
    dispatch(getAuthorBooksReset());
  };
};
