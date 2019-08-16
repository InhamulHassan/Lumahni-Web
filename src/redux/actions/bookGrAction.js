import {
  GET_BOOK_BY_GRID_PENDING,
  GET_BOOK_BY_GRID_SUCCESS,
  GET_BOOK_BY_GRID_FAILURE,
  GET_BOOK_BY_GRID_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/book_gr";

const getBookByGrIdPending = () => ({
  type: GET_BOOK_BY_GRID_PENDING,
  dataLoading: true
});

const getBookByGrIdSuccess = data => ({
  type: GET_BOOK_BY_GRID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getBookByGrIdFailure = error => ({
  type: GET_BOOK_BY_GRID_FAILURE,
  dataLoading: false,
  payload: error
});

const getBookByGrIdReset = () => ({
  type: GET_BOOK_BY_GRID_RESET
});

export const getBookByGrId = grid => {
  return async dispatch => {
    try {
      dispatch(getBookByGrIdPending()); // changed position
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
              average_rating
              num_pages
              publisher
              publication_year
              language_code
              image_url
              small_image_url
              authors {
                id
                name
                image_url
                small_image_url
              }
              similar_books{
                id
                title
                image_url
                authors{
                  name
                }
              }
            }
          }
          `
        }
      });
      let result = response.data; // removed await
      dispatch(getBookByGrIdSuccess(result));
    } catch (error) {
      dispatch(getBookByGrIdFailure(error.message));
    }
  };
};

export const resetGetBookByGrId = () => {
  return dispatch => {
    dispatch(getBookByGrIdReset());
  };
};
