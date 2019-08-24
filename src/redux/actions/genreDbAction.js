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
} from "./types";

import axios from "../../helpers/axios";

const URL = "/genre";

const getGenresPending = () => ({
  type: GET_ALL_GENRES_PENDING,
  dataLoading: true
});

const getGenresSuccess = data => ({
  type: GET_ALL_GENRES_SUCCESS,
  dataLoading: false,
  payload: data
});

const getGenresFailure = error => ({
  type: GET_ALL_GENRES_FAILURE,
  dataLoading: false,
  payload: error
});

const getGenresReset = () => ({
  type: GET_ALL_GENRES_RESET
});

export const getGenres = () => {
  return async dispatch => {
    try {
      dispatch(getGenresPending()); // changed position
      let response = await axios.get(URL);
      let result = response.data; // removed await
      dispatch(getGenresSuccess(result.genres));
    } catch (error) {
      console.log(error);
      dispatch(getGenresFailure(error.message));
    }
  };
};

export const resetGetGenres = () => {
  return dispatch => {
    dispatch(getGenresReset());
  };
};

const getGenreByIdPending = () => ({
  type: GET_GENRE_BY_ID_PENDING,
  dataLoading: true
});

const getGenreByIdSuccess = data => ({
  type: GET_GENRE_BY_ID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getGenreByIdFailure = error => ({
  type: GET_GENRE_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

const getGenreByIdReset = () => ({
  type: GET_GENRE_BY_ID_RESET
});

export const getGenreById = id => {
  return async dispatch => {
    try {
      dispatch(getGenreByIdPending()); // changed position
      let response = await axios.get(`${URL}/${id}`);
      let result = response.data; // removed await
      dispatch(getGenreByIdSuccess(result.genre));
    } catch (error) {
      console.log(error);
      dispatch(getGenreByIdFailure(error.message));
    }
  };
};

export const resetGetGenreById = () => {
  return dispatch => {
    dispatch(getGenreByIdReset());
  };
};

const addGenrePending = () => ({
  type: ADD_GENRE_PENDING,
  dataLoading: true
});

const addGenreSuccess = id => ({
  type: ADD_GENRE_SUCCESS,
  dataLoading: false,
  payload: id
});

const addGenreFailure = error => ({
  type: ADD_GENRE_FAILURE,
  dataLoading: false,
  payload: error
});

const addGenreReset = () => ({
  type: ADD_GENRE_RESET
});

export const addGenre = data => {
  return async dispatch => {
    try {
      dispatch(addGenrePending()); // changed position
      let response = await axios.post(`${URL}`, {
        name: data.genreName,
        descr: data.description,
        img_m: data.imgLink,
        img_l: data.imgLargeLink,
        img_s: data.imgThumbnailLink
      });
      const result = response.data;
      if (result.success) {
        dispatch(addGenreSuccess(result.id));
      } else {
        dispatch(addGenreFailure("Failed"));
      }
    } catch (error) {
      dispatch(addGenreFailure(error.message));
    }
  };
};

export const resetAddGenre = () => {
  return dispatch => {
    dispatch(addGenreReset());
  };
};

const editGenrePending = () => ({
  type: EDIT_GENRE_PENDING,
  dataLoading: true
});

const editGenreSuccess = data => ({
  type: EDIT_GENRE_SUCCESS,
  dataLoading: false,
  payload: data
});

const editGenreFailure = error => ({
  type: EDIT_GENRE_FAILURE,
  dataLoading: false,
  payload: error
});

const editGenreReset = () => ({
  type: EDIT_GENRE_RESET
});

export const editGenre = data => {
  return async dispatch => {
    try {
      dispatch(editGenrePending()); // changed position
      let response = await axios.put(`${URL}/${data.id}`, {
        name: data.genreName,
        descr: data.description,
        img_m: data.imgLink,
        img_l: data.imgLargeLink,
        img_s: data.imgThumbnailLink
      });
      const result = response.data;
      if (result.success) {
        dispatch(editGenreSuccess(result));
      } else {
        dispatch(editGenreFailure("Failed"));
      }
    } catch (error) {
      dispatch(editGenreFailure(error.message));
    }
  };
};

export const resetEditGenre = () => {
  return dispatch => {
    dispatch(editGenreReset());
  };
};

const getGenreBooksPending = () => ({
  type: GET_GENRE_BOOKS_PENDING,
  dataLoading: true
});

const getGenreBooksSuccess = data => ({
  type: GET_GENRE_BOOKS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getGenreBooksFailure = error => ({
  type: GET_GENRE_BOOKS_FAILURE,
  dataLoading: false,
  payload: error
});

const getGenreBooksReset = () => ({
  type: GET_GENRE_BOOKS_RESET
});

export const getGenreBooks = id => {
  return async dispatch => {
    try {
      dispatch(getGenreBooksPending()); // changed position
      let response = await axios.get(`${URL}/books/${id}`);
      let data = response.data; // removed await
      dispatch(getGenreBooksSuccess(data.books));
    } catch (error) {
      console.log(error);
      dispatch(getGenreBooksFailure(error.message));
    }
  };
};

export const resetGetGenreBooks = () => {
  return dispatch => {
    dispatch(getGenreBooksReset());
  };
};
