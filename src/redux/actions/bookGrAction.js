import {
  GET_BOOK_BY_GRID_PENDING,
  GET_BOOK_BY_GRID_SUCCESS,
  GET_BOOK_BY_GRID_FAILURE,
  GET_BOOK_BY_GRID_RESET
} from "./types";

import axios from "axios";

const URL = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/book_gr`;

export const getBookByGrIdPending = () => ({
  type: GET_BOOK_BY_GRID_PENDING,
  dataLoading: true
});

export const getBookByGrIdSuccess = json => ({
  type: GET_BOOK_BY_GRID_SUCCESS,
  dataLoading: false,
  payload: json
});

export const getBookByGrIdFailure = error => ({
  type: GET_BOOK_BY_GRID_FAILURE,
  dataLoading: false,
  payload: error
});

export const getBookByGrIdReset = () => ({
  type: GET_BOOK_BY_GRID_RESET
});

export const getBookByGrId = grid => {
  return async dispatch => {
    try {
      console.log("getbookbyGRID: " + grid);
      let response = await axios({
        url: URL,
        method: "post",
        data: {
          query: `
          query {
            book(id: ${grid}) {
              title
              description
              isbn
              isbn13
              image_url
              small_image_url
              authors {
                id
                name
                image_url
                small_image_url
              }
            }
          }
          `
        }
      });
      dispatch(getBookByGrIdPending());
      let json = await response.data;
      dispatch(getBookByGrIdSuccess(json));
    } catch (error) {
      console.log("error: " + error);
      dispatch(getBookByGrIdFailure(error));
    }
  };
};

export const resetGetBookByGrId = () => {
  return dispatch => {
    dispatch(getBookByGrIdReset());
  };
};
