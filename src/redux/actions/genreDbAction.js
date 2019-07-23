import {
  GET_ALL_GENRES_PENDING,
  GET_ALL_GENRES_SUCCESS,
  GET_ALL_GENRES_FAILURE,
  GET_ALL_GENRES_RESET,
  GET_GENRE_BY_ID_PENDING,
  GET_GENRE_BY_ID_SUCCESS,
  GET_GENRE_BY_ID_FAILURE,
  GET_GENRE_BY_ID_RESET
} from "./types";

import axios from "axios";

const URL = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/genre`;
export const getGenresPending = () => ({
  type: GET_ALL_GENRES_PENDING,
  dataLoading: true
});

export const getGenresSuccess = json => ({
  type: GET_ALL_GENRES_SUCCESS,
  dataLoading: false,
  payload: json
});

export const getGenresFailure = error => ({
  type: GET_ALL_GENRES_FAILURE,
  dataLoading: false,
  payload: error
});

export const getGenresReset = () => ({
  type: GET_ALL_GENRES_RESET
});

export const getGenres = () => {
  return async dispatch => {
    try {
      let response = await axios.get(URL);
      dispatch(getGenresPending());
      let data = await response.data;
      dispatch(getGenresSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getGenresFailure(error));
    }
  };
};

export const resetGetGenres = () => {
  return dispatch => {
    dispatch(getGenresReset());
  };
};

export const getGenreByIdPending = () => ({
  type: GET_GENRE_BY_ID_PENDING,
  dataLoading: true
});

export const getGenreByIdSuccess = json => ({
  type: GET_GENRE_BY_ID_SUCCESS,
  dataLoading: false,
  payload: json
});

export const getGenreByIdFailure = error => ({
  type: GET_GENRE_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

export const getGenreByIdReset = () => ({
  type: GET_GENRE_BY_ID_RESET
});

export const getGenreById = id => {
  return async dispatch => {
    try {
      let response = await axios.get(`${URL}/${id}`);
      dispatch(getGenreByIdPending());
      let data = await response.json();
      dispatch(getGenreByIdSuccess()(data));
    } catch (error) {
      console.log(error);
      dispatch(getGenreByIdFailure(error));
    }
  };
};

export const resetGetGenreById = () => {
  return dispatch => {
    dispatch(getGenreByIdReset());
  };
};
