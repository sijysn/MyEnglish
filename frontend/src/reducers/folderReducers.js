import {
  FOLDER_LIST_REQUEST,
  FOLDER_LIST_SUCCESS,
  FOLDER_LIST_FAIL,
  FOLDER_LIST_RESET,
  FOLDER_SET_REQUEST,
  FOLDER_SET_SUCCESS,
  FOLDER_SET_FAIL,
  FOLDER_RESET,
  FOLDER_DELETE_REQUEST,
  FOLDER_DELETE_SUCCESS,
  FOLDER_DELETE_FAIL,
  FOLDER_DELETE_RESET,
} from "../consts/folderConsts";

export const folderListReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LIST_REQUEST:
      return { loading: true };

    case FOLDER_LIST_SUCCESS:
      return { loading: false, folders: action.payload };

    case FOLDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case FOLDER_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const folderSetReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_SET_REQUEST:
      return { loading: true };

    case FOLDER_SET_SUCCESS:
      return { loading: false, folder: action.payload };

    case FOLDER_SET_FAIL:
      return { loading: false, error: action.payload };

    case FOLDER_RESET:
      return {};

    default:
      return state;
  }
};

export const folderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_DELETE_REQUEST:
      return { loading: true };

    case FOLDER_DELETE_SUCCESS:
      return { loading: false, success: true, folder: action.payload };

    case FOLDER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case FOLDER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
