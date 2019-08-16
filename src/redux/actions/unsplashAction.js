import {
  FETCH_UNSPLASH_PHOTO_PENDING,
  FETCH_UNSPLASH_PHOTO_SUCCESS,
  FETCH_UNSPLASH_PHOTO_FAILURE,
  FETCH_UNSPLASH_PHOTO_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/unsplash";

const fetchUnsplashPhotoPending = () => ({
  type: FETCH_UNSPLASH_PHOTO_PENDING,
  dataLoading: true
});

const fetchUnsplashPhotoSuccess = data => ({
  type: FETCH_UNSPLASH_PHOTO_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchUnsplashPhotoFailure = error => ({
  type: FETCH_UNSPLASH_PHOTO_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchUnsplashPhotoReset = () => ({
  type: FETCH_UNSPLASH_PHOTO_RESET
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
