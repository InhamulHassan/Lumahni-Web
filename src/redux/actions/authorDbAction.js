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
} from "./types";

import axios from "axios";

const URL = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/author`;

const getAuthorsPending = () => ({
  type: GET_ALL_AUTHORS_PENDING,
  dataLoading: true
});

const getAuthorsSuccess = json => ({
  type: GET_ALL_AUTHORS_SUCCESS,
  dataLoading: false,
  payload: json
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
      let response = await axios.get(URL);
      dispatch(getAuthorsPending());
      let data = await response.data;
      dispatch(getAuthorsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getAuthorsFailure(error));
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

const getAuthorByIdSuccess = json => ({
  type: GET_AUTHOR_BY_ID_SUCCESS,
  dataLoading: false,
  payload: json
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
      let response = await axios.get(`${URL}/${id}`);
      dispatch(getAuthorByIdPending());
      let json = await response.data;
      dispatch(getAuthorByIdSuccess(json));
    } catch (error) {
      dispatch(getAuthorByIdFailure(error));
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
      let response = await axios.post(`${URL}`, {
        grid: data.grid,
        name: data.authorName,
        bio: data.biography,
        img_m: data.imgLink,
        img_l: data.imgLargeLink,
        img_s: data.imgThumbnailLink
      });
      dispatch(addAuthorPending());
      dispatch(addAuthorSuccess(response.data));
    } catch (error) {
      dispatch(addAuthorFailure(error));
    }
  };
};

export const resetAddAuthor = () => {
  return dispatch => {
    dispatch(addAuthorReset());
  };
};
