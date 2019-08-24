import {
  GET_ALL_MEMBERS_PENDING,
  GET_ALL_MEMBERS_SUCCESS,
  GET_ALL_MEMBERS_FAILURE,
  GET_ALL_MEMBERS_RESET,
  GET_MEMBER_BY_ID_PENDING,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_FAILURE,
  GET_MEMBER_BY_ID_RESET,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_RESET,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAILURE,
  EDIT_MEMBER_RESET
} from "./types";

import axios from "../../helpers/axios";

const URL = "/member";

const getMembersPending = () => ({
  type: GET_ALL_MEMBERS_PENDING,
  dataLoading: true
});

const getMembersSuccess = data => ({
  type: GET_ALL_MEMBERS_SUCCESS,
  dataLoading: false,
  payload: data
});

const getMembersFailure = error => ({
  type: GET_ALL_MEMBERS_FAILURE,
  dataLoading: false,
  payload: error
});

const getMembersReset = () => ({
  type: GET_ALL_MEMBERS_RESET
});

export const getMembers = () => {
  return async dispatch => {
    try {
      dispatch(getMembersPending()); // changed positon
      let response = await axios.get(URL);
      let result = response.data; // removed await
      dispatch(getMembersSuccess(result.members));
    } catch (error) {
      console.log(error);
      dispatch(getMembersFailure(error.message));
    }
  };
};

export const resetGetMembers = () => {
  return dispatch => {
    dispatch(getMembersReset());
  };
};

const getMemberByIdPending = () => ({
  type: GET_MEMBER_BY_ID_PENDING,
  dataLoading: true
});

const getMemberByIdSuccess = data => ({
  type: GET_MEMBER_BY_ID_SUCCESS,
  dataLoading: false,
  payload: data
});

const getMemberByIdFailure = error => ({
  type: GET_MEMBER_BY_ID_FAILURE,
  dataLoading: false,
  payload: error
});

const getMemberByIdReset = () => ({
  type: GET_MEMBER_BY_ID_RESET
});

export const getMemberById = id => {
  return async dispatch => {
    try {
      dispatch(getMemberByIdPending()); // changed position
      let response = await axios.get(`${URL}/${id}`);
      let result = response.data; // removed await
      dispatch(getMemberByIdSuccess(result.member));
    } catch (error) {
      dispatch(getMemberByIdFailure(error.message));
    }
  };
};

export const resetGetMemberById = () => {
  return dispatch => {
    dispatch(getMemberByIdReset());
  };
};

const addMemberPending = () => ({
  type: ADD_MEMBER_PENDING,
  dataLoading: true
});

const addMemberSuccess = id => ({
  type: ADD_MEMBER_SUCCESS,
  dataLoading: false,
  payload: id
});

const addMemberFailure = error => ({
  type: ADD_MEMBER_FAILURE,
  dataLoading: false,
  payload: error
});

const addMemberReset = () => ({
  type: ADD_MEMBER_RESET
});

export const addMember = data => {
  return async dispatch => {
    try {
      dispatch(addMemberPending()); // changed position
      let response = await axios.post(`${URL}`, {
        first_name: data.firstName,
        last_name: data.lastName,
        join_date: data.joinDate,
        expiration_date: data.expirationDate,
        email_address: data.emailAddress,
        city_id: data.cityId,
        mobile_number: data.mobileNumber
      });
      const result = response.data;
      if (result.success) {
        dispatch(addMemberSuccess(result.id));
      } else {
        dispatch(addMemberFailure("Failed"));
      }
    } catch (error) {
      dispatch(addMemberFailure(error.message));
    }
  };
};

export const resetAddMember = () => {
  return dispatch => {
    dispatch(addMemberReset());
  };
};

const editMemberPending = () => ({
  type: EDIT_MEMBER_PENDING,
  dataLoading: true
});

const editMemberSuccess = data => ({
  type: EDIT_MEMBER_SUCCESS,
  dataLoading: false,
  payload: data
});

const editMemberFailure = error => ({
  type: EDIT_MEMBER_FAILURE,
  dataLoading: false,
  payload: error
});

const editMemberReset = () => ({
  type: EDIT_MEMBER_RESET
});

export const editMember = data => {
  return async dispatch => {
    try {
      // dispatch pending causes for dialog closure - FIXED!
      dispatch(editMemberPending()); // changed position
      let response = await axios.put(`${URL}/${data.id}`, {
        first_name: data.firstName,
        last_name: data.lastName,
        join_date: data.joinDate,
        expiration_date: data.expirationDate,
        email_address: data.emailAddress,
        city_id: data.cityId,
        mobile_number: data.mobileNumber
      });
      const result = response.data;
      if (result.success) {
        dispatch(editMemberSuccess(result));
      } else {
        dispatch(editMemberFailure("Member Edit Failed"));
      }
    } catch (error) {
      dispatch(editMemberFailure(error.message));
    }
  };
};

export const resetEditMember = () => {
  return dispatch => {
    dispatch(editMemberReset());
  };
};
