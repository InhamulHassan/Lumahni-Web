import {
  GET_UNSPLASH_PHOTO_PENDING,
  GET_UNSPLASH_PHOTO_SUCCESS,
  GET_UNSPLASH_PHOTO_FAILURE,
  GET_UNSPLASH_PHOTO_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/unsplash";

const fetchUnsplashPhotoPending = () => ({
  type: GET_UNSPLASH_PHOTO_PENDING,
  dataLoading: true
});

const fetchUnsplashPhotoSuccess = data => ({
  type: GET_UNSPLASH_PHOTO_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchUnsplashPhotoFailure = error => ({
  type: GET_UNSPLASH_PHOTO_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchUnsplashPhotoReset = () => ({
  type: GET_UNSPLASH_PHOTO_RESET
});

export const fetchUnsplashPhoto = () => {
  return async dispatch => {
    try {
      dispatch(fetchUnsplashPhotoPending()); // changed position
      let response = await axios.get(`${URL}`);
      dispatch(fetchUnsplashPhotoSuccess(response.data));
    } catch (error) {
      dispatch(fetchUnsplashPhotoFailure(error.message));
    }
  };
};

export const resetFetchUnsplashPhoto = () => {
  return dispatch => {
    dispatch(fetchUnsplashPhotoReset());
  };
};
