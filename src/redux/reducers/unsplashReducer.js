import {
  GET_UNSPLASH_PHOTO_PENDING,
  GET_UNSPLASH_PHOTO_SUCCESS,
  GET_UNSPLASH_PHOTO_FAILURE,
  GET_UNSPLASH_PHOTO_RESET
} from "../actions/types";

const initialState = {
  dataLoading: true,
  photoDetails: {},
  error: ""
};

const genreDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNSPLASH_PHOTO_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_UNSPLASH_PHOTO_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        photoDetails: action.payload
      };
    case GET_UNSPLASH_PHOTO_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_UNSPLASH_PHOTO_RESET:
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
