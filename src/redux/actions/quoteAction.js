import {
  FETCH_QUOTE_PENDING,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAILURE,
  FETCH_QUOTE_RESET,
  FETCH_QUOTE_BY_TAG_PENDING,
  FETCH_QUOTE_BY_TAG_SUCCESS,
  FETCH_QUOTE_BY_TAG_FAILURE,
  FETCH_QUOTE_BY_TAG_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/quote";

const fetchQuotePending = () => ({
  type: FETCH_QUOTE_PENDING,
  dataLoading: true
});

const fetchQuoteSuccess = data => ({
  type: FETCH_QUOTE_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchQuoteFailure = error => ({
  type: FETCH_QUOTE_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchQuoteReset = () => ({
  type: FETCH_QUOTE_RESET
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
  type: FETCH_QUOTE_BY_TAG_PENDING,
  dataLoading: true
});

const fetchQuoteByTagSuccess = data => ({
  type: FETCH_QUOTE_BY_TAG_SUCCESS,
  dataLoading: false,
  payload: data
});

const fetchQuoteByTagFailure = error => ({
  type: FETCH_QUOTE_BY_TAG_FAILURE,
  dataLoading: false,
  payload: error
});

const fetchQuoteByTagReset = () => ({
  type: FETCH_QUOTE_BY_TAG_RESET
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
