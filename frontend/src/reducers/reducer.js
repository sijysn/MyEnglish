import { combineReducers } from "redux";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./userReducers";
import {
  folderListReducer,
  folderSetReducer,
  folderDeleteReducer,
} from "./folderReducers";
import {
  allQuizReducer,
  activeQuizSetReducer,
  quizDeleteReducer,
} from "./quizReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userRegister: userRegisterReducer,
  folderList: folderListReducer,
  folderSet: folderSetReducer,
  folderDelete: folderDeleteReducer,
  allQuizzes: allQuizReducer,
  quizSet: activeQuizSetReducer,
  quizDelete: quizDeleteReducer,
});

export default reducer;
