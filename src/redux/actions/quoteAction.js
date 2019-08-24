import {
  GET_QUOTE_PENDING,
  GET_QUOTE_SUCCESS,
  GET_QUOTE_FAILURE,
  GET_QUOTE_RESET,
  GET_QUOTE_BY_TAG_PENDING,
  GET_QUOTE_BY_TAG_SUCCESS,
  GET_QUOTE_BY_TAG_FAILURE,
  GET_QUOTE_BY_TAG_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/quote";

const fetchQuotePending = () => ({
  type: GET_QUOTE_PENDING,
  dataLoading: true
});

const fetchQuoteSuccess = data => ({
  type: GET_QUOTE_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchQuoteFailure = error => ({
  type: GET_QUOTE_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchQuoteReset = () => ({
  type: GET_QUOTE_RESET
});

export const fetchQuote = () => {
  return async dispatch => {
    try {
      dispatch(fetchQuotePending()); // changed position
      let response = await axios.get(`${URL}`);
      let data = response.data; // removed await
      dispatch(fetchQuoteSuccess(data.quote));
    } catch (error) {
      dispatch(fetchQuoteFailure(error));
    }
  };
};

export const resetFetchQuote = () => {
  return dispatch => {
    dispatch(fetchQuoteReset());
  };
};

const fetchQuoteByTagPending = () => ({
  type: GET_QUOTE_BY_TAG_PENDING,
  dataLoading: true
});

const fetchQuoteByTagSuccess = data => ({
  type: GET_QUOTE_BY_TAG_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchQuoteByTagFailure = error => ({
  type: GET_QUOTE_BY_TAG_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchQuoteByTagReset = () => ({
  type: GET_QUOTE_BY_TAG_RESET
});

export const fetchQuoteByTag = tag => {
  return async dispatch => {
    try {
      dispatch(fetchQuoteByTagPending()); // changed position
      let response = await axios.get(`${URL}/${tag}`);
      let data = response.data; // removed await
      dispatch(fetchQuoteByTagSuccess(data.quote));
    } catch (error) {
      dispatch(fetchQuoteByTagFailure(error));
    }
  };
};

export const resetFetchQuoteByTag = () => {
  return dispatch => {
    dispatch(fetchQuoteByTagReset());
  };
};
