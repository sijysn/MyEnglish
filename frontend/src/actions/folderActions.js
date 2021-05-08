import axios from "axios";

import {
  FOLDER_LIST_REQUEST,
  FOLDER_LIST_SUCCESS,
  FOLDER_LIST_FAIL,
  FOLDER_SET_REQUEST,
  FOLDER_SET_SUCCESS,
  FOLDER_SET_FAIL,
  FOLDER_DELETE_REQUEST,
  FOLDER_DELETE_SUCCESS,
  FOLDER_DELETE_FAIL,
} from "../consts/folderConsts";

export const listFolders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/folders/`, config);

    dispatch({ type: FOLDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setFolder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLDER_SET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/folders/${id}/`, config);

    dispatch({ type: FOLDER_SET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLDER_SET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteFolder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/folders/delete/${id}/`, config);

    dispatch({ type: FOLDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
