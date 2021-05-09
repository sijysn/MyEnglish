import axios from "axios";

import {
  ALL_QUIZ_REQUEST,
  ALL_QUIZ_SUCCESS,
  ALL_QUIZ_FAIL,
  ACTIVE_QUIZ_SET_REQUEST,
  ACTIVE_QUIZ_SET_SUCCESS,
  ACTIVE_QUIZ_SET_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
} from "../consts/quizConsts";

export const getAllQuizzes = (folderId = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_QUIZ_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let quizList;
    // フォルダを指定した場合
    if (folderId) {
      const { data } = await axios.get(
        `/api/quizzes/folder/${folderId}/`,
        config
      );

      quizList = data;

      // フォルダを指定しない場合
    } else {
      const { data } = await axios.get("/api/quizzes/", config);

      quizList = data;
    }

    dispatch({ type: ALL_QUIZ_SUCCESS, payload: quizList });
  } catch (error) {
    dispatch({
      type: ALL_QUIZ_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setQuizzes = (folderId = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVE_QUIZ_SET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let quizList;
    // フォルダを指定した場合
    if (folderId) {
      const { data } = await axios.get(
        `/api/quizzes/folder/active/${folderId}/`,
        config
      );

      quizList = data;

      // フォルダを指定しない場合
    } else {
      const { data } = await axios.get("/api/quizzes/active/", config);

      quizList = data;
    }

    dispatch({ type: ACTIVE_QUIZ_SET_SUCCESS, payload: quizList });
  } catch (error) {
    dispatch({
      type: ACTIVE_QUIZ_SET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteQuiz = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/quizzes/delete/${id}/`, config);

    dispatch({ type: QUIZ_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUIZ_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
