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

const getAuthorByGrIdSuccess = json => ({
  type: GET_AUTHOR_BY_GRID_SUCCESS,
  dataLoading: false,
  payload: json
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
      console.log("getauthorbyGRID: " + grid);
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
      dispatch(getAuthorByGrIdPending());
      let json = await response.data;
      dispatch(getAuthorByGrIdSuccess(json));
    } catch (error) {
      console.log("error: " + error);
      dispatch(getAuthorByGrIdFailure(error));
    }
  };
};

export const resetGetAuthorByGrId = () => {
  return dispatch => {
    dispatch(getAuthorByGrIdReset());
  };
};
