import {
  FETCH_UNSPLASH_PHOTO_PENDING,
  FETCH_UNSPLASH_PHOTO_SUCCESS,
  FETCH_UNSPLASH_PHOTO_FAILURE,
  FETCH_UNSPLASH_PHOTO_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  photoDetails: {},
  error: ""
};

const genreDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNSPLASH_PHOTO_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case FETCH_UNSPLASH_PHOTO_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        photoDetails: action.payload
      };
    case FETCH_UNSPLASH_PHOTO_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case FETCH_UNSPLASH_PHOTO_RESET:
      return {
        ...state,
        dataLoading: false,
        photoDetails: {},
        error: ""
      };

    default:
      return state;
  }
};

export default genreDbReducer;
