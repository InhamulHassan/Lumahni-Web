import {
  GET_AUTHOR_BY_GRID_PENDING,
  GET_AUTHOR_BY_GRID_SUCCESS,
  GET_AUTHOR_BY_GRID_FAILURE,
  GET_AUTHOR_BY_GRID_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/author_gr";

const getAuthorByGrIdPending = () => ({
  type: GET_AUTHOR_BY_GRID_PENDING,
  dataLoading: true
});

const getAuthorByGrIdSuccess = data => ({
  type: GET_AUTHOR_BY_GRID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getAuthorByGrIdFailure = error => ({
  type: GET_AUTHOR_BY_GRID_FAILURE,
  dataLoading: false,
  payload: error
});

const getAuthorByGrIdReset = () => ({
  type: GET_AUTHOR_BY_GRID_RESET
});

export const getAuthorByGrId = grid => {
  return async dispatch => {
    try {
      dispatch(getAuthorByGrIdPending()); // changed positon
      let response = await axios({
        url: URL,
        method: "post",
        data: {
          query: `
          query {
            author(id: ${grid}) {
              name
              about
              image_url
              large_image_url
              small_image_url
              books{
                id
                title
                image_url
              }
            }
          }
          `
        }
      });
      let result = response.data; //removed await
      dispatch(getAuthorByGrIdSuccess(result));
    } catch (error) {
      dispatch(getAuthorByGrIdFailure(error.message));
    }
  };
};

export const resetGetAuthorByGrId = () => {
  return dispatch => {
    dispatch(getAuthorByGrIdReset());
  };
};
