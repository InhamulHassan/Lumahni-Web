import {
  GET_AUTHOR_BY_GRID_PENDING,
  GET_AUTHOR_BY_GRID_SUCCESS,
  GET_AUTHOR_BY_GRID_FAILURE,
  GET_AUTHOR_BY_GRID_RESET
} from "../actions/types";

const initialState = {
  dataLoading: false,
  authorDetails: {},
  error: ""
};

const authorGrReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTHOR_BY_GRID_PENDING:
      return {
        ...state,
        dataLoading: action.dataLoading
      };
    case GET_AUTHOR_BY_GRID_SUCCESS:
      return {
        ...state,
        dataLoading: action.dataLoading,
        authorDetails: action.payload
      };
    case GET_AUTHOR_BY_GRID_FAILURE:
      return {
        ...state,
        dataLoading: action.dataLoading,
        error: action.payload
      };
    case GET_AUTHOR_BY_GRID_RESET:
      return {
        ...state,
        dataLoading: false,
        authorDetails: {},
        error: ""
      };
    default:
      return state;
  }
};

export default authorGrReducer;
