import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import LoginInfoEditScreen from "../screens/LoginInfoEditScreen";
import UserInfoEditScreen from "../screens/UserInfoEditScreen";
import QuizFolderSelectScreen from "../screens/QuizFolderSelectScreen";
import QuizPageScreen from "../screens/QuizPageScreen";
import EditingFolderSelectScreen from "../screens/EditingFolderSelectScreen";
import FolderEditScreen from "../screens/FolderEditScreen";
import FolderCreateScreen from "../screens/FolderCreateScreen";
import QuizListScreen from "../screens/QuizListScreen";
import QuizEditScreen from "../screens/QuizEditScreen";
import QuizCreateScreen from "../screens/QuizCreateScreen";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      '"Hiragino Sans"',
      '"Hiragino Kaku Gothic Pro"',
      "Meiryo",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Header />

        <Route exact path="/" component={HomeScreen} />

        <Route exact path="/login" component={LoginScreen} />

        <Route exact path="/register" component={RegisterScreen} />

        <Route exact path="/profile" component={ProfileSettingsScreen} />

        <Route
          exact
          path="/profile/logininfo"
          component={LoginInfoEditScreen}
        />

        <Route exact path="/profile/userinfo" component={UserInfoEditScreen} />

        <Route
          exact
          path="/quizzes/folders"
          component={QuizFolderSelectScreen}
        />

        <Route exact path="/quizzes/folders/:id" component={QuizPageScreen} />

        <Route
          exact
          path="/editings/folders"
          component={EditingFolderSelectScreen}
        />

        <Route
          exact
          path="/editings/folders/create"
          component={FolderCreateScreen}
        />

        <Route
          exact
          path="/editings/folders/:folderId/edit"
          component={FolderEditScreen}
        />

        <Route
          exact
          path="/editings/folders/:folderId/quizzes"
          component={QuizListScreen}
        />

        <Route
          exact
          path="/editings/folders/:folderId/create"
          component={QuizCreateScreen}
        />

        <Route
          exact
          path="/editings/folders/:folderId/quizzes/:quizId/edit"
          component={QuizEditScreen}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
