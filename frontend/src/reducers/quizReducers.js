import {
  ALL_QUIZ_REQUEST,
  ALL_QUIZ_SUCCESS,
  ALL_QUIZ_FAIL,
  ALL_QUIZ_RESET,
  ACTIVE_QUIZ_SET_REQUEST,
  ACTIVE_QUIZ_SET_SUCCESS,
  ACTIVE_QUIZ_SET_FAIL,
  ACTIVE_QUIZ_RESET,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_DELETE_RESET,
} from "../consts/quizConsts";

export const allQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_QUIZ_REQUEST:
      return { loading: true };

    case ALL_QUIZ_SUCCESS:
      return { loading: false, quizList: action.payload };

    case ALL_QUIZ_FAIL:
      return { loading: false, error: action.payload };

    case ALL_QUIZ_RESET:
      return {};

    default:
      return state;
  }
};

export const activeQuizSetReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVE_QUIZ_SET_REQUEST:
      return { loading: true };

    case ACTIVE_QUIZ_SET_SUCCESS:
      return { loading: false, quizList: action.payload };

    case ACTIVE_QUIZ_SET_FAIL:
      return { loading: false, error: action.payload };

    case ACTIVE_QUIZ_RESET:
      return {};

    default:
      return state;
  }
};

export const quizDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_DELETE_REQUEST:
      return { loading: true };

    case QUIZ_DELETE_SUCCESS:
      return { loading: false, success: true, quiz: action.payload };

    case QUIZ_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case QUIZ_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
