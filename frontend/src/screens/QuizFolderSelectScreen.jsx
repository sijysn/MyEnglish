import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import QuizFolderListItem from "../components/QuizFolderListItem";
import LinkButton from "../components/LinkButton";

import { listFolders } from "../actions/folderActions";

function QuizFolderSelectScreen() {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderList = useSelector((state) => state.folderList);
  const { loading, error, folders } = folderList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!folders) {
      dispatch(listFolders());
    }
  }, [history, userInfo, folders, dispatch]);

  return (
    <Container maxWidth="md">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h4">
          フォルダーを選択
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          folders && (
            <List style={{ margin: "0 auto", width: "80%" }}>
              {folders.map((folder) => (
                <Link to={`/quizzes/folders/${folder.id}`} key={folder.id}>
                  <QuizFolderListItem name={folder.name} />
                </Link>
              ))}
            </List>
          )
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <LinkButton
            to="/editings/folders"
            color="inherit"
            name="クイズ編集"
            style={{
              margin: "2rem",
            }}
          />

          <LinkButton
            to="/"
            color="inherit"
            name="戻る"
            style={{
              margin: "2rem",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default QuizFolderSelectScreen;
